import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};
const app = initializeApp(firebaseConfig);// Inicializa la aplicación de Firebase con la configuración proporcionada
const db = getFirestore(app);// Obtiene la instancia de Firestore de la aplicación Firebase

export { db };// Exporta la instancia de Firestore para que pueda ser utilizada en otros módulos
