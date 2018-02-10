import React, { Component } from 'react'
import { Link, HashRouter as Router, Route } from 'react-router-dom'
import Token from './Token'
import TokenSuccess from './TokenSuccess'
import queryString from 'query-string'
import classNames from 'classnames'
import history from 'router/history'

class RegisterSuccessForm extends Component {
    constructor() {
        super()
        this.state = {
            tokenType: 'phone'
        }
        this.changeToken = this.changeToken.bind(this)
    }
    changeToken(e) {

        const tokenType = e.target.type
        if (this.state.tokenType !== tokenType) {
            this.setState({
                tokenType
            })
        }
        // 
    }
    render() {
        return (
            <div>
                <div className='token-way'>
                    <Link to={{ pathname: '/registerSuccess/token', search: '?type=phone' }}
                        className={classNames({ 'center': true,'token-active': this.state.tokenType === 'phone'})}
                        type='phone'
                        onClick={this.changeToken}>通过手机号验证</Link>
                    <Link to={{ pathname: '/registerSuccess/token', search: '?type=email' }}
                        className={classNames({ 'center': true, 'token-active': this.state.tokenType === 'email' })}
                        type='email'
                        onClick={this.changeToken}>通过E-mail验证</Link>
                </div>
                <Route exact path='/registerSuccess/token' render={(props) => {
                    const parsed = queryString.parse(props.location.search)
                    return (
                        <Token type={parsed.type} history={props.history}/>
                    )
                }}></Route>
                <Route exact path='/registerSuccess/tokensuccess' render={(props) => {
                    const parsed = queryString.parse(props.location.search)
                    return (
                        <TokenSuccess type={parsed.type} history={props.history} />
                    )
                }}></Route>
            </div>
              
               
           

        )
    }
}
export default RegisterSuccessForm