import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import ol from 'openlayers'
import PopupOverlay from 'ol-popup-umd'

import { NavLink, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import 'css/map/popup.scss'

class Popup extends Component {
    constructor() {
        super()
        this.state = {
            content: ''
        }
    }
    componentDidMount() {
        
        this.load(this.props)
    }
    load(props) {
        const {map} = props
        if (!map) {
            return
        }
        this.overlay = new ol.Overlay({
            element: document.getElementById('container'),
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            },
            stopEvent: false
        })
        map.addOverlay(this.overlay)
        map.on('singleclick', this.clickListener, this)

    }
    componentWillUnmount() {
        const { map } = this.props
        map.removeOverlay(this.overlay)
        map.un('singleclick', this.clickListener, this)
    }
    clickListener(evt) {
        const {map} = this.props
        const feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
            if (!layer) {
                return null
            }
            return feature
        })
        if (feature) {
            const geometry = feature.getGeometry()
            // console.log(geometry.getArea())


            // console.log(this.getArea(feature))

            const extent = geometry.getExtent()
            // console.log(extent)
            const center = ol.extent.getCenter(extent)
            this.props.history.push('/index/field/type1')
            this.setState({
                content: '面积: ' + this.getArea(feature)
            })
            this.overlay.setPosition(center)

        }
    }
    closeClick(e) {
        e.preventDefault()
        console.log('close', this)
        this.overlay.setPosition(undefined)
        this.closer.blur()
    }
    getArea(polygonFeature) {
        var sphere = new ol.Sphere(6378137)
        var lonLatPolygon = polygonFeature.getGeometry().transform('EPSG:3857', 'EPSG:3857')
        var area = Math.abs(sphere.geodesicArea(lonLatPolygon.getCoordinates()[0]))
        var unit
        if (area > 1000000) {
            area = area / 1000000
            unit = 'km²'
        } else {
            unit = 'm²'
        }
        return area + unit
    }
    render() {
        // console.log(this.state.content)
        return (
            <div id='container' className="ol-popup">
                <a href="#" className="ol-popup-closer" 
                    onClick={this.closeClick.bind(this)}
                    ref={closer => this.closer = closer}></a>
                <div className="popup-content">
                    <h3>伊尔力可多乡山地A</h3>
                    <div>
                        <NavLink to='/index/field/type1'
                            activeClassName='selected' 
                            className='nav-link'>耕作任务</NavLink>
                        <NavLink to='/index/field/type2'
                            activeClassName='selected' 
                            className='nav-link'>耕作历史</NavLink>
                        <NavLink to='/index/field/type3'
                            activeClassName='selected' 
                            className='nav-link'>土壤环境</NavLink>
                    </div>
                    <div className='type'>
                        <Route exact path='/index/field/:type' render={(props) => {
                            console.log(props)
                            return (
                                <div>1111</div>
                            )
                        }}></Route>
                    </div>
                   
                </div>
            </div>
          
        )
    }
}
// Popup.contextTypes = {
//     router: PropTypes.object.isRequired
// }
Popup.propTypes = {
    map: PropTypes.object,
    history: PropTypes.object,
    feature: PropTypes.object
}
export default withRouter(Popup)