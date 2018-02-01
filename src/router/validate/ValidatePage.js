import React, { Component } from 'react'
import Header from '../common/Header'
import ValidateContent from './ValidateContent'
import Footer from '../common/Footer'
import 'css/register/validate.scss'
class ValidatePage extends Component {
    render() {
        return (
            <div className='register-bg'>
                <Header />
                <ValidateContent />
                <Footer />
            </div>
        )
    }
}
export default ValidatePage