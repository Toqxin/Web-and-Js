mapboxgl.accessToken = 'yourtoken';

var mapper = new mapboxgl.Map({
    container: 'mymap',
    style: 'mapbox://styles',
    center: [-74.0060, 40.7128],
    zoom: 4
});

var fantastikSimgesi;


function searchLocation() {
    var geonamesUsername = 'toqxin';
    var location = document.getElementById('location').value;
    var resultsDiv = document.getElementById('search-results');
    var cityInfoDiv = document.getElementById('city-info');

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                var coordinates = data.features[0].center;
                mapper.flyTo({
                    center: coordinates,
                    zoom: 12
                });

                if (fantastikSimgesi) {
                    fantastikSimgesi.remove();
                }

                fantastikSimgesi = new mapboxgl.Marker()
                    .setLngLat(coordinates)
                    .addTo(mapper);

                fetch(`http://api.geonames.org/timezoneJSON?lat=${coordinates[1]}&lng=${coordinates[0]}&username=${geonamesUsername}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.timezoneId) {
                            var timezone = data.timezoneId;

                            var currentTime = new Date().toLocaleString("en-US", {timeZone: timezone, hour: '2-digit', minute: '2-digit'});

                            fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geonamesUsername}`)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.geonames && data.geonames.length > 0) {
                                        var city = data.geonames[0];
                                        var cityName = city.name;
                                        var countryName = city.countryName;
                                        var population = Number(city.population).toLocaleString();

                                        cityInfoDiv.innerHTML = `
                                            <h2>${cityName}</h2>
                                            <p><b>Country:</b> ${countryName}</p>
                                            <p><b>Population:</b> ${population}</p>
                                            <p><b>Timezone:</b> ${timezone}</p>
                                            <p><b>Current Time:</b> ${currentTime}</p>
                                            <p><b>Wikipedia:</b> <a href="https://tr.wikipedia.org/wiki/${cityName}"target="_blank">${cityName}</a></p>
                                        `;
                                        cityInfoDiv.style.display = 'block';

                                        resultsDiv.innerHTML = '';
                                    } else {
                                        cityInfoDiv.innerHTML = 'City not found.';

                                    }
                                })
                                
                        }
                    })
                   
            } 
        }) 
}

document.getElementById('city-info').addEventListener('click', function () {
    var cityInfoDiv = document.getElementById('city-info');
    if (cityInfoDiv.classList.contains('collapsed')) {
        cityInfoDiv.classList.remove('collapsed');
        cityInfoDiv.classList.add('expanded');
    } else {
        cityInfoDiv.classList.remove('expanded');
        cityInfoDiv.classList.add('collapsed');
    }
});

