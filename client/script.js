
/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/


// let brandNameArray = []
// let brandLowerNameArray = []
// let brandIDArray = []


/*------------------------ Cached Element References ------------------------*/

// const buttonElement = document.querySelector('#myButtonID')

// let button = document.querySelector("#searchButton")
// let container = document.querySelector("#container")

let sundayShows = document.querySelector("#Sunday");
let mondayShows = document.querySelector("#Monday");
let tuesdayShows = document.querySelector("#Tuesday");
let wednesdayShows = document.querySelector("#Wednesday");
let thursdayShows = document.querySelector("#Thursday");
let fridayShows = document.querySelector("#Friday");
let saturdayShows = document.querySelector("#Saturday");

let hosts = document.querySelectorAll(".show-host")
let dayTitles = document.querySelectorAll(".day-title")
let showContainers = document.querySelectorAll(".shows-container")
let body = document.querySelector('body')
let newEventForm = document.querySelector('#new-event-form')
let formButton = document.querySelector('#display-form')

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
    
            if (eventObject.logo) {
                const newImage = document.createElement('img');
                newImage.classList.add('show-logo')
                // console.log(eventObject.logo)
                // newImage.setAttribute('src',eventObject.logo)
                newCard.appendChild(newImage)
            }
    
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

            if (eventObject.details) {
                const newDetails = document.createElement('div');
                newDetails.classList.add('show-details')
                newDetails.innerText = eventObject.details
                newCard.appendChild(newDetails)
            }

            if (eventObject.link) {
                const newLink = document.createElement('div');
                newLink.classList.add('show-link')
                newLink.innerText = eventObject.link
                newCard.appendChild(newLink)
            }

            if (eventObject.hosts) {
                for (const hostObjectID of eventObject.hosts) {
                    const newHost = document.createElement('div');
                    newHost.classList.add('show-host')
                    const comicObject = comicObjectArray.find(obj => obj._id.toString() === hostObjectID);
                    newHost.innerText = `Host: ${comicObject.name}`
                    newHost.addEventListener('click', function(event) {
                    // console.log(hostObjectID)
                    linkToComic(hostObjectID)
                    })
                    newCard.appendChild(newHost)
                }
            }
    
            if (eventObject.venue) {
                const newVenue = document.createElement('div');
                newVenue.classList.add('show-link')
                const venueObject = venueObjectArray.find(obj => obj._id.toString() === eventObject.venue);
                newVenue.innerText = `Venue: ${venueObject.name}`
                newVenue.addEventListener('click', function(event) {
                    // console.log(hostObjectID)
                    linkToVenue(eventObject.venue)
                    })
                newCard.appendChild(newVenue)
            }

            newCard.addEventListener('click', (event) => {
                expand(eventObject)
            })
            
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
        }

    } catch (error) {
        console.error('Error fetching data:', error);  
    }
    }


function linkToComic(hostID) {
    // nameCopy = brandNameArray[brandIDArray.indexOf(idCopy)]
    localStorage.setItem('storedHostID', hostID);
    // localStorage.setItem('brandName', nameCopy);
    console.log(hostID)
    // console.log(nameCopy)
    window.open('indexComic.html', '_blank');
}

function linkToVenue(venueID) {
    // nameCopy = brandNameArray[brandIDArray.indexOf(idCopy)]
    localStorage.setItem('storedVenueID', venueID);
    // localStorage.setItem('brandName', nameCopy);
    console.log(venueID)
    // console.log(nameCopy)
    window.open('indexVenue.html', '_blank');
}

function displayCreateForm() {
    console.log(newEventForm.style.display)
    if (newEventForm.style.display == "block") {
        newEventForm.style.display = "none"
    } else {
        newEventForm.style.display = "block"
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

function expand(eventObject) {
    const newSection = document.createElement('div');
    newSection.classList.add('expanded-card')
    newSection.innerText = `Venue: ${eventObject.name}`
    body.appendChild(newSection)

    const newButton = document.createElement('div');
    newButton.innerText = 'Close'
    newButton.addEventListener('click', (event) => {
        body.removeChild(newSection)
    })

    const newDeleteButton = document.createElement('div');
    newDeleteButton.innerText = 'Delete Event'
    newDeleteButton.addEventListener('click', (event) => {
        body.removeChild(newSection)
        deleteEvent(eventObject)
    })

    const newUpdateButton = document.createElement('div');
    newUpdateButton.innerText = 'Change Details'
    newUpdateButton.addEventListener('click', (event) => {
        displayUpdateForm(newSection,eventObject)
    })

    newSection.appendChild(newButton)
    newSection.appendChild(newUpdateButton)
    newSection.appendChild(newDeleteButton)

}

function displayUpdateForm(section, eventObject) {
    //add html form to the section
    const newForm = document.createElement('form');
    newForm.setAttribute('id', 'newEventForm');
    function createLabelInputPair(labelText, inputForIdName, isRequired, initValue) {
        // Create the label element
        const label = document.createElement('label');
        label.setAttribute('for', inputForIdName);
        label.innerText = `${labelText}:`;
      
        // Create the input element
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', inputForIdName);
        input.setAttribute('name', inputForIdName);
        if (isRequired) {
          input.setAttribute('required', '');
        }
        input.value = initValue
      
        // Append the label and input to the form
        newForm.appendChild(label);
        newForm.appendChild(input);
        newForm.appendChild(document.createElement('br'));
      }

      createLabelInputPair('Name', 'nameUpdate', true, eventObject.name);
      createLabelInputPair('Type', 'typeUpdate', true, eventObject.type);
      createLabelInputPair('Logo', 'logoUpdate', false, eventObject.logo);
      createLabelInputPair('Location', 'locationUpdate', true, eventObject.location);
      createLabelInputPair('Time', 'timeUpdate', true, eventObject.time);
      createLabelInputPair('Weekday', 'weekdayUpdate', true, eventObject.weekday);
      createLabelInputPair('Frequency', 'frequencyUpdate', true, eventObject.frequency);
      createLabelInputPair('Details', 'detailsUpdate', false, eventObject.details);
      createLabelInputPair('Link', 'linkUpdate', false, eventObject.link);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerText = 'Update Event';
    submitButton.addEventListener('click', () => {
        updateEvent(eventObject)
    })
    newForm.appendChild(submitButton);

    section.appendChild(newForm)

}

async function updateEvent(eventObject) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('nameUpdate').value;
    const type = document.getElementById('typeUpdate').value;
    const logo = document.getElementById('logoUpdate').value;
    const location = document.getElementById('locationUpdate').value;
    const time = document.getElementById('timeUpdate').value;
    const weekday = document.getElementById('weekdayUpdate').value;
    const frequency = document.getElementById('frequencyUpdate').value;
    const details = document.getElementById('detailsUpdate').value;
    const link = document.getElementById('linkUpdate').value;
    try {
        const response = await fetch(`http://localhost:3001/events/${eventObject._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, type, logo, location, time, weekday, frequency, details, link }),
        });
        refresh()
    
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const result = await response.json();
              console.log('Element updated:', result);
            } else {
              const result = await response.text();
              console.log('Element updated:', result);
            }
          } else {
            console.error('Failed to update element:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

// async function createEvent() {
// }

async function deleteEvent(eventObject) {
    try {
        const response = await fetch(`http://localhost:3001/events/${eventObject._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        refresh()
    
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const result = await response.json();
              console.log('Element deleted:', result);
            } else {
              const result = await response.text();
              console.log('Element deleted:', result);
            }
          } else {
            console.error('Failed to delete element:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

/*----------------------------- Event Listeners -----------------------------*/

// buttonElement.addEventListener('click', myFunction)
// document.addEventListener('DOMContentLoaded', myFunction)

document.addEventListener('DOMContentLoaded', async ()=> {
    refresh()
})

formButton.addEventListener('click',  (event) => {
    displayCreateForm()
})

dayTitles.forEach((day) => {
    day.addEventListener('click', function(event) {
        // console.log(day.innerText)
        hideInfo(day)
    })
})

document.getElementById('new-event-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

//   createEvent()
const form = document.getElementById('newEventForm')
const name = document.getElementById('name').value;
const type = document.getElementById('type').value;
const logo = document.getElementById('logo').value;
const location = document.getElementById('location').value;
const time = document.getElementById('time').value;
const weekday = document.getElementById('weekday').value;
const frequency = document.getElementById('frequency').value;
const details = document.getElementById('details').value;
const link = document.getElementById('link').value;

try {
  const response = await fetch('http://localhost:3001/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, type, logo, location, time, weekday, frequency, details, link }),
  });

  refresh()
  form.reset()

  if (response.ok) {
    const result = await response.json();
    console.log('Element added:', result);
  } else {
    console.error('Failed to add element:', response.statusText);
  }
} catch (error) {
  console.error('Error:', error);
}

  
});

