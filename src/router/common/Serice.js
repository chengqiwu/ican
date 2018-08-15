import React, { Component } from 'react'
import Rx from 'rxjs/Rx'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/interval'
import 'rxjs/add/observable/from'
// import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/switchMap'
import { farmLandTotalArea } from 'utils/Api'
class Service extends Component {
  constructor() {
    super()
    this.state = {
      area: ''
    }
  }
  componentDidMount() {
    this.getArea()
    // const timer = Observable.interval(1000)
    // this.dd = timer.switchMap(t => Observable.from(this.getArea()))
    //   .subscribe(area => {
    //     this.setState({
    //       area
    //     })
    //   }, (err) => {
    //     this.dd.unsubscribe()
    //   })
    // this.dd = Observable.interval(1000)
    //   .subscribe(e => {
    //     this.getArea()
    //   }, (err) => {
    //     this.dd.unsubscribe()
    //   })
  }
  componentWillUnmount() {
    this.dd && this.dd.unsubscribe()
  }
  getArea() {
    return farmLandTotalArea()
      .then(e => e.data)
      .then(area => {
        this.setState({
          area
        })
      }).catch(err => {
        this.dd.unsubscribe()
      })
  }
  render() {
    return (
      <div className='warp-box'>
        <span className=''>
                    精禾正在服务全球
        </span>
        <div className='sprice'>
          <label>{Math.round(this.state.area)}</label>
          <span>亩</span>
        </div>
        <div className='none'></div>

      </div>
    )
  }
}

export default Service