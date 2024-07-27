const express = require('express')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const PORT = 3000

const estoque = [
    { id: 1, nome: 'Notebook', preco: 1500 },
    { id: 2, nome: 'Mouse', preco: 50 },
    { id: 3, nome: 'Teclado', preco: 80 }
]
app.get('/estoque', (req, res) => {
    res.json(estoque)
})

app.post('/estoque', (req, res) => {
    if (!req.body.nome ||!req.body.preco) {
        return res.status(400).json({ error: 'Nome e preço são obrigatórios' })
    }
    const novoItem = req.body
    novoItem.id = estoque.length + 1
    estoque.push(novoItem)
    res.status(201).json(novoItem)
    
}
)

app.put('/estoque/:id', (req, res) => {
    const id = req.params.id
    const itemAtt = req.body


    const itemIndex = estoque.findIndex(item => item.id === parseInt(id))
    if (itemIndex === -1) {
        console.error("Item not found");
        return res.status(404).json({ error: 'Item não encontrado' });
    }

    if (!itemAtt || typeof itemAtt !==  "object") {
        console.error("Invalid item");
        return res.status(400).json({ error: 'Item inválido' });

    }

    estoque[itemIndex] = {...estoque[itemIndex],...itemAtt }
    res.json(estoque[itemIndex])
})

app.delete('/estoque/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = estoque.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        console.error("Item not found");
        return res.status(404).json({ error: 'Item não encontrado' });
    }

    estoque.splice(itemIndex, 1);
    res.status(204).end();
});
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`)
})