import mongoose from 'mongoose';

export default async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("MONGO_DB Connected Successfully to", connectionInstance.connection.host);
    } catch (error) {
        console.log("MONGO_DB Connection failed", error);
        process.exit(1)
    }
};