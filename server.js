const express = require('express')
const cors = require('cors');
const bodyParser = require(`body-parser`)
const logger = require(`morgan`)

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(logger(`dev`))
app.use(express.json()) //added later

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
app.get('/events', EventController.getAllEvents)
app.get('/comics', ComicController.getAllComics)
app.get('/venues', VenueController.getAllVenues)

app.get('/events/:id', EventController.getEventById)
app.get('/comics/:id', ComicController.getComicById)
app.get('/venues/:id', VenueController.getVenueById)

// app.get('/dogsName/:id', dogController.getDogName)
// app.get('/dogsColor/:color', dogController.getDogColor)

//CREATE POST
app.post('/events', EventController.createEvent)
app.post('/comics', ComicController.createComic)
app.post('/venues', VenueController.createVenue)

//UPDATE PUT
app.put('/events/:id', EventController.updateEvent)
app.put('/comics/:id', ComicController.updateComic)
app.put('/venues/:id', VenueController.updateVenue)

//DELETE
app.delete('/events/:id', EventController.deleteEvent)
app.delete('/comics/:id', ComicController.deleteComic)
app.delete('/venues/:id', VenueController.deleteVenue)


//DEFAULT
app.get('*', (req, res) => res.send('404 page not found'))
