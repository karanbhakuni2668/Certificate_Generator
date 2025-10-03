import jsPDF from 'jspdf'
import QRCode from 'qrcode'

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

export async function generateCertificate({ participant, event, organizer, verifyUrl }) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // Modern gradient-like background effect
  doc.setFillColor('#0f172a')
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  
  // Add gradient effect with multiple rectangles
  doc.setFillColor('#1e293b')
  doc.rect(0, 0, pageWidth, pageHeight * 0.3, 'F')
  
  doc.setFillColor('#334155')
  doc.rect(0, pageHeight * 0.3, pageWidth, pageHeight * 0.4, 'F')
  
  doc.setFillColor('#475569')
  doc.rect(0, pageHeight * 0.7, pageWidth, pageHeight * 0.3, 'F')

  // Decorative border with rounded corners effect
  doc.setDrawColor('#a78bfa')
  doc.setLineWidth(8)
  doc.rect(40, 40, pageWidth - 80, pageHeight - 80, 'S')

  // Inner decorative border
  doc.setDrawColor('#22d3ee')
  doc.setLineWidth(4)
  doc.rect(60, 60, pageWidth - 120, pageHeight - 120, 'S')




  // Event ID and Certificate ID at the top
  doc.setTextColor('#22d3ee')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Event ID:', 80, 90)
  doc.setTextColor('#ffffff')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('DEMO-EVENT', 150, 90)
  
  // Generate 6-digit random certificate ID
  const randomCertId = Math.floor(100000 + Math.random() * 900000)
  
  doc.setTextColor('#a78bfa')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Certificate ID:', pageWidth - 280, 90)
  doc.setTextColor('#ffffff')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(`CERT-${randomCertId}`, pageWidth - 170, 90)

  // Main title with gradient effect
  doc.setTextColor('#ffffff')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(36)
  doc.text('CERTIFICATE OF PARTICIPATION', pageWidth / 2, 140, { align: 'center' })

  // Subtitle
  doc.setTextColor('#a78bfa')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(18)
  doc.text('This is to certify that', pageWidth / 2, 170, { align: 'center' })

  // Participant name with special styling and underline
  doc.setTextColor('#22d3ee')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(42)
  doc.text(participant.name || 'Participant Name', pageWidth / 2, 230, { align: 'center' })

  // Decorative underline for name
  doc.setDrawColor('#34d399')
  doc.setLineWidth(4)
  const nameWidth = doc.getTextWidth(participant.name || 'Participant Name')
  const lineStart = (pageWidth - nameWidth) / 2
  doc.line(lineStart, 250, lineStart + nameWidth, 250)

  // Decorative line
  doc.setDrawColor('#34d399')
  doc.setLineWidth(3)
  doc.line(pageWidth * 0.2, 270, pageWidth * 0.8, 270)

  // Event details with better formatting
  doc.setTextColor('#ffffff')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(16)
  
  const details = `has successfully participated in the`
  doc.text(details, pageWidth / 2, 300, { align: 'center' })
  
  // Event title with special styling
  doc.setTextColor('#fbbf24')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text(`"${event.title}"`, pageWidth / 2, 330, { align: 'center' })
  
  // Date and organizer
  doc.setTextColor('#ffffff')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(16)
  doc.text(`held on ${event.date}`, pageWidth / 2, 360, { align: 'center' })
  doc.text(`organized by ${organizer}`, pageWidth / 2, 385, { align: 'center' })

  // Achievement statement
  doc.setTextColor('#a78bfa')
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(14)
  doc.text('This certificate is awarded in recognition of outstanding participation', pageWidth / 2, 410, { align: 'center' })

  // Decorative elements - stars
  const starPositions = [
    [150, 180], [pageWidth - 150, 180],
    [150, pageHeight - 180], [pageWidth - 150, pageHeight - 180],
    [200, 300], [pageWidth - 200, 300],
    [200, pageHeight - 300], [pageWidth - 200, pageHeight - 300]
  ]
  
  starPositions.forEach(([x, y]) => {
    doc.setFillColor('#fbbf24')
    doc.circle(x, y, 8, 'F')
  })

  // Professional signature section
  const signatureY = pageHeight - 140
  
  // Left signature
  doc.setDrawColor('#a78bfa')
  doc.setLineWidth(2)
  doc.line(pageWidth * 0.2, signatureY, pageWidth * 0.4, signatureY)
  doc.setTextColor('#a78bfa')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Authorized Signature', pageWidth * 0.3, signatureY + 20, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('EventEye Platform', pageWidth * 0.3, signatureY + 35, { align: 'center' })
  doc.text('Chief Technology Officer', pageWidth * 0.3, signatureY + 50, { align: 'center' })
  
  // Right signature
  doc.setDrawColor('#22d3ee')
  doc.setLineWidth(2)
  doc.line(pageWidth * 0.6, signatureY, pageWidth * 0.8, signatureY)
  doc.setTextColor('#22d3ee')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Digital Verification', pageWidth * 0.7, signatureY + 20, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('EventEye Certification', pageWidth * 0.7, signatureY + 35, { align: 'center' })
  doc.text('System', pageWidth * 0.7, signatureY + 50, { align: 'center' })

  // Professional footer information
  doc.setTextColor('#94a3b8')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  
  
  // Center footer
  doc.setTextColor('#a78bfa')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('EventEye Certification Authority', pageWidth / 2, pageHeight - 80, { align: 'center' })
  doc.setTextColor('#94a3b8')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('This certificate is digitally signed and verified', pageWidth / 2, pageHeight - 65, { align: 'center' })
  
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
    doc.setDrawColor('#34d399')
    doc.setLineWidth(2)
    doc.rect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20, 'S')
    
    // QR Code
    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)
    
    // QR Code label
    doc.setTextColor('#34d399')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
     doc.text('Scan to Verify', qrX + qrSize/2, qrY + qrSize + 25, { align: 'center' })
  }


  const dataUrl = doc.output('datauristring')
  const blob = doc.output('blob')
  return { blob, dataUrl }
}


