import mongoose from 'mongoose';
import multer from 'multer';
import express from 'express';
<<<<<<< HEAD
import {registerValidator, loginValidator, postCreateValidation} from './Validations/validations.js';

import cors from 'cors';



// import {register, login, getMe} from './controllers/UserController.js' либо так импортировать либо
// export * as UserController from './UserController.js';

import {UserController, PostController} from './controllers/index.js';

import {handleValidationErrors, checkAuth} from './utilss/index.js';

// const client = new MongoClient('mongodb://Tero:12345@127.0.0.1:3000/?authMechanism=DEFAULT&directConnection=true');
mongoose
.connect('mongodb://Tero:12345@127.0.0.1:3056/Generate_img?authMechanism=DEFAULT&directConnection=true')
.then(()=> console.log('DB ok 🤖'))
.catch((err)=> console.log('DB error 💀', '\n',err))


const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
       cb(null, file.originalname);
    }
});

const upload = multer({storage})



app.use(express.json());


app.get('/', (req, res) =>{
    res.send('Hello word!')
});

app.get('/tags', PostController.getLastTags)

app.post('/auth/login', loginValidator,  handleValidationErrors,  UserController.login);
app.post('/auth/registr', registerValidator,  handleValidationErrors, UserController.register);
=======
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
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.createPost);
app.get('/posts', PostController.getAllPosts);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOnePost);
app.get('/post/:id', PostController.getOnePostNoView);
app.delete('/posts/:id', checkAuth, PostController.removePost);
<<<<<<< HEAD
app.patch('/posts/:id',checkAuth, postCreateValidation, PostController.updatePost);


app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.newName}`
    });
});

app.use('/uploads', express.static('uploads'));


app.listen(4000, (err)=>{
    if(err) {
        return console.log('Server error 👀', '\n',err)
    }
    console.log('Server OK❤️')
})













// const start = async () => {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');

//         const db = client.db('Generate_img');
//         const collection = db.collection('user');

//         const users = await collection.find({}).toArray();
//         console.log('Users:', users);
        
//     } catch (e) {
//         console.error(e);
//     } 
// }

// start();
=======
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
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
