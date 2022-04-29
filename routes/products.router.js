const { Router } = require('express');
const faker = require('faker');

const router = Router();

// Products:
router.get('/', (req, res) => {
  const { size } = req.query;
  const productos = [];
  const limit = size || 5;

  for (let i = 0; i < limit; i++) {
    productos.push({
      id: i,
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.lorempixel,
    })

  }
  res.json(productos);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product No.1',
    price: 1000,
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'Product created',
    data: body
  });
})

// Patch: actualizado parcial
// Put: actualizado completo
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'Product updated',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'Product deleted',
    id,
  });
});


module.exports = router;
