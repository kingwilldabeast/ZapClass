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
            logo: "https://images.ctfassets.net/6pezt69ih962/4YCFQWuXSrI6rMihbksALf/f85835075208d5e71efb4d19cb3236c9/shulz.jpg?h=1000&fm=webp&q=90",
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
            headshot: "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[0]._id]
        },
        {
            name: "Billy Bob",
            headshot: "https://christophertoddstudios.com/wp-content/uploads/2022/12/DuqueLaw-3-998x1024.jpg",
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