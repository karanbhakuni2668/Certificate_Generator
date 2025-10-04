import emailjs from '@emailjs/browser'

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_286khok',
  PUBLIC_KEY: 'doMN_BfgWmupzx0Zo', // Your EmailJS public key
  TEMPLATE_ID: 'template_hhgghm5', // Your actual template ID
}

// Check if EmailJS is properly configured
export function isEmailJSConfigured() {
  return EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && 
         EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
}

// Initialize EmailJS
export function initEmailJS() {
  if (isEmailJSConfigured()) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  } else {
    console.warn('EmailJS not fully configured. Please set PUBLIC_KEY in emailService.js')
  }
}

// Send certificate email to participant
export async function sendCertificateEmail(participant, eventDetails, certificateData) {
  try {
    // Check if EmailJS is properly configured
    if (!isEmailJSConfigured()) {
      return {
        success: false,
        message: 'EmailJS configuration incomplete. Please set PUBLIC_KEY in emailService.js',
        error: 'Configuration missing',
        needsSetup: true
      }
    }

    // Extract certificate URL from certificate data
    let certificateUrl = null
    if (typeof certificateData === 'string') {
      certificateUrl = certificateData // Direct URL
    } else if (certificateData && certificateData.storage) {
      // Use Firebase URL first, then Cloudinary URL as fallback
      certificateUrl = certificateData.storage.firebase?.url || 
                      certificateData.storage.cloudinary?.url ||
                      certificateData.dataUrl // Fallback to data URL
    } else if (certificateData && certificateData.dataUrl) {
      certificateUrl = certificateData.dataUrl
    }

    const templateParams = {
      to_name: participant.name,
      to_email: participant.email,
      event_name: eventDetails.title || 'EventEye Event',
      event_date: eventDetails.date || new Date().toLocaleDateString(),
      organizer_name: eventDetails.organizer || 'EventEye Team',
      certificate_url: certificateUrl,
      participant_name: participant.name,
      event_id: eventDetails.id || 'DEMO-EVENT',
      // Additional fields for email template
      from_name: 'EventEye Team',
      reply_to: 'noreply@eventeye.com',
      subject: `Your Certificate for ${eventDetails.title || 'EventEye Event'}`,
      
      // Storage information
      firebase_url: certificateData?.storage?.firebase?.url || '',
      cloudinary_url: certificateData?.storage?.cloudinary?.url || '',
      certificate_id: certificateData?.certificateId || '',
    }

    console.log('Sending email with params:', templateParams)

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    )

    console.log('Email sent successfully:', response)
    return {
      success: true,
      message: 'Certificate email sent successfully',
      response
    }

  } catch (error) {
    console.error('Email sending failed:', error)
    return {
      success: false,
      message: 'Failed to send certificate email',
      error: error.message
    }
  }
}

// Send bulk emails to multiple participants
export async function sendBulkCertificateEmails(participants, eventDetails, certificateData = {}) {
  const results = []
  
  for (const participant of participants) {
    try {
      const participantCertificateData = certificateData[participant.id] || null
      const result = await sendCertificateEmail(participant, eventDetails, participantCertificateData)
      
      results.push({
        participantId: participant.id,
        participantName: participant.name,
        participantEmail: participant.email,
        ...result
      })
      
      // Add delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      results.push({
        participantId: participant.id,
        participantName: participant.name,
        participantEmail: participant.email,
        success: false,
        message: 'Failed to send email',
        error: error.message
      })
    }
  }
  
  return results
}

// Test email functionality
export async function testEmailConnection() {
  try {
    // Test with dummy data
    const testParticipant = {
      name: 'Test User',
      email: 'test@example.com'
    }
    
    const testEventDetails = {
      title: 'Test Event',
      date: new Date().toLocaleDateString(),
      organizer: 'EventEye Team',
      id: 'TEST-EVENT'
    }
    
    const result = await sendCertificateEmail(testParticipant, testEventDetails, null)
    return result
    
  } catch (error) {
    console.error('Email connection test failed:', error)
    return {
      success: false,
      message: 'Email service connection failed',
      error: error.message
    }
  }
}

// Update configuration (for runtime updates)
export function updateEmailJSConfig(publicKey, templateId) {
  EMAILJS_CONFIG.PUBLIC_KEY = publicKey
  EMAILJS_CONFIG.TEMPLATE_ID = templateId
  initEmailJS()
}

export default {
  initEmailJS,
  sendCertificateEmail,
  sendBulkCertificateEmails,
  testEmailConnection,
  updateEmailJSConfig,
  isEmailJSConfigured
}
