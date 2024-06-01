
/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/


let brandNameArray = []
let brandLowerNameArray = []
let brandIDArray = []

let eventObjectArray = []
let comicObjectArray = []
let venueObjectArray = []

/*------------------------ Cached Element References ------------------------*/

// const buttonElement = document.querySelector('#myButtonID')

// let button = document.querySelector("#searchButton")
let container = document.querySelector("#container")
let cards = document.querySelectorAll(".card")

let sundayShows = document.querySelector("#Sunday");
let mondayShows = document.querySelector("#Monday");
let tuesdayShows = document.querySelector("#Tuesday");
let wednesdayShows = document.querySelector("#Wednesday");
let thursdayShows = document.querySelector("#Thursday");
let fridayShows = document.querySelector("#Friday");
let saturdayShows = document.querySelector("#Saturday");

let dayTitles = document.querySelectorAll(".day-title")
let showContainers = document.querySelectorAll(".shows-container")

/*-------------------------------- Functions --------------------------------*/

async function refresh() {
    
    eventObjectArray = []
    comicObjectArray = []
    venueObjectArray = []

    sundayShows.innerHTML = "";
    mondayShows.innerHTML = "";
    tuesdayShows.innerHTML = "";
    wednesdayShows.innerHTML = "";
    thursdayShows.innerHTML = "";
    fridayShows.innerHTML = "";
    saturdayShows.innerHTML = "";

      try {
        let eventResponse = await axios.get(`http://localhost:3001/events`);
        let comicResponse = await axios.get(`http://localhost:3001/comics`);
        let venueResponse = await axios.get(`http://localhost:3001/venues`);
        // console.log(eventResponse.data); // Log the data received from the API
        
        eventObjectArray = eventResponse.data //assuming it's an array
        comicObjectArray = comicResponse.data //assuming it's an array
        venueObjectArray = venueResponse.data //assuming it's an array
        console.log(eventObjectArray)
        console.log(comicObjectArray)
        console.log(venueObjectArray)
            
        for (const eventObject of eventObjectArray) {
    
            const newCard = document.createElement('div');
            newCard.classList.add('show-card');
            newCard.setAttribute('id',eventObject._id)
    
            const newImage = document.createElement('img');
            newImage.classList.add('show-logo')
            // console.log(eventObject.logo)
            // newImage.setAttribute('src',eventObject.logo)
            newCard.appendChild(newImage)
    
            const newName = document.createElement('div');
            newName.classList.add('show-name')
            newName.innerText = eventObject.name
            newCard.appendChild(newName)

            const newType = document.createElement('div');
            newType.classList.add('show-type')
            newType.innerText = eventObject.type
            newCard.appendChild(newType)

            const newLocation = document.createElement('div');
            newLocation.classList.add('show-location')
            newLocation.innerText = eventObject.location
            newCard.appendChild(newLocation)

            const newTime = document.createElement('div');
            newTime.classList.add('show-location')
            newTime.innerText = eventObject.time
            newCard.appendChild(newTime)

            const newWeekday = document.createElement('div');
            newWeekday.classList.add('show-location')
            newWeekday.innerText = eventObject.weekday
            newCard.appendChild(newWeekday)

            const newFrequency = document.createElement('div');
            newFrequency.classList.add('show-frequency')
            newFrequency.innerText = eventObject.frequency
            newCard.appendChild(newFrequency)

            const newDetails = document.createElement('div');
            newDetails.classList.add('show-details')
            newDetails.innerText = eventObject.details
            newCard.appendChild(newDetails)

            const newLink = document.createElement('div');
            newLink.classList.add('show-link')
            newLink.innerText = eventObject.link
            newCard.appendChild(newLink)

            for (const hostObjectID of eventObject.hosts) {
                const newHost = document.createElement('div');
                newHost.classList.add('show-host')
                const comicObject = comicObjectArray.find(obj => obj._id.toString() === hostObjectID);
                newHost.innerText = `Hosts: ${comicObject.name}`
                // const index = comicObjectArray.findIndex(obj => obj._id.toString() === hostObjectID);
                // newHost.innerText = comicObjectArray[index].name
                newCard.appendChild(newHost)
            }
    
            const newVenue = document.createElement('div');
            newVenue.classList.add('show-link')
            const venueObject = venueObjectArray.find(obj => obj._id.toString() === eventObject.venue);
            newVenue.innerText = `Venue: ${venueObject.name}`
            newCard.appendChild(newVenue)

            // const newBicycleLink = document.createElement('a');
            // newBicycleLink.href = 'parkerBicycle.html';
            // newBicycleLink.target = '_blank'; 
            // newBicycleLink.appendChild(newCard);
            
            switch (eventObject.weekday) {
                case "Sunday":
                    sundayShows.appendChild(newCard)
                    break;
                case "Monday":
                    mondayShows.appendChild(newCard)
                    break;
                case "Tuesday":
                    tuesdayShows.appendChild(newCard)
                    break;
                case "Wednesday":
                    wednesdayShows.appendChild(newCard)
                    break;
                case "Thursday":
                    thursdayShows.appendChild(newCard)
                    break
                case "Friday":
                    fridayShows.appendChild(newCard)
                    break                    
                case "Saturday":
                    saturdayShows.appendChild(newCard)
                    break                                           

            }
    
            // brandNameArray.push(eventObject.name)
            // brandLowerNameArray.push(eventObject.name.toLowerCase())
            // brandIDArray.push(eventObject._id)
        }
        
        // console.log(brandLowerNameArray)
        // console.log(brandIDArray)
        // cards = document.querySelectorAll(".card")
        // // console.log(cards)
        
        
        // cards.forEach(function(card) {
        //   card.addEventListener('click', function() {    
        //     // idCopy = card.querySelector('.brand-name').innerText
        //     idCopy = card.getAttribute('id')
        //     nameCopy = brandNameArray[brandIDArray.indexOf(idCopy)]
        //     localStorage.setItem('brandID', idCopy);
        //     localStorage.setItem('brandName', nameCopy);
        //     console.log(idCopy)
        //     console.log(nameCopy)
        //     window.open('indexBicycle.html', '_blank');
        //   });
        // });
        
        // let input = document.querySelector("#inputBar").value.toLowerCase()
        // if (input == ``) { return }
        // if (!brandLowerNameArray.includes(input)) {return}
        // cards = document.querySelectorAll(".card")
        // cards.forEach(card => {
        //     if (card.querySelector('.brand-name').innerText.toLowerCase()
        //         !== input) {
        //         // console.log(brandNameArray)
        //         container.removeChild(card)
        //     }
        // })
        // console.log(eventObjectArray)
    
    } catch (error) {
        console.error('Error fetching data:', error);  
    }
    }


function hideInfo(day) {
    //when click day header
    //either hide or show shows-container
    // console.log(day.innerText)
    let content = day.nextElementSibling

    if (content.style.display == "none") {
        content.style.display = "flex"
    } else {
        content.style.display = "none"
    }
}

/*----------------------------- Event Listeners -----------------------------*/

// buttonElement.addEventListener('click', myFunction)
// document.addEventListener('DOMContentLoaded', myFunction)

document.addEventListener('DOMContentLoaded', async ()=> {
    refresh()
})

// button.addEventListener('click', () => {
//     refresh()
// })

dayTitles.forEach((day) => {
    day.addEventListener('click', function(event) {
        // console.log(day.innerText)
        hideInfo(day)
    })
})