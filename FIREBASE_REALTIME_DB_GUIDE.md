# Firebase Realtime Database Setup Guide for EventEye

## 🔥 Firebase Realtime Database Configuration

### Database URL
Your Firebase Realtime Database is configured at:
```
https://eventeyeproject-default-rtdb.firebaseio.com/EventEye
```

### Database Structure
Certificates are stored in the following structure:

```
EventEye/
├── certificates/
│   └── {certificateId}/
│       ├── id: "cert_participantId_eventId_timestamp"
│       ├── participantId: "participant_id"
│       ├── eventId: "event_id"
│       ├── participantName: "John Doe"
│       ├── participantEmail: "john@example.com"
│       ├── eventTitle: "EventEye Hackathon 2024"
│       ├── eventDate: "January 15, 2024"
│       ├── templateId: 1
│       ├── templateName: "Classic Professional"
│       ├── organizer: "EventEye Team"
│       ├── dataUrl: "data:application/pdf;base64,..."
│       ├── firebaseUrl: "data:application/pdf;base64,..."
│       ├── cloudinaryUrl: "https://res.cloudinary.com/..."
│       ├── firebasePath: "EventEye/certificates/cert_..."
│       ├── cloudinaryId: "eventeye-certificates/..."
│       ├── status: "active"
│       ├── generatedAt: {timestamp}
│       ├── createdAt: {timestamp}
│       ├── updatedAt: {timestamp}
│       ├── verifyUrl: "https://eventeye.example.com/verify?..."
│       ├── qrCodeData: "data:image/png;base64,..."
│       ├── fileSize: 12345
│       └── mimeType: "application/pdf"
│
├── events/
│   └── {eventId}/
│       └── certificates/
│           └── {certificateId}/ (same structure as above)
│
└── participants/
    └── {participantId}/
        └── certificates/
            └── {certificateId}/ (same structure as above)
```

## 🚀 How Certificate Storage Works

### Storage Flow:
1. **Certificate Generation** - PDF certificate is created using jsPDF
2. **Firebase Realtime Database** - Certificate data URL is stored in Realtime Database
3. **Cloudinary Upload** - Certificate blob is also uploaded to Cloudinary (optional)
4. **Metadata Storage** - Complete certificate metadata is saved to Realtime Database
5. **Email Integration** - Email service uses stored URLs from Realtime Database

### Database Operations:

#### Store Certificate:
```javascript
// Store in main certificates collection
EventEye/certificates/{certificateId}

// Store in event-specific collection
EventEye/events/{eventId}/certificates/{certificateId}

// Store in participant-specific collection
EventEye/participants/{participantId}/certificates/{certificateId}
```

#### Retrieve Certificate:
```javascript
// Get by certificate ID
EventEye/certificates/{certificateId}

// Get by event
EventEye/events/{eventId}/certificates

// Get by participant
EventEye/participants/{participantId}/certificates
```

## 📋 Certificate Data Structure

### Main Certificate Record:
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
  
  // Certificate Data
  dataUrl: "data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA3MiBUZgoxMDAgNzAwIFRkCihIZWxsbyBXb3JsZCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYKMDAwMDAwMDAwOSAwMDAwMCBuCjAwMDAwMDAwNTggMDAwMDAgbgowMDAwMDAwMTE1IDAwMDAwIG4KMDAwMDAwMDI2OCAwMDAwMCBuCjAwMDAwMDAzNDcgMDAwMDAgbgp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQzNQolJUVPRgo=",
  
  // Storage URLs
  firebaseUrl: "data:application/pdf;base64,...",
  cloudinaryUrl: "https://res.cloudinary.com/...",
  firebasePath: "EventEye/certificates/cert_...",
  cloudinaryId: "eventeye-certificates/...",
  
  // Status and metadata
  status: "active",
  generatedAt: {".sv": "timestamp"},
  createdAt: {".sv": "timestamp"},
  updatedAt: {".sv": "timestamp"},
  
  // Verification data
  verifyUrl: "https://eventeye.example.com/verify?event=...&p=...",
  qrCodeData: "data:image/png;base64,...",
  
  // File information
  fileSize: 12345,
  mimeType: "application/pdf"
}
```

## 🔧 API Functions Available

### Storage Functions:
- `storeCertificateInFirebase(certificateData, participantId, eventId)`
- `uploadCertificateToCloudinary(certificateBlob, participantId, eventId)`
- `storeCertificateInBoth(certificateData, participantId, eventId)`

### Metadata Functions:
- `saveCertificateMetadata(participantId, eventId, certificateData)`
- `getCertificateById(certificateId)`
- `getCertificatesByEvent(eventId)`

### Utility Functions:
- `deleteCertificate(certificateId, firebasePath, cloudinaryId)`
- `updateCloudinaryConfig(cloudName, apiKey, apiSecret)`

## 📧 Email Integration

### Email Template Variables:
```html
<!-- Certificate URLs -->
{{certificate_url}} - Primary certificate URL (Firebase data URL or Cloudinary)
{{firebase_url}} - Firebase Realtime Database data URL
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

## 🔍 Testing Storage Integration

### 1. Generate Certificate
- Go to Certificate Preview tab
- Select a participant
- Click "Generate Certificate"
- Check browser console for logs

### 2. Verify Database Storage
- Go to Firebase Console
- Navigate to Realtime Database
- Check `EventEye/certificates/` for new entries
- Verify data structure and content

### 3. Test Email Sending
- Go to Participants tab
- Click email icon next to a participant
- Check if email is sent with certificate URL
- Verify certificate opens from email link

## 📊 Benefits of Realtime Database Storage

### Advantages:
- ✅ **Real-time Updates** - Instant data synchronization
- ✅ **Offline Support** - Works offline with local caching
- ✅ **Simple Structure** - JSON-like data structure
- ✅ **Built-in Security** - Firebase security rules
- ✅ **No Server Required** - Direct client-to-database connection

### Data Storage:
- ✅ **Certificate Data** - PDF as base64 data URL
- ✅ **Metadata** - Complete certificate information
- ✅ **Multi-location** - Stored in multiple collections for easy access
- ✅ **Timestamps** - Server timestamps for all records

## 🛠️ Firebase Console Access

### View Your Database:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `eventeyeproject`
3. Go to Realtime Database
4. Navigate to `EventEye` node

### Database URL:
```
https://eventeyeproject-default-rtdb.firebaseio.com/EventEye
```

## 🚨 Troubleshooting

### Common Issues:

1. **Certificate Not Saving**
   - Check Firebase configuration
   - Verify database rules
   - Check console for errors

2. **Email URL Not Working**
   - Verify data URL is properly stored
   - Check email template variables
   - Test certificate URL in browser

3. **Database Access Issues**
   - Check Firebase project permissions
   - Verify database URL is correct
   - Check authentication status

### Debug Information:
- All database operations log to console
- Check browser developer tools for errors
- Verify data structure in Firebase Console

## 📞 Support

If you face any issues:
1. Check Firebase Console for database status
2. Verify all configuration is correct
3. Check browser console for errors
4. Test with a simple certificate generation first
5. Check Firebase Realtime Database rules and permissions
