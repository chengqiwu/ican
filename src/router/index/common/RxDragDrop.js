import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'
import 'css/index/common/drapDrop.scss'
import FiledInfo from '../content/FiledInfo'
import PlantingSeason from '../fieldMessage/season/PlantingSeason'
import More from '../content/More'
import Scrollbar from 'smooth-scrollbar'
const validValue = (value, max, min) => {
  return Math.min(Math.max(value, min), max)
}

class RxDragDrop extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

    Scrollbar.init(this.content)

    this.mouseDown = Rx.Observable.fromEvent(this.title, 'mousedown')
    this.mouseUp   = Rx.Observable.fromEvent(document, 'mouseup')
    this.mouseMove = Rx.Observable.fromEvent(document, 'mousemove')

        
    this.dd = this.mouseDown
      .filter(e => e.button !== 2)
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
    this.dd.unsubscribe()
  }
  shouldComponentUpdate(){
    return false
  }
  destory(e) {
    e.preventDefault()
    this.props.destory(this.props.index)
  }
  render() {
    return (
      <div ref={drapDrop => this.drapDrop = drapDrop} className="dragDrop">
        <h3 ref={title => this.title = title} className='dragDrop-title'>{this.props.name}-{this.props.title}</h3>
        <a href="#" id="dragDrop-closer" className="dragDrop-closer" onClick={this.destory.bind(this)}></a>
        <div className="dragDrop-content" ref={content => this.content = content}>
          {this.props.index === 2 && <FiledInfo {...this.props}/>}
          {/* {this.props.index ===1 && <Picture/>} */}
          {this.props.index === 3 && <PlantingSeason/>}
          {this.props.index === 0 && <More {...this.props} />}
                   
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