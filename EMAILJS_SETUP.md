# EmailJS Setup Guide

This guide will help you configure EmailJS to enable the contact form email functionality.

## Step 1: Sign Up for EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month on free tier)
3. Verify your email address

## Step 2: Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note your **Service ID** (e.g., `service_xxxxx`) //service_nqbz5pn

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}}

From: {{from_name}} <{{from_email}}>
Reply-To: {{reply_to}}

Message:
{{message}}
```

4. Set the **To Email** field to your email address
5. Note your **Template ID** (e.g., `template_xxxxx`) //template_jsn17p9

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`) //-oAI_7Q5BWB1Lemcj

## Step 5: Configure the Application

Open `src/app/services/email.service.ts` and replace the placeholder values:

```typescript
private readonly EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your public key
private readonly EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your service ID
private readonly EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your template ID
```

**Example:**
```typescript
private readonly EMAILJS_PUBLIC_KEY = 'abc123xyz789';
private readonly EMAILJS_SERVICE_ID = 'service_gmail123';
private readonly EMAILJS_TEMPLATE_ID = 'template_contact456';
```

## Step 6: Test the Form

1. Start your development server: `npm start`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email inbox for the test message

## Security Note

⚠️ **Important**: The Public Key is safe to expose in client-side code. However, for production, consider:
- Using environment variables
- Setting up rate limiting in EmailJS dashboard
- Enabling reCAPTCHA for additional spam protection

## Alternative: Use Environment Variables

For better security, you can use environment variables:

1. Create `src/environments/environment.ts`:
```typescript
export const environment = {
  emailjs: {
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID'
  }
};
```

2. Update `email.service.ts` to import from environment:
```typescript
import { environment } from '../../environments/environment';

private readonly EMAILJS_PUBLIC_KEY = environment.emailjs.publicKey;
private readonly EMAILJS_SERVICE_ID = environment.emailjs.serviceId;
private readonly EMAILJS_TEMPLATE_ID = environment.emailjs.templateId;
```

## Troubleshooting

- **"Email service is not configured"**: Make sure you've replaced all three placeholder values
- **"Failed to Send"**: Check your EmailJS dashboard for error logs
- **No emails received**: Verify your email service is properly connected and template is correct
- **Rate limit errors**: You've exceeded the free tier limit (200/month). Consider upgrading or wait for reset

## Fallback Option

If EmailJS is not configured, users can still use the "Use Email Client" button which opens their default email client with a pre-filled message.

