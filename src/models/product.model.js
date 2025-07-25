import { logError, logInfo, logRequest } from '../../util.js';
import { db } from './firebase.js'; // Importa la instancia de Firestore si es necesario
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where, getDoc } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore. Crear, traer, eliminar y actualizar documentos

const productsCollection = collection(db, "products"); // Colección de productos en Firestore

export const getAllProducts = async () => {
    try {
        const AllProducts = await getDocs(productsCollection);// Obtiene todos los documentos de la colección de productos
        logRequest({ method: 'GET', url: '/api/products' });
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
        const productQuery = query(productsCollection, where("id", "==", idAsNumber));// Crea una consulta para buscar productos por ID de campo
        const querySnapshot = await getDocs(productQuery);// Ejecuta la consulta para obtener los productos con el ID especificado
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
export const updateProduct = async (id, updatedProduct) => {
    try {
        const idAsNumber = parseInt(id);
        const productQuery = query(productsCollection, where("id", "==", idAsNumber));
        const snapshot = await getDocs(productQuery);
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
export const deleteProduct = async (id, req) => {
    const idAsNumber = parseInt(id);
    const q = query(productsCollection, where('id', '==', idAsNumber));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return false; // No se encontró ningún producto con ese id interno
    }
    // Eliminamos todos los documentos que tengan ese id interno (por si hay más de uno)
    for (const productDoc of snapshot.docs) {
        await deleteDoc(productDoc.ref);
    }
    return true;
}
export const getProductByName = async (name) => {
    try {
        const nombre = name.toLowerCase(); // Normaliza el nombre a minúsculas para la búsqueda
        // Traer todos y filtrar en memoria
        const snapshot = await getDocs(productsCollection);
        const results = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.name && data.name.toLowerCase() === nombre) {
                results.push({ id: doc.id, ...data });
            }
        });

        if (results.length === 0) {
            logInfo(`No se encontró producto con nombre: ${nombre}`);
            return null;
        }
        return results; // Devuelve todos los productos que coinciden con el nombre

    } catch (error) {
        //logError({ message: "Error al buscar producto por nombre", error });
        console.error("Error al buscar producto por nombre:", error);
        return null;
    }
}