import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import reducers from '_redux/reducers'
import FieldLists from './Filed/FieldLists'
import FamersLists from './Famers/FamersLists'

import Header from './Header'
import Openlayer from 'map/Openlayer'


const store = createStore(reducers)
const IcanApp = () => {
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