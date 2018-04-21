import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ol from 'openlayers'
import { connect } from 'react-redux'
import { getUserId } from 'utils/Api' 
import Circle from './common/Circle'
import 'openlayers/css/ol.css'
import 'css/map/map.scss'
import history from 'router/history'
import UserFeature from './userFeature'
class Openlayer extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        const map = this.props.map.map
        map.setTarget(this.map)

        const token = getUserId()
        if (!token) {
            history.push('/')
            return 
        }
        // const lyr= new ol.layer.Image({
        //     source: new ol.source.ImageWMS({
        //         ratio: 1,
        //         url: 'http://192.168.1.23:8081/geoserver/ican/wms',
        //         params: {
        //             'FORMAT': 'image/png',
        //             'VERSION': '1.1.0',
        //             STYLES: '',
        //             CQL_FILTER: `master_id==\'${token}\'`,
        //             LAYERS: 'ican:tb_farmland',
        //             SRS: 'EPSG:4326'
        //             // SLD_BODY: sld_body
        //         }
        //     }),

        // })
       
    }
    render() {
        return (
            <div id='map' className='map' ref={map => this.map = map}>
                <Circle/>
                <UserFeature map={this.props.map.map}/>
            </div>
        )
    }
}
Openlayer.propTypes = {
    children: PropTypes.object,
    setTarget: PropTypes.func,
    map: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        setTarget: (target) => dispath({ type: 'changeTarget', target})
    }
}
Openlayer = connect(mapStateToProps, mapDispatchToProps)(Openlayer)
export default Openlayer

