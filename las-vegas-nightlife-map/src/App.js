import React, { Component } from 'react';
import NightlifeList from './NightlifeList';
import LasVegasMap from './LasVegasMap';
import LocationFeature from './LocationFeature';
import './App.css';

const FOURSQUARE = require('react-foursquare')({
  clientID: 'ITSU55XJJ5ZD05TYAFHJACFW3AOJTJBFITY0DNUGWDLQXMG2',
  clientSecret: 'R05TMKXMHJZXPSDQIC4VTLGBGFRN4O5W4GMGY52YEXGCPSJR'
});

class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }
  /**
   * Set markers on the map
   * if places meet criteria set
   */
  handleSetMarkers = (places) => {
    this.setState({ places });
  }

  /**
   * Controls the click on map markers
   */
// Update list and showcase clicked item on map
  handleMarkerClick = (marker) => {
    const places = this.state.places.map((p, index) => {
      if (index === marker) {
        p.clicked = true;
      } else {
        p.clicked = false;
      }
      return p;
    });

    // Get place details from FourSquare API
    this.getInfo(this.state.places[marker])
      .then(fsResponse => {
        // Set state of the component
        this.setState({
          places: places,
          selectedPlace: fsResponse.response.venue
        });

        // Set focus to modal popup
        document.querySelector('.info-window').focus();
      })
      .catch(error => {
        this.showError();
        console.log(error);
      });
  }

  // Closes the modal info window and mark all places not clicked already
  handleHidingLocationFeature = () => {
    // Update list of places
    const places = this.state.places.map((p, index) => {
      p.clicked = false;
      return p;
    });

    // Update component state
    this.setState({ places: places, selectedPlace: null });
  }

  getInfo = (place) => {
    return FOURSQUARE.venues.getVenue({
      'venue_id': place.id
    })
  }

  showError = () => {
    const block = document.querySelector('.error');
    block.style.opacity = 1;
    setTimeout(() => {
      block.style.opacity = 0;
    }, 3000);
  }



  
  render() {
    const placesInfo = this.state.places.map(v => {
      return { lat: v.location.lat, lng: v.location.lng, clicked: v.clicked }
    });
    





    return (
      <div className='app-container'>
        <NightlifeList
          foursquare={FOURSQUARE}
          setMarkers={this.handleSetMarkers}
          onPlaceClick={this.handleMarkerClick} />
        <LasVegasMap
          places={placesInfo}
          hideLocationFeature={this.handleHidingLocationFeature}
          onMarkerClick={this.handleMarkerClick}
          onError={this.showError}
           />
        {this.state.selectedPlace && (<LocationFeature
          place={this.state.selectedPlace}
          foursquare={FOURSQUARE}
          hideLocationFeature={this.handleHidingLocationFeature} />)}
        <div
          style={{ opacity: 0 }}
          className='error'></div>
      </div>
    );
  }
}

export default App;