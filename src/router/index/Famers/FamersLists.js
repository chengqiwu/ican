import React, { Component } from 'react'
import Famer from './Famers'
import 'css/index/famers/famers.scss'
import Scrollbar from 'smooth-scrollbar'
import AddFamers from './AddFamers'
class FamerLists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hiden: true,
            update: false
        }
        this.fadeHiden = this.fadeHiden.bind(this)
        this.addFamers = this.addFamers.bind(this)
        this.showUpdate = this.showUpdate.bind(this)
    }
    componentDidMount() {
        Scrollbar.init(document.querySelector('.famers-lists'))
    }
    fadeHiden() {
        this.setState({
            hiden: true
        })
    }
    addFamers() {
        console.log('addFamers')
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
        console.log(this.state.update)
        const lists = [
            { name: '张昆意', phone: '18611122212', own: 5 },
            { name: '刘旭懂', phone: '18611122212', own: 1 },
            { name: '李斌', phone: '18611122212', own: 1 },
            { name: '张昆意', phone: '18611122212', own: 5 },
            { name: '刘旭懂', phone: '18611122212', own: 1 },
            { name: '李斌', phone: '18611122212', own: 1 },
            { name: '张昆意', phone: '18611122212', own: 5 },
            { name: '刘旭懂', phone: '18611122212', own: 1 },
            { name: '李斌', phone: '18611122212', own: 1 },
        ]
        return [
            (<div className='famers-list' key='1'>
                <div className='famers-title'>
                    <h3>种植户</h3>
                </div>
                <a href="#" className='famers-closer'></a>
                <div className='famers-lists'>
                   
                    {
                        lists.map((list, index) => {
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