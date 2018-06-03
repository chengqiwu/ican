import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'
import 'css/index/common/drapDrop.scss'
import FiledInfo from '../content/FiledInfo'
import Scrollbar from 'smooth-scrollbar'
import More from '../content/More'

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
            .map(e => this.mouseMove.takeUntil(this.mouseUp))
            .concatAll().withLatestFrom(this.mouseDown, (move, down) => {
                return {
                    x: validValue(move.clientX - down.offsetX, window.innerWidth - 500, 0),
                    y: validValue(move.clientY - down.offsetY, window.innerHeight - 350, 0)
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