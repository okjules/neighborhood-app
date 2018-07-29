import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp';

import mapLocations from './mapLocations.json'
import mapStyles from './mapStyles.json'
import MapFilter from './mapFilter'

import './index.css'
import './MediaQueries.css'

class App extends Component {
  state = {
    locations: mapLocations,
    mapState: '',
    InfoWindow: {},
    markers: [],
    currentMarker: {},
    wikiContent: '',
    isOpen: false
  }

  /* Initiate map with personal Google API key */
  componentDidMount() {
    window.initMap = this.initMap;
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAmIx2BqnJeB6BLLGaOymf8yQ7hsIyYSEs&callback=initMap');
  }

  initMap = () => {
    let self = this;
    const { locations, markers } = this.state;

    let infoWindow = new window.google.maps.InfoWindow();

    /* Define the map for central Berlin and the styles */
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 52.513722, lng: 13.392670 },
      zoom: 15,
      styles: mapStyles
    });

    /* Keep state in sync */
    this.setState({
      mapState: map,
      InfoWindow : infoWindow
    });

    /* Create a marker for each location */
    for (let location of locations) {
      let id = location.key;
      let title = location.title;
      let name = location.name;
      let position = location.position;

      let marker = new window.google.maps.Marker({
        id: id,
        title: title,
        name: name,
        position: position,
        map: map,
        animation: window.google.maps.Animation.DROP
      });

      /* Include markers in state */
      markers.push(marker);

      /* Listener for marker to get InfoWindow with Wiki input on click*/
      marker.addListener('click', function () {
        self.getWiki(marker);
      });
    }
  }

  /* Get Data from Wikipedia API */
  getWiki = (marker) => {
    let self = this;
    let place = marker.title;
    let wikiSource = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' +
    place;
    wikiSource = wikiSource.replace(/ /g, '%20')

    fetchJsonp(wikiSource)
        .then(function(response) {
          return response.json()
      }).then(function (data) {
          let pages = data.query.pages
          let pageId = Object.keys(data.query.pages)[0]
          let pageContent = pages[pageId].extract
          self.fillInfoWindow(marker, pageContent)
      }).catch(function (error) {
          let pageError = 'Parsing failed ' + error;
          alert('Error\n' + pageError);
      });
  }

  fillInfoWindow(marker, wikiContent) {
    const { mapState, InfoWindow } = this.state;

    /* Check if open InfoWindow is different from clicked marker
    * If it is --> InfoWindow is set to match clicked marker
    * Else --> InfoWindow matches marker and is reloaded
    */
    if (InfoWindow.marker !== marker) {
      InfoWindow.marker = marker
      InfoWindow.setContent(
        `
        <div class="infoWindow" tabIndex="0">
          <header>
            <p class="infoWindow-source">Source: Wikipedia</p>
            <h2 class="infoWindow-location-name">${marker.name}</h2>
            <hr/>
          </header>
          <article class="infoWindow-wikipedia-content">${wikiContent}</article>
        </div>
        `
      )
      InfoWindow.open(mapState, marker)

      InfoWindow.addListener('closeclick', function () {
        InfoWindow.setMarker = null
      })
    } else {
      InfoWindow.open(mapState, marker)
    }
  }

  toggleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !(prevState.isOpen)
    }))
  }

  render() {
    const { locations, markers, isOpen } = this.state
    return (
      <div className="App">
        <MapFilter
          locationsList = {locations}
          markers={markers}
          getWiki = {this.getWiki}
          toggleOpen = {this.toggleOpen}
          isOpen = {isOpen}
        />
        <div id="map" role="application"></div>
      </div>
    );
  }
}

export default App;

function loadJS(src) {
let ref = window.document.getElementsByTagName('script')[0];
let script = window.document.createElement('script');

script.src = src;
script.async = true;
ref.parentNode.insertBefore(script, ref);

script.onerror = function () {
  document.write('Load error: Google Maps')
  };
}
