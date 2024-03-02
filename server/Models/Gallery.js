import mongoose from 'mongoose';

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    timestamps: true, // Поправил опечатку в timestamps
});

export default mongoose.model('Gaallery', GallerySchema);
