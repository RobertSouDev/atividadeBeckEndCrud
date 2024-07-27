const express = require('express')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const PORT = 3000

const products = [
    { 
        id: 1,
        nome: 'Notebook', 
        preco: 1500
     },
    { 
        id: 2, 
        nome: 'Mouse', 
        preco: 50
     },
    { 
        id: 3,
        nome: 'Teclado', 
        preco: 80 
    }
]
app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id)
    const product = products.find((product) => product.id === productId)

    if (!product) {
        return res.status(404).json({ error: 'Item não encontrado' })
    }

    res.json(product)
})

app.post('/api/products', (req, res) => {
    if (!req.body.nome ||!req.body.preco) {
        return res.status(400).json({ error: 'Nome e preço são obrigatórios' })
    }
    const newProduct = req.body
    newProduct.id = products.length + 1
    products.push(newProduct)
    res.status(201).json(newProduct)
    
}
)

app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id
    const productAtt = req.body


    const productIndex = products.findIndex(product => product.id === parseInt(productId))
    if (productIndex === -1) {
        console.error("Item not found");
        return res.status(404).json({ error: 'Item não encontrado' });
    }

    if (!productId || typeof productAtt !==  "object") {
        console.error("Invalid item");
        return res.status(400).json({ error: 'Item inválido' });

    }

    products[productIndex] = {...products[productIndex],...productAtt }
    res.json( products[productIndex] )
})

app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
        console.error("Item not found");
        return res.status(404).json({ error: 'Item não encontrado' });
    }

    products.splice(productIndex, 1);
    res.status(204).end();
});
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}/api/products`)
})