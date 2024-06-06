//CHILD schema that references parent by ID

const { Schema } = require('mongoose')

const venueSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        image: { type: String},
        capacity: { type: Number, required: true },
        eventsHeld: [{ type: Schema.Types.ObjectId, ref: 'event_id' }],
        // eventNamesHeld: [{ type: String} ]
    },
    {timestamps: true}

)

//exporting 
module.exports = venueSchema
