import React, { Component } from 'react'
import ol from 'openlayers'
import PropTypes  from 'prop-types'

import dnvi from 'images/map/dnvi.png'
import map from 'images/map/map.png'
import image from 'images/map/image.png'

import 'css/map/layer.scss'

const layer1 = new ol.layer.Tile({
    source: new ol.source.TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.natural-earth-hypso-bathy.json?secure',
        crossOrigin: 'anonymous'
    })
})
layer1.set('id', 0)
const layer2 =  new ol.layer.Tile({
    source: new ol.source.OSM()
})
layer2.set('id', 1)
const layer3 = new ol.layer.Tile({
    source: new ol.source.TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure'
    })
})
layer3.set('id', 2)
const layerArr = [
    layer1,
    layer2,
    layer3
] 
class ChangeLayer extends Component {
    changeLayer(layerId) {
        const { map } = this.props.map
        const layers = map.getLayers().getArray()
        //假设每次加载一个图层，每个图层对应一个id值，通过比较id值
       
        map.removeLayer(layer1)
        map.removeLayer(layer2)
        map.removeLayer(layer3)
        map.addLayer(layerArr[layerId])
       
    }
    render() {
        return (
            <div className='layers'>
                <div>
                    <img src={map}   className='layer' onClick={this.changeLayer.bind(this, 0)}></img>
                    <span>地图</span>
                </div>
                <div>
                    <img src={image} className='layer' onClick={this.changeLayer.bind(this, 1)}></img>
                    <span>影像</span>
                </div>
                <div>
                    <img src={dnvi}  className='layer' onClick={this.changeLayer.bind(this, 2)}></img>
                    <span>NDVI</span>
                </div>
            </div>
        )
    }
}
ChangeLayer.propTypes = {
    map: PropTypes.object
}
export default ChangeLayer