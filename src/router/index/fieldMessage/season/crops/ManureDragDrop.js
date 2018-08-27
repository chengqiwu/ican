import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'
import 'css/index/common/drapDrop.scss'
import { destoryManure } from '_redux/actions/manure'
import AddFer from './AddFer'
import { connect} from 'react-redux'

const validValue = (value, max, min) => {
  return Math.min(Math.max(value, min), max)
}

class RxDragDrop extends Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    if (!this.title) {
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
  componentWillUnmount() {
    this.dd && this.dd.unsubscribe()
  }
  destory(e) {
    e.preventDefault()
    this.dd && this.dd.unsubscribe()
    this.props.destoryManure()
  }
  render() {
    const {pos} = this.props.manure
    return (
      this.props.manure.show && <div>
        <div ref={drapDrop => this.drapDrop = drapDrop} className="dragDrop" style={{
          top: pos.top + 'px',
          left: pos.left + 'px',
          width: 'auto'
        }}>
          <h3 ref={title => this.title = title} className='dragDrop-title'>{'用肥情况'}</h3>
          <a href="#" id="dragDrop-closer" className="dragDrop-closer" onClick={this.destory.bind(this)}></a>
          <div className="dragDrop-content" ref={content => this.content = content} style={{ height: '500px' }}>
            <AddFer {...this.props}/>
          </div>
        </div>
      </div>  
    )
  }
}
RxDragDrop.propTypes = {
  title: PropTypes.string,
  node: PropTypes.node,
  destoryManure: PropTypes.func,
  dragDrop: PropTypes.object,
  show: PropTypes.bool,
  manure: PropTypes.object
}
// destorySeason
const mapStateToProps = (state) => {
  return {
    manure: state.manure
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    destoryManure: (manure) => {
      dispatch(destoryManure(manure))
    }
  }
}
// updateSeason
export default connect(mapStateToProps, mapDispathToProps)(RxDragDrop)