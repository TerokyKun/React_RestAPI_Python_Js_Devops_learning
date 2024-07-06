import mongoose from 'mongoose';

<<<<<<< HEAD
const GallerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Возможно, убрать уникальность из этого поля тоже, если требуется разрешить повторяющиеся заголовки
    },
    data:{
        type: String,
        required: true,
        // Убираем уникальность для поля text
    },
   
    imageUrl: String, // Поправил опечатку в названии поля

    user:{
=======
const ImageSchema = new mongoose.Schema({
    imageName: {
        type: String,
        required: true,
        unique: true, // Уникальное имя для каждого изображения
    },
    imageData: {
        type: Array,
        default: [],
    },
    user: {
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
<<<<<<< HEAD
},
{
    timestamps: true, // Поправил опечатку в timestamps
});

export default mongoose.model('Gaallery', GallerySchema);
=======
}, {
    timestamps: true,
});

export default mongoose.model('Image', ImageSchema);
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
