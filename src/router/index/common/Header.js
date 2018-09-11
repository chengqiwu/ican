import React from 'react'
import title from 'images/common/logo4.png'
import 'css/index/common/header.scss'
const Header = (props) => {
  return (
    <div className='header-logo'>
      <img className='logo' style={{width: '120px'}} src={title} alt=""/>
    </div>
  )
}
export default Header