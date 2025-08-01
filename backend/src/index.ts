import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from "./routers/auth"
import notes from "./routers/notes"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", auth);

// Notes routes
app.use("/api/notes", notes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
