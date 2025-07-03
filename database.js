import {APIKEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID} from './config.js';
import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import dotenv from 'dotenv';

// dotenv.config('./.env');

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID
};

const app = initializeApp(firebaseConfig);


const connectToDatabase = async () => {
  try {
    // Simulate a database connection to firebase
    // Replace this with actual database connection logic
    console.log('Connecting to the database...');
    // Here you would typically use a library like mongoose or pg to connect to your database
    // For example: await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

export { connectToDatabase };