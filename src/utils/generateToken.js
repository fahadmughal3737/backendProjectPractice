import jwt from 'jsonwebtoken'

export const generateToken = (userID, res) => {
    console.log("res res for user ID:", res)
        console.log("res res for user ID:", res.cookie)

    const payload = { id: userID }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    })
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * (24 * 60 * 60 * 1000), // 7 days
    })
    return token
}

