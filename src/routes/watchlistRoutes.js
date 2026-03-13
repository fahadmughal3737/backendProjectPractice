import express from 'express'
import { addToWatchList } from '../controllers/watchlistController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const watchlistRouter = express.Router()
watchlistRouter.use(authMiddleware);    // to apply middleware/authorization on all the routes existing here
// watchlistRouter.post('/',authMiddleware, addToWatchList)   // to apply middleware/authorization on specific route only

watchlistRouter.post('/', addToWatchList)

export default watchlistRouter