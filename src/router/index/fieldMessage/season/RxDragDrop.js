import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'
import 'css/index/common/drapDrop.scss'
import { destorySeason } from '_redux/actions/plaintingSeason'
import AddSeason from './AddSeason'
import { connect} from 'react-redux'
import Scrollbar from 'smooth-scrollbar'
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
    Scrollbar.init(this.content)
  }
  componentWillUnmount() {
    this.dd && this.dd.unsubscribe()
  }
  destory(e) {
    e.preventDefault()
    this.dd && this.dd.unsubscribe()
    this.props.destorySeason()
  }
  render() {
    const style = {
      top: '30%',
      left: '5%',
      width: 'auto'
    }
    return (
      this.props.plaintingSeason.show && <div>
        <div ref={drapDrop => this.drapDrop = drapDrop} className="dragDrop" style={style}>
          <h3 ref={title => this.title = title} className='dragDrop-title'>{'种植季信息'}</h3>
          <a href="#" id="dragDrop-closer" className="dragDrop-closer" onClick={this.destory.bind(this)}></a>
          <div className="dragDrop-content" ref={content => this.content = content} style={{ height: '500px' }}>
            <AddSeason plantingSeason = {this.props.plaintingSeason} />
          </div>
        </div>
      </div>
            
           
    )
  }
}
RxDragDrop.propTypes = {
  title: PropTypes.string,
  node: PropTypes.node,
  destorySeason: PropTypes.func,
  dragDrop: PropTypes.object,
  show: PropTypes.bool,
  plaintingSeason: PropTypes.object
}
// destorySeason
const mapStateToProps = (state) => {
  return {
    plaintingSeason: state.plaintingSeason
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    destorySeason: (season) => {
      dispatch(destorySeason(season))
    }
  }
}
// updateSeason
export default connect(mapStateToProps, mapDispathToProps)(RxDragDrop)