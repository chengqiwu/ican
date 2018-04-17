import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ol from 'openlayers'

import { connect } from 'react-redux'

import Circle from './common/Circle'
import 'openlayers/css/ol.css'
import 'css/map/map.scss'

// import Zoom from 'map/Zoom'
// import Position from 'map/Position'
// import Search from 'map/Search'
// import ChangeLayer from 'map/ChangeLayer'

class Openlayer extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.props.map.map.setTarget(this.map)
    }
    render() {
        return (
            <div id='map' className='map' ref={map => this.map = map}>
                <Circle/>
                {/* {this.props.children} */}
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

