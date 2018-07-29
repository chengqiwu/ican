import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { findReasonById, saveSeasonInfo } from 'utils/Api'

import { setMessage } from '_redux/actions/message'
import { findCriosAndVarietiesList, findSoilList, findPestsByCropsId } from 'utils/Api'

import { setFieldMessage, showFieldMessage, startFieldMessage } from '_redux/actions/fieldMessage'

import Abstract from './Abstract'
class FiledInfo extends Component {
  constructor(props) {
    super(props)
    const feature  = props.feature
    console.log(feature.get('status'))
    this.state = {
      isNew: feature.get('status'),
      message: {},
      flag: false
    }
  }
  handelefindSoilList() {
    return findSoilList().then(res => res.data).then(data => {
      if (data.msg === '200') {
        this.props.setMessage({
          soilTypes: data.result
        })
      }
    })
  }
  handleCriosAndVarieties() {
    return findCriosAndVarietiesList().then(res => res.data).then(data => {
      if (data.msg === '200') {
        this.props.setMessage({
          criosAndVarietiesList: data.result
        })
      }
    })

  }
  componentDidMount() {
    const feature = this.props.feature
    console.log(this.props.feature)
    this.handelefindSoilList().then(e => this.handleCriosAndVarieties())
      .then(e => {
        if ('0' === this.state.isNew) {
          const id = feature.getId().replace('tb_farmland.', '')
          findReasonById({
            farmLandId: id,
            isNew: 0
          }).then(e => e.data)
            .then(data => {
              if (data.msg === '200') {
                this.setState({
                  message: data.result,
                  flag: true
                })
                this.props.setFieldMessage(data.result)
              }
            })
        }
      }) 
  }
  // componentDidUpdate() {
  //     const {feature} = this.props.feature
  //     const status = feature.get('status')
  //     console.error(status, this.state.isNew)
  //     if (typeof status !== 'undefined' && status !== this.state.isNew) {
  //         this.setState({
  //             isNew: status
  //         })
  //         if (!this.state.flag) {
  //             this.handelefindSoilList().then(e => this.handleCriosAndVarieties())
  //                 .then(e => {
  //                     if ('0' === this.state.isNew) {
  //                         const id = this.props.feature.feature.getId().replace('tb_farmland.', '')
  //                         findReasonById({
  //                             farmLandId: id,
  //                             isNew: 0
  //                         }).then(e => e.data)
  //                             .then(data => {


  //                                 if (data.msg === '200') {
  //                                     this.setState({
  //                                         message: data.result,
  //                                         flag: true
  //                                     })
  //                                     this.props.setFieldMessage(data.result)
  //                                 }
  //                             })
  //                     }
  //                 })
  //         }
  //     } 
        
  // }
  start() {
    this.props.startFieldMessage(true)
  }
  render() {
    return this.state.isNew === '1' ? <div className='filed-info'>
      <div>你目前还没有填写田地信息</div>
      <button className='content-btn' onClick={this.start.bind(this)}>开始填写</button>
    </div> : this.state.flag && <Abstract feature={this.props.feature} fieldMessage={this.state.message}/>
  }
}
FiledInfo.propTypes = {
  startFieldMessage: PropTypes.func,
  feature: PropTypes.object,
  setMessage: PropTypes.func,
  setFieldMessage: PropTypes.func,
  fieldMessage: PropTypes.object
    
}
const mapStateToProps = (state) => {
  return {
    fieldMessage: state.fieldMessage,
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    startFieldMessage: function(start) {
      dispatch(startFieldMessage(start))
    },
    setFieldMessage: (message) => {
      dispatch(setFieldMessage(message))
    },
    setMessage: function(message) {
      dispatch(setMessage(message))
    }
       
  }
}
export default connect(mapStateToProps, mapDispathToProps)(FiledInfo)