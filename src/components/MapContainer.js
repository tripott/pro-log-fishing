import React from 'react'
import Map, {GoogleApiWrapper, Marker} from 'google-maps-react'

const MapContainer = React.createClass({
  getInitialState: function() {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      position: this.props.mapCenter
    }
  },

  onMapMoved: function(props, map) {
    const center = map.center;
  },

  onMarkerClick: function(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  },

  onInfoWindowClose: function() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  },

  onMapClicked: function(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  },

  render: function() {
    if (!this.props.loaded) {
      return <div></div>
    }

    return (
      <div>
        <Map google={this.props.google}
          style={this.props.mapStyle}
          className={'map'}
          zoom={this.props.mapZoom}
          containerStyle={{}}
          initialCenter={this.props.mapCenter}
          centerAroundCurrentLocation={this.props.mapCenterCurrLoc}
          onClick={this.onMapClicked}
          onDragend={this.onMapMoved} >
            <Marker position={this.props.mapCenter} />
        </Map>
      </div>
    )
  }
});

export default GoogleApiWrapper({
  apiKey: "AIzaSyA6PNXwjUhL0VD7WYutPfLVKILzvj74Y-8"
})(MapContainer)
