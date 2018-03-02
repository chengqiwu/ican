import React, { Component } from 'react'
import Famer from './Famers'
import 'css/index/famers/famers.scss'
import Scrollbar from 'smooth-scrollbar'
class FamerLists extends Component {
    componentDidMount() {
        Scrollbar.init(document.querySelector('.famers-lists'))
    }
    render() {
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
        return (
            <div className='famers-list'>
                <div className='famers-title'>
                    <h3>种植户</h3>
                </div>
                <a href="#" className='famers-closer'></a>
                <div className='famers-lists'>
                   
                    {
                        lists.map((list, index) => {
                            return <Famer key={index} list={list} />
                        })
                    }   
                </div>
                <div className='famers-add'>
                    <div>
                        <div className='bg-add'></div>
                        <div>添加种植户</div>
                    </div>
                    
                    {/* <Polygon map={this.props.map} draw={this.state.draw} /> */}
                    {/* <Polygon map={this.props.map}/> */}

                </div>
            </div>
        )
    }
}
export default FamerLists