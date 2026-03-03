// const express = require('express')
import express from 'express'
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';
const app = express()
import movierouter from './routes/movieRoutes.js';
import authRouter from './routes/auth.js';
config()
connectDB()
const port = 3000

app.use('/movies', movierouter)
app.use('/auth', authRouter)
app.listen(port, ()=>{
    console.log(`Example app listening on port${port}`)
})