import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'
import 'css/index/common/drapDrop.scss'

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
        return {
          x: validValue(move.clientX - down.offsetX, window.innerWidth - 853, 0),
          y: validValue(move.clientY - down.offsetY, window.innerHeight - 538, 0)
        }
      })
      .subscribe(({ x, y }) => {
        this.drapDrop.style.left = x + 'px'
        this.drapDrop.style.top = y + 'px'
      })

  }
  componentWillUnmount() {
    this.dd.unsubscribe()
  }
  shouldComponentUpdate() {
    return false
  }
    destory = (e) => {
      e.preventDefault()
      this.props.destory()
    }
    render() {
      const style = {
        height: '528px',
        width: '853px',
        top: '20%',
        left: '26%'
      }
      return (
        <div ref={drapDrop => this.drapDrop = drapDrop} className="dragDrop" style={style}>
          <h3 ref={title => this.title = title} className='dragDrop-title'>{this.props.title}</h3>
          <a href="#" id="dragDrop-closer" className="dragDrop-closer" onClick={this.destory}></a>
          <div className="dragDrop-content" ref={content => this.content = content} style={{height: 'auto'}}>
            {this.props.children}
          </div>
        </div>
      )
    }
}
RxDragDrop.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  destory: PropTypes.func,
  index: PropTypes.number,
  name: PropTypes.string
}
export default RxDragDrop