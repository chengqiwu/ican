import ol from 'openlayers'
const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
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
    
        new ol.layer.Image({
            source: new ol.source.ImageWMS({
                ratio: 1,
                url: 'http://47.104.81.112:8080/geoserver/jnGroundwater/wms',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    STYLES: '',
                    CQL_FILTER: 'master_id==\'34067624ef64493fbd5f058ec9c247fe\'',
                    LAYERS: 'jnGroundwater:tb_farmland',
                }
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
    })
})
export default map