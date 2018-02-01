import React, { Component } from 'react'
import {Router, Link, Route, Switch } from 'react-router-dom'
import history from './history'
import createComponent from './Bundle'
import LoginPage from 'bundle-loader?lazy&name=login!router/login/LoginPage'
import RegisterPage from 'bundle-loader?lazy&name=register!router/register/RegisterPage'
import ValidatePage from 'bundle-loader?lazy&name=success!router/validate/ValidatePage'
import IcanApp from 'bundle-loader?lazy&name=ican!router/index/IcanApp'

class Ican extends Component {
    render() {
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={createComponent(LoginPage)}></Route>
                    <Route path='/login' component={createComponent(LoginPage)}></Route>
                    <Route path='/register' component={createComponent(RegisterPage)}></Route>
                    <Route path='/validate' component={createComponent(ValidatePage)}></Route>
                    <Route path='/index' component={createComponent(IcanApp)}></Route>
                </Switch>
            </Router>
        )
    }
}
export default Ican