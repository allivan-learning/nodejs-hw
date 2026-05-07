import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;

        await mongoose.connect(mongoUrl);
        console.log('✅ MongoDB connection established successfully');
        console.log(
          '📂 Сейчас код подключен к базе:',
          mongoose.connection.name,
        );
    } catch (error){
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
 };