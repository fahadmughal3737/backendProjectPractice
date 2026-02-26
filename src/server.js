// const express = require('express')
import express from 'express'
const app = express()
import movierouter from './routes/movieRoutes.js';
import authRouter from './routes/auth.js';
const port = 3000

app.use('/movies', movierouter)
app.use('/auth', authRouter)
app.listen(port, ()=>{
    console.log(`Example app listening on port${port}`)
})