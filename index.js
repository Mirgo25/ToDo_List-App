const express = require('express');
const path = require('path');
const todoRoutes = require('./routes/todo');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', todoRoutes);


// Даний middleware завжди перед прослуховуванням порта
app.use( (req, res, next) => {
    res.sendFile('/index.html');    // Через те що папка public в статиці, то сервер бачить цей файл в корні
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});