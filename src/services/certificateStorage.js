import { ref, set, get, remove, push, serverTimestamp } from 'firebase/database'
import { db } from '../firebase'

// Dynamic import for Cloudinary to avoid browser compatibility issues
let cloudinary = null
const initializeCloudinary = async () => {
  if (!cloudinary) {
    try {
      const cloudinaryModule = await import('cloudinary')
      cloudinary = cloudinaryModule.v2
    } catch (error) {
      console.warn('Cloudinary not available:', error)
      return false
    }
  }
  return true
}

// Cloudinary Configuration
const env = import.meta.env || {}

const CLOUDINARY_CONFIG = {
  cloud_name: env.VITE_CLOUDINARY_CLOUD_NAME || 'dm23icoaz',
  upload_preset: env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
  // Note: Upload preset method doesn't require API key/secret for unsigned uploads
}

// Initialize Cloudinary (will be called when needed)
const initializeCloudinaryConfig = () => {
  if (cloudinary && isCloudinaryConfigured()) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CONFIG.cloud_name,
      secure: true
    })
  }
}

// Check if Cloudinary is configured
export function isCloudinaryConfigured() {
  return CLOUDINARY_CONFIG.cloud_name && 
         CLOUDINARY_CONFIG.upload_preset &&
         CLOUDINARY_CONFIG.cloud_name !== 'YOUR_CLOUD_NAME'
}

// Store certificate data in Firebase Realtime Database
export async function storeCertificateInFirebase(certificateData, participantId, eventId) {
  try {
    const certificateId = `cert_${participantId}_${eventId}_${Date.now()}`
    const certificateRef = ref(db, `EventEye/certificates/${certificateId}`)
    
    // Store certificate metadata and data URL in Realtime Database
    const certificateRecord = {
      id: certificateId,
      participantId,
      eventId,
      dataUrl: certificateData.dataUrl,
      blobData: null, // We'll store the data URL instead of blob
      fileName: `${participantId}_${eventId}_${Date.now()}.pdf`,
      generatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      status: 'active'
    }
    
    await set(certificateRef, certificateRecord)
    
    return {
      success: true,
      certificateId,
      path: `EventEye/certificates/${certificateId}`,
      dataUrl: certificateData.dataUrl
    }
  } catch (error) {
    console.error('Firebase Realtime Database error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Upload certificate to Cloudinary using upload preset
export async function uploadCertificateToCloudinary(certificateBlob, participantId, eventId) {
  try {
    if (!isCloudinaryConfigured()) {
      return {
        success: false,
        error: 'Cloudinary configuration incomplete'
      }
    }

    // Initialize Cloudinary if not already done
    const cloudinaryAvailable = await initializeCloudinary()
    if (!cloudinaryAvailable) {
      return {
        success: false,
        error: 'Cloudinary SDK not available'
      }
    }

    // Initialize Cloudinary config
    initializeCloudinaryConfig()

    // Convert blob to base64 for Cloudinary upload
    const arrayBuffer = await certificateBlob.arrayBuffer()
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    const dataUrl = `data:application/pdf;base64,${base64String}`
    
    const publicId = `eventeye-certificates/${eventId}/${participantId}_${Date.now()}`
    
    const result = await cloudinary.uploader.upload(dataUrl, {
      upload_preset: CLOUDINARY_CONFIG.upload_preset,
      public_id: publicId,
      resource_type: 'raw',
      folder: 'eventeye-certificates',
      use_filename: true,
      unique_filename: true,
      format: 'pdf'
    })
    
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      cloudinaryId: result.public_id
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Save certificate metadata to Firebase Realtime Database
export async function saveCertificateMetadata(participantId, eventId, certificateData) {
  try {
    const certificateId = `cert_${participantId}_${eventId}_${Date.now()}`
    
    const certificateMetadata = {
      id: certificateId,
      participantId,
      eventId,
      participantName: certificateData.participantName,
      participantEmail: certificateData.participantEmail,
      eventTitle: certificateData.eventTitle,
      eventDate: certificateData.eventDate,
      templateId: certificateData.templateId,
      templateName: certificateData.templateName,
      organizer: certificateData.organizer,
      
      // Storage URLs
      firebaseUrl: certificateData.firebaseUrl || null,
      cloudinaryUrl: certificateData.cloudinaryUrl || null,
      firebasePath: certificateData.firebasePath || null,
      cloudinaryId: certificateData.cloudinaryId || null,
      
      // Status and metadata
      status: 'active',
      generatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      
      // Verification data
      verifyUrl: certificateData.verifyUrl,
      qrCodeData: certificateData.qrCodeData || null,
      
      // Additional metadata
      fileSize: certificateData.fileSize || 0,
      mimeType: 'application/pdf'
    }
    
    // Save to main certificates collection
    const certificateRef = ref(db, `EventEye/certificates/${certificateId}`)
    await set(certificateRef, certificateMetadata)
    
    // Also save to event-specific collection
    const eventCertificateRef = ref(db, `EventEye/events/${eventId}/certificates/${certificateId}`)
    await set(eventCertificateRef, certificateMetadata)
    
    // Save to participants collection for easy lookup
    const participantCertificateRef = ref(db, `EventEye/participants/${participantId}/certificates/${certificateId}`)
    await set(participantCertificateRef, certificateMetadata)
    
    return {
      success: true,
      certificateId,
      metadata: certificateMetadata
    }
  } catch (error) {
    console.error('Firebase Realtime Database save error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Get certificate by ID
export async function getCertificateById(certificateId) {
  try {
    const certificateRef = ref(db, `EventEye/certificates/${certificateId}`)
    const snapshot = await get(certificateRef)
    
    if (snapshot.exists()) {
      return {
        success: true,
        certificate: snapshot.val()
      }
    } else {
      return {
        success: false,
        error: 'Certificate not found'
      }
    }
  } catch (error) {
    console.error('Get certificate error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Get certificates by event
export async function getCertificatesByEvent(eventId) {
  try {
    const eventCertificatesRef = ref(db, `EventEye/events/${eventId}/certificates`)
    const snapshot = await get(eventCertificatesRef)
    
    if (snapshot.exists()) {
      const certificatesData = snapshot.val()
      const certificates = Object.keys(certificatesData).map(key => certificatesData[key])
      
      return {
        success: true,
        certificates
      }
    } else {
      return {
        success: true,
        certificates: []
      }
    }
  } catch (error) {
    console.error('Get certificates by event error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Delete certificate from storage
export async function deleteCertificate(certificateId, firebasePath, cloudinaryId) {
  try {
    const results = []
    
    // Delete from Firebase Realtime Database
    try {
      // Delete from main certificates collection
      const certificateRef = ref(db, `EventEye/certificates/${certificateId}`)
      await remove(certificateRef)
      
      // Delete from event-specific collection (we need to get the eventId first)
      const certificateSnapshot = await get(certificateRef)
      if (certificateSnapshot.exists()) {
        const certificateData = certificateSnapshot.val()
        const eventId = certificateData.eventId
        
        if (eventId) {
          const eventCertificateRef = ref(db, `EventEye/events/${eventId}/certificates/${certificateId}`)
          await remove(eventCertificateRef)
          
          const participantCertificateRef = ref(db, `EventEye/participants/${certificateData.participantId}/certificates/${certificateId}`)
          await remove(participantCertificateRef)
        }
      }
      
      results.push({ service: 'firebase_realtime', success: true })
    } catch (error) {
      results.push({ service: 'firebase_realtime', success: false, error: error.message })
    }
    
    // Delete from Cloudinary
    if (cloudinaryId && isCloudinaryConfigured()) {
      try {
        const cloudinaryAvailable = await initializeCloudinary()
        if (cloudinaryAvailable) {
          initializeCloudinaryConfig()
          await cloudinary.uploader.destroy(cloudinaryId, { 
            resource_type: 'raw',
            upload_preset: CLOUDINARY_CONFIG.upload_preset 
          })
          results.push({ service: 'cloudinary', success: true })
        } else {
          results.push({ service: 'cloudinary', success: false, error: 'Cloudinary SDK not available' })
        }
      } catch (error) {
        results.push({ service: 'cloudinary', success: false, error: error.message })
      }
    }
    
    return {
      success: true,
      results
    }
  } catch (error) {
    console.error('Delete certificate error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Store certificate in both Firebase Realtime Database and Cloudinary
export async function storeCertificateInBoth(certificateData, participantId, eventId) {
  try {
    const results = {
      firebase: null,
      cloudinary: null,
      success: false
    }
    
    // Store in Firebase Realtime Database
    const firebaseResult = await storeCertificateInFirebase(certificateData, participantId, eventId)
    results.firebase = firebaseResult
    
    // Upload to Cloudinary (if configured)
    if (isCloudinaryConfigured() && certificateData.blob) {
      const cloudinaryResult = await uploadCertificateToCloudinary(certificateData.blob, participantId, eventId)
      results.cloudinary = cloudinaryResult
    }
    
    // Consider successful if at least one storage succeeded
    results.success = firebaseResult.success || (results.cloudinary && results.cloudinary.success)
    
    return results
  } catch (error) {
    console.error('Store in both services error:', error)
    return {
      success: false,
      error: error.message,
      firebase: null,
      cloudinary: null
    }
  }
}

// Update Cloudinary configuration
export function updateCloudinaryConfig(cloudName, uploadPreset) {
  CLOUDINARY_CONFIG.cloud_name = cloudName
  CLOUDINARY_CONFIG.upload_preset = uploadPreset
  
  // Initialize Cloudinary config if available
  if (cloudinary) {
    cloudinary.config({
      cloud_name: cloudName,
      secure: true
    })
  }
}

export default {
  storeCertificateInFirebase,
  uploadCertificateToCloudinary,
  storeCertificateInBoth,
  saveCertificateMetadata,
  getCertificateById,
  getCertificatesByEvent,
  deleteCertificate,
  updateCloudinaryConfig,
  isCloudinaryConfigured
}
