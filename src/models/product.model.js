import fs from 'fs';
import path from 'path';
import { logError } from '../../util.js';
const __dirname = import.meta.dirname
const jsonPath = path.join(__dirname, './product.json');
const json = fs.readFileSync(jsonPath, 'utf-8');
const products = JSON.parse(json);

export const getAllProducts = () => {
    return products;
}
export const createProduct = (producto) => {
    const newProduct = {
        id: products.length + 1,
        ...producto
    };

    products.push(newProduct);
    fs.writeFileSync(jsonPath, JSON.stringify(products));
    return newProduct;
}
export const deleteProduct = (id) => {
    console.log('ID del producto a eliminar:', id); // Imprime el ID del producto a eliminar
    const productIndex = products.findIndex((item) => item.id === id);// Busca el índice del producto por ID
    console.log('Índice del producto a eliminar:', productIndex); // Imprime el índice del producto a eliminar
    if (productIndex != -1) {// Si el producto existe
        const product = products.splice(productIndex, 1);// Elimina el producto del array
        console.log(`Producto eliminado: ${product[0].name}`);// Imprime el nombre del producto eliminado
        fs.writeFileSync(jsonPath, JSON.stringify(products));
        return product;
    } else {
        logError({ message: "Producto no encontrado" }, req);
        return res.status(404).json({ error: "Producto no encontrado" });
    }


}
export const getProductById = (id) => {
    const product = products.find((item) => item.id == id);// Busca el producto por ID
    return product;
}
export const updateProduct = (id, updatedProduct) => {
    products[id] = { ...products[id], ...updatedProduct };
    fs.writeFileSync(jsonPath, JSON.stringify(products));
    return products[id];
}
