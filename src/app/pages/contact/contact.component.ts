import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactInfo = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'info@arguswebdesigns.com',
      description: 'Send us an email anytime and we\'ll get back to you within 24 hours.'
    },
    {
      icon: '💬',
      title: 'Let\'s Chat',
      details: 'Schedule a Call',
      description: 'Book a free consultation to discuss your project and goals.'
    },
    {
      icon: '⚡',
      title: 'Quick Response',
      details: 'Same Day Reply',
      description: 'We pride ourselves on quick, professional communication.'
    }
  ];

  services = [
    'Website Design & Development',
    'E-commerce Solutions',
    'SEO Optimization',
    'Website Maintenance',
    'Branding & Design',
    'Digital Marketing'
  ];

  // Form properties
  contactForm = {
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  };

  budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  timelineOptions = [
    'ASAP (Rush Job)',
    '1-2 months',
    '3-4 months',
    '6+ months',
    'No rush, when ready'
  ];

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // TODO: Implement form submission logic
    alert('Thank you for your message! We\'ll get back to you soon.');
  }
}