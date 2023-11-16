import PostModel from '../Models/Post.js';


export const getOnePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: "Статья не найдена",
            });
        }

        res.json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось выполнить запрос",
        });
    }
}

export const getOnePostNoView = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await PostModel.findOne(
            { _id: postId },
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: "Статья не найдена",
            });
        }

        res.json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось выполнить запрос",
        });
    }
}


export const getAllPosts = async (req, res) =>{
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось выполнить запрос",})
    }
}


export const createPost = async (req, res)=>{
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,

        })

        const post = await doc.save();

        res.json(post);
    } catch (err) {
         console.log(err);
        res.status(500).json({
            message: "Не удалось создать статью",})
    }
    };


export const removePost = async (req, res) => {
        try {
            const postId = req.params.id;
            const deletedPost = await PostModel.findByIdAndDelete(postId);
    
            if (!deletedPost) {
                return res.status(404).json({
                    message: "Статья не найдена",
                });
            }
    
            res.json({
                success: true,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Не удалось выполнить запрос",
            });
        }
    };

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id:postId,
        }, {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
        });
        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось обновить статью",
        });
    }   
}