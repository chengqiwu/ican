import React, { Component } from 'react'
import Header from '../common/Header'
import ValidateContent from './ValidateContent'
import EmailToken from './EmailToken'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Footer from '../common/Footer'
import 'css/register/validate.scss'
class ValidatePage extends Component {
    render() {
        const { match } = this.props
        console.log(this.props.match.path)
        return (
            <div className='register-bg'>
                <Header />
                <Route exact path={`${match.path}`} component={ValidateContent}></Route>
                <Route path={`${match.path}/emailToken`} component={EmailToken}></Route>
                <Footer />
            </div>
        )
    }
}
ValidatePage.propTypes = {
    match: PropTypes.object
}
export default ValidatePage