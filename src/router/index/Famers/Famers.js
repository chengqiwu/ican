import React, { Component } from 'react'
import PropTypes from 'prop-types'
import person from 'images/index/famers/person.png'
import { getFarmers } from 'utils/Api'
class Famer extends Component {
    constructor() {
        super()
        this.showUpdate = this.showUpdate.bind(this)
    }
    showUpdate(e) {
        const { list } = this.props
        console.log(list)
        const formData = new FormData()
        formData.append('id', list.id)
        getFarmers(formData).then(res=>{
            return res.data
        }).then(data=>{
            if (data.msg==='200') {
                this.props.showUpdate(e, data.result)
            }
        }) 
        //
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