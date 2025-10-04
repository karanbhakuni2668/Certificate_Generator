import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import { storeCertificateInBoth, saveCertificateMetadata } from './certificateStorage'

async function generateQrDataUrl(data) {
  try {
    return await QRCode.toDataURL(JSON.stringify(data), { 
      margin: 2, 
      width: 256,
      color: {
        dark: '#0f172a',  // Dark color for QR code
        light: '#ffffff'  // Light background
      },
      errorCorrectionLevel: 'M'
    })
  } catch (e) {
    console.error('QR generation failed', e)
    return null 
  }
}

// Template configurations
const templates = {
  1: {
    name: 'Classic Professional',
    description: 'Elegant dark theme with purple accents',
    primaryColor: '#a78bfa',
    secondaryColor: '#22d3ee',
    accentColor: '#34d399',
    backgroundColors: ['#0f172a', '#1e293b', '#334155', '#475569'],
    borderStyle: 'double'
  },
  2: {
    name: 'Royal Gold',
    description: 'Luxurious gold and navy design',
    primaryColor: '#fbbf24',
    secondaryColor: '#1e40af',
    accentColor: '#dc2626',
    backgroundColors: ['#1e293b', '#334155', '#475569', '#64748b'],
    borderStyle: 'ornate'
  },
  3: {
    name: 'Ocean Blue',
    description: 'Fresh blue gradient theme',
    primaryColor: '#3b82f6',
    secondaryColor: '#06b6d4',
    accentColor: '#10b981',
    backgroundColors: ['#0c4a6e', '#075985', '#0369a1', '#0284c7'],
    borderStyle: 'wave'
  },
  4: {
    name: 'Forest Green',
    description: 'Natural green earthy tones',
    primaryColor: '#059669',
    secondaryColor: '#65a30d',
    accentColor: '#ea580c',
    backgroundColors: ['#064e3b', '#065f46', '#047857', '#059669'],
    borderStyle: 'leaf'
  },
  5: {
    name: 'Sunset Orange',
    description: 'Warm orange and red gradient',
    primaryColor: '#ea580c',
    secondaryColor: '#dc2626',
    accentColor: '#fbbf24',
    backgroundColors: ['#7c2d12', '#9a3412', '#c2410c', '#ea580c'],
    borderStyle: 'flame'
  },
  6: {
    name: 'Purple Dream',
    description: 'Deep purple and pink tones',
    primaryColor: '#9333ea',
    secondaryColor: '#ec4899',
    accentColor: '#06b6d4',
    backgroundColors: ['#581c87', '#6b21a8', '#7c3aed', '#9333ea'],
    borderStyle: 'crystal'
  },
  7: {
    name: 'Monochrome',
    description: 'Clean black and white design',
    primaryColor: '#374151',
    secondaryColor: '#6b7280',
    accentColor: '#111827',
    backgroundColors: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db'],
    borderStyle: 'minimal'
  }
}

// Language configurations
const languages = {
  en: {
    name: 'English',
    certificateTitle: 'CERTIFICATE OF PARTICIPATION',
    subtitle: 'This is to certify that',
    participationText: 'has successfully participated in the',
    heldOn: 'held on',
    organizedBy: 'organized by',
    achievementStatement: 'This certificate is awarded in recognition of outstanding participation',
    authorizedSignature: 'Authorized Signature',
    digitalVerification: 'Digital Verification',
    certificationAuthority: 'EventEye Certification Authority',
    verificationText: 'This certificate is digitally signed and verified',
    scanToVerify: 'Scan to Verify',
    eventIdLabel: 'Event ID:',
    certificateIdLabel: 'Certificate ID:'
  },
  hi: {
    name: 'हिंदी',
    certificateTitle: 'भागीदारी का प्रमाणपत्र',
    subtitle: 'यह प्रमाणित किया जाता है कि',
    participationText: 'ने सफलतापूर्वक भाग लिया है',
    heldOn: 'आयोजित',
    organizedBy: 'द्वारा आयोजित',
    achievementStatement: 'उत्कृष्ट भागीदारी के लिए यह प्रमाणपत्र प्रदान किया गया है',
    authorizedSignature: 'अधिकृत हस्ताक्षर',
    digitalVerification: 'डिजिटल सत्यापन',
    certificationAuthority: 'इवेंटआई प्रमाणन प्राधिकरण',
    verificationText: 'यह प्रमाणपत्र डिजिटल रूप से हस्ताक्षरित और सत्यापित है',
    scanToVerify: 'सत्यापन के लिए स्कैन करें',
    eventIdLabel: 'इवेंट आईडी:',
    certificateIdLabel: 'प्रमाणपत्र आईडी:'
  }
}

export async function generateCertificate({ participant, event, organizer, verifyUrl, templateId = 1, language = 'en' }) {
  const template = templates[templateId] || templates[1]
  const lang = languages[language] || languages.en
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // Apply template background
  template.backgroundColors.forEach((color, index) => {
    doc.setFillColor(color)
    doc.rect(0, pageHeight * (index / template.backgroundColors.length), pageWidth, pageHeight / template.backgroundColors.length, 'F')
  })

  // Apply template borders
  doc.setDrawColor(template.primaryColor)
  doc.setLineWidth(8)
  doc.rect(40, 40, pageWidth - 80, pageHeight - 80, 'S')

  // Inner decorative border
  doc.setDrawColor(template.secondaryColor)
  doc.setLineWidth(4)
  doc.rect(60, 60, pageWidth - 120, pageHeight - 120, 'S')




  // Event ID and Certificate ID at the top
  doc.setTextColor(template.secondaryColor)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text(lang.eventIdLabel, 80, 90)
  doc.setTextColor(templateId === 7 ? '#111827' : '#ffffff')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('DEMO-EVENT', 150, 90)
  
  // Generate 6-digit random certificate ID
  const randomCertId = Math.floor(100000 + Math.random() * 900000)
  
  doc.setTextColor(template.primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text(lang.certificateIdLabel, pageWidth - 280, 90)
  doc.setTextColor(templateId === 7 ? '#111827' : '#ffffff')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(`CERT-${randomCertId}`, pageWidth - 170, 90)

  // Main title with gradient effect
  doc.setTextColor(templateId === 7 ? '#111827' : '#ffffff')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(36)
  doc.text(lang.certificateTitle, pageWidth / 2, 140, { align: 'center' })

  // Subtitle
  doc.setTextColor(template.primaryColor)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(18)
  doc.text(lang.subtitle, pageWidth / 2, 170, { align: 'center' })

  // Participant name with special styling and underline
  doc.setTextColor(template.secondaryColor)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(42)
  doc.text(participant.name || 'Participant Name', pageWidth / 2, 230, { align: 'center' })

  // Decorative underline for name
  doc.setDrawColor(template.accentColor)
  doc.setLineWidth(4)
  const nameWidth = doc.getTextWidth(participant.name || 'Participant Name')
  const lineStart = (pageWidth - nameWidth) / 2
  doc.line(lineStart, 250, lineStart + nameWidth, 250)

  // Decorative line
  doc.setDrawColor(template.accentColor)
  doc.setLineWidth(3)
  doc.line(pageWidth * 0.2, 270, pageWidth * 0.8, 270)

  // Event details with better formatting
  doc.setTextColor(templateId === 7 ? '#111827' : '#ffffff')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(16)
  
  const details = lang.participationText
  doc.text(details, pageWidth / 2, 300, { align: 'center' })
  
  // Event title with special styling
  doc.setTextColor(template.accentColor)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text(`"${event.title}"`, pageWidth / 2, 330, { align: 'center' })
  
  // Date and organizer
  doc.setTextColor(templateId === 7 ? '#111827' : '#ffffff')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(16)
  doc.text(`${lang.heldOn} ${event.date}`, pageWidth / 2, 360, { align: 'center' })
  doc.text(`${lang.organizedBy} ${organizer}`, pageWidth / 2, 385, { align: 'center' })

  // Achievement statement
  doc.setTextColor(template.primaryColor)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(14)
  doc.text(lang.achievementStatement, pageWidth / 2, 410, { align: 'center' })

  // Decorative elements - stars
  const starPositions = [
    [150, 180], [pageWidth - 150, 180],
    [150, pageHeight - 180], [pageWidth - 150, pageHeight - 180],
    [200, 300], [pageWidth - 200, 300],
    [200, pageHeight - 300], [pageWidth - 200, pageHeight - 300]
  ]
  
  starPositions.forEach(([x, y]) => {
    doc.setFillColor(template.accentColor)
    doc.circle(x, y, 8, 'F')
  })

  // Professional signature section
  const signatureY = pageHeight - 140
  
  // Left signature
  doc.setDrawColor(template.primaryColor)
  doc.setLineWidth(2)
  doc.line(pageWidth * 0.2, signatureY, pageWidth * 0.4, signatureY)
  doc.setTextColor(template.primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text(lang.authorizedSignature, pageWidth * 0.3, signatureY + 20, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('EventEye Platform', pageWidth * 0.3, signatureY + 35, { align: 'center' })
  doc.text('Chief Technology Officer', pageWidth * 0.3, signatureY + 50, { align: 'center' })
  
  // Right signature
  doc.setDrawColor(template.secondaryColor)
  doc.setLineWidth(2)
  doc.line(pageWidth * 0.6, signatureY, pageWidth * 0.8, signatureY)
  doc.setTextColor(template.secondaryColor)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text(lang.digitalVerification, pageWidth * 0.7, signatureY + 20, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('EventEye Certification', pageWidth * 0.7, signatureY + 35, { align: 'center' })
  doc.text('System', pageWidth * 0.7, signatureY + 50, { align: 'center' })

  // Professional footer information
  doc.setTextColor(templateId === 7 ? '#6b7280' : '#94a3b8')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  
  
  // Center footer
  doc.setTextColor(template.primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text(lang.certificationAuthority, pageWidth / 2, pageHeight - 80, { align: 'center' })
  doc.setTextColor(templateId === 7 ? '#6b7280' : '#94a3b8')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(lang.verificationText, pageWidth / 2, pageHeight - 65, { align: 'center' })
  
         // Right footer - Clean without verification text

  // Enhanced QR Code with comprehensive certificate data
  const certificateData = {
    type: 'certificate',
    certificateId: `CERT-${randomCertId}`,
    eventId: 'DEMO-EVENT',
    eventTitle: event.title,
    participantName: participant.name || 'Participant Name',
    participantEmail: participant.email || 'N/A',
    eventDate: event.date,
    organizer: organizer,
    issuedDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    issuedBy: 'EventEye Certification Authority',
    verifyUrl: verifyUrl || 'https://verify.eventeye.com',
    status: 'Valid',
    certificateType: 'Certificate of Participation'
  }
  const qrDataUrl = await generateQrDataUrl(certificateData)
  if (qrDataUrl) {
    const qrSize = 100
    const qrX = pageWidth - qrSize - 80
    const qrY = pageHeight - qrSize - 80
    
    // QR Code border
    doc.setDrawColor(template.accentColor)
    doc.setLineWidth(2)
    doc.rect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20, 'S')
    
    // QR Code
    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)
    
    // QR Code label
    doc.setTextColor(template.accentColor)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
     doc.text(lang.scanToVerify, qrX + qrSize/2, qrY + qrSize + 25, { align: 'center' })
  }


  const dataUrl = doc.output('datauristring')
  const blob = doc.output('blob')
  
  // Upload certificate to Firebase and Cloudinary
  try {
    console.log('Uploading certificate to storage services...')
    
    // Upload to both Firebase and Cloudinary
    const uploadResults = await storeCertificateInBoth(
      { dataUrl, blob }, 
      participant.id, 
      event.id
    )
    
    // Prepare certificate metadata
    const certificateMetadata = {
      participantName: participant.name,
      participantEmail: participant.email,
      eventTitle: event.title,
      eventDate: event.date,
      templateId: templateId,
      templateName: template.name,
      organizer: organizer,
      firebaseUrl: uploadResults.firebase?.success ? uploadResults.firebase.dataUrl : null,
      cloudinaryUrl: uploadResults.cloudinary?.success ? uploadResults.cloudinary.url : null,
      firebasePath: uploadResults.firebase?.success ? uploadResults.firebase.path : null,
      cloudinaryId: uploadResults.cloudinary?.success ? uploadResults.cloudinary.cloudinaryId : null,
      verifyUrl: verifyUrl,
      qrCodeData: qrDataUrl,
      fileSize: blob.size
    }
    
    // Save metadata to Firestore
    const metadataResult = await saveCertificateMetadata(
      participant.id,
      event.id,
      certificateMetadata
    )
    
    console.log('Certificate storage results:', {
      upload: uploadResults,
      metadata: metadataResult
    })
    
    return { 
      blob, 
      dataUrl,
      storage: {
        firebase: uploadResults.firebase,
        cloudinary: uploadResults.cloudinary,
        metadata: metadataResult
      },
      certificateId: metadataResult.success ? metadataResult.certificateId : null
    }
  } catch (error) {
    console.error('Certificate storage error:', error)
    // Return certificate even if storage fails
    return { 
      blob, 
      dataUrl,
      storage: {
        error: error.message
      }
    }
  }
}

// Export templates for UI
export function getCertificateTemplates() {
  return templates
}

export function getTemplateInfo(templateId) {
  return templates[templateId] || templates[1]
}

// Export languages for UI
export function getAvailableLanguages() {
  return languages
}

export function getLanguageInfo(languageCode) {
  return languages[languageCode] || languages.en
}


