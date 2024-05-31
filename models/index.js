const mongoose = require('mongoose')
const eventSchema = require('./event')
const comicSchema = require('./comic')
const venueSchema = require('./venue')

//convert schema to model with the same name

const Event = mongoose.model('event_id', eventSchema)
const Comic = mongoose.model('comic_id', comicSchema)
const Venue = mongoose.model('venue_id', venueSchema)

module.exports = {
    Event,
    Comic,
    Venue
  }
  