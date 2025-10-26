import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services = [
    {
      icon: '🎨',
      title: 'Website Design & Development',
      description: 'Custom, responsive websites that captivate your audience and drive conversions.',
      features: [
        'Responsive Design',
        'Mobile-First Approach',
        'Performance Optimization',
        'SEO-Friendly Structure',
        'Cross-Browser Compatibility'
      ],
      process: [
        'Discovery & Strategy',
        'Design Mockups',
        'Development & Testing',
        'Launch & Training'
      ]
    },
    {
      icon: '🛒',
      title: 'E-commerce Solutions',
      description: 'Complete online stores that turn visitors into customers and drive sales growth.',
      features: [
        'Shopping Cart Integration',
        'Payment Processing',
        'Inventory Management',
        'Order Tracking',
        'Customer Accounts'
      ],
      process: [
        'Store Planning',
        'Product Catalog Setup',
        'Payment Integration',
        'Testing & Launch'
      ]
    },
    {
      icon: '🔍',
      title: 'SEO & Digital Marketing',
      description: 'Strategic optimization to improve your search rankings and online visibility.',
      features: [
        'Keyword Research',
        'On-Page SEO',
        'Technical SEO',
        'Content Strategy',
        'Analytics & Reporting'
      ],
      process: [
        'SEO Audit',
        'Strategy Development',
        'Implementation',
        'Monitoring & Optimization'
      ]
    },
    {
      icon: '🔧',
      title: 'Website Maintenance',
      description: 'Ongoing support to keep your website secure, updated, and performing at its best.',
      features: [
        'Regular Updates',
        'Security Monitoring',
        'Performance Optimization',
        'Content Updates',
        '24/7 Support'
      ],
      process: [
        'Health Check',
        'Maintenance Plan',
        'Regular Updates',
        'Performance Reports'
      ]
    },
    {
      icon: '💼',
      title: 'Branding & Identity',
      description: 'Cohesive brand identity that makes your business memorable and trustworthy.',
      features: [
        'Logo Design',
        'Brand Guidelines',
        'Color Schemes',
        'Typography',
        'Brand Assets'
      ],
      process: [
        'Brand Discovery',
        'Concept Development',
        'Design Refinement',
        'Brand Guide Delivery'
      ]
    },
    {
      icon: '📈',
      title: 'Digital Strategy',
      description: 'Comprehensive digital strategies that align with your business goals and drive growth.',
      features: [
        'Market Analysis',
        'Competitor Research',
        'User Journey Mapping',
        'Conversion Optimization',
        'Growth Planning'
      ],
      process: [
        'Business Analysis',
        'Strategy Design',
        'Implementation Plan',
        'Success Metrics'
      ]
    }
  ];

  process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We start by understanding your business, goals, and target audience through in-depth consultation and research.'
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Based on our findings, we develop a comprehensive strategy that aligns with your objectives and market needs.'
    },
    {
      step: '03',
      title: 'Design',
      description: 'Our team creates compelling designs that reflect your brand and engage your target audience effectively.'
    },
    {
      step: '04',
      title: 'Development',
      description: 'We build your solution using modern technologies and best practices for optimal performance and scalability.'
    },
    {
      step: '05',
      title: 'Launch',
      description: 'After thorough testing, we launch your project and provide training to ensure you can manage it confidently.'
    },
    {
      step: '06',
      title: 'Support',
      description: 'We offer ongoing support and maintenance to keep your digital presence running smoothly and up-to-date.'
    }
  ];

  faqs = [
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary based on scope and complexity. A basic website typically takes 4-6 weeks, while more complex e-commerce or custom solutions may take 8-12 weeks. We provide detailed timelines during our initial consultation.'
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes! We offer comprehensive maintenance packages including regular updates, security monitoring, performance optimization, and technical support. We also provide training so you can manage basic updates yourself.'
    },
    {
      question: 'Can you work with my existing brand?',
      answer: 'Absolutely! We can work within your existing brand guidelines or help evolve your brand identity. We believe in enhancing what works while improving areas that need attention.'
    },
    {
      question: 'What platforms do you work with?',
      answer: 'We work with a variety of platforms including WordPress, Shopify, React, Angular, and custom solutions. We choose the best technology stack based on your specific needs and goals.'
    },
    {
      question: 'How do you handle project communication?',
      answer: 'We believe in transparent, regular communication. You\'ll have a dedicated project manager who will provide regular updates, schedule check-ins, and be available for questions throughout the project.'
    },
    {
      question: 'What is included in your SEO services?',
      answer: 'Our SEO services include keyword research, on-page optimization, technical SEO improvements, content strategy, link building, and monthly performance reports. We focus on sustainable, white-hat techniques that deliver long-term results.'
    }
  ];
}