import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/e-booking-db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('DB connection error:', error));

app.get('/', (req, res) => {
    res.send('Backend running successfully');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
