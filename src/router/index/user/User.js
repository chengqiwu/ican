import React, { Component } from 'react'
import classnames from 'classnames'
import Polygon from 'map/Polygon'

import user from 'images/common/user.png'
import 'css/index/common/user.scss'
import history from 'router/history'

import filed from 'images/feature/filed.png'
import setting from 'images/feature/setting.png'
import remind from 'images/feature/remind.png'
import service from 'images/feature/service.png'
import loginout from 'images/feature/loginout.png'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hiden: true,
            draw: false,
            messCount: 0
        }
        this.showFeature = this.showFeature.bind(this)
        this.addField = this.addField.bind(this)
        this.removeDraw = this.removeDraw.bind(this)
        this.loginout = this.loginout.bind(this)
    }
    showFeature() {
        this.setState({
            hiden: !this.state.hiden
        })
    }
    addField() {
        if (this.state.draw) {
            return
        }
        this.setState({
            draw: true
        })
    }
    removeDraw() {
        if (!this.state.draw) {
            return
        }
        this.setState({
            draw: false
        })
    }
    loginout() {
        sessionStorage.clear()
        
        history.push('/')
    }
    render() {
        return(
            <div className='user'>
                <div className='feature'>
                    <img src={user} alt="" onClick={this.showFeature} />
                    {this.state.messCount !== 0 && <span className='user-message mess-abosulte'>{this.state.messCount}</span>}
                    <div className={classnames({
                        'user-feature': true,
                        'hiden': this.state.hiden
                    })}>
                        <ul>
                            <li>
                                <img src={filed} alt=""/>
                                <label onClick={this.addField}>新建田地</label>
                                <Polygon draw={this.state.draw} removeDraw={this.removeDraw}></Polygon>
                            </li>
                            <li>
                                <img src={setting} alt=""/>
                                <label>设&emsp;&emsp;置</label>
                            </li>

                            <li>
                                <img src={remind} alt=""/>
                                <label>提&emsp;&emsp;醒</label>
                                {this.state.messCount !== 0 && <span className='user-message'>{this.state.messCount}</span>}
                            </li>

                            <li>
                                <img src={service} alt=""/>
                                <label>客&emsp;&emsp;服</label>
                            </li>

                            <li>
                                <img src={loginout} alt=""/>
                                <label onClick={this.loginout}>退&emsp;&emsp;出</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default User