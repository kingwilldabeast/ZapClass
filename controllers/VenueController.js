const {Venue} = require('../models'); //with models/index.js file
//const Venue = require('../models/Venue'); //without models/index.js file

//Read
const getAllVenues = async (req, res) => {
    try {
        const objectArray = await Venue.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Read
const getVenueById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Venue.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Venue doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Venue doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//create
const createVenue = async (req, res) => {
    try {
        const newObject = await new Venue(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        // if (error.name === 'CastError' && error.kind === 'ObjectId') {
        //     return res.status(404).send(`That Venue doesn't exist`)
        // }
        return res.status(500).json({ error: error.message })
    }
}

//update
const updateVenue = async (req, res) => {
    try {
        let { id } = req.params;
        let changedObject = await Venue.findByIdAndUpdate(id, req.body, { new: true })
        if (changedObject) {
            return res.status(200).json(changedObject)
        }
        throw new Error("Venue not found and can't be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Venue doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

// Function to add event to venue
const addEventToVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndUpdate(
            req.params.id,
            { $push: { eventsHeld: req.body.eventsHeld } },
            { new: true }
        );
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Function to remove event from venue
// const removeEventFromVenue = async (eventId) => {
//     try {
//         await Venue.updateMany(
//             { eventsHeld: eventId },
//             { $pull: { eventsHeld: eventId } }
//         );
//     } catch (error) {
//         console.error('Error removing event from venue:', error.message);
//     }
// };

//delete
const deleteVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const erasedObject = await Venue.findByIdAndDelete(id)
        if (erasedObject) {
            return res.status(200).send("Venue deleted");
        }
        throw new Error("Venue not found and can't be deleted");
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Venue doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllVenues, 
    getVenueById, 
    createVenue, 
    updateVenue, 
    addEventToVenue,
    // removeEventFromVenue,
    deleteVenue,
}