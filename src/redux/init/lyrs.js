import ol from 'openlayers'

import dnvi from 'images/map/dnvi.png'
import image from 'images/map/image.png'
import vector from 'images/map/vector.png'

const vectorLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    crossOrigin: 'anonymous',
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
  })
})
const imageLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    crossOrigin: 'anonymous',
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=6'
  })
})
const textLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    crossOrigin: 'anonymous',
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8'
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