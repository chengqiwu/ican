import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

import 'css/index/common/drapDrop.scss'
import Scrollbar from 'smooth-scrollbar'
import Field from './Field'

const validValue = (value, max, min) => {
    return Math.min(Math.max(value, min), max)
}

class RxDragDrop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            left: '85%',
            top: '20%',
            width: '240px',
            height: '435px',
            defaultW: 240,
            defaultH: 435,
        }
    }
    componentDidMount() {
        Scrollbar.init(this.content)
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

                this.drapDrop.style.left = x + 'px'
                this.drapDrop.style.top = y + 'px'
            })

        this.mouseDown2 = Rx.Observable.fromEvent(this.resize, 'mousedown')
        this.mouseUp2 = Rx.Observable.fromEvent(document, 'mouseup')
        this.mouseMove2 = Rx.Observable.fromEvent(document, 'mousemove')

       
        this.dd2 = this.mouseDown2
            .map(e => this.mouseMove2.takeUntil(this.mouseUp2))
            .concatAll().withLatestFrom(this.mouseDown2, (move, down) => {
                const userAgent = navigator.userAgent
                console.log(move, down)
                return {
                    x: move.clientX - down.clientX,
                    y: move.clientY - down.clientY
                }
            })
            .subscribe(({
                x,
                y
            }) => {
                this.setState({
                    width: this.state.defaultW + x + 'px',
                    height: this.state.defaultH + y + 'px',
                })
                // this.drapDrop.style.left = x + 'px'
                // this.drapDrop.style.top = y + 'px'
            })
        this.mouseUp2.subscribe(e => {
            this.setState({
                defaultW: Number.parseFloat(this.state.width),
                defaultH: Number.parseFloat(this.state.height)
            })
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
        return (
            < div ref = {
                drapDrop => this.drapDrop = drapDrop
            }
            className = "dragDrop"
            style = {
                { ...this.state,
                    minHeight: '135px'
                }
            } >
                <h3 ref={title => this.title = title} className='dragDrop-title'>{this.props.title}</h3>
                <a href="#" id="dragDrop-closer" className="dragDrop-closer" onClick={this.destory.bind(this)}></a>
                <div className="dragDrop-content" ref={content => this.content = content} style={{height: 'calc(100% - 35px)'}}>
                    <Field {...this.props} />
                </div>
                < div className = 'resize'
                    ref = {
                        resize => this.resize = resize
                    } > </div>
            </div>


        )
    }
}
RxDragDrop.propTypes = {
    close: PropTypes.func,
    title: PropTypes.string,
}

export default RxDragDrop