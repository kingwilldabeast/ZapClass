//CHILD schema that references parent by ID

const { Schema } = require('mongoose')

const comicSchema = new Schema(
    {
        name: { type: String, required: true },
        headshot: { type: String, required: true },
        clip: { type: String, required: true },
        eventsHosted: [{ type: Schema.Types.ObjectId, ref: 'event_id' }]
        //eventNamesHosted: [{ type: String} ]

    },
    {timestamps: true}

)

//exporting 
module.exports = comicSchema
