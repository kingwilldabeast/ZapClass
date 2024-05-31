const express = require('express')
const cors = require('cors');
const bodyParser = require(`body-parser`)
const logger = require(`morgan`)

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(logger(`dev`))

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

//FILEPATHS
const EventController = require('./controllers/EventController')
const ComicController = require('./controllers/ComicController')
const VenueController = require('./controllers/VenueController')

//LANDING PAGE
app.get('/', (req, res) => res.send('This is our landing page!'))

//READ GET 
app.get('/event', EventController.getAllEvents)
app.get('/comic', ComicController.getAllComics)
app.get('/venue', VenueController.getAllVenues)

app.get('/event/:id', EventController.getEventById)
app.get('/comic/:id', ComicController.getComicById)
app.get('/venue/:id', VenueController.getVenueById)

// app.get('/dogsName/:id', dogController.getDogName)
// app.get('/dogsColor/:color', dogController.getDogColor)

//CREATE POST
app.post('/event', EventController.createEvent)
app.post('/comic', ComicController.createComic)
app.post('/venue', VenueController.createVenue)

//UPDATE PUT
app.put('/event/:id', EventController.updateEvent)
app.put('/comic/:id', ComicController.updateComic)
app.put('/venue/:id', VenueController.updateVenue)

//DELETE
app.delete('/event/:id', EventController.deleteEvent)
app.delete('/comic/:id', ComicController.deleteComic)
app.delete('/venue/:id', VenueController.deleteVenue)


//DEFAULT
app.get('*', (req, res) => res.send('404 page not found'))
