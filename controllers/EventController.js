const {Event} = require('../models'); //with models/index.js file
//const Event = require('../models/event'); //without models/index.js file

//Read
const getAllEvents = async (req, res) => {
    try {
        const objectArray = await Event.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Read
const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Event.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Event doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Event doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}


//get attributes
//like the events held array?

//create
const createEvent = async (req, res) => {
    try {
        const newObject = await new Event(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        // if (error.name === 'CastError' && error.kind === 'ObjectId') {
        //     return res.status(404).send(`That Event doesn't exist`)
        // }
        return res.status(500).json({ error: error.message })
    }
}

//update
const updateEvent = async (req, res) => {
    try {
        let { id } = req.params;
        let changedObject = await Event.findByIdAndUpdate(id, req.body, { new: true })
        if (changedObject) {
            return res.status(200).json(changedObject)
        }
        throw new Error("Event not found and can't be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Event doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//delete
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const erasedObject = await Event.findByIdAndDelete(id)
        if (erasedObject) {
            return res.status(200).send("Event deleted");
            //remove event ID from venue's array of event ID
            //NOTE Venue is required on line 1
            // await Venue.updateMany(
            //     { eventsHeld: id },
            //     { $pull: { eventsHeld: id } }
            // );
    
        }

        
        throw new Error("Event not found and can't be deleted");
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Event doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllEvents, 
    getEventById, 
    createEvent, 
    updateEvent, 
    deleteEvent,
}