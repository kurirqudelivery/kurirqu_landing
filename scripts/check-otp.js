const { MongoClient } = require('mongodb');

async function checkOTP() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/kurirqu_landing');
  
  try {
    await client.connect();
    const db = client.db();
    const otps = await db.collection('otps').find({}).sort({ createdAt: -1 }).limit(5).toArray();
    
    console.log('🔐 Recent OTPs in Database:');
    console.log('============================');
    
    otps.forEach((otp, index) => {
      console.log(`${index + 1}. Email: ${otp.email}`);
      console.log(`   OTP: ${otp.code}`);
      console.log(`   Created: ${otp.createdAt}`);
      console.log(`   Expires: ${otp.expiresAt}`);
      console.log(`   Used: ${otp.used}`);
      console.log('---');
    });
    
    if (otps.length === 0) {
      console.log('No OTPs found in database');
    }
    
  } catch (error) {
    console.error('Error checking OTPs:', error);
  } finally {
    await client.close();
  }
}

checkOTP();
