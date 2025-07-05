import { logError } from "./../../util.js";

const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;

        if (category) {
            const productsFiltered = products.filter((item) =>
                item.categories.includes(category)
            );

            res.json(productsFiltered);
            return;
        }

        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const searchProducts = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "El nombre es requerido" });
        }

        const productsFiltered = products.filter((item) =>
            item.name.toLowerCase().includes(name.toLowerCase())
        );

        if (productsFiltered.length == 0) {
            return res.status(404).json({ error: "No se encontraron productos" });
        }

        res.json(productsFiltered);
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getProductById = async (req, res) => {
    try {
          const { id } = req.params;
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
} catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
};

const createProduct = async (req, res) => {
    try {
        const { name, price, description, categories } = req.body; //Desestructuración de los campos del body de la solicitud

        if (!name || !price || !description || !categories) { //Verifica que todos los campos estén presentes
            logError({message:"Todos los campos son requeridos"}, req);
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        const newProduct = { //Crea un nuevo producto con los datos proporcionados
            id: products.length + 1, //Asigna un ID único al nuevo producto pero en la base de datos sera generado automáticamente
            name,
            price,
            description,
            categories
        };

        products.push(newProduct);//Agrega el nuevo producto al array de productos o a la base de datos
        res.status(201).json(newProduct); //Devuelve el nuevo producto creado con un código de estado 201 (Creado)
    } catch (error) { //Manejo de errores
        console.error('Error al crear producto:', error);
        logError({message: error}, req);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, categories } = req.body;

        const productIndex = products.findIndex((item) => item.id === parseInt(id));

        if (productIndex === -1) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const updatedProduct = {
            ...products[productIndex],
            name,
            price,
            description,
            categories
        };

        products[productIndex] = updatedProduct;
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteProduct = async (req, res) => {
    try {
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export { getAllProducts, searchProducts, getProductById, createProduct, updateProduct, deleteProduct };