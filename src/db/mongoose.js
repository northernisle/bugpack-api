import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(e => {
  console.log(e);
});