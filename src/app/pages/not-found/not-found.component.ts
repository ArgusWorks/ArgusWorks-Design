import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <div class="not-found-actions">
          <a routerLink="/" class="btn btn-primary">Go Home</a>
          <a routerLink="/case-studies/refined-cravings" class="btn btn-secondary">View Case Studies</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
    }
    
    .not-found-content h1 {
      font-size: 3rem;
      color: #374151;
      margin-bottom: 1rem;
    }
    
    .not-found-content p {
      font-size: 1.2rem;
      color: #6b7280;
      margin-bottom: 2rem;
    }
    
    .not-found-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background: #3b82f6;
      color: white;
    }
    
    .btn-primary:hover {
      background: #2563eb;
      transform: translateY(-2px);
    }
    
    .btn-secondary {
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;
    }
    
    .btn-secondary:hover {
      background: #f9fafb;
      transform: translateY(-2px);
    }
  `]
})
export class NotFoundComponent {}