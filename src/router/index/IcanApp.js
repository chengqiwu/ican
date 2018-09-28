import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'


import reducers from '_redux/reducers'
// import FieldLists from './Filed/FieldLists'
// import FamersLists from './Famers/FamersLists'
// import ifvisible from 'ifvisible.js'
import Cookies from 'js-cookie'
import Header from './common/Header'
import Baner from './common/Baner'
import Openlayer from 'map/Openlayer'

// import FieldMessage from './fieldMessage/FieldMessage'
import Appends from './Appends'

import User from './user/User'
import Tools from './tools/Tools'
import RxDragDrop from './RxDragDrop'
import PlainingSeasonDragDrop from './fieldMessage/season/RxDragDrop'
import ManureDragDrop from './fieldMessage/season/crops/ManureDragDrop'
import { getUserToken } from 'utils/Api'
import history from '../history'
// import JobLogging from './picture/JobLogging'
import Company from './common/Company'
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
// const logger = createLogger()


const store = createStore(reducers, {}, applyMiddleware(thunk))
class IcanApp extends Component {
  componentDidMount() {
    if (!Cookies.get('name')) {
      history.push('/')
    }
    const token = getUserToken()
    if (!token) {
      history.push('/')
      return
    }
  }
  render() {

    return (
      <Provider store={store}>
        <div>
          <Header />
          <Company />
          <Tools />
          <User />
          <Openlayer />
          <RxDragDrop />
          <PlainingSeasonDragDrop/>
          <ManureDragDrop/>
          <Baner />
          <Appends/>
          {/* <FieldMessage />
          <JobLogging /> */}
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