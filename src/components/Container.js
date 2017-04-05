import React from 'react'
import GoogleApiComponent from 'google-maps-react/GoogleApiComponent'

export class Container extends React.Component {

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    //const pos = {lat: 37.759703, lng: -122.428093}
    return (
      <div className="vh-75 cover bg-center">
        <Map google={this.props.google} >

        </Map>
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: "AIzaSyA6PNXwjUhL0VD7WYutPfLVKILzvj74Y-8"
})(Container)
