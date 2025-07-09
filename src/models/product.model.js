import { logError, logInfo, logRequest } from '../../util.js';
import { db } from './firebase.js'; // Importa la instancia de Firestore si es necesario
import { collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, doc, query, where, onSnapshot } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore. Crear, traer, eliminar y actualizar documentos

const productsCollection = collection(db, "products"); // Colección de productos en Firestore

export const getAllProducts = async () => {
    try {
        const AllProducts = await getDocs(productsCollection);// Obtiene todos los documentos de la colección de productos
        logRequest({ method: 'GET', url: '/api/products PRPRPRPRPRPRP' });
        logInfo('Productos obtenidos:', AllProducts.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); // Imprime la cantidad de productos obtenidos
        return AllProducts.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Mapea los documentos a un array de productos con su ID
    } catch (error) {
        logError({ message: "Error al obtener productos", error });
    }
}
export const createProduct = async (producto) => {
 try {
        // Obtener todos los documentos actuales
        const snapshot = await getDocs(productsCollection);
        const docs = snapshot.docs;

        // Obtener el máximo ID numérico actual
        let maxId = 0;
        docs.forEach((doc) => {
            const data = doc.data();
            if (data.id && Number.isInteger(data.id) && data.id > maxId) {
                maxId = data.id;
            }
        });

        // Crear nuevo producto con ID incremental
        const newProduct = {
            id: maxId + 1,
            ...producto
        };
        logRequest({ method: 'POST', url: '/api/products', body: newProduct });
        const docRef = await addDoc(productsCollection, newProduct);
        logInfo(`Producto creado con ID de Firestore: ${docRef.id}`);
        return { firestoreId: docRef.id, ...newProduct };
    } catch (error) {
        logError({ message: "Error al crear producto", error });
        return null;
    }
}
export const getProductById = async (id) => {
   try {
        const idAsNumber = parseInt(id); // aseguramos que es un número
        const q = query(productsCollection, where("id", "==", idAsNumber));// Crea una consulta para buscar productos por ID de campo
        const querySnapshot = await getDocs(q);// Ejecuta la consulta para obtener los productos con el ID especificado
        if (querySnapshot.empty) {
            logInfo(`No se encontró producto con id: ${idAsNumber}`);
            return null;
        }
        const docSnap = querySnapshot.docs[0];// Suponiendo que el ID es único, devolvemos el primero
        return { firestoreId: docSnap.id, ...docSnap.data() };// Devuelve el producto encontrado con su ID de Firestore y los datos del documento
    } catch (error) {
        logError({ message: "Error al obtener producto por ID de campo", error });
        return null;
    }
}
export const updateProduct = async (id, updatedProduct) => {  //pendiente de implementar
    try {
        const idAsNumber = parseInt(id); // si tus IDs internos son números
        const q = query(productsCollection, where("id", "==", idAsNumber));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            logInfo(`No se encontró producto con id interno: ${id}`);
            return null;
        }

        const docRef = snapshot.docs[0]; // Suponemos que el ID interno es único
        const ref = doc(db, "products", docRef.id);
        await updateDoc(ref, updatedProduct);
        logInfo(`Actualizando producto con id interno: ${id} y datos: ${JSON.stringify(updatedProduct)}`);
        return { firestoreId: docRef.id, ...updatedProduct };

    } catch (error) {
        logError({ message: "Error al actualizar producto", error });
        return null;
    }
}
export const deleteProduct = async (id) => {
    try {
        const idAsNumber = parseInt(id); // Aseguramos que sea número si corresponde
        const q = query(productsCollection, where("id", "==", idAsNumber));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            logInfo(`No se encontró producto con id interno: ${id}`);
            return null;
        }

        const docRef = snapshot.docs[0]; // Suponemos que el id es único
        await deleteDoc(doc(db, "products", docRef.id));
        logInfo(`Producto eliminado. ID interno: ${id}, ID Firestore: ${docRef.id}`);
        return { id };

    } catch (error) {
        logError({ message: "Error al eliminar producto", error });
        return null;
    }
}
export const getProductByName = async (name) => {
    try {
        const q = query(productsCollection, where("nombre", "==", name));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            logInfo(`No se encontraron productos con el nombre: ${name}`);
            return [];
        }

        const products = snapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));

        logInfo(`Productos encontrados con nombre "${name}":`, products);
        return products;

    } catch (error) {
        logError({ message: "Error al buscar producto por nombre", error });
        return null;
    }
}