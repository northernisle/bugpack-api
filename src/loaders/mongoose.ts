import mongoose from 'mongoose';

const { DB_IP, DB_PORT } = process.env;

export default async (dbName: string) => {
  try {
    await mongoose.connect(`${DB_IP}:${DB_PORT}/${dbName}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log(e);
  }
}