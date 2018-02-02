import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Scrollbar from 'smooth-scrollbar'

import { connect } from 'react-redux'

import Filed from './Filed'
import Polygon from 'map/Polygon'
import 'css/index/field/field.scss'
import Popup1 from 'map/Popup1'
import FieldContent from 'map/FieldContent'

class FieldLists extends Component {
    constructor() {
        super()
        this.state = {
            draw: false
        }
        this.addField = this.addField.bind(this)
        this.removeDraw = this.removeDraw.bind(this)
    }
    componentDidMount() {
        Scrollbar.init(document.querySelector('.field-lists'))
    }
    addField() {
        console.log('addField')
        if (this.state.draw) {
            return
        }
        this.setState({
            draw: true
        })
    }
    removeDraw() {
        if (!this.state.draw) {
            return
        }
        this.setState({
            draw: false
        })
    }
    render() {
        console.log(this.state.draw)
        const lists = [
            { name: 'nihaoahdoda', area: '108', currentStage: '开始', nextStage: 'zhongqi', manager: 'sunning' },
            { name: 'nihaoahdoda', area: '108', currentStage: '开始', nextStage: 'zhongqi', manager: 'sunning' },
            { name: 'nihaoahdoda', area: '108', currentStage: '开始', nextStage: 'zhongqi', manager: 'sunning' },
            { name: 'nihaoahdoda', area: '108', currentStage: '开始', nextStage: 'zhongqi', manager: 'sunning' },
            { name: 'nihaoahdoda', area: '108', currentStage: '开始', nextStage: 'zhongqi', manager: 'sunning' },
            { name: 'nihaoahdoda', area: '108', currentStage: '开始', nextStage: 'zhongqi', manager: 'sunning' },
            { name: 'nihaoahdoda', area: '108', currentStage: '开始', nextStage: 'zhongqi', manager: 'sunning' },
            { name: 'nihaoahdoda', area: '108', currentStage: '开始', nextStage: 'zhongqi', manager: 'sunning'},
        ]
        return (
            <div className='field-list'>
                {/* <div> */}
                <div className='field-title'>
                    <h3>我的田地</h3>
                </div>
                <a href="#" className='field-closer'></a>
                <div className='field-lists'>
                    {
                        lists.map((list, index) => {
                            return <Filed key={index} list={list} />
                        })
                    }
                </div>
                
                <div className='field-add' onClick={this.addField}>
                    <div>
                        <div className='bg-add'></div>
                        <div>新建田地</div>
                    </div>
                </div>
                <Polygon draw={this.state.draw} removeDraw={this.removeDraw}>
                    <Popup1>
                        <FieldContent/>
                    </Popup1>    
                </Polygon>
                
            </div>
        )
    }
}
export default FieldLists