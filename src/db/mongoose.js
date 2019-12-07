import mongoose from 'mongoose';

const { DB_IP, DB_PORT, DB_NAME } = process.env;

mongoose.connect(`${DB_IP}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(e => {
  console.log(e);
});