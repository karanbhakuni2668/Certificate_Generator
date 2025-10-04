# EmailJS Setup Guide for EventEye

## 📧 EmailJS Configuration Steps

### 1. EmailJS Dashboard Setup
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Create a new account or login
3. Create a new service with your email provider (Gmail, Outlook, etc.)

### 2. Get Your Credentials
After creating the service, you'll get:
- **Service ID**: `service_286khok` ✅ Already configured
- **Public Key**: Get this from EmailJS dashboard → Account → API Keys
- **Template ID**: `template_hhgghm5` ✅ Already configured

### 3. Update Configuration
Edit `src/services/emailService.js` and replace:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_286khok', // ✅ Already set
  PUBLIC_KEY: 'doMN_BfgWmupzx0Zo', // ❌ Replace with your actual public key
  TEMPLATE_ID: 'template_hhgghm5', // ✅ Already set
}
```

**You only need to set the PUBLIC_KEY now!**

### 4. Email Template Variables
Your EmailJS template should include these variables:

```html
<!-- Email Template Variables -->
To: {{to_email}}
Subject: {{subject}}

Dear {{to_name}},

Congratulations! You have successfully participated in {{event_name}} 
held on {{event_date}} organized by {{organizer_name}}.

Your certificate is attached below:
{{certificate_url}}

Best regards,
{{from_name}}
EventEye Team
```

### 5. Template Variables Available
- `to_name` - Participant's name
- `to_email` - Participant's email
- `event_name` - Event title
- `event_date` - Event date
- `organizer_name` - Organizer name
- `certificate_url` - Generated certificate URL
- `participant_name` - Participant's name (same as to_name)
- `event_id` - Event ID
- `from_name` - Sender name (EventEye Team)
- `reply_to` - Reply email address
- `subject` - Email subject

### 6. Testing
1. Update the configuration with your actual keys
2. Go to Dashboard → Participants tab
3. Click the email icon next to any participant
4. Check if email is sent successfully

### 7. Troubleshooting
- Make sure your EmailJS service is active
- Check if your email provider allows sending emails
- Verify template ID and public key are correct
- Check browser console for any errors

## 🔧 Current Implementation Features

### ✅ What's Working
- EmailJS integration with service ID `service_286khok`
- Automatic certificate generation before sending email
- Loading states and user feedback
- Error handling and success notifications
- Delivery status tracking in Firebase

### 🚀 How It Works
1. User clicks email icon in ParticipantTable
2. System generates certificate using certService
3. Email is sent via EmailJS with certificate data
4. Delivery status is updated in Firebase
5. User gets success/error notification

### 📝 Next Steps
1. Get your EmailJS Public Key and Template ID
2. Update `src/services/emailService.js` with actual values
3. Test email functionality
4. Customize email template as needed

## 🎯 Usage Example

```javascript
// The email sending is now automatic when you click the email icon
// No additional code needed - just update the configuration!
```

## 📞 Support
If you face any issues:
1. Check EmailJS dashboard for service status
2. Verify all credentials are correct
3. Check browser console for errors
4. Test with a simple email first
