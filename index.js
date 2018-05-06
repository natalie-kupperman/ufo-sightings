// references to the tbody element, input field and search button
var tbodyElem = document.querySelector("tbody");
var dateInput = document.querySelector("#datetime");
var cityInput = document.querySelector("#city");
var stateInput= document.querySelector("#state");
var countryInput = document.querySelector("#country");
var shapeInput = document.querySelector("#shape");
var searchButton = document.querySelector("#search");
var loadMoreButton = document.querySelector("#load-btn");

// add an event listener to the searchButton
searchButton.addEventListener("click", handleSearchButtonClick);

// set variable for filtered data
var filteredUFO = dataSet;
var startingIndex = 0;
var resultsPerPage = 25; 

// use renderTable to set the filteredUFO to the tbody
function renderTableSelection() {
    tbodyElem.innerHTML = "";
    var endingIndex = startingIndex + resultsPerPage;
    var dateSubset = filteredUFO.slice(startingIndex, endingIndex);
    console.log("rendering table")

    for (var i = 0; i < dateSubset.length; i++) {
        // get current sightings with fields
        var sighting = filteredUFO[i];
        var fields = Object.keys(sighting);
        console.log("created variables sighting and fields")
        // create a new row in the tbody, set index, 
        var rowElem = tbodyElem.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            // for every field in the address object, create a new cell
            // and set inner text to value of current address's field
            var field = fields[j];
            var cellElem = rowElem.insertCell(j);
            cellElem.innerText = sighting[field];
            console.log("inserted rows")
        }
    }
}

function handleSearchButtonClick() {
    // format the user's search 
    var filterDate = dateInput.value.trim();
    var filterCity = cityInput.value.trim().toLowerCase();
    var filterState = stateInput.value.trim().toLowerCase();
    var filterCountry = countryInput.value.trim().toLowerCase();
    var filterShape = shapeInput.value.trim().toLowerCase();

    if (filterDate.length !=0) {
        filteredUFO = dataSet.filter(function(sighting) {
            var sightingDate = sighting.datetime;
            return sightingDate === filterDate;
        });
    }
    else {
        filteredUFO = dataSet
    }
    if (filterCity.length !=0) {
        filteredUFO = dataSet.filter(function(sighting) {
            var sightingCity = sighting.city;
            return sightingCity === filterCity;
        });
    }
    else {
        filteredUFO = dataSet
    }
    if (filterState.length !=0) {
        filteredUFO = dataSet.filter(function(sighting) {
            var sightingState = sighting.state;
            return sightingState === filterState;
        });
    }
    else {
        filteredUFO = filteredUFO
    }
    if (filterCountry.length !=0) {
        filteredUFO = dataSet.filter(function(sighting) {
            var sightingCountry = sighting.country;
            return sightingCountry === filterCountry;
        });
    }
    else {
        filterUFO = filteredUFO
    }
    if (filterShape.length !=0){
        filteredUFO = dataSet.filter(function(sighting) {
            var sightingShape = sighting.shape;
            return sightingShape === filterShape;
        });
    }
    renderTableSelection();
}
// render the table for the first time on page load
renderTableSelection();

// load more button event listener
loadMoreButton.addEventListener("click", handleButtonClick);

function handleButtonClick() {
    startingIndex += resultsPerPage;

    if (startingIndex + resultsPerPage >= filteredUFO.length) {
        loadMoreButton.classList.add("disabled");
        loadMoreButton.innerText = "All Data Loaded";
        loadMoreButton.removeEventListener("click", handleButtonClick);
    }
    renderTableSelection();
}

