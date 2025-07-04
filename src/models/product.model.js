import fs from 'fs';
import path from 'path'; 

const __dirname = import.meta.dirname

const jsonPath = path.join(__dirname, './product.json');

const json = fs.readFileSync(jsonPath, 'utf-8');
const products = JSON.parse(json);

export const getAllProducts = () => {
    return products;
}

export const createProduct = (data) => {
    const newProduct = {
        id: products.length + 1,
        ...Data
    };

    products.push(newProduct);
    fs.writeFileSync(jsonPath, JSON.stringify(products));
    return newProduct;
}

export const deleteProduct = (id) => {
    const productIndex = products.findIndex((p) => p.id === parseInt(id));
    if (productIndex != -1) {
        products.splice(productIndex, 1);
        
    }else{
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    fs.writeFileSync(jsonPath, JSON.stringify(products));
    return product;
}