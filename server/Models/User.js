import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        require: true,
    },
    avatarUrl: String,
},
{
    timestaps: true,
});

export default mongoose.model('User', UserSchema);