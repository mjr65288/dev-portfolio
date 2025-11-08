import { Component, inject, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { EmailService } from '../../services/email.service';

import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ReactiveFormsModule, InputText, Textarea, Toast],
  templateUrl: './contact.page.html'
})
export class ContactPage {
  private fb = inject(FormBuilder);
  private messages = inject(MessageService);
  private emailService = inject(EmailService);

  // Load portfolio data
  private data$ = inject(ContentService).load();

  // Convert to signal for convenient access (optional, but tidy)
  readonly dataSig = toSignal(this.data$, { requireSync: false });
  readonly recipientEmail = signal<string | undefined>(undefined);

  // Keep a lightweight submit gate
  readonly isSubmitting = signal(false);

  // Contact form
  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    website: [''] // honeypot—should remain empty
  });

  constructor() {
    // Derive recipient email once data loads
    effect(() => {
      const data = this.dataSig();
      this.recipientEmail.set(data?.contact?.email);
    });
  }

  getMessageLength(): number {
    return this.form.controls.message.value?.length || 0;
  }

  copyEmail(email: string | undefined) {
    if (!email) return;
    navigator.clipboard.writeText(email).then(() => {
      this.messages.add({
        severity: 'success',
        summary: 'Copied!',
        detail: 'Email address copied to clipboard.',
        life: 3000
      });
    }).catch(() => {
      this.messages.add({
        severity: 'error',
        summary: 'Copy Failed',
        detail: 'Could not copy to clipboard. Please try again.',
        life: 3000
      });
    });
  }

  async onSubmit(recipientEmail: string | undefined) {
    if (this.isSubmitting()) return;                // prevent double-clicks
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messages.add({ severity: 'warn', summary: 'Form Invalid', detail: 'Please fill in all required fields correctly.' });
      return;
    }
    if (this.form.value.website?.trim()) return;    // honeypot
    if (!recipientEmail) {
      this.messages.add({ severity: 'error', summary: 'Config error', detail: 'Recipient email is not configured.' });
      return;
    }

    this.isSubmitting.set(true);
    try {
      const v = this.form.value;
      const ok = await this.emailService.sendEmail({
        from_name: v.name ?? '',
        from_email: v.email ?? '',
        subject: v.subject?.trim() || `Portfolio contact from ${v.name}`,
        message: v.message ?? '',
        to_email: recipientEmail
      });

      if (ok) {
        this.form.reset();
        this.messages.add({
          severity: 'success',
          summary: 'Message Sent!',
          detail: 'Thank you for reaching out. I\'ll get back to you soon.',
          life: 5000
        });
      } else {
        this.messages.add({
          severity: 'error',
          summary: 'Failed to Send',
          detail: 'Unable to send your message. Please try again or use the email client option.',
          life: 5000
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
      this.messages.add({ severity: 'error', summary: 'Error', detail: 'An unexpected error occurred. Please try again.' });
    } finally {
      this.isSubmitting.set(false);
    }
  }

  // Fallback: open email client
  submitViaMailto(email: string | undefined) {
    if (!email || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.value.website?.trim()) return; // honeypot

    const name = this.form.value.name ?? '';
    const from = this.form.value.email ?? '';
    const subject = this.form.value.subject?.trim() || `Portfolio contact from ${name}`;
    const message = this.form.value.message ?? '';

    const body = `Name: ${name}\nEmail: ${from}\n\nMessage:\n${message}`;
    const href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }
}
