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

export { addToWatchList }