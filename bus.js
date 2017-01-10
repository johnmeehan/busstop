const endpoint = 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=609721&format=json';
let busses = [];
const searchInput = document.querySelector('.busstop .circle .search-form .search');
const suggestions = document.querySelector('.suggestions');

function getBusStopArrivals(e){
  let stopid = e.target.value;
  console.log('Stopid: ', stopid);
  const endpoint = `https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${stopid}&format=json`;
  const prom = fetch(endpoint, {method: 'get'})
                  .then(blob => blob.json())
                  .then(data => {
    busses = [];
    busses.push(...data.results)
    displayBusses();
    searchInput.focus();
  });

}

function displayBusses(){
  let html = busses.map(bus => {
    return `
      <li>
        <span class="name">${bus.route}, ${bus.destination}</span>
        <span class="population">${bus.duetime}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('change', getBusStopArrivals);
searchInput.addEventListener('keyup', getBusStopArrivals);