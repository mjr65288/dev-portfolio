import { Injectable, inject } from '@angular/core';
import emailjs from '@emailjs/browser';
import { MessageService } from 'primeng/api';

export interface EmailParams {
  from_name: string;
  from_email: string;
  subject?: string;
  message: string;
  to_email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private messages = inject(MessageService);

  /**
   * Initialize EmailJS with your public key
   * Get your keys from https://www.emailjs.com/
   *
   * To set up:
   * 1. Sign up at https://www.emailjs.com/
   * 2. Create an email service (Gmail, Outlook, etc.)
   * 3. Create an email template
   * 4. Get your Public Key, Service ID, and Template ID
   * 5. Replace the values below or use environment variables
   */
  private readonly EMAILJS_PUBLIC_KEY = '-oAI_7Q5BWB1Lemcj'; // Replace with your EmailJS public key
  private readonly EMAILJS_SERVICE_ID = 'service_nqbz5pn'; // Replace with your EmailJS service ID
  private readonly EMAILJS_TEMPLATE_ID = 'template_jsn17p9'; // Replace with your EmailJS template ID

  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(this.EMAILJS_PUBLIC_KEY);
  }

  /**
   * Send an email using EmailJS
   * @param params Email parameters
   * @returns Promise that resolves when email is sent
   */
  async sendEmail(params: EmailParams): Promise<boolean> {

    try {
      const templateParams = {
        from_name: params.from_name,
        from_email: params.from_email,
        subject: params.subject || 'Portfolio Contact Form',
        message: params.message,
        to_email: params.to_email || '',
        reply_to: params.from_email
      };

      await emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        templateParams
      );

      this.messages.add({
        severity: 'success',
        summary: 'Message Sent!',
        detail: 'Thank you for your message. I\'ll get back to you soon.'
      });

      return true;
    } catch (error) {
      console.error('EmailJS error:', error);
      this.messages.add({
        severity: 'error',
        summary: 'Failed to Send',
        detail: 'There was an error sending your message. Please try again or use the email link above.'
      });
      return false;
    }
  }
}

