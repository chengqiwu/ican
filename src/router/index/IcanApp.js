import React, {Component} from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import md5 from 'js-md5'


import reducers from '_redux/reducers'
// import FieldLists from './Filed/FieldLists'
// import FamersLists from './Famers/FamersLists'
// import ifvisible from 'ifvisible.js'
import Cookies from 'js-cookie'
import Header from './common/Header'
import Baner from './common/Baner'
import Openlayer from 'map/Openlayer'

import FieldMessage from './fieldMessage/FieldMessage'
import User from './user/User'
import Tools from './tools/Tools'
import RxDragDrop from './RxDragDrop'

import history from '../history'
const store = createStore(reducers)
class IcanApp extends Component {
    componentDidMount() {
        console.log(Cookies.get('name'))
        if (!Cookies.get('name')) {
            history.push('/')
        }
    }
    render() {
        
        return (
            <Provider store={store}>
                <div>
                    <Header />
                    <User />
                    <Tools />
                    <Openlayer />
                    <RxDragDrop/>
                    <Baner />
                    <FieldMessage />
                </div>

            </Provider>

        )
    }
    
    // ifvisible.setIdleDuration(1*60*60)
    // ifvisible.setIdleDuration(1*3)
    // ifvisible.active(function () {
    //     // This code will work when page goes into idle status
    //     // Cookies.
    //     console.log(ifvisible.now())
    //     // if (ifvisible.now('hidden')) {
    //     //     // Display pop-up if page is not hidden
           
    //     // } else {
    //     //     alert('你好')
    //     // }
        
    //     // Cookies.remove('name')
    // })
    // ifvisible.on('wakeup', function () {
    //     // example code here..
        
    //     Cookies.set('name', md5(Cookies.get('name')), { path: '/index', expires: 1 / 24 })
    // })
   
}
export default IcanApp