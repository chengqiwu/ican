import React, { Component } from 'react'
import PropType from 'prop-types'
import logo from 'images/common/logo4.png'
import line from 'images/login/sprite/line.png'
import head from 'images/login/sprite/head.png'
import weather from 'images/login/sprite/weather.png'
import robot from 'images/login/sprite/robot.png'
import clander from 'images/login/sprite/clander.png'
import phone from 'images/login/sprite/phone.png'
import safe from 'images/login/sprite/safe.png'
import data from 'images/login/sprite/data.png'
import fly from 'images/login/sprite/fly.png'
import exchange from 'images/login/sprite/exchange.png'
import chart from 'images/login/sprite/chart.png'
import service from 'images/login/sprite/service.png'
import mointer from 'images/login/sprite/mointer.png'
// import safe from 'images/login/sprite/safe.png'
import 'css/login/sprite.scss'

class Sprite extends Component {

    componentDidMount() {
        // this.
    }
    move = (ele, offset) => {
        const degree = parseInt(Math.random() * (360 - 0) + 0)
        let radian = degree / 180 * Math.PI

        const img2 = document.getElementById('img2')
        this.fnReq1 = Math.animation(0, 15, 1000, (value, isEnding) => {
            ele.style.transform = `translate(${offset.x + value * Math.cos(radian)}px,${offset.y+value * Math.sin(radian)}px)`
            if (isEnding) {
                Math.animation(15, 0, 1000, (value, isEnding) => {
                    ele.style.transform = `translate(${offset.x + value * Math.cos(radian)}px,${offset.y + value * Math.sin(radian)}px)`
                    if (isEnding) {
                        this.move(ele, offset)
                    }
                })
            }
        })
    }
    componentDidMount() {
        
        

        let degree1 = 120 / 180 * Math.PI
        //  (value-200)*Math.cos(degree1)
        this.fnReq1 = Math.animation(-400, 200, 2000, 'Back.easeInOut', (value, isEnding) => {
            this.head.style = `transform: translate(${(value - 400) + (200 - value) * Math.cos(degree1)}px, ${79+(200-value)*Math.sin(degree1)}px)`
            this.weather.style = `transform: translate(${value - 150 - 400 + (200 - value) * Math.cos(degree1)}px, ${-117 + (200 - value) * Math.sin(degree1)}px)`
            this.robot.style = `transform: translate(${value - 400 + 68 + (200 - value) * Math.cos(degree1)}px, ${-90 + (200 - value) * Math.sin(degree1)}px)`
            this.clander.style = `transform: translate(${value - 400 - 17 + (200 - value) * Math.cos(degree1)}px, ${-192 + (200 - value) * Math.sin(degree1)}px)`
            if (isEnding) {
                this.opacity(this.head)
                this.move(this.head, {x: -200, y: 79})

                this.opacity(this.weather, 1000)
                this.move(this.weather, { x: -350, y: -117 })

                this.opacity(this.robot, 2000)
                this.move(this.robot, { x: -132, y: -90 })

                this.opacity(this.clander, 3000)
                this.move(this.clander, { x: -217, y: -192 })
            }
        })


        let degree2 = 90 / 180 * Math.PI
        this.fnReq2 = Math.animation(-400, 200, 2200, 'Back.easeInOut', (value, isEnding) => {
            this.phone.style = `transform: translate(${40}px, ${value - 400 -8}px)`
            this.safe.style = `transform: translate(${-70}px,${value - 400 -83}px)`
            this.data.style = `transform: translate(${30}px, ${value - 400-175}px)`
            this.exchange.style = `transform: translate(${171}px, ${value - 400-275}px)`
            if (isEnding) {
                this.opacity(this.phone)
                this.move(this.phone, { x: 40, y: -192 })

                this.opacity(this.safe, 1000)
                this.move(this.safe, { x: -70, y: -283 })

                this.opacity(this.data, 2000)
                this.move(this.data, { x: 30, y: -375 })

                this.opacity(this.exchange, 3000)
                this.move(this.exchange, { x: 171, y: -475 })
            }
        })
        let degree3 = -60 / 180 * Math.PI
        this.fnReq3 = Math.animation(-400, 200, 2200, 'Back.easeInOut',(value, isEnding) => {
            this.fly.style = `transform: translate(${-value + 200 + 169 +(200 - value) * Math.cos(degree3)}px, ${-186- (200 - value) * Math.sin(degree3)}px)`
            this.chart.style = `transform: translate(${-value + 200 + 278 + (200 - value) * Math.cos(degree3)}px, ${-308 - (200 - value) * Math.sin(degree3)}px)`
            this.service.style = `transform: translate(${-value + 200 + 385 + (200 - value) * Math.cos(degree3)}px, ${-189 - (200 - value) * Math.sin(degree3)}px)`
            this.mointer.style = `transform: translate(${-value + 200 + 489 + (200 - value) * Math.cos(degree3)}px, ${-15 - (200 - value) * Math.sin(degree3)}px)`
            if (isEnding) {
                this.opacity(this.fly, 3000)
                this.move(this.fly, { x: 169, y: -186 })

                this.opacity(this.chart)
                this.move(this.chart, { x: 278, y: -308 })

                this.opacity(this.service, 1000)
                this.move(this.service, { x: 385, y: -189 })

                this.opacity(this.mointer, 2000)
                this.move(this.mointer, { x: 489, y: -15 })

                this.fnReq4 = this.opacity(this.logo)
            }
        })
    }
    opacity = (ele, offset = 0) => {
        return Math.animation(1, .1, 2000 + offset, (value, isEnding) => {
            ele.style.opacity = value
            if (isEnding) {
                Math.animation(.1, 1, 2000 + offset, (value, isEnding) => {
                    ele.style.opacity = value
                    if (isEnding) {
                        this.opacity(ele)
                    }
                })
            }
        })
    }
    componentWillUnmount() {
        cancelAnimationFrame(this.fnReq1())
        cancelAnimationFrame(this.fnReq2())
        cancelAnimationFrame(this.fnReq3())
        cancelAnimationFrame(this.fnReq4())
    }
    render() {
        return (
            <div className='sprite' onClick={this.props.show}>
                <img src={line} alt="" className='line' />
                <img src={logo} alt="精禾云平台" className='logo' ref={logo => this.logo = logo}/>
                
                <img src={head} className='head' alt="" ref={head => this.head = head}/>
                <img src={weather} className='head' alt="" ref={weather => this.weather = weather}/>
                <img src={robot} className='head' alt="" ref={robot => this.robot = robot}/>
                <img src={clander} className='head' alt="" ref={clander => this.clander = clander}/>
               
                <img src={phone} className='head' alt="" ref={phone => this.phone = phone}/>
                <img src={safe} className='head' alt="" ref={safe => this.safe = safe} />
                <img src={data} className='head' alt="" ref={data => this.data = data} />
                <img src={exchange} className='head' alt="" ref={exchange => this.exchange = exchange} />

                <img src={fly} className='head' alt="" ref={fly => this.fly = fly}/>
                <img src={chart} className='head' alt="" ref={chart => this.chart = chart} />
                <img src={service} className='head' alt="" ref={service => this.service = service} />
                <img src={mointer} className='head' alt="" ref={mointer => this.mointer = mointer} />

            </div>
        )
    }
}
Sprite.propTypes = {
    show: PropType.func
}
export default Sprite