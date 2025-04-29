const eventlist = document.querySelector("div.eventlist");



async function getEvents () {


  await fetch('/getevents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      if (response.ok) {
  
       const data = await response.json()
       console.log(data)


       data.forEach(e => {
        eventlist.innerHTML += `<div data-id="${e.id}" class="event">
                    <img src=\"../${e.thumbnail.slice(9)}\" />
                    <div class="eventtext">
                        <p class="eventtitle">${e.title}</p>
                        <p class="eventtime">${e.meetingdate} ${e.meetingtime}</p>
                        <p class="eventlocation">${e.location}</p>
                    </div>
                </div>
                `;
       });
      }
    })
  


    const events = document.getElementsByClassName("event")
    console.log(events)

    Array.from(events).forEach(e => {
      e.addEventListener('click', () => {
        
        window.location.pathname = `event/${e.getAttribute('data-id')}/`;
      })
    })
  }
  
  getEvents()



