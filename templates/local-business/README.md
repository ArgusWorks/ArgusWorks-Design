# Local Business Template Configuration

This template is designed for local businesses like restaurants, salons, contractors, consultants, etc. Simply replace the placeholder variables with client-specific information.

## Quick Setup Instructions

1. **Copy this template** to your client's project folder
2. **Replace all {{PLACEHOLDER}} variables** with client information
3. **Upload client images** to `/assets/images/`
4. **Customize colors** in the CSS variables
5. **Deploy to Netlify** with client's domain

## Required Client Information

### Business Details
- `{{BUSINESS_NAME}}` - Full business name
- `{{BUSINESS_TYPE}}` - Type of business (e.g., "Restaurant", "Hair Salon")  
- `{{LOCATION}}` - City/area (e.g., "Downtown Seattle")
- `{{BUSINESS_DESCRIPTION}}` - Brief description for meta tags

### Contact Information
- `{{PHONE}}` - Formatted phone number: (555) 123-4567
- `{{PHONE_CLEAN}}` - Clean phone number: 5551234567
- `{{EMAIL}}` - Business email address
- `{{STREET_ADDRESS}}` - Street address
- `{{CITY}}` - City
- `{{STATE}}` - State/Province
- `{{ZIP_CODE}}` - Zip/Postal code

### Content Sections

#### Hero Section
- `{{HERO_HEADLINE}}` - Main headline (e.g., "Best Pizza in Downtown Seattle")
- `{{HERO_SUBTEXT}}` - Supporting text (2-3 sentences)

#### About Section  
- `{{ABOUT_PARAGRAPH_1}}` - First paragraph about the business
- `{{ABOUT_PARAGRAPH_2}}` - Second paragraph about the business
- `{{STAT_1_NUMBER}}` - First statistic (e.g., "10+")
- `{{STAT_1_LABEL}}` - First statistic label (e.g., "Years Experience")
- `{{STAT_2_NUMBER}}` - Second statistic (e.g., "500+") 
- `{{STAT_2_LABEL}}` - Second statistic label (e.g., "Happy Customers")

#### Services Section
- `{{SERVICES_INTRO_TEXT}}` - Introduction to services
- `{{SERVICE_1_NAME}}` - First service name
- `{{SERVICE_1_DESCRIPTION}}` - First service description
- `{{SERVICE_1_PRICE}}` - First service starting price (number only)
- `{{SERVICE_2_NAME}}` - Second service name  
- `{{SERVICE_2_DESCRIPTION}}` - Second service description
- `{{SERVICE_2_PRICE}}` - Second service starting price
- `{{SERVICE_3_NAME}}` - Third service name
- `{{SERVICE_3_DESCRIPTION}}` - Third service description  
- `{{SERVICE_3_PRICE}}` - Third service starting price

#### Testimonials
- `{{TESTIMONIAL_1_TEXT}}` - First customer review text
- `{{TESTIMONIAL_1_NAME}}` - First customer name
- `{{TESTIMONIAL_1_TITLE}}` - First customer title/business
- `{{TESTIMONIAL_2_TEXT}}` - Second customer review text
- `{{TESTIMONIAL_2_NAME}}` - Second customer name
- `{{TESTIMONIAL_2_TITLE}}` - Second customer title/business

#### Contact Section
- `{{CONTACT_INTRO_TEXT}}` - Introduction text for contact section
- `{{BUSINESS_HOURS}}` - Business operating hours

#### Footer
- `{{FOOTER_TAGLINE}}` - Short tagline for footer
- `{{FACEBOOK_URL}}` - Facebook page URL (optional)
- `{{GOOGLE_BUSINESS_URL}}` - Google Business profile URL (optional)

### SEO & Technical
- `{{WEBSITE_URL}}` - Full website URL
- `{{OPENING_HOURS}}` - Structured hours for Schema.org
- `{{PRICE_RANGE}}` - Price range (e.g., "$$" or "$50-$200")
- `{{CURRENT_YEAR}}` - Current year for copyright
- `{{YOUR_WEBSITE}}` - Your web design business website

## Required Images

Upload these images to `/assets/images/`:

### Essential Images
- `logo.svg` - Business logo (SVG preferred, or PNG)
- `favicon.svg` - Website favicon
- `hero-image.jpg` - Hero section image (1200x800px recommended)
- `about-image.jpg` - About section image (800x600px recommended)

### Service Icons
- `service-1-icon.svg` - First service icon
- `service-2-icon.svg` - Second service icon  
- `service-3-icon.svg` - Third service icon

## Customization Options

### Colors
Edit CSS variables in `/assets/css/base.css`:

```css
:root {
  --primary-color: #2563eb;     /* Main brand color */
  --secondary-color: #f59e0b;   /* Accent color */
  --accent-color: #10b981;      /* Success/CTA color */
}
```

### Fonts
Current setup uses Inter font. To change:
1. Update Google Fonts link in HTML `<head>`
2. Update `--font-primary` and `--font-heading` variables

### Layout
- Add/remove service cards by duplicating the service section structure
- Add/remove testimonials similarly
- Modify grid layouts by changing `grid-2` to `grid-3` etc.

## Deployment Checklist

- [ ] Replace all {{PLACEHOLDER}} variables
- [ ] Upload all client images  
- [ ] Test contact form submission
- [ ] Customize colors to match brand
- [ ] Add Google Analytics tracking code
- [ ] Set up client's custom domain in Netlify
- [ ] Test on mobile devices
- [ ] Submit to Google Search Console
- [ ] Set up Google My Business integration

## Client Training

After deployment, train the client on:
1. How to update contact information
2. How to add/edit testimonials  
3. How to change business hours
4. How to view form submissions in Netlify
5. Basic SEO best practices

## Pricing Recommendation

- **Basic Setup** (template + customization): $800-1,200
- **Custom Images/Photography**: +$300-500
- **Additional Pages**: +$200-400 each
- **E-commerce Integration**: +$500-1,000
- **Monthly Maintenance**: $50-100/month