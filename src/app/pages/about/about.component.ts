import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  values = [
    {
      icon: '🎯',
      title: 'Results-Focused',
      description: 'Every design decision is made with your business goals in mind. We measure success by your growth, not just aesthetics.'
    },
    {
      icon: '🤝',
      title: 'Partnership Mindset',
      description: 'We\'re not just vendors – we\'re your digital partners, invested in your long-term success and growth.'
    },
    {
      icon: '⚡',
      title: 'Modern Technology',
      description: 'We use cutting-edge tools and techniques to ensure your website is fast, secure, and future-ready.'
    },
    {
      icon: '💡',
      title: 'Creative Innovation',
      description: 'We bring fresh ideas and creative solutions to make your brand stand out in a crowded digital landscape.'
    }
  ];

  technicalSkills = [
    'HTML5 & CSS3',
    'JavaScript',
    'React & Vue.js',
    'Node.js',
    'WordPress',
    'E-commerce',
    'SEO',
    'Analytics'
  ];

  industries = [
    { icon: '🍽️', name: 'Restaurants & Food Service' },
    { icon: '🏪', name: 'Retail & E-commerce' },
    { icon: '⚕️', name: 'Healthcare & Wellness' },
    { icon: '🏢', name: 'Professional Services' },
    { icon: '🎨', name: 'Creative & Design' },
    { icon: '🏠', name: 'Real Estate' }
  ];
}