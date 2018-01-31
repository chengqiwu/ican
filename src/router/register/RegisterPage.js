import React, { Component } from 'react'

import Header from '../common/Header'
import Footer from '../common/Footer'
import RegisterContent from './RegisterContent'
import 'css/register/register1.scss'
class RegisterPage extends Component {
    
    render() {
        return (
            <div className='register-bg'>
                <Header/>
                <RegisterContent/>
                <Footer/>
            </div>
        )
    }
}
export default RegisterPage