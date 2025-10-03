import { db } from '../firebase'
import { ref, set, update, onValue, push } from 'firebase/database'

// Test Firebase connectivity
export function testFirebaseConnection() {
  const testRef = ref(db, 'EventEye/test')
  return set(testRef, {
    message: 'Firebase connection test',
    timestamp: Date.now()
  }).then(() => {
    console.log('✅ Firebase connection successful')
    return true
  }).catch((error) => {
    console.error('❌ Firebase connection failed:', error)
    throw error
  })
}

function sanitizeKey(input) {
  return String(input || '')
    .replace(/[.#$\x5B\x5D\x2F]/g, '_')
    .trim()
}

function generateParticipantId(p) {
  if (p?.id && String(p.id).trim()) return String(p.id).trim()
  if (p?.email && String(p.email).trim()) return `email:${sanitizeKey(String(p.email).trim().toLowerCase())}`
  if (p?.phone && String(p.phone).trim()) return `phone:${sanitizeKey(String(p.phone).trim())}`
  try {
    if (typeof crypto !== 'undefined' && crypto?.randomUUID) return crypto.randomUUID()
  } catch {
    // ignore crypto errors in non-browser environments
  }
  const rand = Math.random().toString(36).slice(2)
  return `rnd:${Date.now().toString(36)}:${rand}`
}

export function saveParticipants(eventId, participants) {
  const participantsById = {}
  participants.forEach((p) => {
    const pid = generateParticipantId(p)
    participantsById[pid] = {
      id: pid,
      name: p.name?.trim() || '',
      email: p.email?.trim() || '',
      phone: p.phone?.trim() || '',
      meta: p.meta || {},
      createdAt: p.createdAt || Date.now(),
      updatedAt: Date.now(),
    }
  })
  
  const path = `EventEye/participants/${sanitizeKey(eventId)}`
  console.log('Saving participants to Firebase path:', path)
  console.log('Participants data:', participantsById)
  
  // Use set instead of update to ensure data is saved
  return set(ref(db, path), participantsById)
    .then(() => {
      console.log('Successfully saved participants to Firebase')
      return participantsById
    })
    .catch((error) => {
      console.error('Error saving participants to Firebase:', error)
      throw error
    })
}

export function updateParticipant(eventId, participant) {
  const pid = generateParticipantId(participant)
  const path = `EventEye/participants/${sanitizeKey(eventId)}/${sanitizeKey(pid)}`
  const payload = {
    id: pid,
    name: participant.name?.trim() || '',
    email: participant.email?.trim() || '',
    phone: participant.phone?.trim() || '',
    meta: participant.meta || {},
    createdAt: participant.createdAt || Date.now(),
    updatedAt: Date.now(),
  }
  return set(ref(db, path), payload)
}

export function listenParticipants(eventId, callback) {
  return onValue(ref(db, `EventEye/participants/${sanitizeKey(eventId)}`), (snap) => {
    const val = snap.val() || {}
    const list = Object.values(val)
    callback(list)
  })
}

export function setDeliveryStatus(eventId, participantId, status, meta = {}) {
  const path = `EventEye/deliveries/${eventId}/${participantId}`
  return set(ref(db, path), {
    status, // 'queued' | 'sent' | 'bounced' | 'failed' | 'pending'
    meta,
    updatedAt: Date.now(),
  })
}

export function listenDeliveryStatuses(eventId, callback) {
  return onValue(ref(db, `EventEye/deliveries/${eventId}`), (snap) => {
    callback(snap.val() || {})
  })
}

export function queueSendCertificate(eventId, participantId, channel, payload = {}) {
  const queueRef = ref(db, `EventEye/queues/certificates/${eventId}`)
  const jobRef = push(queueRef)
  return set(jobRef, {
    participantId,
    channel, // 'email' | 'whatsapp'
    payload,
    createdAt: Date.now(),
    status: 'queued',
  })
}

export function saveCsvData(rawRows) {
  const path = `EventEye/CSV`
  const payload = {
    updatedAt: Date.now(),
    rows: Array.isArray(rawRows) ? rawRows : [],
  }
  
  console.log('Saving CSV data to Firebase path:', path)
  console.log('CSV data payload:', payload)
  
  return set(ref(db, path), payload)
    .then(() => {
      console.log('Successfully saved CSV data to Firebase')
      return payload
    })
    .catch((error) => {
      console.error('Error saving CSV data to Firebase:', error)
      throw error
    })
}


