import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import camera from 'images/index/picture/camera.png'
import edit from 'images/index/picture/edit.png'
class List extends Component {

    render() {
        const {list} = this.props
        
        return (
            <div className='listItems'>
                {/* {this.state.show && <RxDragDrop logger={list} destory={this.destory}/>} */}
                <div className='item'>
                    <div>
                        <div className='date'>
                            {moment(new Date(list.date)).format('YYYY年MM月DD日')}  
                            <img src={edit} alt="" onClick={this.props.showList.bind(this, list)}/></div>
                        <div className='log-content' >{list.content}</div>
                    </div>
                    {
                        list.imageCount !== '0' &&  <div className='imgs' onClick={e => this.props.show(list)}>
                            <span>{list.imageCount}</span>
                            <img src={camera} alt="" />
                        </div>
                    }
                   
                </div>
            </div>
        )
    }
}
List.propTypes = {
    list: PropTypes.object,
    showList: PropTypes.func,
    show: PropTypes.func
}
export default List