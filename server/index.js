import mongoose from 'mongoose';
import multer from 'multer';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { ImageController } from './controllers/index.js';
import { UserController, PostController } from './controllers/index.js';
import { registerValidator, loginValidator, postCreateValidation } from './Validations/validations.js';
import { handleValidationErrors, checkAuth } from './utilss/index.js';

mongoose.connect('mongodb://Tero:12345@127.0.0.1:3056/Generate_img?authMechanism=DEFAULT&directConnection=true')
    .then(() => console.log('DB ok 🤖'))
    .catch((err) => console.log('DB error 💀', '\n', err));

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Настройка статической папки для обслуживания файлов
app.use('/uploads', express.static('uploads'));

app.post('/sendoption', async (req, res) => {
    try {
        await axios.post('http://127.0.0.1:7860/sdapi/v1/options', req.body);
        res.status(200).send('Option sent successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred!');
    }
});

// Обработчик для сохранения изображения
app.post('/createimg', checkAuth, ImageController.createImage);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/tags', PostController.getLastTags);

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login);
app.post('/auth/registr', registerValidator, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.createPost);
app.get('/posts', PostController.getAllPosts);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOnePost);
app.get('/post/:id', PostController.getOnePostNoView);
app.delete('/posts/:id', checkAuth, PostController.removePost);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.updatePost);



app.get('/imgdata', checkAuth, UserController.getAll);
app.get('/myImg', checkAuth, ImageController.sendImage);
app.delete('/deleteImg', checkAuth, ImageController.deleteImg);


app.listen(4000, (err) => {
    if (err) {
        return console.log('Server error 👀', '\n', err);
    }
    console.log('Server OK❤️');
});
