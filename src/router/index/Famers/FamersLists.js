import React, { Component } from 'react'
import Famer from './Famers'
import 'css/index/famers/famers.scss'
import Scrollbar from 'smooth-scrollbar'
import AddFamers from './AddFamers'
import {findFarmers} from 'utils/Api'

class FamerLists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hiden: true,
            update: false,
            lists: []
        }
        this.fadeHiden = this.fadeHiden.bind(this)
        this.addFamers = this.addFamers.bind(this)
        this.showUpdate = this.showUpdate.bind(this)
    }
    componentDidMount() {
        Scrollbar.init(document.querySelector('.famers-lists'))
        findFarmers().then(res=>res.data).then(data => {
            if (data.msg === '200') {
                this.setState({
                    lists: data.result
                })
            }
        })
    }
    fadeHiden() {
        this.setState({
            hiden: true
        })
    }
    addFamers() {
        this.setState({
            hiden: false
        })
    }
    showUpdate(e, list) {
        this.setState({
            hiden: false,
            update: list
        })
    }
    render() {
        return [
            (<div className='famers-list' key='1'>
                <div className='famers-title'>
                    <h3>种植户</h3>
                </div>
                <a href="#" className='famers-closer'></a>
                <div className='famers-lists'>
                   
                    {
                        this.state.lists.map((list, index) => {
                            return <Famer key={index} list={list} showUpdate={this.showUpdate} />
                        })
                    }   
                </div>
                <div className='famers-add'>
                    <div>
                        <div className='bg-add'></div>
                        <div onClick={this.addFamers}>添加种植户</div>
                    </div>
                </div>
            </div>),
            this.state.hiden ? null : <AddFamers key='2' hiden={this.state.hiden} fadeHiden={this.fadeHiden} list={this.state.update || null}/>
        ]
    }
}
export default FamerLists