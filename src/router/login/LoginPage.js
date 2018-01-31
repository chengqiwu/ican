import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '../common/Header'
import Content from './Content'
import Footer from '../common/Footer'

import 'css/login/login.scss'

class LoginPage extends Component {
    render() {
        return (
            <div className='login-bg'>
                <Header/>
                <Content/>
                <Footer/>
            </div>
        )
    }
}
LoginPage.propTypes = {

}
export default LoginPage