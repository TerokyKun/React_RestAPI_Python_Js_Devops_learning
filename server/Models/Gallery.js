import mongoose from 'mongoose';

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, {
    timestamps: true,
});

export default mongoose.model('Image', ImageSchema);
