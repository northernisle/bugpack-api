import app from './app';
import connectDB from './loaders';

connectDB(<string>process.env.DB_NAME);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});