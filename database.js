import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
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