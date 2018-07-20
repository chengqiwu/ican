import React, { Component } from 'react'
import ol from 'openlayers'
import 'css/map/popupContent.scss'
import poor from 'images/index/status/poor.png'
import excellent from 'images/index/status/excellent.png'
import notBusy from 'images/index/status/notBusy.png'
import center from 'images/index/status/center.png'
// ['闲', '优', '良', '差']
const status = [notBusy, excellent, center, poor]
class Popup extends Component {
    componentDidMount() {
        const props = this.props
        this.textOverlay = new ol.Overlay({
            element: this.popup,
            positioning: 'center-center',
            stopEvent: false
        })
        props.map.addOverlay(this.textOverlay)
        // this.textOverlay.setPosition(props.coord)

        props.map.getView().on('change:resolution', (e) => {
            const zoom = props.map.getView().getZoom()
            console.log(zoom)
            if (zoom >10) {
                // this.setPosition(props.coord)
            } else {
                this.setPosition(undefined)
            }
        })
    }
    setPosition = (pos) => {
        this.textOverlay && this.textOverlay.setPosition(pos)
    }
    render() {
        const props = this.props
        return (
            <div className='popup' ref={popup => this.popup = popup}>
                <table>
                    <tbody>
                        <tr>
                            <td rowSpan='2'>
                                <img style={{marginRight: '5px'}} src={ status[Number.parseInt(props.growth_status)] } alt=""/>
                               
                            </td>
                            <td><h3>{props.name}</h3></td>
                        </tr>
                        <tr>
                            <td>
                                {props.username} || {props.area}
                            </td>
                        </tr>
                    </tbody>
                  
                </table>
            </div>  
        )
    }
}
export default Popup