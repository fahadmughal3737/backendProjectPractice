import { prisma } from "../config/db.js"
const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body

    // Verify if movie even exists in the database or not
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    })
    if (!movie) {
        return res
            .status(404)
            .json({
                error: "Movie not found"
            })
    }
    // Check if the movie is already in the user's watchlist

    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId,
            }
        }
    })
    if (existingInWatchlist) {
        return res.status(400).json({
            error: "Movie is already in the user's watchlist"
        })
    }
    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    })
    res
        .status(201)
        .json({
            status: "success",
            data: {
                watchlistItem
            }
        })
}

const deleteFromWatchList = async (req, res) => {
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: {
            id: req.params.id
        }
    })
    if (!watchlistItem) {
        return res.status(404).json({
            error: "Watchlist item not found"
        })
    }
    if(watchlistItem.userId !== req.user.id) {
        return res.status(403).json({
            error: "Unauthorized to delete this watchlist item"
        })
    }
    await prisma.watchlistItem.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
        status: "success",
        message: "Movie removed from watchlist"
    })
}

const updateWatchListItem = async (req, res) => {
    const {status, rating, notes} = req.body
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where:{
            id:req.params.id
        }
    })
    if (!watchlistItem){
        return res.status(404).json({
            error:"Watchlist item not found"
        })
    }
    if(watchlistItem.userId !== req.user.id) {
        return res.status(403).json({
            error: "Unauthorized to update this watchlist item"
        })
    }
    const updataData = {}
    if(status) {
        updataData.status = status.toUpperCase()
    }
    if(rating) {
        updataData.rating = rating
    }
    if(notes) {
        updataData.notes = notes
    }
    const updatedItem = await prisma.watchlistItem.update({
        where: {
            id: req.params.id
        },
        data: updataData
    })
    res.status(200).json({
        status: "success",
        data: {
            watchlistItem: updatedItem
        }
    })
}

export { addToWatchList, deleteFromWatchList, updateWatchListItem }