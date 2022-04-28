const express = require('express');
const faker = require('faker');

const app = express();
const PORT = 3000;

const products = [
  {
    id: 1,
    name: 'Product No.1',
    price: 1000,
  },
  {
    id: 2,
    name: 'Product No.2',
    price: 2000,
  },
];

// Products:
app.get('/products', (req, res) => {
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

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((prod) => prod.id === Number(id));
  res.json(product);
});

// Categories:
app.get('/categories', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Clothes',
    },
    {
      id: 2,
      name: 'Electronics',
    },
  ]);
});

app.get('/categories/:categoryId/products/:prodoctId', (req, res) => {
  const { categoryId, prodoctId } = req.params;
  res.json({ categoryId, prodoctId });
});

// Users:
app.get('/users', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Paola Alapizco',
      username: 'pahoalapizco',
    },
    {
      id: 2,
      name: 'David Lopez',
      username: 'davidcorp',
    },
  ]);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Paola Alapizco',
    username: 'pahoalapizco',
  });
});

// users - orders
app.get('/users/:userId/orders', (req, res) => {
  res.json([
    {
      id: 1,
      date: '28/04/2022',
      totalItems: 2,
      total: 1000,
    },
  ]);
});

app.get('/users/:userId/orders/:orderId', (req, res) => {
  const { userId, orderId } = req.params;
  res.json({
    userId,
    orderId,
    date: '28/04/2022',
    totalItems: 2,
    items: products,
    total: 1000,
  });
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
