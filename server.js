const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for products (simulating backend data)
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Air Max Runner', price: 149, category: 'Men' },
        { id: 2, name: 'Dunk Low Retro', price: 115, category: 'Women' },
        { id: 3, name: 'Air Max 270', price: 160, category: 'Kids' }
    ];
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
