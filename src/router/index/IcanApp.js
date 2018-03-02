import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import reducers from '_redux/reducers'
import FieldLists from './Filed/FieldLists'
import FamersLists from './Famers/FamersLists'

import Header from './Header'
import Openlayer from 'map/Openlayer'
import history from '../history'
const store = createStore(reducers)
const IcanApp = () => {
    console.log(history)
    history.location.state && localStorage.setItem('state', JSON.stringify(history.location.state))
    return (
        <Provider store={store}>
            <div>
                <Header />
                <Openlayer>
                    <Switch>
                        <Route path='/index/field' component={FieldLists}></Route>
                        <Route exact path='/index/farmers' component={FamersLists}></Route>
                    </Switch>
                </Openlayer>
            </div>
           
        </Provider>
       
    )
}
export default IcanApp