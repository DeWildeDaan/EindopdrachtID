'use strict';
const apikey1 = '0d38ed9b-3055-4756-94dc-f62f940b6914';
const apikey2 = '87cdfc5a-9655-4807-80ac-c564fa1bab22';
const provider = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const copyright = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';
let map, mapview, layergroup, referencedata;
let htmlmapview, htmllistview, htmlcontent, htmlcards, htmlmap;

//#region ***  DOM references                           ***********

//#endregion

//#region ***  Callback-Visualisation - show___         ***********
const showCards = function(jsonObject){
    htmlcards = document.querySelector('.js-cards');
    html = ``;
    console.log(jsonObject);

    
}

//#endregion

//#region ***  Callback-No Visualisation - callback___  ***********
const callbackGetCurrentPosition = function(position){
    let currentlat = position.coords.latitude;
    let currentlong = position.coords.longitude;
    getChargepointData(currentlat, currentlong);
}

const callbackReferencedata = function(jsonObject) {
    referencedata = jsonObject;
}

const callbackChargepoints = function(jsonObject){
    console.log(jsonObject);
    if(mapview == true){
        htmlcontent.innerHTML = `<div class="js-map"> </div>`;
        showMap(jsonObject);
    } else {
        htmlcontent.innerHTML = `<div class="c-cards js-cards"> </div>`;
        showCards(jsonObject);
    }
}

const callbackError = function (jsonObject) {
	console.log(jsonObject);
};
//#endregion

//#region ***  Data Access - get___                     ***********
const getCurrentLocation = function(){
    navigator.geolocation.getCurrentPosition(callbackGetCurrentPosition);
}

const getReferenceData = function () {
	let url = `https://api.openchargemap.io/v3/referencedata&key=${apikey1}&output`;
	handleData(url, callbackReferencedata, callbackError, 'GET');
};

const getChargepointData = function(lat, long,){
    let url = `https://api.openchargemap.io/v3/poi/?key=${apikey2}&output=json&countrycode=BE&latitude=${lat}&longitude=${long}&distance=10&distanceunit=KM&compact=true&verbose=false`;
	handleData(url, callbackChargepoints, callbackError, 'GET');
}

//#endregion

//#region ***  Event Listeners - listenTo___            ***********
const listentoMapview = function () {
	htmlmapview.addEventListener('click', function () {
		this.classList.add('c-togglebtn__selected');
		htmllistview.classList.remove('c-togglebtn__selected');
        mapview = true;
        console.log("map")
		getCurrentLocation();
	});
};

const listentoListview = function () {
	htmllistview.addEventListener('click', function () {
		this.classList.add('c-togglebtn__selected');
		htmlmapview.classList.remove('c-togglebtn__selected');
        mapview = false;
        console.log("list");
		getCurrentLocation();
	});
};

//#endregion

//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
	console.log('DOM Content loaded');
    mapview = false;

    htmlmapview = document.querySelector('.js-mapview');
	htmllistview = document.querySelector('.js-listview');
    htmllistview = document.querySelector('.js-content');

    listentoListview();
    listentoMapview();
    //getCurrentLocation();
    getReferenceData();
};

document.addEventListener('DOMContentLoaded', init);
//#endregion
