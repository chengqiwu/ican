import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'css/map/zoom.scss'
class Zoom extends Component {
    constructor() {
        super()
        this.zoomIn = this.zoomIn.bind(this)
        this.zoomOut = this.zoomOut.bind(this)
    }
    zoomIn() {
        const { map } = this.props.map
        const view = map.getView()
        const zoom = view.getZoom()
        view.setZoom(zoom + 1)
    }
    zoomOut() {
        const { map } = this.props.map
        const view = map.getView()
        const zoom = view.getZoom()
        view.setZoom(zoom - 1)
    }
    render() {
        return (
            <div className='zoom'>
                <div onClick={this.zoomIn}>
                    <div className='zoomIn'></div>
                </div>
                <div onClick={this.zoomOut}>
                    <div className='zoomOut'></div>
                </div>
            </div>
        )
    }
}
Zoom.propTypes = {
    map: PropTypes.object
}
export default Zoom