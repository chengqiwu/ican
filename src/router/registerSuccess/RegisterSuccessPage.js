import React, { Component } from 'react'
import Header from '../common//Header'
import RegisterSuccessContent from './RegisterSuccessContent'
import Footer from '../common/Footer'
import 'css/register/registerSuccess.scss'
class RegisterSuccessPage extends Component {
    render() {
        return (
            <div className='register-bg'>
                <Header />
                <RegisterSuccessContent />
                <Footer />
            </div>
        )
    }
}
export default RegisterSuccessPage