import { initializeApp } from "firebase/app";
import { logRequest } from "./util.js";

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
    logRequest({ method: 'Conexion a la base de datos', url: 'Conectando a Firebase' }, null, () => {
      console.log('Conexion a la base de datos, log registrada.');
    });
    console.log('Conectando a la base de datos...');
    console.log('Base de datos conectada exitosamente');
  } catch (error) {
    logRequest({ method: 'Conexion a la base de datos', url: 'Error al conectar a Firebase' }, null, () => {
      console.error('Error al conectar a la base de datos, log registrada.');
    });
    console.error('Error al conectar a la base de datos:', error);
  }
}

export { connectToDatabase };