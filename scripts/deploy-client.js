#!/usr/bin/env node

/**
 * Client Website Deployment Script
 * Automates the process of creating individual client deployments
 * from the portfolio template system
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class ClientDeploymentManager {
    constructor() {
        this.rootDir = process.cwd();
        this.clientProposalsDir = path.join(this.rootDir, 'client-proposals');
    }

    /**
     * Lists available client proposals
     */
    listAvailableClients() {
        console.log('\n🎯 Available Client Proposals:');
        const clients = fs.readdirSync(this.clientProposalsDir);
        clients.forEach((client, index) => {
            console.log(`${index + 1}. ${client}`);
        });
        return clients;
    }

    /**
     * Creates a separate repository for client deployment
     */
    async createClientRepository(clientName, deploymentType = 'separate') {
        const clientDir = path.join(this.clientProposalsDir, clientName);
        
        if (!fs.existsSync(clientDir)) {
            throw new Error(`Client proposal '${clientName}' not found`);
        }

        console.log(`\n🚀 Creating deployment for: ${clientName}`);
        console.log(`📁 Deployment type: ${deploymentType}`);

        if (deploymentType === 'separate') {
            await this.createSeparateRepository(clientName, clientDir);
        } else if (deploymentType === 'branch') {
            await this.createBranchDeployment(clientName, clientDir);
        }
    }

    /**
     * Creates a separate GitHub repository for the client
     */
    async createSeparateRepository(clientName, clientDir) {
        const repoName = `${clientName}-website`;
        const tempDir = path.join(this.rootDir, '..', repoName);

        try {
            // Create new repository
            console.log('📦 Creating GitHub repository...');
            execSync(`gh repo create ${repoName} --private --clone`, { 
                cwd: path.dirname(tempDir),
                stdio: 'inherit' 
            });

            // Copy client files
            console.log('📋 Copying client files...');
            this.copyClientFiles(clientDir, tempDir);

            // Initialize client-specific configuration
            this.createClientConfiguration(tempDir, clientName);

            // Initial commit
            console.log('💾 Creating initial commit...');
            execSync('git add .', { cwd: tempDir, stdio: 'inherit' });
            execSync(`git commit -m "Initial commit: ${clientName} website"`, { 
                cwd: tempDir, 
                stdio: 'inherit' 
            });
            execSync('git push origin main', { cwd: tempDir, stdio: 'inherit' });

            console.log(`\n✅ Repository created successfully!`);
            console.log(`📍 Location: ${tempDir}`);
            console.log(`🔗 GitHub: https://github.com/$(git config user.name)/${repoName}`);
            console.log(`\n📋 Next Steps:`);
            console.log(`1. Connect to Netlify: https://app.netlify.com/start`);
            console.log(`2. Build command: npm run build`);
            console.log(`3. Publish directory: dist`);
            console.log(`4. Set custom domain for client`);

        } catch (error) {
            console.error('❌ Error creating repository:', error.message);
            throw error;
        }
    }

    /**
     * Creates a branch deployment within the current repository
     */
    async createBranchDeployment(clientName, clientDir) {
        const branchName = `client/${clientName}`;
        
        try {
            // Create and switch to client branch
            console.log(`🌿 Creating branch: ${branchName}`);
            execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });

            // Clear root directory (except essential files)
            const essentialFiles = ['.git', '.gitignore', 'node_modules', 'package.json', 'package-lock.json'];
            const rootFiles = fs.readdirSync(this.rootDir);
            
            rootFiles.forEach(file => {
                if (!essentialFiles.includes(file)) {
                    const filePath = path.join(this.rootDir, file);
                    if (fs.lstatSync(filePath).isDirectory()) {
                        fs.rmSync(filePath, { recursive: true, force: true });
                    } else {
                        fs.unlinkSync(filePath);
                    }
                }
            });

            // Copy client files to root
            console.log('📋 Setting up client files in root...');
            this.copyClientFiles(clientDir, this.rootDir);

            // Create client-specific configuration
            this.createClientConfiguration(this.rootDir, clientName);

            // Commit branch changes
            console.log('💾 Committing client branch...');
            execSync('git add .', { stdio: 'inherit' });
            execSync(`git commit -m "${clientName} website deployment"`, { stdio: 'inherit' });
            execSync(`git push origin ${branchName}`, { stdio: 'inherit' });

            // Return to main branch
            execSync('git checkout main', { stdio: 'inherit' });

            console.log(`\n✅ Branch deployment created successfully!`);
            console.log(`🌿 Branch: ${branchName}`);
            console.log(`\n📋 Next Steps:`);
            console.log(`1. In Netlify dashboard, create new site from branch`);
            console.log(`2. Select branch: ${branchName}`);
            console.log(`3. Build command: npm run build`);
            console.log(`4. Publish directory: dist`);

        } catch (error) {
            console.error('❌ Error creating branch deployment:', error.message);
            // Return to main branch on error
            try {
                execSync('git checkout main', { stdio: 'inherit' });
            } catch (e) {}
            throw error;
        }
    }

    /**
     * Copies client files to destination
     */
    copyClientFiles(sourceDir, destDir) {
        // Copy HTML files
        const htmlFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.html'));
        htmlFiles.forEach(file => {
            fs.copyFileSync(
                path.join(sourceDir, file),
                path.join(destDir, file)
            );
        });

        // Copy assets (if client has custom assets)
        const clientAssetsDir = path.join(sourceDir, 'assets');
        if (fs.existsSync(clientAssetsDir)) {
            const destAssetsDir = path.join(destDir, 'assets');
            if (!fs.existsSync(destAssetsDir)) {
                fs.mkdirSync(destAssetsDir, { recursive: true });
            }
            this.copyDirectory(clientAssetsDir, destAssetsDir);
        } else {
            // Copy shared assets
            const sharedAssetsDir = path.join(this.rootDir, 'assets');
            const destAssetsDir = path.join(destDir, 'assets');
            this.copyDirectory(sharedAssetsDir, destAssetsDir);
        }

        // Copy any other client-specific files
        const otherFiles = fs.readdirSync(sourceDir).filter(f => 
            !f.endsWith('.html') && f !== 'assets' && !f.startsWith('.')
        );
        otherFiles.forEach(file => {
            const sourcePath = path.join(sourceDir, file);
            const destPath = path.join(destDir, file);
            if (fs.lstatSync(sourcePath).isDirectory()) {
                this.copyDirectory(sourcePath, destPath);
            } else {
                fs.copyFileSync(sourcePath, destPath);
            }
        });
    }

    /**
     * Recursively copies a directory
     */
    copyDirectory(src, dest) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const items = fs.readdirSync(src);
        items.forEach(item => {
            const srcPath = path.join(src, item);
            const destPath = path.join(dest, item);

            if (fs.lstatSync(srcPath).isDirectory()) {
                this.copyDirectory(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        });
    }

    /**
     * Creates client-specific configuration files
     */
    createClientConfiguration(destDir, clientName) {
        // Create package.json for client
        const packageJson = {
            "name": `${clientName}-website`,
            "version": "1.0.0",
            "description": `Professional website for ${clientName}`,
            "main": "index.html",
            "scripts": {
                "dev": "vite",
                "build": "vite build",
                "preview": "vite preview"
            },
            "devDependencies": {
                "vite": "^5.0.0"
            }
        };

        fs.writeFileSync(
            path.join(destDir, 'package.json'),
            JSON.stringify(packageJson, null, 2)
        );

        // Create netlify.toml for client
        const netlifyConfig = `[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[forms]]
  name = "contact"

[context.production.environment]
  NODE_VERSION = "18"`;

        fs.writeFileSync(
            path.join(destDir, 'netlify.toml'),
            netlifyConfig
        );

        // Create vite.config.js
        const viteConfig = `import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})`;

        fs.writeFileSync(
            path.join(destDir, 'vite.config.js'),
            viteConfig
        );

        // Create client README
        const readme = `# ${clientName} Website

Professional website built with modern web technologies.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Deployment

This site is configured for automatic deployment on Netlify.

## Support

For technical support and updates, contact your web development team.
`;

        fs.writeFileSync(
            path.join(destDir, 'README.md'),
            readme
        );
    }

    /**
     * Generates deployment summary
     */
    generateDeploymentSummary(clientName) {
        console.log(`\n📊 Deployment Summary for ${clientName}`);
        console.log('=' .repeat(50));
        console.log(`✅ Client files prepared`);
        console.log(`✅ Repository/branch created`);
        console.log(`✅ Configuration files generated`);
        console.log(`✅ Ready for Netlify deployment`);
        console.log('\n🎯 Next Actions:');
        console.log('1. Connect to Netlify');
        console.log('2. Configure custom domain');
        console.log('3. Test all functionality');
        console.log('4. Send preview link to client');
        console.log('5. Launch after approval');
    }
}

// CLI Interface
if (process.argv[2]) {
    const manager = new ClientDeploymentManager();
    const command = process.argv[2];
    const clientName = process.argv[3];
    const deploymentType = process.argv[4] || 'separate';

    switch (command) {
        case 'list':
            manager.listAvailableClients();
            break;
        
        case 'deploy':
            if (!clientName) {
                console.error('❌ Error: Please specify client name');
                console.log('Usage: node scripts/deploy-client.js deploy <client-name> [separate|branch]');
                process.exit(1);
            }
            manager.createClientRepository(clientName, deploymentType)
                .then(() => manager.generateDeploymentSummary(clientName))
                .catch(error => {
                    console.error('❌ Deployment failed:', error.message);
                    process.exit(1);
                });
            break;
        
        default:
            console.log('Client Deployment Manager');
            console.log('Usage:');
            console.log('  node scripts/deploy-client.js list');
            console.log('  node scripts/deploy-client.js deploy <client-name> [separate|branch]');
            console.log('\nExamples:');
            console.log('  node scripts/deploy-client.js deploy refined-cravings separate');
            console.log('  node scripts/deploy-client.js deploy cafe-cultivate branch');
    }
}