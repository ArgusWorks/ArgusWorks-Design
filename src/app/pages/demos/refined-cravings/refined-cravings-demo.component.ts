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
    '✨ Artisan charcuterie board showcase',
    '📱 Fully responsive mobile design',
    '🎨 Custom brand styling and animations',
    '🧀 Interactive menu with pricing',
    '👥 Customer testimonials section',
    '📞 Contact information and hours'
  ];

  businessImpact = [
    { metric: 'Catering Inquiries', value: '↑ 240%' },
    { metric: 'Mobile Bookings', value: '↑ 185%' },
    { metric: 'Brand Recognition', value: '↑ 160%' },
    { metric: 'Average Order Size', value: '↑ 125%' }
  ];

  constructor(private sanitizer: DomSanitizer) {
    // Point to our actual demo file
    this.demoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/demos/refined-cravings.html');
  }

  onFrameLoad() {
    this.isLoading = false;
  }
}