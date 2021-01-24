const Post = require('../models/post')


/*------------- Creation sauce +enregistrement BDD ----------*/
exports.createPosts = (req, res, next) => {
    const postObject = JSON.parse(req.body.post) //Le format de la req a été obligatoirement changé (multer) pour pvr envoyer un fichier avec la req.
    delete postObject._id
    Post.create({
            userPseudo: req.body.userPseudo,
            title: req.body.title,
            content: req.body.content
        })
        .then(() => res.status(201).json({
            message: 'Post créé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

/*-------------- Recupération d'un sauce -----------*/
exports.getOnePost = (req, res, next) => {
    Post.findOne({
            _id: req.params.id
        })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({
            error
        }));
};