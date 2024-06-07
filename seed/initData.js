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
            name: "Haha Show",
            type: "mic", //show or mic
            logo: "https://i0.wp.com/www.atlantaonthecheap.com/wp-content/uploads/2019/03/comedy-show-e1551978605663.jpg?resize=600%2C399&ssl=1",
            location: "477 Main St",
            time: "7 PM",
            weekday: "Sunday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Laughs Improv",
            type: "show", //show or mic
            logo: "https://runaces.com/wp-content/uploads/2021/07/Comedy-Shows_1170x600-1024x525.jpg",
            location: "274 Spencer St",
            time: "7 PM",
            weekday: "Sunday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Crazyhorse",
            type: "mic", //show or mic
            logo: "https://www.hudsonnh.gov/sites/default/files/styles/gallery500/public/imageattachments/recreation/page/42738/original-comedy.jpg?itok=S_Qv_UOJ",
            location: "8600 3rd St",
            time: "7 PM",
            weekday: "Sunday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Good Time Show",
            type: "mic", //show or mic
            logo: "https://i0.wp.com/www.atlantaonthecheap.com/wp-content/uploads/2019/03/comedy-show-e1551978605663.jpg?resize=600%2C399&ssl=1",
            location: "366 Elm St",
            time: "8 PM",
            weekday: "Sunday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Split Your Pants",
            type: "show", //show or mic
            logo: "https://runaces.com/wp-content/uploads/2021/07/Comedy-Shows_1170x600-1024x525.jpg",
            location: "85 Lloyd St",
            time: "7 PM",
            weekday: "Sunday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Ice Box",
            type: "mic", //show or mic
            logo: "https://www.hudsonnh.gov/sites/default/files/styles/gallery500/public/imageattachments/recreation/page/42738/original-comedy.jpg?itok=S_Qv_UOJ",
            location: "79 Main St",
            time: "7 PM",
            weekday: "Sunday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Downtown Fun",
            type: "show", //show or mic
            logo: "https://www.shutterstock.com/image-vector/comedy-show-theater-scene-red-600nw-1069556927.jpg",
            location: "504 6th St",
            time: "7 PM",
            weekday: "Friday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Lazy Oaf",
            type: "mic", //show or mic
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23mTw-qN_zGXfUluzHWcZdlnGS5MBRPVb3kQ-cSMbA-ULIMIECqkkRHpSWAFblKpe8iU&usqp=CAU",
            location: "123 Main St",
            time: "7 PM",
            weekday: "Friday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Funday",
            type: "show", //show or mic
            logo: "https://assets.thehansindia.com/h-upload/feeds/2019/04/25/168075-stand-up-comedy-show.jpg",
            location: "123 Main St",
            time: "7 PM",
            weekday: "Friday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Bucket of Laughs",
            type: "show", //show or mic
            logo: "https://www.shutterstock.com/image-vector/comedy-show-theater-scene-red-600nw-1069556927.jpg",
            location: "504 6th St",
            time: "7 PM",
            weekday: "Monday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Genius Mic",
            type: "mic", //show or mic
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23mTw-qN_zGXfUluzHWcZdlnGS5MBRPVb3kQ-cSMbA-ULIMIECqkkRHpSWAFblKpe8iU&usqp=CAU",
            location: "255 South St",
            time: "7 PM",
            weekday: "Monday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Silly Songs",
            type: "show", //show or mic
            logo: "https://assets.thehansindia.com/h-upload/feeds/2019/04/25/168075-stand-up-comedy-show.jpg",
            location: "59 Pine St",
            time: "7 PM",
            weekday: "Monday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Jamboree",
            type: "show", //show or mic
            logo: "https://www.shutterstock.com/image-vector/comedy-show-theater-scene-red-600nw-1069556927.jpg",
            location: "504 6th St",
            time: "7 PM",
            weekday: "Tuesday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Sidesplitterz",
            type: "mic", //show or mic
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23mTw-qN_zGXfUluzHWcZdlnGS5MBRPVb3kQ-cSMbA-ULIMIECqkkRHpSWAFblKpe8iU&usqp=CAU",
            location: "266 Maple St",
            time: "7 PM",
            weekday: "Wednesday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Freestyle",
            type: "show", //show or mic
            logo: "https://assets.thehansindia.com/h-upload/feeds/2019/04/25/168075-stand-up-comedy-show.jpg",
            location: "277 Oak St",
            time: "7 PM",
            weekday: "Wednesday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Boyz Club",
            type: "show", //show or mic
            logo: "https://www.shutterstock.com/image-vector/comedy-show-theater-scene-red-600nw-1069556927.jpg",
            location: "504 6th St",
            time: "7 PM",
            weekday: "Wednesday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Laughopolis",
            type: "mic", //show or mic
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23mTw-qN_zGXfUluzHWcZdlnGS5MBRPVb3kQ-cSMbA-ULIMIECqkkRHpSWAFblKpe8iU&usqp=CAU",
            location: "285 Tanner St",
            time: "7 PM",
            weekday: "Thursday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Thirsty Mic",
            type: "show", //show or mic
            logo: "https://assets.thehansindia.com/h-upload/feeds/2019/04/25/168075-stand-up-comedy-show.jpg",
            location: "37 8th St",
            time: "7 PM",
            weekday: "Thursday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Windy City Showcase",
            type: "show", //show or mic
            logo: "https://www.shutterstock.com/image-vector/comedy-show-theater-scene-red-600nw-1069556927.jpg",
            location: "504 6th St",
            time: "7 PM",
            weekday: "Thursday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Laughbone",
            type: "mic", //show or mic
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23mTw-qN_zGXfUluzHWcZdlnGS5MBRPVb3kQ-cSMbA-ULIMIECqkkRHpSWAFblKpe8iU&usqp=CAU",
            location: "866 Straight St",
            time: "7 PM",
            weekday: "Saturday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Night Court",
            type: "show", //show or mic
            logo: "https://assets.thehansindia.com/h-upload/feeds/2019/04/25/168075-stand-up-comedy-show.jpg",
            location: "35 5th St",
            time: "7 PM",
            weekday: "Friday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Getting Glitzy",
            type: "show", //show or mic
            logo: "https://www.shutterstock.com/image-vector/comedy-show-theater-scene-red-600nw-1069556927.jpg",
            location: "25 NW St",
            time: "7 PM",
            weekday: "Saturday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Daddy Bear",
            type: "mic", //show or mic
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23mTw-qN_zGXfUluzHWcZdlnGS5MBRPVb3kQ-cSMbA-ULIMIECqkkRHpSWAFblKpe8iU&usqp=CAU",
            location: "123 Main St",
            time: "7 PM",
            weekday: "Saturday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
        {
            name: "Three Silly Goats",
            type: "show", //show or mic
            logo: "https://assets.thehansindia.com/h-upload/feeds/2019/04/25/168075-stand-up-comedy-show.jpg",
            location: "32 5th St",
            time: "7 PM",
            weekday: "Saturday",
            frequency: "weekly",
            details: "Sign up in person",
            link: 'laughs.com',
        },
    ]
    const eventArray = await Event.insertMany(eventObjects)
    console.log(`Created ${eventArray.length} events!`)
  
    const comicObjects = [
        {
            name: "Kyle James",
            headshot: "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[0]._id, eventArray[6]._id, eventArray[13]._id]
        },
        {
            name: "Billy Bob",
            headshot: "https://christophertoddstudios.com/wp-content/uploads/2022/12/DuqueLaw-3-998x1024.jpg",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[0]._id, eventArray[7]._id, eventArray[14]._id]
        },
        {
            name: "Taylor Phil",
            headshot: "https://image10.photobiz.com/4411/6_20200320132451_17431620_xlarge.jpg",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[1]._id, eventArray[8]._id, eventArray[15]._id]
        },
        {
            name: "Cody Hack",
            headshot: "https://images.squarespace-cdn.com/content/v1/5ec689480cc22c2d441e152f/4abb45fb-e456-4079-8076-b40ac0a89dfc/nlalor-photography-2021-06-17-Jason-Cholewa-Headshot-Web-Sized-1.jpg",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[1]._id, eventArray[9]._id, eventArray[16]._id]
        },
        {
            name: "Jordan Michael",
            headshot: "https://benmarcum.com/wp-content/uploads/2017/10/Ben-Marcum-Photography-Headshot-Photographer-Louisville-Kentucky-Actor-Headshots-Michael-Behling-Sep-27-2017-501.jpg",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[2]._id, eventArray[10]._id, eventArray[17]._id]
        },
        {
            name: "Ricky Mortenstein",
            headshot: "https://images.squarespace-cdn.com/content/v1/5c4d7e227e3c3a6ec70a5ac7/1630830130344-7MNV1F02L43NXKYAL3WU/headshot%2C+headshots%2C+portrait%2C+portraits%2C+headshot+photographer%2C+headshot+Photography%2C+portrait+photographer%2C+portrait+photography+%2Ccorporate+photographer+%2Ccorporate+photography%2C+military+photographer%2C+military+photography%2C+headshot+London%2C+London+headshot%2C+headshots+London%2C+London+headshots%2C+portrait+London%2C+London+portraits%2C+photographer+London%2C+London+Photographer%2C+headshot+Los+Angeles%2C+Los+Angeles+Headshot%2C+headshots+Los+Angeles%2C+Los+Angles+Headshots%2C+portrait+Los+Angles%2C+Los+Angeles+portraits%2C+photographer+Los+Angeles%2C+Los+Angeles+photographer%2C+headshot+la%2C+la+headshot+%2Cheadshots+LA+%2C+LA+headshots+%2Cportrait+LA+%2CLa+Portraits+%2Cphotographer+LA+%2CLA+photographer+%2Cheadshot+New+York+%2CNew+York+headshot+%2Cheadshots+New+York+%2C+New+York+headshots+%2Cportrait+New+York+%2CNew+York+portraits%2C+photographer+New+York+%23New+York+photographer%2C+headshot+NY%2C+NY+headshot+%2Cheadshots+NY+%2CNY+headshots+%2Cportrait+NY++%2CNY+portraits+%2Cphotographer+NY+%2CNY+photographer+%2Cheadshot+NYC+%2C+NYC+headshot+%2Cheadshots+NYC+%2C+NYC+headshots+%2Cportrait+NYC++%2C+NYC+portraits+%2Cphotographer+NYC%2C+NYC+photographer+%2CRory+Lewis+%2CRory+Lewis+Photographer",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[3]._id, eventArray[11]._id, eventArray[18]._id]
        },
        {
            name: "Sarah Michaels",
            headshot: "https://retratosbarcelona.com/wp-content/uploads/2022/09/Retratos-barcelona-actor-headshots-Irene-Alguilar.jpg",
            clip: "https:youtube.com",
            eventsHosted: [eventArray[4]._id, eventArray[12]._id, eventArray[19]._id]
        },
    ]
    const comicArray = await Comic.insertMany(comicObjects)
    console.log(`Created ${comicArray.length} Comics!`)
  
    const venueObjects = [
        {
            name: "Lucky Dog",
            address: "456 Eart St",
            image: "https://www.foodandwine.com/thmb/8rtGtUmtC0KiJCDxAUXP_cfwgM8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GTM-Best-US-Bars-Katana-Kitten-FT-BLOG0423-fa9f2ba9925c47abb4afb0abd25d915a.jpg",
            capacity: 56,
            eventsHeld: [eventArray[0]._id, eventArray[6]._id, eventArray[11]._id]
        },
        {
            name: "Cacklehouse",
            address: "376 Palm St",
            image: "https://www.galveston.com/wp-content/uploads/2019/12/Poop-Deck-576x576.jpg",
            capacity: 25,
            eventsHeld: [eventArray[1]._id, eventArray[7]._id, eventArray[12]._id]
        },
        {
            name: "Flower Patch",
            address: "800 Jason St",
            image: "https://assets.bonappetit.com/photos/577e904a753d41914efc235e/16:9/w_2560%2Cc_limit/bar-goto-nyc-bar-interior-Alex-lau.JPG",
            capacity: 80,
            eventsHeld: [eventArray[2]._id, eventArray[8]._id, eventArray[13]._id]
        },
        {
            name: "Rowdy Badger",
            address: "366 Jane St",
            image: "https://www.galveston.com/wp-content/uploads/2019/09/Hotel-Galvez-bar-800x600.jpg",
            capacity: 119,
            eventsHeld: [eventArray[3]._id, eventArray[9]._id, eventArray[14]._id]
        },
        {
            name: "Fancy Pants",
            address: "144 Blaine St",
            image: "https://assets-prd.punchdrink.com/wp-content/uploads/2018/04/Article-Frenchette-NYC-Best-New-Bars-Spring-Summer-2018.jpg",
            capacity: 85,
            eventsHeld: [eventArray[4]._id, eventArray[10]._id, eventArray[15]._id]
        },
        {
            name: "Royal Royale",
            address: "250 Cupid St",
            image: "https://media.cnn.com/api/v1/images/stellar/prod/221004154233-01-world-best-bars-2022.jpg?c=original",
            capacity: 180,
            eventsHeld: [eventArray[5]._id, eventArray[16]._id, eventArray[17]._id]
        },
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