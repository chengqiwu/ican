import React, { Component } from 'react'

import Header from '../common/Header'
import Footer from '../common/Footer'
import ResetContent from './ResetContent'
import 'css/reset/reset.scss'
class ResetPass extends Component {
  render() {
    return (
      <div className='reset-bg'>
        <Header />
        <ResetContent />
        <Footer />
      </div>
    )
  }
}
export default ResetPass