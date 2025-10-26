import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationService } from '../../../services/scroll-animation.service';

@Component({
  selector: 'app-refined-cravings-case-study',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './refined-cravings-case-study.component.html',
  styleUrls: ['./refined-cravings-case-study.component.css']
})
export class RefinedCravingsCaseStudyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animateElement', { read: ElementRef }) animateElements!: QueryList<ElementRef>;

  constructor(private scrollAnimation: ScrollAnimationService) {}
  businessResults = {
    bookingIncrease: '250%',
    orderIncrease: '180%',
    revenue: '$75k',
    customerRetention: '85%'
  };

  challenges = [
    'Limited online presence in competitive local market',
    'Inconsistent branding across social media platforms',
    'No online ordering system during COVID-19 restrictions',
    'Difficulty reaching younger demographics (25-40 age group)'
  ];

  solutions = [
    'Custom responsive website with integrated online ordering',
    'Comprehensive social media strategy with consistent branding',
    'Local SEO optimization for "near me" searches',
    'Targeted social media advertising campaigns'
  ];

  processSteps = [
    {
      phase: 'Discovery & Strategy',
      duration: '2 weeks',
      activities: ['Market research', 'Competitor analysis', 'Brand audit']
    },
    {
      phase: 'Design & Development',
      duration: '6 weeks',
      activities: ['Website design', 'Online ordering system', 'Social media templates']
    },
    {
      phase: 'Launch & Optimization',
      duration: '4 weeks',
      activities: ['Soft launch', 'User testing', 'Performance optimization']
    },
    {
      phase: 'Marketing & Growth',
      duration: 'Ongoing',
      activities: ['Social media campaigns', 'SEO optimization', 'Analytics monitoring']
    }
  ];

  technologies = [
    'Angular 17 for responsive web application',
    'Node.js backend for order processing',
    'Stripe payment integration',
    'Google Maps API for location services',
    'Social media management tools',
    'Google Analytics & Search Console'
  ];

  testimonials = [
    {
      quote: "ArgusWorks transformed our digital presence. We went from struggling during COVID to thriving with online orders.",
      author: "Maria Rodriguez",
      title: "Owner, Refined Cravings"
    },
    {
      quote: "The website is beautiful and our customers love the easy online ordering. Sales have never been better!",
      author: "Carlos Rodriguez",
      title: "Head Chef, Refined Cravings"
    }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    // Add scroll animations to elements - like Neuronux does
    this.animateElements.forEach((element, index) => {
      const delay = index * 100; // Stagger animations
      setTimeout(() => {
        this.scrollAnimation.observeElement(element, ScrollAnimationService.ANIMATIONS.FADE_IN);
      }, delay);
    });
  }

  ngOnDestroy(): void {
    // Cleanup animations
    this.scrollAnimation.destroy();
  }
}