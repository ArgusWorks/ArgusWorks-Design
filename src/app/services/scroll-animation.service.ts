import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observer: IntersectionObserver;
  private elements: Map<Element, string[]> = new Map();

  constructor() {
    // Create intersection observer for scroll-triggered animations
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animations = this.elements.get(element) || [];
            
            // Add visible class to trigger animations
            element.classList.add('animate-visible');
            
            // Add any additional animation classes
            animations.forEach(animation => {
              element.classList.add(animation);
            });
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
      }
    );
  }

  /**
   * Add scroll-triggered animation to an element
   * Similar to Neuronux's approach
   */
  observeElement(
    elementRef: ElementRef, 
    animationClasses: string[] = ['animate-fade-in']
  ): void {
    const element = elementRef.nativeElement;
    
    // Store animation classes for this element
    this.elements.set(element, animationClasses);
    
    // Add initial animation class
    animationClasses.forEach(className => {
      element.classList.add(className);
    });
    
    // Start observing
    this.observer.observe(element);
  }

  /**
   * Stop observing an element
   */
  unobserveElement(elementRef: ElementRef): void {
    const element = elementRef.nativeElement;
    this.elements.delete(element);
    this.observer.unobserve(element);
  }

  /**
   * Cleanup - call in ngOnDestroy
   */
  destroy(): void {
    this.observer.disconnect();
    this.elements.clear();
  }

  /**
   * Preset animation configurations like Neuronux uses
   */
  static readonly ANIMATIONS = {
    FADE_IN: ['animate-fade-in'],
    SLIDE_UP: ['animate-slide-up'],
    SCALE_IN: ['animate-scale-in'],
    STAGGER_FADE: ['animate-fade-in'] // Can add delay classes in CSS
  };
}