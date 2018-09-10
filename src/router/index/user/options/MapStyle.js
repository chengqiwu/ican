import ol from 'openlayers'

export function styleFunction(feature, number) {
  
  const growth_status = feature.get('growth_status')
  let color = [117, 172, 71, 0.7]
  // ['优', '良', '差', '闲', '弃', '不选择']
  switch (growth_status) {
  case '0':
    color = [117, 172, 71, 0.7]
    break
  case '1':
    color = [254, 198, 28, 0.7]
    break
  case '2':
    color = [255, 25, 25, 0.7]
    break
  case '3':
    color = [122, 122, 122, 0.7]
    break
  case '4':
    color = [196, 196, 196, 0.7]
    break
  case '5':
    color = [17, 102, 0, 0.7]
    break
  default:
    break
  }
  return new ol.style.Style({
    fill: new ol.style.Fill({
      color
    }),
    stroke: new ol.style.Stroke({
      lineCap: 'butt',
      lineJoin: 'miter',
      color: [255, 200, 0, 1.0],
      width: 1
    })
  })
}