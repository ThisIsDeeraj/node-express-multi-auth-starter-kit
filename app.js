import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleErrors, handleNotFound } from './utils/errorHandler.js';
import initializePassport from './passport-config.js';
import authRoutes from './routes/users/authRoutes.js';
import passport from 'passport';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

//public files 
app.use('/public', express.static(path.join(__dirname, 'uploads', 'public')));

// for private files route saved for future reference 
// res.sendFile(path.join(__dirname, 'uploads', 'restricted', 'bills', req.params.billId));

// Logger
morgan('tiny');

/* ROUTES */
app.use('/user', authRoutes);

// Middleware for handling 404 errors
app.use(handleNotFound);

// Error handling middleware (moved to a separate utility)
app.use(handleErrors);

export default app;
