import express from 'express'

const movierouter = express.Router()

movierouter.get('/', (req, res) =>{
    res.json({
        name:'fza'
    })
})
movierouter.post('/', (req, res) =>{
    res.json({
        name:'fza'
    })
})

export default movierouter