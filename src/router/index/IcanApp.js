import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'


import reducers from '_redux/reducers'
// import FieldLists from './Filed/FieldLists'
// import FamersLists from './Famers/FamersLists'

import Header from './common/Header'
import Baner from './common/Baner'
import Openlayer from 'map/Openlayer'

import FieldMessage from './fieldMessage/FieldMessage'
import User from './user/User'
import Tools from './tools/Tools'

import history from '../history'
const store = createStore(reducers)
const IcanApp = () => {
    history.location.state && sessionStorage.setItem('state', JSON.stringify(history.location.state))
    return (
        <Provider store={store}>
            <div>
                <Header />
                <User/>
                <Tools/>
                <Openlayer />
                
                <Baner/>
                <FieldMessage/>
            </div>
           
        </Provider>
       
    )
}
export default IcanApp