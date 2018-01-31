import React, { Component } from 'react'
import PropTypes from 'prop-types'
import corn from 'images/index/field/corn.png'
class Filed extends Component {
    constructor() {
        super()
    }
    render() {
        const {list} = this.props
        return (
            <div className='filed'>
                <div className='filed-top'>
                    <h3>{list.name}</h3>
                    <div className='filed-area'>{list.area}</div>
                </div>
                <div className='filed-stage'>
                    <img src={corn}/>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>当前阶段:</td>
                                    <td>&nbsp;{list.currentStage}</td>
                                </tr>
                                <tr>
                                    <td>下一阶段: </td>
                                    <td>&nbsp;{list.nextStage}</td>
                                </tr>
                                <tr>
                                    <td>管理人员: </td>
                                    <td>&nbsp;{list.manager}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='filed-more'>
                    <div>
                        <div className='bg-modify'></div>
                        <label>信息修改</label>
                    </div>
                    <div>
                        <div className='bg-plan'></div>
                        <label>耕作计划</label>
                    </div>
                </div>
            </div>
        )
    }
}
Filed.propTypes = {
    list: PropTypes.object
}
export default Filed