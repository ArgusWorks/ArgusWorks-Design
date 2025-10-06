# Client Delivery Quick Reference

## 🎯 **RECOMMENDED APPROACH: Separate Deployments**

Use your main portfolio site for marketing and demos, then create individual deployments for each client.

## 📋 **Step-by-Step Workflow**

### 1. **Initial Client Presentation**
```bash
# Show client their demo on your portfolio site
# URL: https://yoursite.netlify.app/client-proposals/refined-cravings/
```

### 2. **Client Approval & Individual Deployment**
```bash
# List available client proposals
npm run client:list

# Deploy as separate repository (RECOMMENDED)
npm run client:deploy:separate --client=refined-cravings

# Alternative: Deploy as branch (if needed)
npm run client:deploy:branch --client=refined-cravings
```

### 3. **Netlify Setup**
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "New site from Git"
3. Connect the new repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Deploy!

### 4. **Custom Domain Setup**
1. In Netlify: Site Settings → Domain Management
2. Add custom domain: `refinedcravings.com`
3. Configure DNS with client's domain provider

## 💡 **Why This Approach Works Best**

### ✅ **Portfolio Site Benefits:**
- **SEO Power**: All your work showcased in one place
- **Easy Updates**: Single codebase for template improvements
- **Professional Image**: Comprehensive portfolio for new clients
- **Cost Effective**: One deployment for all demos

### ✅ **Individual Client Site Benefits:**
- **Professional Delivery**: Client gets their own branded domain
- **Independent Management**: Client controls their own site
- **Clean Separation**: No risk of affecting other clients
- **Easy Handoff**: Simple to transfer ownership if needed

## 🚀 **Real Example: Refined Cravings**

### Demo Phase:
- **Portfolio Demo**: `yoursite.netlify.app/client-proposals/refined-cravings/`
- **Client Reviews**: Makes changes, approves design

### Delivery Phase:
- **Individual Site**: `refinedcravings.netlify.app`
- **Custom Domain**: `refinedcravings.com` (client's domain)
- **Client Owns**: Full control and branding

## 📊 **Business Benefits**

### **Efficiency**:
- Templates speed up development
- Automated deployment process
- Standardized client handoff

### **Scalability**:
- Easy to manage multiple clients
- Consistent pricing and delivery
- Professional presentation at every step

### **Profitability**:
- Portfolio drives new business
- Individual deployments justify premium pricing
- Maintenance contracts for ongoing revenue

## 🎯 **Next Client Actions**

### **Refined Cravings** (Ready to Deploy):
```bash
npm run client:deploy:separate --client=refined-cravings
```

### **Cafe Cultivate** (Ready to Deploy):
```bash
npm run client:deploy:separate --client=cafe-cultivate
```

### **Follow-up**:
1. Send preview links to clients
2. Collect feedback and make revisions
3. Set up custom domains
4. Launch live sites
5. Establish maintenance agreements

---

**🎉 Result**: Professional web design business with scalable delivery process and happy clients!