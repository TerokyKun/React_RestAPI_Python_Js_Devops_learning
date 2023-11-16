import {body} from 'express-validator'

export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({min:5}),
    body('nickName').isLength({min: 2}),
    body('avatarUrl').optional().isURL(),

]

export const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({min:5}),
]

export const postCreateValidation = [
    body('title').isLength({min: 3}).isString(),
    body('text').isLength({min:10}).isString(),
    body('tags').optional().isArray(),
    body('imegeURl').optional().isString(),
    
]
