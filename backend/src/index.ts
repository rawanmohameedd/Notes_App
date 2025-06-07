import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
