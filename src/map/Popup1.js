import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import ol from 'openlayers'
import PopupOverlay from 'ol-popup-umd'
// import Count1 from './Count1'
// import Count2 from './Count2'
// import Form from './Form'
// import Form2 from './Form2'
import { NavLink, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Scrollbar from 'smooth-scrollbar'
import { connect } from 'react-redux'
import 'css/map/popup1.scss'

class Popup extends Component {
    constructor() {
        super()
        this.state = {
            feature: null,
            initial: true, // 是否是第一次

        }
        this.closeClick = this.closeClick.bind(this)

    }
    componentDidMount() {
        !this.closer.onclick && (this.closer.onclick = this.closeClick)
        Scrollbar.init(document.querySelector('.popup-content'))

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
        this.closer.onclick = null
    }
    clickListener(evt) {
        const { map } = this.props.map
        const feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
            if (!layer) {
                return null
            }
            return feature
        })
        if (feature) {
            const geometry = feature.getGeometry()
            const extent = geometry.getExtent()
            const center = ol.extent.getCenter(extent)
            this.setState({
                feature
            })
            if (feature.getId()) {
                if (this.overlay.getPosition()) {
                    return
                }
                this.setState({
                    initial: false
                })
                this.overlay.setPosition(center)
                return
            }  
            this.overlay.setPosition(center)
        }
    }
    closeClick(e) {
        e.preventDefault()
        this.overlay.setPosition(undefined)
        this.closer.blur()
        return false
    }


    render() {
        var childrenWithProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, { feature: this.state.feature, area: this.props.area, initial: this.state.initial }))
        return (
            <div id='container' className="ol-popup">
                <a href="#" className='ol-popup-closer' ref={closer => this.closer = closer}></a>
                <div className='popup-content'>
                    {childrenWithProps}
                </div>
            </div>

        )
    }
}
Popup.propTypes = {
    map: PropTypes.object,
    history: PropTypes.object,
    children: PropTypes.node,
    area: PropTypes.string
}
const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}
export default connect(mapStateToProps)(withRouter(Popup))