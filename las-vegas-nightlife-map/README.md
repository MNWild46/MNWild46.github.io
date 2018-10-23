## Las Vegas Nightlife Map

As part of Udacity's Front-End Nanodegree, we were tasked wih creating a map that displayed at least 5 local items in the vicinity of a location.

## Intention of Project

This project was designed to utilize React and Google Maps to create a single-page app.

## Resources Used:

1) React JS for the framework of the app.
2) Google Maps API for the map.
3) FourSquare API for location details

On top of these, I utilized [react-google-maps](https://github.com/tomchentw/react-google-maps), [react-draggable](https://www.npmjs.com/package/react-draggable), [escape-string-regexp](https://github.com/sindresorhus/escape-string-regexp), [react-geocode](https://www.npmjs.com/package/react-geocode), and [react-foursquare](https://github.com/foursquare/react-foursquare) to streamline the process and provide more utility for my goals.

## Neighborhood Goal

My intention was to show nightlife locations located arount T-Mobile Arena in Las Vegas. This could be useful if someone went to a concert or Golden Kinghts hockey game there and was looking for clubs or bars that they could head over to after the main event.

## How to Run the App In Dev Mode:

1) Clone the app from github
2) Run ```npm install```
3) Install dependencies (See 'Resources Used' section)
4) Run ```npm start``` to launch the app

## How to Run the App In Production Mode (Needed for service worker usage through React):

1) Clone the app from github
2) Run ```npm install```
3) Install dependencies (See 'Resources Used' section)
4) Run ```npm run build```
5) Run ```serve -s build```
6) Input localhost:5000 into your browser window to launch the app

