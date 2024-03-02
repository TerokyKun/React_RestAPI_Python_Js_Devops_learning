import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, // Возможно, убрать уникальность из этого поля тоже, если требуется разрешить повторяющиеся заголовки
    },
    text:{
        type: String,
        required: true,
        // Убираем уникальность для поля text
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
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

export default mongoose.model('Post', PostSchema);
