import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'css/index/common/abstract.scss'
class Abstract extends Component {
    render() {
        const {message} = this.props
        return (
            <table className='abstract'>
                <tbody>
                    <tr>
                        <td>位置：</td>
                        <td>{message.location}</td>
                    </tr>
                    <tr>
                        <td>面积：</td>
                        <td>{message.area}</td>
                    </tr>
                    <tr>
                        <td>种植季：</td>
                        <td>{message.plantingSeason}</td>
                    </tr>
                    <tr>
                        <td>当前品种：</td>
                        <td>{message.cropsId}</td>
                    </tr>
                    <tr>
                        <td>土壤类型：</td>
                        <td>{message.varietiesId}</td>
                    </tr>
                    <tr>
                        <td>土壤酸碱度：</td>
                        <td>{message.soilPh}</td>
                    </tr>
                    <tr>
                        <td>土壤有机质范围：</td>
                        <td>{message.organicMatter}</td>
                    </tr>
                    <tr>
                        <td>灌溉条件：</td>
                        <td>{message.irrigation}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
Abstract.propTypes = {
    message: PropTypes.object
}
export default Abstract