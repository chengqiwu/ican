import React, { Component } from 'react'
import ol from 'openlayers'
import 'css/map/popupContent.scss'
const status = ['闲', '优', '良', '差']
class Popup extends Component {
    componentDidMount() {
        const props = this.props
        console.log(props)
        this.textOverlay = new ol.Overlay({
            element: this.popup,
            positioning: 'center-center',
            stopEvent: false
        })
        props.map.addOverlay(this.textOverlay)
        this.textOverlay.setPosition(props.coord)

        props.map.getView().on('change:resolution', (e) => {
            const zoom = props.map.getView().getZoom()
            console.log(zoom)
            if (zoom >10) {
                this.textOverlay.setPosition(props.coord)
            } else {
                this.textOverlay.setPosition(undefined)
            }
        })
    }
    render() {
        const props = this.props
        return (
            <div className='popup' ref={popup => this.popup = popup}>
                <div>
                    <h3>{props.name}</h3>
                   
                </div>
                <div>
                    <label className='status'>{status[Number.parseInt(props.growth_status)]}</label>
                    <span className='username'>{props.username}</span>
                    <span className='area' >{props.area}</span>
                </div>
            </div>  
        )
    }
}
export default Popup