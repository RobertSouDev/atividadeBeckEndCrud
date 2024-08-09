let products = [
    { id: 1, nome: 'Notebook', preco: 1500 },
    { id: 2, nome: 'Mouse', preco: 50 },
    { id: 3, nome: 'Teclado', preco: 80 }
];

module.exports = {
    getAllProducts: () => products,
    getProductById: (id) => products.find(product => product.id === id),
    addProduct: (product) => {
        product.id = products.length + 1;
        products.push(product);
        return product;
    },
    updateProduct: (id, updatedProduct) => {
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            products[productIndex] = {...products[productIndex], ...updatedProduct};
            return products[productIndex];
        }
        return null;
    },
    deleteProduct: (id) => {
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            return true;
        }
        return false;
    }
};
