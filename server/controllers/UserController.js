import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
<<<<<<< HEAD

=======
import ImageModel from '../Models/Gallery.js';
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)

import UserModel from '../Models/User.js';



export const register = async (req, res)=>{
    try {
       
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        const doc = new UserModel({
            email:req.body.email,
            nickName:req.body.nickName,
            avatarUrl:req.body.avatarUrl,
            passwordHash: hash,
        });
        
        const user = await doc.save();
    
        const token = jwt.sign({
            _id: user._id,
        }, 'fsgdtgsuyfvgy43526',
        {
            expiresIn: '30d',
    
        })
        
        const {passwordHash, ... userData} = user._doc
        
        res.json({
            ... userData,
            token
        });
    
    
    
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегистрировать",
        });
    }
    };

export const login =async (req, res)=> {
    try {
        const user = await UserModel.findOne({email: req.body.email });

        if (!user) {
            return req.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isVakidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isVakidPass) {
            return req.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'fsgdtgsuyfvgy43526',
        {
            expiresIn: '30d',
    
        })

        const {passwordHash, ... userData} = user._doc
    
        res.json({
            ... userData,
            token
        });
    
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться",
        });
    }
};

export const getMe =  async (req,res)=>{
    try {
 const user = await UserModel.findById(req.userId);
 
 if (!user) {
     return res.status(404).json({
         message: "Нет такого пользователя",
     })
 }
 
 const {passwordHash, ... userData} = user._doc
     
 res.json(userData);
 
    } catch (err) {
     console.log(err);
     res.status(500).json({
         message: "Нет доступа",
     });
 }
<<<<<<< HEAD
    };
=======
    };



    

    

    export const getAll = async (req, res) => {
        try {
            const userId = req.userId;
            const images = await ImageModel.find({ user: userId });
            
            const imageData = images.map(image => {
                return {
                    imageName: image.imageName,
                    imagePath: `/uploads/${userId}/${image.imageName}.png`,
                    imageData: image.imageData, // извлекаем дополнительные данные об изображении из модели
                    createdAt: image.createdAt, // Добавляем дату создания изображения
                };
            });
    
            console.log('Image data:', imageData); // Выводим результат в консоль
    
            res.json(imageData);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Не удалось получить изображения",
            });
        }
    };
    
    
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
