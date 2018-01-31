import React, { Component } from 'react'
import 'css/map/search.scss'
class Search extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className='search'>
                <input type="text" placeholder='输入经纬度或地名' />
                <div></div>
            </div>
        )
    }
}
export default Search