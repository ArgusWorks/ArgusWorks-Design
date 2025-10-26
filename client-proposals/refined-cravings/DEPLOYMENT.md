# Refined Cravings - Standalone Deployment Guide

## 🚀 Quick Deployment Steps

### Option A: New Netlify Site (Recommended for Client Handoff)
1. **Create new Netlify account** (or use existing)
2. **Drag and drop deployment**:
   - Zip the entire `refined-cravings` folder
   - Go to [netlify.com/drop](https://netlify.com/drop)
   - Drop the zip file
   - Site deploys instantly!

### Option B: GitHub Integration
1. **Push to new repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial Refined Cravings website"
   git remote add origin [your-repo-url]
   git push -u origin main
   ```
2. **Connect to Netlify**:
   - Build command: Leave empty
   - Publish directory: `.` (root directory)
   - Auto-deploy on git push

### 2. Forms Configuration
The contact form is already configured with Netlify Forms:
- Form name: `refined-cravings-booking`
- All required attributes are set (`netlify`, `name`, `method="POST"`)
- Honeypot spam protection included

#### To access form submissions:
1. Go to your Netlify dashboard
2. Navigate to **Site settings > Forms**
3. You'll see the "refined-cravings-booking" form
4. View submissions in **Forms > [form-name]**

#### Form notifications setup:
1. In Netlify dashboard: **Site settings > Forms > Form notifications**
2. Add email notification:
   - **Event**: New form submission
   - **Email**: your-email@domain.com
   - **Subject**: New Refined Cravings Booking Request

### 3. Custom Domain (Optional)
1. **Site settings > Domain management**
2. Add custom domain
3. Configure DNS records as shown

### 4. Testing
After deployment:
- ✅ Test form submission (check Netlify dashboard for entries)
- ✅ Test product page routing 
- ✅ Test cart functionality
- ✅ Test mobile responsive design

## Troubleshooting

### Form Issues:
- Ensure form has `netlify` attribute
- Check form name matches hidden field value
- Verify honeypot field is included

### Routing Issues:
- Product pages should work with included `netlify.toml`
- If 404 errors occur, check file paths in repository

### Cart Issues:
- Cart uses localStorage - works offline
- JavaScript should load properly with included configuration

## Support
For additional help, check Netlify documentation or contact support.