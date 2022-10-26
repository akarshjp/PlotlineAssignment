// set map options

var latAndLong = { lat: 21.7679, lng: 78.8718};
var mapfeature = {
    center: latAndLong,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Create Map

var map = new google.maps.Map(document.getElementById("googleMap"), mapfeature)

//Creare a directions service object to use the route method and get the result

var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the routes

var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the directionsRenderer to the map

directionsDisplay.setMap(map);

// Function

function calcRoute() {
    // Create a request
    var request = {
        origin: document.getElementById("text1").value,
        destination: document.getElementById("text2").value,
        travelMode: google.maps.TravelMode.DRIVING, // Changeable to walking and bycycling
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // Pass the request to the route method
    directionsService.route(request, (result, status) => {
        if(status == google.maps.DirectionsStatus.OK) {
            // get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'> From: " + document.getElementById("text1").value + ".<br />To:" + document.getElementById("text2").value + ". <br /> Driving distance:" + result.routes[0].legs[0].distance.text + ".<br />Duration: " + result.routes[0].legs[0].duration.text + ".</div>";
            
            // display routes
            directionsDisplay.setDirections(result);
         
        } else {
            // Delete route from map
            directionsDisplay.setDirections({ routes: [] });

            // center map in Spain
            map.setCenter(latAndLong);

            // Error message to show cant travel across countries
            output.innerHTML = "<div class='alert-danger'> Could not retreive driving distance. </div>";
        }
    });
}

// Create Autocomplete object for all inputs

var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("text1");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("text2");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);