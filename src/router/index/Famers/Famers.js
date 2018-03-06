import React, { Component } from 'react'
import PropTypes from 'prop-types'
import person from 'images/index/famers/person.png'
class Famer extends Component {
    constructor() {
        super()
        this.showUpdate = this.showUpdate.bind(this)
    }
    showUpdate(e) {
        this.props.showUpdate(e, this.props.list)
    }
    render() {
        const { list } = this.props
        return (
            <div className='famers'>
                <div className='famers-img'>
                    <img src={person} alt="" onClick={this.showUpdate}/>
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
    list: PropTypes.object,
    showUpdate: PropTypes.func
}
export default Famer