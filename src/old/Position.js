import React, { Component } from 'react'
import 'css/map/position.scss'
class Position extends Component {
    constructor() {
        super()
        this.position = this.position.bind(this)
    }
    position() {
        
    }
    render() {
        return (
            <div className='position'>
                <div className='gps'></div>
            </div>
        )
    }
}
export default Position