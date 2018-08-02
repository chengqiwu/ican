import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from './List'
import Scrollbar from 'smooth-scrollbar'
import { connect } from 'react-redux'
import RxDragDrop from './RxDragDrop'
import Top from './Top'
import { showList, updateLists, } from '_redux/actions/picture.js'
import { findlandLogList, farmLandLogDelete } from 'utils/Api'
class PictureList extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      logger: {},
      close: true,
      list: {}
    }
  }
  showList = (list) => {
    this.setState({
      show: true,
      logger: list
    })
  }
  componentDidMount() {
    this.getLists()
  }
  getLists = () => {
    const { feature } = this.props.feature
    if (!feature) {
      return
    }
    const id = feature.getId().replace('tb_farmland.', '')
    const isNew = feature.get('status')
    // if (isNew !== '0') {
    //   alert('该田地还没有种植季信息，请尽快完善！')
    //   this.props.updateLists([])
    //   return
    // }
    const seasonId = feature.get('season_id')
    // if (!seasonId) {
    //   return
    // }
    const fd = new FormData()
    fd.append('pageNo', 1)
    fd.append('pageSize', -1)
    fd.append('landId', id)
    fd.append('seasonId', seasonId)
    findlandLogList(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          const { list } = data.result
          if (list) {
            this.props.updateLists(list)
          } else {
            this.props.updateLists([])
          }
        }
      })
  }
  componentWillUpdate() {

    Scrollbar.destroy(this.lists)
  }
  shouldComponentUpdate(nextProps) {
    const { feature } = nextProps.feature
    console.log(feature.getId())
    if (!feature.getId()) {
      return false
    }
    return true
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.feature.feature.getId()) {
      if (!!this.props.feature.feature.getId()) {
        this.getLists()
      }
      Scrollbar.init(this.lists)
      return
    }
    if (this.props.feature.feature.getId().replace('tb_farmland.', '')
      !== prevProps.feature.feature.getId().replace('tb_farmland.', '')) {
      this.getLists()
    } else if (this.props.feature.id !== prevProps.feature.id) {
      this.getLists()
    } 
    Scrollbar.init(this.lists)
   
  }
  destory = () => {
    this.setState({
      show: false
    })
  }
  closer = () => {
    this.setState({
      close: true
    })
  }
  show = (list) => {
    this.setState({
      close: false,
      list
    })
  }
  delete = (logId) => {
    const fd = new FormData()
    fd.append('logId', logId)
    farmLandLogDelete(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          this.getLists()
        } else {
          alert('删除失败')
        }
      }).catch(err => {
        alert('删除失败')
      })
  }
  render() {
    const { picture: { lists } } = this.props
    const flag = (this.state.show && this.state.logger.id)
    return (
      <div className='lists'>
        {flag && <RxDragDrop title={this.state.logger.id ? '编辑日志' : '新建日志'} logger={this.state.logger} close={this.destory} />}
        {!this.state.close && <Top closer={this.closer} logger={this.state.list} />}
        <div ref={lists => this.lists = lists}>
          {lists.sort((a, b) => (new Date(b.date)) - (new Date(a.date))).map(list =>
            <List key={list.id} list={list} showList={this.showList} show={this.show} delete={this.delete}/>
          )}
        </div>
      </div>

    )
  }
}
PictureList.propTypes = {
  picture: PropTypes.object,
  showList: PropTypes.func,
  feature: PropTypes.object,
  updateLists: PropTypes.func
}

const mapStateToProps = function (state) {
  return {
    picture: state.picture,
    feature: state.feature
  }
}
const mapDispatchToProps = function (dispath) {
  return {
    showList: (show) => {
      dispath(showList(show))
    },
    updateLists: (list) => {
      dispath(updateLists(list))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PictureList)