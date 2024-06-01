
/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/


let brandNameArray = []
let brandLowerNameArray = []
let brandIDArray = []

let eventObjectArray = []
let comicObjectArray = []
let venueOjbectArray = []

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
    sundayShows.innerHTML = ""
      try {
        // let response = await axios.get(`http://localhost:3001/brands/${input}`);
        let response = await axios.get(`http://localhost:3001/events`);
        // console.log(response.data); // Log the data received from the API
        
        eventObjectArray = response.data //assuming it's an array
        console.log(eventObjectArray)
            
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
    
            // const newBicycleLink = document.createElement('a');
            // newBicycleLink.href = 'parkerBicycle.html';
            // newBicycleLink.target = '_blank'; 
            // newBicycleLink.appendChild(newCard);
            
            sundayShows.appendChild(newCard); //should be day container
    
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