import { logError, logInfo } from "./../../util.js";
import * as model from "./../models/product.model.js";

const getAllProducts = async (req, res) => {
    const { category } = req.query; // Obtiene la categoría desde los parámetros de la solicitud
    const products = await model.getAllProducts(); // Obtiene todos los productos desde el modelo
    if (!products || products.length === 0) { // Verifica si se obtuvieron productos
        logError({ message: "No se encontraron productos" }, req); // Registra el error si no se encontraron productos
        return res.status(404).json({ error: "No se encontraron productos" }); //
    }
    res.json(products); // Devuelve los productos filtrados o todos los productos si no se proporciona una categoría;
    return
}

const getProductById = async (req, res) => {

    try {
        const id = req.params.id; // Obtiene el ID del producto desde los parámetros de la solicitud
        const product = await model.getProductById(id); // Obtiene el producto por ID desde el modelo
        if (!product) {
            logError({ message: "Producto no encontrado" }, req);// Registra el error si el producto no se encuentra
            return res.status(404).json({ error: "Producto no encontrado" });// Devuelve un error 404 si el producto no se encuentra
        }
        res.json(product);// Devuelve el producto encontrado
    } catch (error) {
        logError({ message: error }, req);// Registra el error en caso de que ocurra un problema al obtener el producto
        res.status(500).json({ error: 'Error al obtener producto por ID' });// Devuelve un error 500 si ocurre un problema interno del servidor
    }
}

const searchProducts = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {// Verifica si el nombre fue proporcionado
            logError({ message: "El nombre es requerido" }, req);
            return res.status(400).json({ error: "El nombre es requerido" });
        }
        const products = await model.getProductByName(name); // Obtiene los productos filtrados por nombre desde el modelo
        if (!products) {
            return res.status(404).json({ message: 'No se encontraron productos con ese nombre' });
        }
        res.status(200).json(products); // Devuelve los productos filtrados por nombre
        return;

    } catch (error) {
        logError({ message: error }, req);
        res.status(500).json({ error: 'Error al buscar productos' });
    }

}

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body; //Desestructuración de los campos del body de la solicitud
        if (!name || !price || !description || !category) { //Verifica que todos los campos estén presentes
            logError({ message: "Todos los campos son requeridos. NAME PRICE DESCRIPTION Y CATEGORY" }, req);
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        const newProduct = model.createProduct({ name: name.toLowerCase(), price, description, category: category }); //Crea un nuevo producto utilizando el modelo
        res.status(201).json(newProduct); //Devuelve el nuevo producto creado con un código de estado 201 (Creado)
    } catch (error) { //Manejo de errores
        console.error('Error al crear producto:', error);
        logError({ message: error }, req);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedata = req.body;
        const product = await model.getProductById(id); // Obtiene el producto por ID desde el modelo
        if (!product) {
            logError({ message: "Producto no encontrado" }, req);// Registra el error si el producto no se encuentra
            return res.status(404).json({ error: "Producto no encontrado" });// Devuelve un error 404 si el producto no se encuentra
        }
        model.updateProduct(id, updatedata); // Actualiza el producto en el modelo
        res.json(updatedata);
    } catch (error) {
        logError({ message: error }, req);
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteProduct = async(req, res) => {
    if (!req.params.id) {
        logError({ message: "ID de producto no proporcionado" }, req);
        return res.status(400).json({ error: "ID de producto no proporcionado" });
    }
    try {
    const id = req.params.id;
    const success = await model.deleteProduct(id);
    if (!success) {
      logError({ message: 'Producto no encontrado', id }, req);
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    logInfo(`Producto con ID ${id} eliminado correctamente`, req);
    return res.status(204).send();
  } catch (error) {
    const err = {
      message: 'Error al eliminar producto',
      url: req.url,
      method: req.method,
      details: error.message,
    };
    logError(err, req);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export { getAllProducts, searchProducts, getProductById, createProduct, updateProduct, deleteProduct };