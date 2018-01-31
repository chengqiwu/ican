import React, { Component } from 'react'
import Logo from './Logo'
import Language from './Language'
class Header extends Component {
    render() {
        return (
            <header className='login-header'>
                <Logo/>
                <Language/>
            </header>
        )
    }
}
export default Header