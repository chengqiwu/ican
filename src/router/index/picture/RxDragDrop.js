import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

import 'css/index/common/drapDrop.scss'
import Scrollbar from 'smooth-scrollbar'
import AddLogger from './AddLogger.jsx'

const validValue = (value, max, min) => {
  return Math.min(Math.max(value, min), max)
}

class RxDragDrop extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {

    this.mouseDown = Rx.Observable.fromEvent(this.title, 'mousedown')
    this.mouseUp = Rx.Observable.fromEvent(document, 'mouseup')
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
        console.log(345)
        this.drapDrop.style.left = x + 'px'
        this.drapDrop.style.top = y + 'px'
      })
  }
  componentWillUnmount() {
    this.dd && this.dd.unsubscribe()
  }
  destory(e) {
    e.preventDefault()
    this.props.close()
  }
  render() {
    const style = {
      top: '30%',
      left: '30%',
      width: '900px'
    }
    return (
      <div ref={drapDrop => this.drapDrop = drapDrop} className="dragDrop" style={style}>
        <h3 ref={title => this.title = title} className='dragDrop-title'>{this.props.title}</h3>
        <a href="#" id="dragDrop-closer" className="dragDrop-closer" onClick={this.destory.bind(this)}></a>
        <div className="dragDrop-content" ref={content => this.content = content} style={{ height: 'auto' }}>
          <AddLogger {...this.props}/>
        </div>
      </div>


    )
  }
}
RxDragDrop.propTypes = {
  close: PropTypes.func,
  title: PropTypes.string,
}

export default RxDragDrop