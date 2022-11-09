const express = require('express');
const path = require('path');
require('dotenv').config()
const todoRoutes = require('./routes/todo');
const sequelize = require('./utils/database');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', todoRoutes);


// Даний middleware завжди перед прослуховуванням порта
app.use( (req, res, next) => {
    res.sendFile('/index.html');    // Через те що папка public в статиці, то сервер бачить цей файл в корні
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