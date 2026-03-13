// const express = require('express')
import { config } from 'dotenv';
import express from 'express'
import { connectDB, disconnectDB } from './config/db.js';
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
import movierouter from './routes/movieRoutes.js';
import authRouter from './routes/authRoutes.js';
import watchlistRouter from './routes/watchlistRoutes.js';
config()
connectDB()
const port = 3000

app.use('/movies', movierouter)
app.use('/auth', authRouter)
app.use('/watchlist', watchlistRouter)
app.listen(port, () => {
    console.log(`Example app listening on port${port}`)
})