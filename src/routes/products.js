import express from 'express';
const router = express.Router();
export { router };

router.get("/products", (req, res) => {
  const { category } = req.query;

  if (category) {
    const productsFiltered = products.filter((item) =>
      item.categories.includes(category)
    );

    res.json(productsFiltered);
    return;
  }

  res.json(products);
});

router.get("/products/search", (req, res) => {
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
});
router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
});