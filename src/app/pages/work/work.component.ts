import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent {
  caseStudies = [
    {
      id: 'refined-cravings',
      title: 'Refined Cravings',
      subtitle: 'Premium catering service digital transformation',
      description: 'A complete brand and website redesign that increased online bookings by 300% and established market leadership in premium catering.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: '/assets/images/clients/refined-cravings-logo.png',
      category: 'Food Service',
      services: ['Website Design', 'Branding', 'SEO'],
      results: [
        '300% increase in online bookings',
        '150% boost in organic traffic',
        '45% higher conversion rate'
      ],
      challenge: 'Refined Cravings needed to establish their premium positioning in a competitive catering market while creating an online presence that could effectively showcase their high-end offerings.',
      solution: 'We developed a sophisticated brand identity and website that emphasizes quality, elegance, and professionalism, with streamlined booking functionality and compelling visual storytelling.',
      technologies: ['React', 'Node.js', 'Stripe', 'Google Analytics'],
      timeline: '8 weeks',
      link: '/case-studies/refined-cravings',
      demoLink: '/demos/refined-cravings',
      featured: true
    },
    {
      id: 'cafe-cultivate',
      title: 'Café Cultivate',
      subtitle: 'Local coffee shop community platform',
      description: 'Building a digital community hub that connects coffee lovers and supports local artisans through e-commerce and events.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: '/assets/images/clients/cafe-cultivate-logo.png',
      category: 'Food & Beverage',
      services: ['E-commerce', 'Community Features', 'Event Management'],
      results: [
        '200% increase in online sales',
        '500+ active community members',
        '25 local partnerships formed'
      ],
      challenge: 'Café Cultivate wanted to expand beyond their physical location to build a thriving online community while supporting local coffee roasters and artisans.',
      solution: 'We created an integrated platform combining e-commerce, event management, and community features that strengthens local connections while driving online sales.',
      technologies: ['WordPress', 'WooCommerce', 'Community Plugins', 'Mailchimp'],
      timeline: '10 weeks',
      link: '#',
      demoLink: '#',
      featured: false
    },
    {
      id: 'bella-vista-restaurant',
      title: 'Bella Vista Restaurant',
      subtitle: 'Fine dining reservation and menu showcase',
      description: 'An elegant digital presence for a high-end restaurant featuring online reservations and dynamic menu management.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: '/assets/images/clients/bella-vista-logo.png',
      category: 'Fine Dining',
      services: ['Website Design', 'Reservation System', 'Menu Management'],
      results: [
        '80% reduction in phone reservations',
        '35% increase in table bookings',
        'Streamlined operations'
      ],
      challenge: 'Bella Vista needed a sophisticated online presence that matched their fine dining experience while simplifying reservation management.',
      solution: 'We designed an elegant website with integrated reservation system and dynamic menu management that reflects the restaurant\'s upscale atmosphere.',
      technologies: ['Custom CMS', 'OpenTable API', 'Google Maps', 'Mobile Optimization'],
      timeline: '6 weeks',
      link: '#',
      demoLink: '/demos/bella-vista-restaurant',
      featured: false
    },
    {
      id: 'techstart-portfolio',
      title: 'TechStart Solutions',
      subtitle: 'B2B software company digital transformation',
      description: 'Complete website overhaul for a growing tech company, focusing on lead generation and professional credibility.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: '/assets/images/clients/techstart-logo.png',
      category: 'Technology',
      services: ['Website Redesign', 'Lead Generation', 'Content Strategy'],
      results: [
        '250% increase in qualified leads',
        '60% longer page engagement',
        'Improved brand credibility'
      ],
      challenge: 'TechStart Solutions had an outdated website that wasn\'t effectively communicating their expertise or generating quality leads.',
      solution: 'We created a modern, professional website with clear messaging, compelling case studies, and optimized lead capture forms.',
      technologies: ['React', 'Gatsby', 'HubSpot CRM', 'Advanced Analytics'],
      timeline: '12 weeks',
      link: '#',
      demoLink: '#',
      featured: false
    },
    {
      id: 'wellness-center',
      title: 'Harmony Wellness Center',
      subtitle: 'Holistic health practice online booking platform',
      description: 'A calming, user-friendly website with integrated booking system for a multi-practitioner wellness center.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: '/assets/images/clients/wellness-logo.png',
      category: 'Healthcare',
      services: ['Website Design', 'Booking System', 'Patient Portal'],
      results: [
        '400% increase in online bookings',
        '50% reduction in no-shows',
        'Improved patient satisfaction'
      ],
      challenge: 'The wellness center needed to streamline their booking process while creating a peaceful online experience that reflects their holistic approach.',
      solution: 'We designed a serene, intuitive website with comprehensive booking functionality and patient management features.',
      technologies: ['WordPress', 'Acuity Scheduling', 'Patient Portal', 'HIPAA Compliance'],
      timeline: '8 weeks',
      link: '#',
      demoLink: '#',
      featured: false
    },
    {
      id: 'ecommerce-fashion',
      title: 'StyleForward Boutique',
      subtitle: 'Fashion e-commerce with virtual styling',
      description: 'Modern e-commerce platform with virtual styling consultations and personalized shopping experiences.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: '/assets/images/clients/styleforward-logo.png',
      category: 'Fashion',
      services: ['E-commerce', 'Virtual Consultations', 'Inventory Management'],
      results: [
        '350% increase in online sales',
        '70% customer retention rate',
        'Expanded market reach'
      ],
      challenge: 'StyleForward wanted to bring their personal styling expertise online while creating an engaging e-commerce experience.',
      solution: 'We built a comprehensive platform combining e-commerce with virtual styling services, creating a unique shopping experience.',
      technologies: ['Shopify Plus', 'Zoom API', 'Custom Styling Tools', 'Analytics'],
      timeline: '14 weeks',
      link: '#',
      demoLink: '#',
      featured: false
    }
  ];

  industries = [
    { name: 'Food & Beverage', count: 3, icon: '🍽️' },
    { name: 'Technology', count: 1, icon: '💻' },
    { name: 'Healthcare', count: 1, icon: '⚕️' },
    { name: 'Fashion', count: 1, icon: '👗' },
    { name: 'Professional Services', count: 2, icon: '🏢' },
    { name: 'E-commerce', count: 2, icon: '🛒' }
  ];

  testimonials = [
    {
      quote: "Argus Web Designs transformed our online presence completely. The new website not only looks amazing but has tripled our online bookings. Their attention to detail and understanding of our premium brand was exceptional.",
      author: "Sarah Mitchell",
      title: "Founder, Refined Cravings",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The team at Argus didn't just build us a website – they created a complete digital ecosystem that connects our community and drives real business results. Outstanding work from start to finish.",
      author: "Marcus Rodriguez",
      title: "Owner, Café Cultivate",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Working with Argus was a game-changer for our tech company. They understood our complex requirements and delivered a website that perfectly represents our expertise while generating quality leads.",
      author: "Jennifer Chen",
      title: "CEO, TechStart Solutions",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  getFeaturedCases() {
    return this.caseStudies.filter(cs => cs.featured);
  }

  getOtherCases() {
    return this.caseStudies.filter(cs => !cs.featured);
  }
}