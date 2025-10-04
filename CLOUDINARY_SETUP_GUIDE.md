# Cloudinary Setup Guide for EventEye

## ☁️ Cloudinary Configuration Steps

### 1. Cloudinary Account Setup
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Create a new account or login
3. Go to Dashboard → Settings → API Keys

### 2. Get Your Credentials
From Cloudinary dashboard, you'll get:
- **Cloud Name**: `dm23icoaz` ✅ Already configured
- **Upload Preset**: `ml_default` ✅ Already configured

### 3. Environment Variables
Your configuration is already set up with environment variables:

```bash
VITE_CLOUDINARY_CLOUD_NAME=dm23icoaz
VITE_CLOUDINARY_UPLOAD_PRESET=ml_default
```

### 4. Configuration Status
✅ **Cloudinary is fully configured and ready to use!**
- Cloud Name: `dm23icoaz`
- Upload Preset: `ml_default`
- Method: Unsigned uploads (no API key/secret required)

## 🚀 How Certificate Storage Works

### Storage Flow:
1. **Certificate Generation** - PDF certificate is created using jsPDF
2. **Firebase Upload** - Certificate is uploaded to Firebase Storage
3. **Cloudinary Upload** - Certificate is also uploaded to Cloudinary
4. **Metadata Storage** - Certificate metadata is saved to Firestore
5. **Email Integration** - Email service uses stored URLs

### Storage Structure:

#### Firebase Storage:
```
/certificates/
  /{eventId}/
    /{participantId}_{timestamp}.pdf
```

#### Cloudinary:
```
eventeye-certificates/
  /{eventId}/
    /{participantId}_{timestamp}
```

#### Firestore Collections:
```
/certificates/{certificateId} - Main certificate metadata
/events/{eventId}/certificates/{certificateId} - Event-specific certificates
```

## 📋 Certificate Metadata Structure

```javascript
{
  id: "cert_participantId_eventId_timestamp",
  participantId: "participant_id",
  eventId: "event_id",
  participantName: "John Doe",
  participantEmail: "john@example.com",
  eventTitle: "EventEye Hackathon 2024",
  eventDate: "January 15, 2024",
  templateId: 1,
  templateName: "Classic Professional",
  organizer: "EventEye Team",
  
  // Storage URLs
  firebaseUrl: "https://firebasestorage.googleapis.com/...",
  cloudinaryUrl: "https://res.cloudinary.com/...",
  firebasePath: "certificates/eventId/participantId_timestamp.pdf",
  cloudinaryId: "eventeye-certificates/eventId/participantId_timestamp",
  
  // Status and metadata
  status: "active",
  generatedAt: "timestamp",
  createdAt: "timestamp",
  updatedAt: "timestamp",
  
  // Verification data
  verifyUrl: "https://eventeye.example.com/verify?...",
  qrCodeData: "data:image/png;base64,...",
  
  // File information
  fileSize: 12345,
  mimeType: "application/pdf"
}
```

## 🔧 Configuration Check

The system automatically checks if Cloudinary is configured:

```javascript
// This function checks if all required credentials are set
isCloudinaryConfigured()
```

If not configured, certificates will only be stored in Firebase.

## 🎯 Email Template Variables

Your EmailJS template can use these additional variables:

```html
<!-- Certificate URLs -->
{{certificate_url}} - Primary certificate URL (Firebase or Cloudinary)
{{firebase_url}} - Firebase Storage URL
{{cloudinary_url}} - Cloudinary URL
{{certificate_id}} - Unique certificate ID

<!-- Example Email Template -->
Dear {{to_name}},

Congratulations on completing {{event_name}}!

Your certificate is available at:
{{certificate_url}}

Certificate ID: {{certificate_id}}

Best regards,
{{from_name}}
```

## 🛠️ API Functions Available

### Upload Functions:
- `uploadCertificateToFirebase(blob, participantId, eventId)`
- `uploadCertificateToCloudinary(blob, participantId, eventId)`
- `uploadCertificateToBoth(blob, participantId, eventId)`

### Metadata Functions:
- `saveCertificateMetadata(participantId, eventId, certificateData)`
- `getCertificateById(certificateId)`
- `getCertificatesByEvent(eventId)`

### Utility Functions:
- `deleteCertificate(certificateId, firebasePath, cloudinaryId)`
- `updateCloudinaryConfig(cloudName, apiKey, apiSecret)`

## 🔍 Testing Storage Integration

1. Generate a certificate from the UI
2. Check browser console for storage logs
3. Verify files in Firebase Storage
4. Verify files in Cloudinary dashboard
5. Check Firestore for metadata

## 📊 Benefits of Dual Storage

### Firebase Storage:
- ✅ Integrated with your existing Firebase setup
- ✅ Real-time database integration
- ✅ Authentication integration
- ✅ Free tier available

### Cloudinary:
- ✅ Advanced image/video processing
- ✅ CDN distribution
- ✅ Automatic optimization
- ✅ Transformations and effects

### Combined Benefits:
- 🔄 **Redundancy** - Multiple copies for reliability
- 🌍 **CDN** - Faster global access via Cloudinary
- 🔐 **Security** - Firebase access controls
- 📱 **Optimization** - Cloudinary's automatic optimization

## 🚨 Troubleshooting

### Common Issues:

1. **Cloudinary Upload Fails**
   - Check API credentials
   - Verify cloud name is correct
   - Check API key permissions

2. **Firebase Upload Fails**
   - Check Firebase configuration
   - Verify storage rules
   - Check authentication

3. **Metadata Not Saving**
   - Check Firestore rules
   - Verify database permissions
   - Check console for errors

### Debug Information:
All storage operations log detailed information to the console. Check browser developer tools for:
- Upload progress
- Error messages
- Storage URLs
- Metadata structure

## 📞 Support

If you face any issues:
1. Check Cloudinary dashboard for account status
2. Verify all credentials are correct
3. Check browser console for errors
4. Test with a simple upload first
5. Check Firebase console for storage and Firestore data
