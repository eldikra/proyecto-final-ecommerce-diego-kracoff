import express from 'express';
const router = express.Router();
import { 
  getAllProducts, 
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

router.get("/products", getAllProducts);// Trae todos los productos de la tienda en línea.
router.get("/products/search", searchProducts);// Permite filtrar, buscar y listar productos.
router.get("/products/:id", getProductById);// Obtiene un producto por su ID.
router.post("/products", createProduct);// Crea nuevos productos para la tienda en línea.
router.put("/products/:id", updateProduct);// Actualizar parcial o totalmente un producto.
router.delete("/products/:id", deleteProduct);// Eliminar productos mediante id.

export default router;