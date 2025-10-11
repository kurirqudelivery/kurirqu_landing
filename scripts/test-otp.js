// Test script for OTP login system
// Run with: node scripts/test-otp.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BASE_URL = 'http://localhost:3002';

async function testOTPRequest(email) {
  console.log(`\n📧 Requesting OTP for ${email}...`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/auth/request-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ OTP sent successfully!');
      console.log(`📧 Check your email: ${data.email}`);
      console.log(`🔢 Debug OTP (development only): ${data.debugOtp}`);
      return data.debugOtp;
    } else {
      console.log('❌ Failed to send OTP:', data.error);
      return null;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return null;
  }
}

async function testOTPVerification(email, otp) {
  console.log(`\n🔐 Verifying OTP: ${otp}`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ OTP verified successfully!');
      console.log(`👤 User: ${JSON.stringify(data.user, null, 2)}`);
      return true;
    } else {
      console.log('❌ OTP verification failed:', data.error);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 KurirQu OTP Login Test');
  console.log('============================\n');
  
  rl.question('📧 Enter admin email (default: admin@kurirqu.com): ', async (email) => {
    email = email || 'admin@kurirqu.com';
    
    // Request OTP
    const debugOtp = await testOTPRequest(email);
    
    if (debugOtp) {
      console.log('\n⏳ Waiting for you to check your email...');
      console.log('💡 In development, you can use the debug OTP shown above');
      
      rl.question('\n🔢 Enter OTP (or press Enter to use debug OTP): ', async (userOtp) => {
        const otp = userOtp || debugOtp;
        
        // Verify OTP
        const success = await testOTPVerification(email, otp);
        
        if (success) {
          console.log('\n🎉 Test completed successfully!');
          console.log('🌐 You can now login at: http://localhost:3002/admin/login');
        } else {
          console.log('\n💥 Test failed. Please check your setup.');
        }
        
        rl.close();
      });
    } else {
      rl.close();
    }
  });
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ or global fetch polyfill');
  console.log('💡 Install node-fetch: npm install node-fetch');
  process.exit(1);
}

main().catch(console.error);
