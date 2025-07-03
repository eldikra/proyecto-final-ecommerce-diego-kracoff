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
// Trae todos los productos de la tienda en línea.

router.get("/products", getAllProducts);

// Permite filtrar, buscar y listar productos.
router.get("/products/search", searchProducts);
router.get("/products/:id", getProductById)

//Crear nuevos productos para la tienda en línea.
router.post("/products", createProduct);

// Actualizar parcial o totalmente un producto.
router.put("/products/:id", updateProduct);

// Eliminar productos mediante id.
router.delete("/products/:id",deleteProduct)

export default router;