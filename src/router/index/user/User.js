import React, { Component } from 'react'
import classnames from 'classnames'
import Polygon from 'map/Polygon'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Content from './setting/Content'
import Field from './myField/Field'
import KML from './options/KML'
import { getUserIcon } from 'utils/Api'
import {
  SHOWDRAGDROP, HIDENDRAGDROP,
  showDragDrop, hidenDragDrop
} from '_redux/actions/dragDrop.js'
import RxDragDrop from './myField/RxDragDrop'
import Input from './options/Input'
import user_img from 'images/common/user.png'
import 'css/index/common/user.scss'
import history from 'router/history'
import Cookies from 'js-cookie'
import filed from 'images/feature/filed.png'
import setting from 'images/feature/setting.png'
import myfields from 'images/feature/myfields.png'
import remind from 'images/feature/remind.png'
import service from 'images/feature/service.png'
import loginout from 'images/feature/loginout.png'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiden: true,
      messCount: 0,
      clear: false,
      setting: false,
      myfield: false,
      draw: false,
      createField: false,
      kml: false
    }
    this.showFeature = this.showFeature.bind(this)
    this.addField = this.addField.bind(this)
    this.loginout = this.loginout.bind(this)
  }
  showFeature() {
    this.setState({
      hiden: !this.state.hiden
    })
  }
  addField() {
    if (this.state.draw) {
      return
    }
    this.setState({
      hiden: true,
      draw: true
    })
  }
 
  loginout() {
    sessionStorage.clear()
    Cookies.remove('name', { path: '' })
    history.push('/')
  }
  // clearSource() {
  //     this.setState({
  //         clear: true
  //     })
  // }
 
    showSetting = () => {
      this.props.showDragDrop({
        title: '设置',
        node: Content
      })
    }
    showMyField = () => {

      this.setState({
        hiden: true,
        myfield: true
      })
    }
    myfieldClose = () => {
      this.setState({
        // hiden: true,
        myfield: false
      })
    }
    onRef = (ref) => {
      this.child = ref
    }
    removeDraw = () => {
      if (!this.state.draw) {
        return
      }
      this.setState({
        draw: false
      })
    }
    createFieldClose = () => {
      this.setState({
        // hiden: true,
        createField: false
      })
    }
    activeInput = () => {
      if (this.state.createField) {
        return
      }
      this.setState({
        hiden: true,
        createField: true
      })
    }
    addKML = () => {
      this.setState({
        kml: true,
        hiden: true,
      })
    }
    removeKML = () => {
      this.setState({
        kml: false,
      })
    }
    render() {
      const { user } = this.props
      return(
        <div className='user'>
          <div className='feature'>
            <div className='user-img' onClick={this.showFeature} style={{backgroundImage: `url(${user.icon||user_img})`}}>
              {/* <img src={user.icon||user_img} alt="" onClick={this.showFeature} /> */}
            </div>
            {this.state.myfield && <RxDragDrop close={this.myfieldClose} title={'我的田地'}><Field /></RxDragDrop>}
            {this.state.messCount !== 0 && <span className='user-message mess-abosulte'>{this.state.messCount}</span>}
            {this.state.createField && <RxDragDrop width={'309px'} height={'269x'} close={this.createFieldClose} title={'输入坐标创建田地'}><Input map={this.props.map.map}/></RxDragDrop>}
            {this.state.kml && <KML map={this.props.map.map} removeKML={this.removeKML} />}
            <div className={classnames({
              'user-feature': true,
              'hiden': this.state.hiden
            })}>
              <ul>
                <li className='add-field'>
                  <img src={filed} alt=""/>
                  <label>新建田地</label>
                  <ul className='second'>
                    <li>
                      <label onClick={this.addField}>手动框选</label>
                      <Polygon
                        onRef={this.onRef.bind(this)}
                        draw={this.state.draw} removeDraw={this.removeDraw}></Polygon>
                    </li>
                    <li>
                      <label onClick={this.activeInput}>输入坐标</label>
                    </li>
                    <li>
                      <label onClick={this.addKML}>导入KML</label>
                    </li>
                  </ul>
                </li>
                <li>
                  <img src={myfields} alt="" />
                  <label onClick={this.showMyField}>我的田地</label>
                </li>
                <li>
                  <img src={setting} alt=""/>
                  <label onClick={this.showSetting}>设&emsp;&emsp;置</label>
                </li>

                <li>
                  <img src={remind} alt=""/>
                  <label>提&emsp;&emsp;醒</label>
                  {this.state.messCount !== 0 && <span className='user-message'>{this.state.messCount}</span>}
                </li>

                <li>
                  <img src={service} alt=""/>
                  <label>客&emsp;&emsp;服</label>
                </li>

                <li>
                  <img src={loginout} alt=""/>
                  <label onClick={this.loginout}>退&emsp;&emsp;出</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
}
User.propTypes = {
  showDragDrop: PropTypes.func,
  user: PropTypes.object,
  map: PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    map: state.map,
    // message: state.message,
    // fieldMessage: state.fieldMessage
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    showDragDrop: function(action) {
      dispatch(showDragDrop(action))
    },

  }
}
export default connect(mapStateToProps, mapDispathToProps)(User)