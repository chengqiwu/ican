import React, { Component } from 'react'
import PropTypes from 'prop-types'
import person from 'images/index/famers/person.png'
class Famer extends Component {
    constructor() {
        super()
    }
    render() {
        const { list } = this.props
        return (
            <div className='famers'>
                <div className='famers-img'>
                    <img src={person} alt=""/>
                </div>
                <div className='famers-mess'>
                    <div>
                        <div className='bg-person'></div>
                        <div>{list.name}</div>
                    </div>
                    <div>
                        <div className='bg-phone'></div>
                        <div>{list.phone}</div>
                    </div>
                </div>
                <div className='famers-own'>
                    <div>{list.own}</div>
                </div>
            </div>
        )
    }
}
Famer.propTypes = {
    list: PropTypes.object
}
export default Famer