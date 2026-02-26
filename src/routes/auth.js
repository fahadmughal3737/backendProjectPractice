import express from 'express'

const authRouter = express.Router()

authRouter.post('/login', (req, res) =>{
    res.json({
        name:'fzzzza'
    })
})
authRouter.post('/signup', (req, res) =>{
    res.json({
        name:'fzazzz'
    })
})

export default authRouter