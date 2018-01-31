import React, { Component } from 'react'
import england from 'images/common/england.png'
import china from 'images/common/china.png'
import 'css/language.scss'
class Language extends Component {
    render() {
        return (
            <div className='login-langeuage'>
                <div>
                    <img src={england} alt="England" />
                    <label>langeuage</label>
                </div>
                <div>
                    <img src={china} alt="china" />
                    <label>中文</label>
                </div>
            </div>
           
        )
    }
}
export default Language