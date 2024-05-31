const {Comic} = require('../models'); //with models/index.js file
//const Comic = require('../models/comic'); //without models/index.js file

//Read
const getAllComics = async (req, res) => {
    try {
        const objectArray = await Comic.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Read
const getComicById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Comic.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Comic doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Comic doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//create
const createComic = async (req, res) => {
    try {
        const newObject = await new Comic(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        // if (error.name === 'CastError' && error.kind === 'ObjectId') {
        //     return res.status(404).send(`That Comic doesn't exist`)
        // }
        return res.status(500).json({ error: error.message })
    }
}

//update
const updateComic = async (req, res) => {
    try {
        let { id } = req.params;
        let changedObject = await Comic.findByIdAndUpdate(id, req.body, { new: true })
        if (changedObject) {
            return res.status(200).json(changedObject)
        }
        throw new Error("Comic not found and can't be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Comic doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//delete
const deleteComic = async (req, res) => {
    try {
        const { id } = req.params;
        const erasedObject = await Comic.findByIdAndDelete(id)
        if (erasedObject) {
            return res.status(200).send("Comic deleted");
        }
        throw new Error("Comic not found and can't be deleted");
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Comic doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllComics, 
    getComicById, 
    createComic, 
    updateComic, 
    deleteComic,
}