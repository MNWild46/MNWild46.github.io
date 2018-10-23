import React, { Component } from 'react';
import Geocode from 'react-geocode';
import escapeRegExp from 'escape-string-regexp';

Geocode.setApiKey('AIzaSyD-iiCyA8JhdidecnEIfLP8YvAODfqsdlk');

class NightlifeList extends Component {
  state = {
    nightlife: [],
    query: ''
  }

  componentDidMount() {
    Geocode.fromAddress("T Mobile Arena").then(
      geoResponse => {
        const { lat, lng } = geoResponse.results[0].geometry.location;
        this.props.foursquare.venues.getVenues({
          'll': `${lat},${lng}`,
          'categoryId': '4d4b7105d754a06376d81259'
        }).then(fsResponse => {
          const venues = fsResponse.response.venues;
          this.props.setMarkers(venues);
          this.setState({ nightlife: venues });
        });
      })
        .catch(error => {
          console.log('FourSquare API was unable to load: ' +
              error
          );
      }
    );
  }

  // Handle query update

  handleQueryUpdate = (query) => {
    this.setState({ query }, () => {
      const filtered = this.getFilterednightlife();
      this.props.setMarkers(filtered);
    });
  }

  // Control hamburger menu click to open/close sidebar panel

  handlehamburgerClick = () => {
    const map = document.querySelector('.map-container');
    map.style.marginLeft = map.style.marginLeft === '250px' ? '0' : '250px';

    const hamburger = document.querySelector('.hamburger');
    hamburger.style.left = hamburger.style.left === '250px' ? '0' : '250px';
  }

  getFilterednightlife() {
    const { query, nightlife } = this.state;

    if (!query) {
      return nightlife;
    }

    const match = new RegExp(escapeRegExp(query), 'i');
    return nightlife.filter(p => match.test(p.name));
  }

// Provide input field for filter

  getInputField = () => {
    const { query } = this.state;

    return <input
      tabIndex={1}
      className='filter-nightlife'
      type='text'
      value={query}
      onChange={event => this.handleQueryUpdate(event.target.value)}
      placeholder='Filter Nightlife' />
  }

  // Returns list of nightlife locations

  getPlaceList = () => {
    let filterednightlife = this.getFilterednightlife();

    return (
      <ol className='nightlife' role='listbox' aria-label='List of nightlife'>
        {filterednightlife.map((p, index) =>
          <li
            tabIndex={index + 2}
            role='button'
            key={index}
            className='place'
            onClick={() => {this.props.onPlaceClick(index)}}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                this.props.onPlaceClick(index);
              }
            }}>
              {p.name}
          </li>
        )}
      </ol>
    )
  }

  render() {
    return (
      <div>
        <div className='sidebar'>
          <div className='heading' role='heading'>
            <h1 className='title'>
              Nightlife
            </h1>
            {this.getInputField()}
          </div>
          <div className='nightlife-list' role='region'>
            {this.getPlaceList()}
          </div>
        </div>
        <div
          tabIndex='-1'
          style={{left: '250px'}}
          className='hamburger'
          onClick={this.handlehamburgerClick}>
          <img
            src='hamburger-menu.png'
            alt='Button to toggle sidebar menu' />
        </div>
      </div>
    );
  }
}

export default NightlifeList;