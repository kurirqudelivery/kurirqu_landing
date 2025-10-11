const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Get OTP from Terminal');
console.log('========================\n');

rl.question('📧 Enter email: ', async (email) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/request-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ OTP requested successfully!');
      console.log('📧 Email:', data.email);
      console.log('⏰ Expires in:', data.expiresIn, 'seconds');
      console.log('\n🔐 Check the terminal running npm run dev to see the OTP code');
      console.log('   Look for: "🔐 Generated OTP for..."');
    } else {
      console.log('\n❌ Error:', data.error);
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
  
  rl.close();
});
