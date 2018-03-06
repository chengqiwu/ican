import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'css/index/popup.scss'

class Popup extends Component{
    constructor(props) {
        super(props)
        this.closeClick = this.closeClick.bind(this)
    }
    closeClick(e) {
        this.props.fadeHiden()
    }
    render() {
        return (
            <div id='container' className='popup' style={this.props.css}>
                <div className='popup-title'>
                    <h4>{this.props.title}</h4>
                    <a href="#" className="popup-closer"
                        onClick={this.closeClick}
                        ref={closer => this.closer = closer}></a>
                </div>
                
                <div className="popup-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
   
}
Popup.propTypes = {
    css: PropTypes.object,
    hiden: PropTypes.bool,
    fadeHiden: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.node
}

export default Popup