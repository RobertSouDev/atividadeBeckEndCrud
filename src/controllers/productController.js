const ProductModel = require('../models/productModel');

module.exports = {
    getAllProducts: (req, res) => {
        const products = ProductModel.getAllProducts();
        res.json(products);
    },

    getProductById: (req, res) => {
        const productId = parseInt(req.params.id);
        const product = ProductModel.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        res.json(product);
    },

    addProduct: (req, res) => {
        const { nome, preco } = req.body;
        if (!nome || !preco) {
            return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
        }
        const newProduct = ProductModel.addProduct(req.body);
        res.status(201).json(newProduct);
    },

    updateProduct: (req, res) => {
        const productId = parseInt(req.params.id);
        const updatedProduct = ProductModel.updateProduct(productId, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        res.json(updatedProduct);
    },

    deleteProduct: (req, res) => {
        const productId = parseInt(req.params.id);
        const isDeleted = ProductModel.deleteProduct(productId);

        if (!isDeleted) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        res.status(204).end();
    }
};
