import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  customerStories = [
    {
      category: 'Food & Catering',
      title: 'A premium charcuterie catering business designed to elevate special occasions',
      logo: '🧀',
      name: 'Refined Cravings',
      description: 'Refined Cravings needed a sophisticated online presence that matched their premium charcuterie offerings. We created an elegant website featuring stunning product galleries, streamlined catering inquiries, and a booking system that converted browsers into customers. The result? A 250% increase in catering bookings within the first three months.',
      readMoreLink: '/client-proposals/refined-cravings/proposal.md',
      gradient: 'linear-gradient(135deg, #8b4513, #d2b48c)',
      previewIcon: '🧀🍯',
      demoLink: '/client-proposals/refined-cravings/index.html',
      linkText: 'View Live Site'
    },
    {
      category: 'Restaurant & Events',
      title: 'A coffee shop and micro event space designed to build community connections',
      logo: '☕',
      name: 'Cafe Cultivate',
      description: 'Cafe Cultivate wanted to launch as more than just a coffee shop - they envisioned a community hub for micro events and gatherings. We built them a dynamic website with integrated event booking, Instagram feed integration, and grand opening promotional features. Their launch exceeded expectations with fully booked events for their first month.',
      readMoreLink: '/client-proposals/cafe-cultivate/MICRO_EVENTS_INSTAGRAM_FEATURES.md',
      gradient: 'linear-gradient(135deg, #2F5233, #D4A574)',
      previewIcon: '☕🥐',
      demoLink: '/client-proposals/cafe-cultivate/index.html',
      linkText: 'View Live Site'
    },
    {
      category: 'Restaurant Template',
      title: 'An elegant Italian restaurant template designed for authentic dining experiences',
      logo: '🍝',
      name: 'Bella Vista Restaurant',
      description: 'Our restaurant template showcases the perfect blend of traditional Italian charm and modern web design. Featuring interactive menus, reservation systems, and customer testimonial integration, this template helps restaurant owners create an immersive online experience that drives foot traffic and builds customer loyalty before guests even walk through the door.',
      readMoreLink: '/templates/local-business/README.md',
      gradient: 'linear-gradient(135deg, #8b0000, #cc3333)',
      previewIcon: '🍝🍷',
      demoLink: '/demos/bella-vista-restaurant/index.html',
      linkText: 'View Demo'
    }
  ];

  testimonials = [
    {
      text: 'Argus Web Designs transformed our online presence completely. Our website not only looks amazing but has increased our customer inquiries by 300%. Professional, responsive, and delivered on time.',
      author: 'Sarah Johnson',
      title: 'Owner, Local Boutique'
    },
    {
      text: 'Working with Argus Web Designs was a game-changer for our restaurant. The online ordering system and beautiful design have significantly boosted our revenue. Highly recommend!',
      author: 'Mike Rodriguez',
      title: 'Owner, Bella Vista Restaurant'
    },
    {
      text: 'From concept to launch, the team at Argus Web Designs exceeded our expectations. They understood our vision and created a website that perfectly represents our brand. Outstanding service!',
      author: 'Jennifer Chen',
      title: 'Founder, Tech Startup'
    }
  ];

  testimonialStyle = {
    'background': 'white', 
    'padding': '2rem', 
    'borderRadius': '1rem', 
    'boxShadow': '0 4px 20px rgba(0,0,0,0.1)', 
    'textAlign': 'center' 
  };

  testimonialTextStyle = { 
    'color': 'var(--text-primary)', 
    'fontStyle': 'italic', 
    'marginBottom': '1.5rem', 
    'lineHeight': '1.6' 
  };

  openDemo(event: Event, url: string): void {
    event.preventDefault();
    window.open(url, '_blank');
  }
}