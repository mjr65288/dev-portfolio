import { Component, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
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
  imports: [AsyncPipe, ReactiveFormsModule, InputText, Textarea, Toast],
  templateUrl: './contact.page.html'
})
export class ContactPage {
  private fb = inject(FormBuilder);
  private messages = inject(MessageService);
  private emailService = inject(EmailService);
  private destroyRef = inject(DestroyRef);
  readonly data$ = inject(ContentService).load();

  // Contact form
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    website: [''] // honeypot—should remain empty
  });

  isSubmitting = signal(false);
  recipientEmail = signal<string | undefined>(undefined);

  constructor() {
    // Subscribe to data$ to get the email with automatic cleanup
    this.data$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(data => {
      this.recipientEmail.set(data.contact?.email);
    });
  }

  copyEmail(email: string | undefined) {
    if (!email) return;
    navigator.clipboard.writeText(email).then(() => {
      this.messages.add({ severity: 'success', summary: 'Copied', detail: 'Email address copied to clipboard.' });
    });
  }

  async onSubmit(recipientEmail: string | undefined) {
    // Validate form
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messages.add({
        severity: 'warn',
        summary: 'Form Invalid',
        detail: 'Please fill in all required fields correctly.'
      });
      return;
    }

    // Honeypot check: if filled, silently abort (bot detected)
    if (this.form.value.website?.trim()) {
      return;
    }

    // Check if recipient email is available
    if (!recipientEmail) {
      this.messages.add({
        severity: 'error',
        summary: 'Configuration Error',
        detail: 'Recipient email is not configured.'
      });
      return;
    }

    this.isSubmitting.set(true);

    try {
      const formValue = this.form.value;
      const success = await this.emailService.sendEmail({
        from_name: formValue.name ?? '',
        from_email: formValue.email ?? '',
        subject: formValue.subject?.trim() || `Portfolio contact from ${formValue.name}`,
        message: formValue.message ?? '',
        to_email: recipientEmail
      });

      if (success) {
        // Reset form on success
        this.form.reset();
        this.form.markAsUntouched();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.messages.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      this.isSubmitting.set(false);
    }
  }

  // Fallback method using mailto (if EmailJS is not configured)
  submitViaMailto(email: string | undefined) {
    if (!email || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Honeypot: if filled, silently abort
    if (this.form.value.website?.trim()) return;

    const name = this.form.value.name ?? '';
    const from = this.form.value.email ?? '';
    const subject = this.form.value.subject?.trim() || `Portfolio contact from ${name}`;
    const message = this.form.value.message ?? '';

    const body =
      `Name: ${name}\nEmail: ${from}\n\n` +
      `Message:\n${message}`;

    const href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }
}
