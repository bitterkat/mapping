let lat = ''
let lng = ''
let mapUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDsm88feuAQdGO_JzymwI5lPbsafR2FRXY`
// const key = 'key=AIzaSyDsm88feuAQdGO_JzymwI5lPbsafR2FRXY'
const container = document.getElementById('container')
const longlat = [
  { lat: 51.5074, lng: 0.1278 },
  { lat: 48.8566, lng: 2.3522 },
  { lat: 40.7128, lng: -74.0059 },
  { lat: -22.4382, lng: 101.5290 },
  { lat: 41.9028, lng: 12.4964 },
  { lat: 35.6895, lng: 139.6917 }
]

navigator.geolocation.getCurrentPosition(success, error)

function success(position){
  let addLoc = { lat: position.coords.latitude, lng: position.coords.longitude }
  longlat.push(addLoc)
}

function error (position){
  console.log("I didn't work!")
}

var wow = function () {
  // create the container ul
  let ul = document.createElement('ul')
  ul.id = "listContainer"
  document.getElementById("container").appendChild(ul)
  // for each obj, call the api
    for (var i=0; i<longlat.length; i++) {
      let mapUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${longlat[i].lat},${longlat[i].lng}&key=AIzaSyDsm88feuAQdGO_JzymwI5lPbsafR2FRXY`
      // new request object, oen, onload, onerror, send
      let request = new XMLHttpRequest()
      request.open("GET", mapUri, true)
      request.onload = onloadFunc
      request.error = onerrorFunc
      request.send ()
    }
}

// onload function
let onloadFunc = function() {
  const resp = JSON.parse(this.response)
  console.log(resp)
  var li = document.createElement('li')

  if (resp.results.length > 0) {
    // if results, print most speicific result as li inside ul
    // print first result's formatted address to page
    li.innerHTML = resp.results[0].formatted_address
  } else {
    // if no results, print an error message
    li.innerHTML = 'Sorry, no results were found'
  }
  document.getElementById('listContainer').appendChild(li)
}

// onerror callback
function onerrorFunc() {
  // print an error message as li inside ul
    var li = document.createElement('li')
    li.innerHTML = 'Sorry, error occurred'
    document.getElementById('listContainer').appendChild(li)
}
