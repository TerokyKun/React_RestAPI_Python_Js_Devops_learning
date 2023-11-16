import mongoose from 'mongoose';
import express from 'express';
import {registerValidator, loginValidator, postCreateValidation} from './Validations/validations.js';
import checkAuth from './utilss/checkAuth.js'


// import {register, login, getMe} from './controllers/UserController.js' либо так импортировать либо

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

// const client = new MongoClient('mongodb://Tero:12345@127.0.0.1:3000/?authMechanism=DEFAULT&directConnection=true');
mongoose
.connect('mongodb://Tero:12345@127.0.0.1:3000/Generate_img?authMechanism=DEFAULT&directConnection=true')
.then(()=> console.log('DB ok 🤖'))
.catch((err)=> console.log('DB error 💀', '\n',err))


const app = express();
app.use(express.json());


app.get('/', (req, res) =>{
    res.send('Hello word!')
});

app.post('/auth/login', loginValidator, UserController.login);
app.post('/auth/registr', registerValidator, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.createPost);
app.get('/posts', PostController.getAllPosts);
app.get('/posts/:id', PostController.getOnePost);
app.get('/post/:id', PostController.getOnePostNoView);
app.delete('/posts/:id', checkAuth, PostController.removePost);
app.patch('/posts/:id', PostController.updatePost);


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
