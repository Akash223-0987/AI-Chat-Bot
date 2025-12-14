// Quick script to check if .env is configured correctly
require('dotenv').config();

console.log('=== .env Configuration Check ===\n');

const apiKey = process.env.GEMINI_API_KEY;
const port = process.env.PORT || 3000;

if (apiKey) {
    console.log('✅ GEMINI_API_KEY is set');
    console.log(`   Length: ${apiKey.length} characters`);
    console.log(`   First 10 chars: ${apiKey.substring(0, 10)}...`);
} else {
    console.log('❌ GEMINI_API_KEY is NOT set');
    console.log('   Please add it to your .env file:');
    console.log('   GEMINI_API_KEY=your_api_key_here');
}

console.log(`\n✅ PORT: ${port}`);

if (!apiKey) {
    console.log('\n⚠️  Fix your .env file:');
    console.log('   1. Open server/.env');
    console.log('   2. Add: GEMINI_API_KEY=your_actual_api_key');
    console.log('   3. Add: PORT=3000');
    console.log('   4. Save and restart the server');
    process.exit(1);
} else {
    console.log('\n✅ Configuration looks good!');
    process.exit(0);
}

