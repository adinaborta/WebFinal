const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Routes
// Users API Routes
app.use('/api/users', require(path.join(__dirname, 'routes', 'api', 'users')));





app.get('*', (req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, 'views', '404.html'));
})





const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));