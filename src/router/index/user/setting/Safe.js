import React, { Component } from 'react'
import Phone from './safe/Phone'
import Email from './safe/Email'
import Password from './safe/Password'
class Safe extends Component {
  render() {
    return <div className='safe'>
      <Phone/>
      <Email/>
      <Password/>
    </div>
  }
}

export default Safe