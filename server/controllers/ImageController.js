import axios from 'axios';
import ImageModel from '../Models/Gallery.js';
import { v4 as uuidv4 } from 'uuid';
import fs, {createReadStream} from 'fs';
import path from 'path';


const base64ToPng = (base64Data, filePath) => {
    const base64Image = base64Data.split(';base64,').pop();
    console.log(path.parse(filePath).dir);
    fs.mkdirSync(path.parse(filePath).dir, { recursive: true }, (err) => {
        if (err) {
            console.log("Иди нахуй долбоеб")
        }
    });
    fs.writeFile(filePath, base64Image, { encoding: 'base64' }, (err) => {
        if (err) {
            console.log(err)
        }
    });
    
};


export const createImage = async (req, res) => {
    let nameIMG = uuidv4();
    try {
        const response = await axios.post('http://127.0.0.1:7860/sdapi/v1/txt2img', req.body);
     

        // Создаем новый объект изображения для сохранения в базе данных
        const doc = new ImageModel({
            imageName: nameIMG, // Генерируем уникальное имя для изображения
            imageData: response.data.info, // Предполагаем, что ответ содержит URL изображения
            user: req.userId, // Предполагаем, что у тебя есть аутентифицированный пользователь и у тебя есть доступ к его ID через req.user._id
        })
        const post = await doc.save();

   
   // Отправляем результат на клиентскую часть
             
   res.json(response.data);
   base64ToPng(response.data.images[0], `uploads/${req.userId}/${nameIMG}.png`);
   
   
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred!');
    }
}


export const sendImage = async (req, res) => {

    const nameIMG = req.params.img;
    const userId = req.userId;

    res.status(200)
    res.contentType('image/png')
    createReadStream(`uploads/${userId}/${nameIMG}.png`).pipe(res);
}



export const getUserImages = async (req, res) => {
    try {
        const userId = req.userId;
        const userDir = path.join('uploads', userId.toString());

        // Fetch image data from the database
        const images = await ImageModel.find({ user: userId });

        // Read the files from the user's upload directory
        const files = fs.readdirSync(userDir);

        // Combine the data
        const imagesWithPaths = images.map(image => {
            const filePath = path.join(userDir, `${image.imageName}.png`);
            return {
                imageName: image.imageName,
                imageData: image.imageData,
                imagePath: `/uploads/${userId}/${image.imageName}.png`
            };
        });

        res.json(imagesWithPaths);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить изображения",
        });
    }
};


export const deleteImg = async (req, res) => {
    const { imageName } = req.body; // Предполагаем, что имя изображения передается в теле запроса
    const userId = req.userId;

    try {
        // Находим изображение в базе данных
        const image = await ImageModel.findOne({ imageName, user: userId });
        if (!image) {
            return res.status(404).json({ message: 'Изображение не найдено' });
        }

        // Определяем путь к изображению
        const imagePath = path.join('uploads', userId.toString(), `${imageName}.png`);

        // Проверяем, существует ли файл, и удаляем его
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        } else {
            return res.status(404).json({ message: 'Файл изображения не найден' });
        }

        // Удаляем запись об изображении из базы данных
        await ImageModel.deleteOne({ imageName, user: userId });

        res.status(200).json({ message: 'Изображение успешно удалено' });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ message: 'Произошла ошибка' });
    }
};