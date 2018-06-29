import React, { Component } from 'react'
import { getUserInfo2 } from '../../../utils/Api'
import 'css/index/common/company.scss'
class Company extends Component {
    constructor() {
        super()
        this.state = {
            companyName: '',
            companyLogo: undefined
        }
    }
    componentDidMount() {
        getUserInfo2()
            .then(e=>e.data)
            .then(data => {
                if (data.msg === '200') {
                    const { result } = data
                    this.setState({
                        companyName: result.companyName,
                        companyLogo: result.companyLogo
                    })
                }
            })
    }
    render() {
     
        return <div className='showCompany'>
            {this.state.companyLogo ?
                <img src={this.state.companyLogo} alt="" />  :
                this.state.companyName ?
                    <div>{this.state.companyName}</div> :
                    null}
        </div>
    }
}

export default Company