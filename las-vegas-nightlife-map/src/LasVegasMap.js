import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";








// Set value to true on map load callback

function onMapLoaded() {
  console.log('map callback');
  window.isMapLoaded = true;
}

// Map component

const MapComponent = withScriptjs(withGoogleMap(props => {
    return <GoogleMap
      defaultZoom={15}
      defaultCenter={props.places.length > 0 ? props.places[0] : {lat: 36.1029, lng: -115.1784}}
      defaultOptions={{mapTypeControl: false}}
      onClick={props.hideInfoWindow}
      >
      {props.isMarkerShown && (props.places.map((place, index) =>
        <Marker
          key={index}
          position={place}
          animation={place.clicked ?
            window.google.maps.Animation.BOUNCE : 0}
          onClick={() => {props.onMarkerClick(index)}} /> ))
      }
    </GoogleMap>
  }
))

// Container for map

class LasVegasMap extends Component {
  componentDidMount() {
    window.isMapLoaded = false;
    window.onMapLoaded = onMapLoaded;
    setTimeout(() => {
      if (!window.isMapLoaded) {
        this.props.onError();
      }
    }, 10000);
  }

  render() {
    return <div
      role='region'
      aria-label='map'
      className='map-container'
      style={{marginLeft: '250px'}}>
      <MapComponent
        isMarkerShown={this.props.places.length > 0}
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyD-iiCyA8JhdidecnEIfLP8YvAODfqsdlk&v=3.exp&libraries=geometry,drawing,places&callback=onMapLoaded'
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        places={this.props.places}
        hideInfoWindow={this.props.hideInfoWindow}
        onMarkerClick={this.props.onMarkerClick}
      />
    </div>;
  }
}

export default LasVegasMap;