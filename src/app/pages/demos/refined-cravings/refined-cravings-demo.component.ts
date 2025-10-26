import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-refined-cravings-demo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './refined-cravings-demo.component.html',
  styleUrls: ['./refined-cravings-demo.component.css']
})
export class RefinedCravingsDemoComponent {
  isLoading = true;
  demoUrl: SafeResourceUrl;

  demoFeatures = [
    'Mobile-responsive design',
    'Online ordering system',
    'Menu browsing with categories',
    'Customer reviews integration',
    'Location and contact info',
    'Social media integration'
  ];

  businessImpact = [
    { metric: 'Online Orders', value: '↑ 180%' },
    { metric: 'Mobile Traffic', value: '↑ 220%' },
    { metric: 'Customer Engagement', value: '↑ 150%' },
    { metric: 'Average Order Value', value: '↑ 95%' }
  ];

  constructor(private sanitizer: DomSanitizer) {
    // In a real implementation, this would be the actual restaurant's website
    // For demo purposes, we'll use a placeholder
    this.demoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://example.com');
  }

  onFrameLoad() {
    this.isLoading = false;
  }
}