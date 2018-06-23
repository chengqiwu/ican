
import ol from 'openlayers'
export const getArea = (feature) => {
    var measurement = ol.Sphere.getArea(feature.getGeometry())
    return {
        acre: Math.round(measurement / 10000 * 15 * 100) / 100,
        hectare: Math.round(measurement / 10000 * 100) / 100
    }
}