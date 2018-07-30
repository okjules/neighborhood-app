# Neighborhood Map React Project of central Berlin for Udacity

## About

Project for Udacity Nanodegree course. Shows a map of central Berlin and
interesting sights to visit there:
- Brandenburger Gate
- Checkpoint Charlie
- Reichstag Building
- Gendarmenmarkt
- Rotes Rathaus
- Berliner Cathedral
- Pergamon Museum
- Tränenpalast
- German Chancellery

For each location a short text on why the sight is important is displayed,
when the marker is clicked. The map uses the Wikipedia API to display this information.

You can also filter all the locations by name, when looking for a special one.

## How to use the App as User

- Download or clone the repository
- On the terminal move to the app's folder
- Set up the project with `npm install`
- Start the server with `npm start`
- The app should automatically start in your browser, if not you can find the app at `localhost:3000`

## How to use the App in Production Mode

- Download or clone the repository
- On the terminal move to the app's folder
- Run the command `npm run serve`
- The app should automatically start in your browser, if not you can find the app at `localhost:5000`

## **_Important_**
Please use your own Google Maps API key, when running this application. You can insert your key in the `App.js` file here:

```
componentDidMount() {
  window.initMap = this.initMap;
  loadJS('https://maps.googleapis.com/maps/api/js?key=YOUR-GOOGLE-API-KEY&callback=initMap');
}
```

## Project Dependencies

###### *General set-up*
- To use the project you will need [npm](https://www.npmjs.com/get-npm)
- The project was built with [React](https://reactjs.org/)
- The project was bootstrapped using [create-react-app](https://github.com/facebook/create-react-app)

###### *APIs*
- The project requires implementation of [Google Maps API](https://developers.google.com/maps/documentation/)
- The project requires implementation of [MediaWikiAPI](https://www.mediawiki.org/wiki/API:Main_page)

###### *Other Packages*
- The project uses [fetch-jsonp](https://github.com/camsong/fetch-jsonp)
- The project uses [escape-string-regexp](https://github.com/sindresorhus/escape-string-regexp)
- The project uses [sort-by](https://github.com/kvnneff/sort-by)

## Other Sources consulted during Project

- [React Documentation](http://devdocs.io/react/)
- [React Tutorials](https://reactjs.org/tutorial/tutorial.html)
- [Snazzy Maps](https://snazzymaps.com/)
- [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
- [Google Geocoding Documentation](https://developers.google.com/maps/documentation/javascript/geocoding)
- [Wikipedia API Documentation](https://www.mediawiki.org/wiki/API:Main_page)
