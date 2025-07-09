import { logError, logRequest } from '../../util.js';
import {db} from './firebase.js'; // Importa la instancia de Firestore si es necesario
import { collection, getDocs,getDoc, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore. Crear, traer, eliminar y actualizar documentos

const productsCollection = collection(db, "products"); // Colección de productos en Firestore

export const getAllProducts = async () => {
    try {
        const AllProducts = await getDocs(productsCollection);// Obtiene todos los documentos de la colección de productos
        logRequest({ method: 'GET', url: '/api/products' }, null, () => {
            console.log('Productos obtenidos exitosamente');
        });
        return AllProducts.docs.map(doc => ({ id: doc.id, ...doc.data() }));// Mapea los documentos a un array de productos;
    } catch (error) {
        logError({ message: "Error al obtener productos", error }, req);
        console.error('Error al obtener productos:', error);
    }
}
export const createProduct = async (producto) => {
    //agregar un nuevo producto a firebase
    console.log('Creando producto:', producto);
    try {
        const newProduct = {
            id: productsCollection.length + 1,
            ...producto
         };
        const docRef = await addDoc(productsCollection, newProduct); // Agrega el nuevo producto a Firestore
        console.log(`Producto creado con ID: ${docRef.id}`);
    } catch (error) {
        logError({ message: "Error al crear producto", error });
        console.error('Error al crear producto:', error);
    }
}
export const getProductById = async (id) => {
    try{
        const productReference = doc(productsCollection, id);// Obtiene la referencia del producto por ID
        const product = await getDoc(productReference);// Obtiene el documento del producto
        return product.exists() ? { id: product.id, ...product.data() } : null;// Devuelve el producto si existe, o null si no
    }catch (error) {
        logError({ message: "Error al obtener producto por ID ", error });
    }
}
export const updateProduct = async (id, updatedProduct) => {
    try {
        const productReference = docs(productsCollection, id);
        await updateDoc(productReference, updatedProduct);
        console.log(`Producto actualizado: \n ID: ${id}, Nuevos datos: ${JSON.stringify(updatedProduct)}.    PRODUCT.MODEL.JS`);
        return { id, ...updatedProduct };
    } catch (error) {
        logError({ message: "Error al actualizar producto", error }, req);
        console.error('Error al actualizar producto:    PRODUCT.MODEL.JS    ', error);
        return null;
    }
}
export const deleteProduct = async (id) => {
    try {
        const productReference = docs(productsCollection, id);
        await deleteDoc(productReference);
        console.log(`Producto eliminado: \n ID: ${id}`);
        return { id };
    } catch (error) {
        logError({ message: "Error al eliminar producto", error }, req);
        console.error('Error al eliminar producto:', error);
        return null;
    }
}