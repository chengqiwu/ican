import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import {farmLandSave} from '../utils/Api.js'
import ol from 'openlayers'
import { connect } from 'react-redux'
import 'css/index/common/createFiled.scss'
import { saveFeature, setFeature } from '_redux/actions/feature'
class CreateField extends Component {
    constructor() {
        super()
        this.submitHandle = this.submitHandle.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.closeClick = this.closeClick.bind(this)
    }
    componentDidMount() {
        this.overlay = new ol.Overlay({
            element: document.getElementById('container'),
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            },
            stopEvent: true
        })
        this.props.map.map.addOverlay(this.overlay)
        this.load()
        this.closer.onclick = this.closeClick
    }
    componentDidUpdate() {
        this.load()
    }
    componentWillUnmount() {
        // this.overlay.setPosition(undefined)
        this.overlay = null
    }
    load() {
        const { coord } = this.props
        console.log(coord)
        this.overlay.setPosition(coord)
    }
    closeClick(e) {
        e.preventDefault()
        this.overlay.setPosition(undefined)
        this.closer.blur()
    }
    changeInput(e) {
        e.preventDefault()
        this.setState({
            name: e.target.value
        })
    }
    submitHandle(e) {
        e.preventDefault()

        // 圈地

        const farmLandInfo = {
            name: this.input.value,
            geom: this.props.geom
        }
        farmLandSave({
            farmLandInfo: JSON.stringify(farmLandInfo)
        }).then(res => res.data).then(data => {
            console.log(data)
            if (data.msg === '200') {
                this.props.setFeature({
                
                    name: this.input.value,
                    id: data.result,
                    isNew: 1  
                })
                this.props.drawText()
                this.overlay.setPosition(undefined)
            } else {
                data.msg === '209'
                alert(data.result+ ' ，请重绘。。。')
            }
        })


    }
    render() {
        const area = this.props.area 
        return (
            <div id='container' className="ol-popup">
                <a href="#" id='close' className="ol-popup-closer"
                    ref={closer => this.closer = closer}></a>
                <div className="popup-content">
                    <form onSubmit={this.submitHandle} style={{display:'block'}}>
                        <input type="text" className='ppfix post email' name='name' ref={input => this.input = input} />
                        <div>{area.acre} 亩 / {area.hectare} 公顷</div>
                        <button className='button blue'>保存</button>                     
                    </form>
                </div>
            </div>
            
        )
    }
  
}

CreateField.propTypes = {
    submitHandle: PropTypes.func,
    changeInput: PropTypes.func,
    area: PropTypes.string,
    setFeature: PropTypes.func,
    geom: PropTypes.string,
    map: PropTypes.object,
    coord: PropTypes.array,
    drawText: PropTypes.func,
    feature: PropTypes.object

}
const mapStateToProps = (state) => {
    return {
        map: state.map,
        feature: state.feature
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        setFeature: (feature) => {
            dispatch(setFeature(feature))
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(CreateField)