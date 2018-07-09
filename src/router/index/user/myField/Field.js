import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import ol from 'openlayers'
import fly from 'images/feature/fly.png'
import { connect } from 'react-redux'
class Field extends Component {
    flyTo = (feature) => {
        console.log(feature)
        const feature1 = new ol.format.GeoJSON().readFeature(feature, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
        this.props.map.map.getView().fit(feature1.getGeometry(), { duration: 1000 })
    }
    render() {
        
        return <ul>
            {
                this.props.userFeature.fields.map(feature => 
                    <li className='featureLi' key={feature.id}
                        onClick={this.flyTo.bind(this, feature)}>
                        <span>{feature.properties.name}</span>
                        <img src={fly} alt='定位'/>
                    </li>)
            }
        </ul>
    }
}

const mapStateToProps = function (state) {
    return {
        map: state.map,
        userFeature: state.userFeature
    }
}
Field.propTypes = {
    map: PropTypes.object,
    userFeature: PropTypes.object
}
export default connect(mapStateToProps)(Field)