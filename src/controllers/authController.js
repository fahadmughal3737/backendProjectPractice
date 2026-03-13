import { prisma } from "../config/db.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";
const register = async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    })
    if (userExists) {
        return res
            .status(400)
            .json({
                error: "User already exists with this email"
            })
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Create User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })
    res
        .status(201)
        .json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: name,
                    email: email,
                }
            }
        })
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: { email: email }
    })
    if (!user) {
        return res
            .status(400)
            .json({
                error: "Invalid email or password"
            })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res
            .status(400)
            .json({
                error: "Invalid email or password"
            })
    }
    console.log("user user:", user.id)

    const token = generateToken(user.id, res)
    console.log("Generated Token:", token)
    res
        .status(200)
        .json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                },
                token: token
            }
        })
}
const logout = (req, res) => {
    // res.clearCookie("jwt", {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    // })
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0) // Set cookie to expire immediately
    })
    res.status(200).
        json({
            status: "success",
            message: "Logged out successfully"
        })
}
export { register, login, logout }