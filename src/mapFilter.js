import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by';

import mapLocations from './mapLocations.json'

class MapFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      mapFiltered: mapLocations,
      markersFiltered: [],
      currentMarker: {}
    }
  }

  componentDidMount() {
		this.setState({
			markersFiltered: this.props.markers
		});
	}

  updateQuery = (query) => {
    this.setState({ query })
    this.updateMapFilter(query)
  }

  updateMapFilter = (query) => {
    let self = this
    let showLocation
    let showMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showLocation = this.props.locationsList.filter((location) => match.test(location.name))
      showMarkers = this.props.markers.filter(marker => match.test(marker.title))

      this.setState({
        mapFiltered: showLocation,
        markersFiltered: showMarkers
      })

    } else {
      this.setState({
        mapFiltered: this.props.locationsList,
        markersFiltered: this.props.markers
      })
    }

    /* Show markers on map based on their state */
    this.props.markers.map(marker => marker.setVisible(false))
    setTimeout(() => {
      self.props.markers.map(marker => self.markerVisibility(marker))
    }, 1)
  }

  markerVisibility = (marker) => {
    this.state.markersFiltered.map(filteredMarker =>
      filteredMarker.id === marker.id &&
      marker.setVisible(true))
  }

  manageMarker = (location) => {
    let self = this

    this.stopMarkerAnimation()
    this.startMarkerAnimation(location)
    setTimeout(() => {
      self.stopMarkerAnimation()
    }, 1250)

    this.getCurrentMarker(location)
    setTimeout(() => {
      self.props.getWiki(
        self.state.currentMarker
      )
    }, 1)
  }

  stopMarkerAnimation = () => {
    this.state.markersFiltered.map(filteredMarker => filteredMarker.setAnimation(null))
  }

  startMarkerAnimation = (location) => {
    this.state.markersFiltered.map(filteredMarker => filteredMarker.id === location.key && filteredMarker.setAnimation(
      window.google.maps.Animation.BOUNCE
    ))
  }

  getCurrentMarker = (location) => {
    this.state.markersFiltered.map(filteredMarker =>
      filteredMarker.id === location.key &&
      this.setState({ currentMarker: filteredMarker })
    )
  }

  render() {
    const { query, mapFiltered } = this.state;
    const { isOpen } = this.props

    mapFiltered.sort(sortBy('name'))

    return (
      <aside className={isOpen ? "mapfilter open" : "mapfilter"}>
        <header>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              className="input-field"
              placeholder="Search sights..."
              value={query}
              onChange = {(event) => this.updateQuery(event.target.value)}
            />
          </form>

          <div className="reload" onClick={()=> {
              this.props.toggleOpen()
              this.updateQuery('')
            }}> Reload
          </div>
        </header>

        <ul className="location-list"> {mapFiltered.map(location => (
          <li className="location" key={location.key}
            onClick= {() => this.manageMarker(location)}
            onKeyPress={() => this.manageMarker(location)}>
              <div className="location-name">{location.name}</div>
          </li>))}
        </ul>
      </aside>
    )
  }
}

export default MapFilter;
