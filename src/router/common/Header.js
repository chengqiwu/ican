import React, { Component } from 'react'
import Logo from './Logo'
import Serice from './Serice'
import Motto from './Motto'
// import Language from './Language'
class Header extends Component {
    render() {
        return (
            <header className='login-header'>
                <Logo/>
                {/* <Serice/> */}
                <Motto/>
                {/* <Language/> */}
            </header>
        )
    }
}
export default Header