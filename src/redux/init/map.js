import ol from 'openlayers'
import lyrs from '_redux/init/lyrs'

var sld_body = '<?xml version="1.0" encoding="ISO-8859-1"?>\
<StyledLayerDescriptor version="1.0.0"\
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" \
    xmlns="http://www.opengis.net/sld"\
    xmlns:ogc="http://www.opengis.net/ogc"\
    xmlns:xlink="http://www.w3.org/1999/xlink"\
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\
  <NamedLayer>\
    <Name>Simple point</Name>\
    <UserStyle>\
      <Title>GeoServer SLD Cook Book: Simple point</Title>\
      <FeatureTypeStyle>\
        <Rule>\
          <PointSymbolizer>\
            <Graphic>\
              <Mark>\
                <WellKnownName>circle</WellKnownName>\
                <Fill>\
                  <CssParameter name="fill">#00FF0000</CssParameter>\
                </Fill>\
              </Mark>\
              <Size>6</Size>\
            </Graphic>\
          </PointSymbolizer>\
        </Rule>\
      </FeatureTypeStyle>\
    </UserStyle>\
  </NamedLayer>\
</StyledLayerDescriptor>'



const map = new ol.Map({
  layers: [
    // http://47.104.81.112:8080/geoserver/jnGroundwater/wms?
    // service=WMS&
    // version=1.1.0&
    // request=GetMap&
    // layers=jnGroundwater:tb_farmland&
    // styles=&
    // bbox=10.0634765625,-19.2696652965023,56.3818359375,21.820707853875&
    // width=768&
    // height=681&
    // srs=EPSG:4326&
    // CQL_FILTER=master_id=%3D%2734067624ef64493fbd5f058ec9c247fe%27&
    // format=application/openlayers
    
    // new ol.layer.Image({
    //     source: new ol.source.ImageWMS({
    //         ratio: 1,
    //         url: 'http://47.104.81.112:8080/geoserver/jnGroundwater/wms',
    //         params: {
    //             'FORMAT': 'image/png',
    //             'VERSION': '1.1.1',
    //             STYLES: '',
    //             CQL_FILTER: 'master_id==\'34067624ef64493fbd5f058ec9c247fe\'',
    //             LAYERS: 'jnGroundwater:tb_farmland',
    //             SLD_BODY: sld_body
    //         }
    //     }),
           
    // })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([104, 30.7]),
    zoom: 12,
    maxZoom: 20,
    minZoom: 4
    // projection: 'EPSG:4326'
  })
})


// const dezhou = new ol.layer.Image({
//   source: new ol.source.ImageWMS({
//     ratio: 1,
//     url: 'http://192.168.1.106:8080/geoserver/dezhou/wms',
//     params: {
//       'FORMAT': 'image/png',
//       'VERSION': '1.1.1',
//       STYLES: '',
//       LAYERS: 'dezhou:tb_geographic_info',
//       // SRS: 'EPSG:4326'
//     }
//   })
// })
lyrs.forEach(lyr => {
  lyr.active && lyr.lyrs.forEach(ly => map.addLayer(ly))
})
// map.addLayer(dezhou)
// console.log(111)
export default map