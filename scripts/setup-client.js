#!/usr/bin/env node

/**
 * Client Website Setup Script
 * Usage: npm run setup:client clientname
 */

const fs = require('fs');
const path = require('path');

const clientName = process.argv[2];
if (!clientName) {
  console.log('❌ Usage: npm run setup:client <client-name>');
  console.log('   Example: npm run setup:client refined-cravings');
  process.exit(1);
}

const sourceDir = path.join(__dirname, '..', 'client-proposals', clientName);
const outputDir = path.join(__dirname, '..', 'client-sites', clientName);

if (!fs.existsSync(sourceDir)) {
  console.log(`❌ Client proposal not found: ${sourceDir}`);
  console.log('   Available clients:');
  const proposals = fs.readdirSync(path.join(__dirname, '..', 'client-proposals'));
  proposals.forEach(dir => console.log(`   - ${dir}`));
  process.exit(1);
}

// Create client site directory
if (!fs.existsSync(path.dirname(outputDir))) {
  fs.mkdirSync(path.dirname(outputDir), { recursive: true });
}

console.log(`🚀 Setting up client site for: ${clientName}`);

// Copy client files
console.log('📁 Copying client files...');
fs.cpSync(sourceDir, outputDir, { recursive: true });

// Copy shared assets
console.log('🎨 Copying assets...');
const assetsSource = path.join(__dirname, '..', 'assets');
const assetsTarget = path.join(outputDir, 'assets');
if (fs.existsSync(assetsSource)) {
  fs.cpSync(assetsSource, assetsTarget, { recursive: true });
}

// Copy configuration files
console.log('⚙️ Setting up configuration...');
const configFiles = ['package.json', 'vite.config.js', 'netlify.toml'];
configFiles.forEach(file => {
  const source = path.join(__dirname, '..', file);
  const target = path.join(outputDir, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, target);
  }
});

// Create client-specific package.json
const packageJsonPath = path.join(outputDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = `${clientName}-website`;
  packageJson.description = `Professional website for ${clientName}`;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Create README for client
const readmePath = path.join(outputDir, 'README.md');
const readmeContent = `# ${clientName.charAt(0).toUpperCase() + clientName.slice(1)} Website

## Deployment Instructions

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run locally:
\`\`\`bash
npm run dev
\`\`\`

3. Build for production:
\`\`\`bash
npm run build
\`\`\`

4. Deploy to Netlify:
- Connect this repository to Netlify
- Set build command: \`npm run build\`
- Set publish directory: \`dist\`

## Website Features
- Mobile-responsive design
- Contact forms with Netlify integration
- SEO optimized
- Fast loading performance
- Professional branding

Built by [Your Web Design Business]
`;

fs.writeFileSync(readmePath, readmeContent);

console.log('✅ Client site setup complete!');
console.log(`📂 Location: ${outputDir}`);
console.log('');
console.log('Next steps:');
console.log(`1. cd client-sites/${clientName}`);
console.log('2. git init');
console.log('3. git add .');
console.log(`4. git commit -m "Initial ${clientName} website"`);
console.log('5. Push to GitHub and connect to Netlify');
console.log('');
console.log('🚀 Ready for deployment!');