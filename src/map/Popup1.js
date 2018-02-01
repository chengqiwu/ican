import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import ol from 'openlayers'
import PopupOverlay from 'ol-popup-umd'
import Count1 from './Count1'
import Count2 from './Count2'
import Form from './Form'
import Form2 from './Form2'
import { NavLink, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Scrollbar from 'smooth-scrollbar'
import { connect } from 'react-redux'
import 'css/map/popup1.scss'

class Popup extends Component {
    constructor() {
        super()
        this.state = {
            content: '',
            initial: true,
            name: '',
            next: false
        }
        this.submitHandle = this.submitHandle.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.startHandle = this.startHandle.bind(this)
        this.modifyHandle = this.modifyHandle.bind(this)
        this.closeClick = this.closeClick.bind(this)
    }
    componentDidMount() {
        this.closer.onclick = this.closeClick
        console.log(document.querySelector('.popup-content'))
        Scrollbar.init(document.querySelector('.popup-content'))

        // document.querySelector('.ol-popup').onclick(function(e) {
        //     e.stopPropagation()
        // })
        this.load(this.props)
        
    }
    load(props) {
        const { map } = props.map
        if (!map) {
            return
        }
        this.overlay = new ol.Overlay({
            element: document.getElementById('container'),
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            },
        })
        map.addOverlay(this.overlay)
        map.on('click', this.clickListener, this)

    }
    componentWillUnmount() {
        const { map } = this.props.map
        map.removeOverlay(this.overlay)
        map.un('click', this.clickListener, this)
    }
    clickListener(evt) {
        const { map } = this.props.map
        this.feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
            if (!layer) {
                return null
            }
            return feature
        })
        if (this.feature) {
            const geometry = this.feature.getGeometry()
            const extent = geometry.getExtent()
            this.center = ol.extent.getCenter(extent)
            this.setState({
                content: '面积: ' + this.getArea(this.feature)
            })
            if (this.feature.getId()) {
                if (this.overlay.getPosition()) {
                    return 
                }
                if (this.state.initial) {
                    this.setState({
                        initial: false
                    })
                }
                this.overlay.setPosition(this.center)
                return
            }
           
           
            this.overlay.setPosition(this.center)
        }
        
     
    }
    closeClick(e) {
        e.preventDefault()
        this.overlay.setPosition(undefined)
        this.closer.blur()
        return false
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
    submitHandle(e) {
        e.preventDefault()
        this.feature && this.feature.setId(this.state.name)
    }
    changeInput(e) {
        e.preventDefault()
        this.setState({
            name: e.target.value
        })
    }
    modifyHandle(e) {
        e.preventDefault()
        this.feature.setId(e.target.name.value)
    }
    startHandle(e) {
        e.preventDefault()
        console.log('开始种植')
        this.setState({
            next: true
        })
    }

    render() {
        const { initial } = this.state
        const props = {
            name: this.state.name,
            changeInput: this.changeInput,
            content: this.state.content,
            submitHandle: this.submitHandle,
            startHandle: this.startHandle,
            modifyHandle: this.modifyHandle
        }
        console.log(props)
        return (
            <div id='container' className="ol-popup">
                <a href="#" className='ol-popup-closer' ref={closer => this.closer = closer}>
                    {/* onClick={this.closeClick} */}
                </a>
                <div className='popup-content'>
                    <Form2 {...props} />
                    {/* {
                        this.state.next ? <Form {...props}/> :
                            this.state.initial ? <Count1 {...props} /> : <Count2 {...props} />
                    } */}
                </div>
            </div>

        )
    }
}
Popup.propTypes = {
    map: PropTypes.object,
    history: PropTypes.object
}
const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}
export default connect(mapStateToProps)(withRouter(Popup))