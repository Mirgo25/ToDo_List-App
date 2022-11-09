const {Router} = require('express');
const Todo = require('../models/todo');

const router = Router();

// Отримання всіх задач
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.status(200).json(todos);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// Створення нової задачі
router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,          // Функція fetch з фронтенда (з функції addTodo) передала body в якому title
            done: false
        })
        res.status(201).json({todo});       // Response
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// Зміна певної задачі
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(+req.params.id);
        todo.done = req.body.done;      // Функція fetch з фронтенда (з функції completeTodo) передала body в якому done: true
        await todo.save();
        res.status(200).json({todo});   // Повертаємо response зі статусом 200 на фронтенд з json об'єкт todo 
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// Видалення певної задачі
router.delete('/:id', async (req, res) => {
    try {
        const todos = await Todo.findAll({
            where: {                        // Для прикладу: як використовувати умову WHERE 
                id: +req.params.id
            }
        });                     
        const todo = todos[0];
        await todo.destroy();
        res.status(204).json({});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

module.exports = router;