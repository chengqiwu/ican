import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'
import { connect } from 'react-redux'
import {
  SHOWDRAGDROP, HIDENDRAGDROP,
  showDragDrop, hidenDragDrop
} from '_redux/actions/dragDrop.js'
import 'css/index/common/drapDrop.scss'

const validValue = (value, max, min) => {
  return Math.min(Math.max(value, min), max)
}

class RxDragDrop extends Component {
  constructor(props) {
    super(props)
        
  }
  componentDidUpdate() {
    if (!this.props.dragDrop.show) {
      return
    }
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
  componentDidMount() {

    // Scrollbar.init(this.content)
    if (!this.props.dragDrop.show) {
      return
    }
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
      width: '600px'
    }
    console.log(this.props.dragDrop)
    const {dragDrop} = this.props
    const Node = dragDrop.node
    return (
      <div>
        {this.props.dragDrop.show ? <div ref={drapDrop => this.drapDrop = drapDrop} className="dragDrop" style={style}>
          <h3 ref={title => this.title = title} className='dragDrop-title'>{dragDrop.title}</h3>
          <a href="#" id="dragDrop-closer" className="dragDrop-closer" onClick={this.destory.bind(this)}></a>
          <div className="dragDrop-content" ref={content => this.content = content} style={{height: 'auto'}}>
            <Node/>
          </div>
        </div> : null}
      </div>
            
           
    )
  }
}
RxDragDrop.propTypes = {
  title: PropTypes.string,
  node: PropTypes.node,
  hidenDragDrop: PropTypes.func,
  dragDrop: PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    dragDrop: state.dragDrop,
    // fieldMessage: state.fieldMessage
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    hidenDragDrop: function(action) {
      dispatch(hidenDragDrop(action))
    },

  }
}
export default connect(mapStateToProps, mapDispathToProps)(RxDragDrop)