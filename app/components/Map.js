import React from 'react'
import ReactMapGl, {Marker} from 'react-map-gl'

export default class TransactionMap extends React.Component {
  state = {
    logo: this.props.logo,
    viewport: {
      latitude: this.props.lat,
      longitude: this.props.long,
      width: "400px",
      height: "300px",
      zoom: 15
    }
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.logo !== this.state.logo) {
      this.setState({
        logo: nextProps.logo,
        viewport: {
          latitude: nextProps.lat,
          longitude: nextProps.long,
          width: "400px",
          height: "300px",
          zoom: 15
        }
      })
    }
  }


  _onViewportChange = viewport => this.setState({ viewport });

  render() {
    const {viewport, logo} = this.state
    //const {latitude, longitude} = this.state.viewport
    return (
       <ReactMapGl
        {...this.state.viewport}
        mapStyle="mapbox://styles/maxallaneccles/ckkfx08jb061617t8hjtudkwc"
        mapboxApiAccessToken="pk.eyJ1IjoibWF4YWxsYW5lY2NsZXMiLCJhIjoiY2trZnBic2Q0MGR5ZjJ2bndmNzAzZXVqbyJ9.JMGdrbyv8ZVJt6WrATnu-w"
        //onViewportChange={this._onViewportChange}
       >
       <img src="https://camo.githubusercontent.com/cf792d7e7ad50152f9bcc62ae161fa20f920f88bc3a095f94c241f237ea81396/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f694465623132434b4d5664674471424439794a3955656861576b4b584664504d74755541384a7430734f7678587a4f6d3231714e4762413644355f6764445a74416b343d77333030" className="map-point" alt="Icon" />
       </ReactMapGl>
    )
  }
}