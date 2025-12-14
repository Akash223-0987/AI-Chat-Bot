// Script to verify and fix .env file
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

console.log('=== .env File Checker & Fixer ===\n');

// Check if .env exists
if (!fs.existsSync(envPath)) {
    console.log('❌ .env file does NOT exist');
    console.log('📝 Creating .env file with template...\n');
    
    const template = `GEMINI_API_KEY=your_api_key_here
PORT=3000
`;
    
    fs.writeFileSync(envPath, template);
    console.log('✅ Created .env file');
    console.log('⚠️  Please edit it and add your actual API key!\n');
    process.exit(0);
}

// Read .env file
let content = fs.readFileSync(envPath, 'utf8');
console.log('📄 Current .env content:');
console.log('---');
console.log(content);
console.log('---\n');

// Check for issues
let hasIssues = false;
let fixedContent = content;

// Remove leading/trailing whitespace from each line
const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

// Check for GEMINI_API_KEY
let hasApiKey = false;
let apiKeyValue = '';
let hasPort = false;

lines.forEach(line => {
    if (line.startsWith('GEMINI_API_KEY=')) {
        hasApiKey = true;
        apiKeyValue = line.split('=')[1] || '';
        // Check for issues
        if (line.includes(' ') || line.includes('"') || line.includes("'")) {
            hasIssues = true;
            console.log('⚠️  Found formatting issues in GEMINI_API_KEY line');
        }
    }
    if (line.startsWith('PORT=')) {
        hasPort = true;
    }
});

// Fix issues
if (hasIssues || !hasApiKey || !hasPort) {
    console.log('🔧 Fixing .env file...\n');
    
    // Rebuild content properly
    fixedContent = '';
    
    if (hasApiKey && apiKeyValue && apiKeyValue !== 'your_api_key_here') {
        // Keep existing API key but fix formatting
        const cleanKey = apiKeyValue.trim().replace(/["']/g, '');
        fixedContent += `GEMINI_API_KEY=${cleanKey}\n`;
        console.log(`✅ Fixed GEMINI_API_KEY: ${cleanKey.substring(0, 10)}...`);
    } else {
        fixedContent += `GEMINI_API_KEY=your_api_key_here\n`;
        console.log('⚠️  GEMINI_API_KEY needs to be set with your actual key');
    }
    
    if (hasPort) {
        const portMatch = content.match(/PORT\s*=\s*(\d+)/);
        if (portMatch) {
            fixedContent += `PORT=${portMatch[1]}\n`;
            console.log(`✅ Fixed PORT: ${portMatch[1]}`);
        } else {
            fixedContent += `PORT=3000\n`;
            console.log('✅ Added PORT=3000');
        }
    } else {
        fixedContent += `PORT=3000\n`;
        console.log('✅ Added PORT=3000');
    }
    
    // Write fixed content
    fs.writeFileSync(envPath, fixedContent);
    console.log('\n✅ .env file has been fixed!\n');
} else {
    console.log('✅ .env file looks good!\n');
}

// Final verification
require('dotenv').config();
const apiKey = process.env.GEMINI_API_KEY;
const port = process.env.PORT || 3000;

console.log('=== Final Verification ===');
if (apiKey && apiKey !== 'your_api_key_here') {
    console.log(`✅ GEMINI_API_KEY: Set (${apiKey.length} characters)`);
    console.log(`   Preview: ${apiKey.substring(0, 10)}...`);
} else {
    console.log('❌ GEMINI_API_KEY: Not set or using placeholder');
    console.log('   Please edit .env and add your actual API key');
}
console.log(`✅ PORT: ${port}`);

if (apiKey && apiKey !== 'your_api_key_here') {
    console.log('\n✅ Everything is configured correctly!');
    console.log('   You can now run: npm start');
} else {
    console.log('\n⚠️  Remember to add your actual API key to .env file');
}

