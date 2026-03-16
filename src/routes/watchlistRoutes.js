import express from 'express'
import { addToWatchList, deleteFromWatchList, updateWatchListItem } from '../controllers/watchlistController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js';
import { addToWatchListSchema } from '../validators/watchlistValidators.js';

const watchlistRouter = express.Router()
watchlistRouter.use(authMiddleware);    // to apply middleware/authorization on all the routes existing here
// watchlistRouter.post('/',authMiddleware, addToWatchList)   // to apply middleware/authorization on specific route only

watchlistRouter.post('/',validateRequest(addToWatchListSchema), addToWatchList)

watchlistRouter.delete('/:id', deleteFromWatchList)
watchlistRouter.put('/:id', updateWatchListItem)

export default watchlistRouter