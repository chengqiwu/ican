import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'
import 'css/index/common/drapDrop.scss'
import Scrollbar from 'smooth-scrollbar'
import AddSeason from './AddSeason'
const validValue = (value, max, min) => {
  return Math.min(Math.max(value, min), max)
}

class RxDragDrop extends Component {
  constructor(props) {
    super(props)
        
  }
  componentDidMount() {
    this.mouseDown = Rx.Observable.fromEvent(this.title, 'mousedown')
    this.mouseUp   = Rx.Observable.fromEvent(document, 'mouseup')
    this.mouseMove = Rx.Observable.fromEvent(document, 'mousemove')

        
    this.dd = this.mouseDown
      .map(e => this.mouseMove.takeUntil(this.mouseUp))
      .concatAll().withLatestFrom(this.mouseDown, (move, down) => {
        const userAgent = navigator.userAgent
        if (userAgent.indexOf('Firefox') > -1) {
          return {
            x: validValue(move.clientX - down.layerX, window.innerWidth, 0),
            y: validValue(move.clientY - down.layerY, window.innerHeight, 0)
          }
        } else {
          return {
            x: validValue(move.clientX - down.offsetX, window.innerWidth, 0),
            y: validValue(move.clientY - down.offsetY, window.innerHeight, 0)
          }
        }
      })
      .subscribe(({ x, y }) => {
                
        this.drapDrop.style.left = x + 'px'
        this.drapDrop.style.top = y + 'px'
      })
  }
  componentWillUnmount() {
    this.dd && this.dd.unsubscribe()
  }
  // shouldComponentUpdate(){
  //     return false
  // }
  destory(e) {
    e.preventDefault()
    // this.setState({
    //     destory: true
    // })
    this.props.hidenDragDrop()

  }
  render() {
    const style = {
      top: '30%',
      left: '30%',
      width: '1280px'
    }
    return (
      <div>
        <div ref={drapDrop => this.drapDrop = drapDrop} className="dragDrop" style={style}>
          <h3 ref={title => this.title = title} className='dragDrop-title'>{'种植季信息'}</h3>
          <a href="#" id="dragDrop-closer" className="dragDrop-closer" onClick={this.destory.bind(this)}></a>
          <div className="dragDrop-content" ref={content => this.content = content} style={{height: 'auto'}}>
            <AddSeason {...this.props}/>
          </div>
        </div>
      </div>
            
           
    )
  }
}
RxDragDrop.propTypes = {
  title: PropTypes.string,
  node: PropTypes.node,
  hidenDragDrop: PropTypes.func,
  dragDrop: PropTypes.object,
  show: PropTypes.bool
}

export default RxDragDrop