import ol from 'openlayers'

import dnvi from 'images/map/dnvi.png'
import image from 'images/map/image.png'
import vector from 'images/map/vector.png'

const vectorLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        url: 'http://www.google.cn/maps/vt?lyrs=m@733&gl=cn&x={x}&y={y}&z={z}'
    })
})
const imageLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        url: 'http://www.google.cn/maps/vt?lyrs=s@718&gl=cn&x={x}&y={y}&z={z}'
    })
    
})
const textLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        url: 'http://www.google.cn/maps/vt?lyrs=h@733&gl=cn&x={x}&y={y}&z={z}'
    })
    
})

export default [
    // {   
    //     id: 'dnvi',
    //     url: dnvi,
    //     active: false,
    //     lyrs: []
    // },
    {
        id: 'image',
        url: image,
        active: true,
        lyrs: [imageLayer, textLayer]
    },
    {
        id: 'vector',
        url: vector,
        active: false,
        lyrs: [vectorLayer]
    }
]