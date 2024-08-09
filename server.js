const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/products`);
});
