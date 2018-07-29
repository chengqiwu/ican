import React, { Component } from 'react'

import Header from '../common/Header'
import Footer from '../common/Footer'
import ForgetContent from './ForgetContent'
import 'css/forget/forget.scss'
class ForgetPass extends Component {
  render() {
    return (
      <div className='forget-bg'>
        <Header />
        <ForgetContent />
        <Footer />
      </div>
    )
  }
}
export default ForgetPass