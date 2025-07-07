import { parse } from "dotenv";
import { logError } from "./../../util.js";
import * as model from "./../models/product.model.js";

const getAllProducts = (req, res) => {
    try {
        res.json(model.getAllProducts());
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const searchProducts = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {// Verifica si el nombre fue proporcionado
            logError({ message: "El nombre es requerido" }, req);
            return res.status(400).json({ error: "El nombre es requerido" });
        }
        const products = model.getAllProducts();
        const productsFiltered = products.filter((item) => // Filtra los productos por nombre
            item.name.toLowerCase().includes(name.toLowerCase()) // Compara el nombre del producto con el nombre de búsqueda
        );

        if (productsFiltered.length == 0) {// Verifica si se encontraron productos
            logError({ message: "No se encontraron productos" }, req);
            return res.status(404).json({ error: "No se encontraron productos" });
        }

        res.json(productsFiltered);// Devuelve los productos filtrados
    } catch (error) {
        logError({ message: error }, req);
        console.error('Error al buscar productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10); // Obtiene el ID del producto desde los parámetros de la solicitud
        const product = model.getProductById(id); // Obtiene el producto por ID desde el modelo

        if (!product) {
            logError({ message: "Producto no encontrado" }, req);// Registra el error si el producto no se encuentra
            return res.status(404).json({ error: "Producto no encontrado" });// Devuelve un error 404 si el producto no se encuentra
        }
        res.json(product);// Devuelve el producto encontrado
    } catch (error) {
        logError({ message: error }, req);// Registra el error en caso de que ocurra un problema al obtener el producto
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });// Devuelve un error 500 si ocurre un problema interno del servidor
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, description, categories } = req.body; //Desestructuración de los campos del body de la solicitud
        if (!name || !price || !description || !categories) { //Verifica que todos los campos estén presentes
            logError({ message: "Todos los campos son requeridos" }, req);
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        const newProduct = model.createProduct({name, price, description, categories}); //Crea un nuevo producto utilizando el modelo

        res.status(201).json(newProduct); //Devuelve el nuevo producto creado con un código de estado 201 (Creado)
    } catch (error) { //Manejo de errores
        console.error('Error al crear producto:', error);
        logError({ message: error }, req);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, categories } = req.body;

        const product = model.getProductById(id); // Obtiene el producto por ID desde el modelo

        if (!product) {
            logError({ message: "Producto no encontrado" }, req);// Registra el error si el producto no se encuentra
            return res.status(404).json({ error: "Producto no encontrado" });// Devuelve un error 404 si el producto no se encuentra
        }

        const updatedProduct = {
            // ...product,// Mantiene los campos existentes del producto
            name,// Actualiza el nombre del producto
            price,// Actualiza el precio del producto
            description,// Actualiza la descripción del producto
            categories// Actualiza las categorías del producto
        };

        model.updateProduct(id, updatedProduct); // Actualiza el producto en el modelo
        res.json(updatedProduct);
    } catch (error) {
        logError({ message: error }, req);
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteProduct = (req, res) => {
    try {
        const id = parseInt(req.params.id,10); // Obtiene el ID del producto a eliminar desde los parámetros de la solicitud
        model.deleteProduct(id);
        res.status(204).send(); // En este caso, no se devuelve contenido, solo un código de estado 204 (No Content)
    } catch (error) {
        logError({ message: error }, req);
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export { getAllProducts, searchProducts, getProductById, createProduct, updateProduct, deleteProduct };