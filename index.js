const express = require('express');
const path = require('path');
require('dotenv').config()
const todoRoutes = require('./routes/todo');
const sequelize = require('./utils/database');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/todo', todoRoutes);


// Даний middleware завжди перед прослуховуванням порта
app.use( (req, res, next) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

async function start() {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}...`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();