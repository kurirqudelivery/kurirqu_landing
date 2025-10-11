const { MongoClient } = require('mongodb');

async function testDBConnection() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb+srv://Vercel-Admin-mongo-decko:kBJfY6NJPBd5izJp@mongo-decko.wilsbbc.mongodb.net/?retryWrites=true&w=majority');
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    
    // List all collections
    console.log('📋 Collections in database:');
    const collections = await db.listCollections().toArray();
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Check if otps collection exists
    const otpsCollection = db.collection('otps');
    
    // Insert test OTP
    const testOTP = {
      email: 'test@example.com',
      code: '123456',
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      isUsed: false,
      attempts: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('💾 Inserting test OTP...');
    const result = await otpsCollection.insertOne(testOTP);
    console.log('✅ Test OTP inserted with ID:', result.insertedId);
    
    // Query test OTP
    console.log('🔍 Querying test OTP...');
    const foundOTP = await otpsCollection.findOne({ email: 'test@example.com' });
    console.log('✅ Found OTP:', foundOTP);
    
    // Clean up test OTP
    await otpsCollection.deleteOne({ _id: result.insertedId });
    console.log('🧹 Test OTP cleaned up');
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

testDBConnection();
