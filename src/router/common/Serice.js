import React, { Component } from 'react'
import {Observable} from 'rxjs/Observable'
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
    this.dd = Observable.interval(1000)
      .subscribe(e => {
        this.getArea()
      }, (err) => {
        this.dd.unsubscribe()
      })
  }
  componentWillUnmount() {
    this.dd && this.dd.unsubscribe()
  }
  getArea() {
    farmLandTotalArea()
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