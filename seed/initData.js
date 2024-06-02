const db = require('../db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const { Event, Comic, Venue } = require('../models') //with models/index.js

const resetCollections = async () => {
    try {
        await Event.deleteMany({});
        await Comic.deleteMany({});
        await Venue.deleteMany({});
        console.log('All collection reset');
    } catch (error) {
        console.error('Error resetting collections:', error);
    }
};

const main = async () => {

    await resetCollections();   

    const eventObjects = [
        {
            name: "Laughs Improv",
            type: "show", //show or mic
            logo: "logo1.png",
            location: "123 Main St",
            time: "7 PM",
            weekday: "Friday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        }
    ]
    const eventArray = await Event.insertMany(eventObjects)
    console.log(`Created ${eventArray.length} events!`)
  
    const comicObjects = [
        {
            name: "Kyle James",
            headshot: "headshot.png",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[0]._id]
        },
        {
            name: "Billy Bob",
            headshot: "headshot.png",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[0]._id]
        }
    ]
    const comicArray = await Comic.insertMany(comicObjects)
    console.log(`Created ${comicArray.length} Comics!`)
  
    const venueObjects = [
        {
            name: "Lucky Dog",
            address: "456 Eart St",
            capacity: 56,
            eventsHeld: [eventArray[0]._id]
        }
    ]
    const venueArray = await Venue.insertMany(venueObjects)
    console.log(`Created ${venueArray.length} venues!`)
  
    //add hosts back to event
    for (const comic of comicArray) {
        console.log(`the comedian is ${comic.name}`)
        for (const event of comic.eventsHosted) {
            console.log(`${comic.name} hosts ${event}`)
            const show = await Event.findById(event)
            show.hosts.push(comic._id)
            await show.save()
            console.log(`hosts ${comic.name} linked to ${event}`);
        }
    }

    //add venue back to event
    for (const venue of venueArray) {
        console.log(`the venue is ${venue.name}`)
        for (const event of venue.eventsHeld) {
            console.log(`${venue.name} is venue for ${event}`)
            const show = await Event.findById(event)
            show.venue = venue._id
            await show.save()
            console.log(`Venue ${venue.name} linked to ${event}`);
        }
    }

}

const run = async () => {
    await main()
    db.close()
  }
  
  run()