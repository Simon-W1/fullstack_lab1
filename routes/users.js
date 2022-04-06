const User = require("../models/user")
const express = require("express")
const router = express.Router()
module.exports = router

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Creating a user
router.post("/", async (req, res) => {
    let userExists = await User.exists({ name: req.body.name })
    if (userExists) {
        res.status(409).json({ message: "Name is already in use"})
        return
    }

    const user = new User({
        name: req.body.name,
        age: req.body.age
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get("/:id", getUser, (req, res) => {
    res.json(res.user)
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: "User does not exist" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.user = user
    next()
}

router.put("/:id", getUser, async (req, res) => {
    let userExists = await User.exists({ name: req.body.name })
    if (userExists) {
        res.status(409).json({ message: "Name is already in use"})
        return
    }

    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.age != null) {
        res.user.age = req.body.age
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: "User deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})