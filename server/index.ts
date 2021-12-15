import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
require('dotenv').config();

// declare extend properties
declare global {
  namespace Express {
    interface Request {
      userId: string;
      userEmail: string;
      roles: string[];
    }
  }
}

// connect mongodb using mongoose
const uri = process.env.MONGO_URI;
mongoose.connect(uri as string, { autoIndex: true, autoCreate: true });

const connection = mongoose.connection;
connection.once('open', () =>
  console.log('MongoDB database connected successfully!'),
);

process.setMaxListeners(Infinity);

// declare middleware chain
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));

// cookies
app.use(cookieParser());

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

const port = process.env.PORT || 8888

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

// app.use('/api', routes);