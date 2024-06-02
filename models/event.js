const { Schema } = require('mongoose')

const eventSchema = new Schema(
    {
        name: {type: String, required: true},
        type: {type: String, required: true}, //show or mic
        logo: {type: String},
        location: {type: String, required: true},
        time: {type: String, required: true},
        weekday: {type: String, required: true},
        frequency: {type: String, required: true},
        details: {type: String},
        link: {type: String},
        hosts: [{type: Schema.Types.ObjectId, ref: 'comic_id'}],
        venue: {type: Schema.Types.ObjectId, ref: 'venue_id'}
    },
    {timestamps: true}

)

//exporting this 
module.exports = eventSchema
