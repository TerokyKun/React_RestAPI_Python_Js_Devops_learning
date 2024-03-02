import mongoose from 'mongoose';
import multer from 'multer';
import express from 'express';
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
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.createPost);
app.get('/posts', PostController.getAllPosts);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOnePost);
app.get('/post/:id', PostController.getOnePostNoView);
app.delete('/posts/:id', checkAuth, PostController.removePost);
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
