import {body} from 'express-validator'

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min:5}),
    body('nickName','Укажите имя').isLength({min: 2}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional(),

]

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min:5}),
]

export const postCreateValidation = [
    body('title').isLength({min: 3}).isString(),
    body('text').isLength({min:10}).isString(),
    body('tags').optional().isArray(),
    body('imegeURl').optional().isString(),
    
]
