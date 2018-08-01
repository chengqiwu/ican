import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findReasonById, findLogPhotoList } from 'utils/Api'
import 'css/index/picture/picture.scss'
import baguetteBox from 'baguettebox.js'
import moment from 'moment'
import { connect } from 'react-redux'
import { showList, updateLists } from '_redux/actions/picture.js'
import more from 'images/index/picture/more.png'

class Picture extends Component {
  constructor() {
    super()
    this.state = {
      list: []
    }
  }
  componentDidMount() {

    const {feature} = this.props.feature
    const id = feature.getId().replace('tb_farmland.', '')
    // const isNew = feature.get('status')
    // if (isNew !== '0') {
    //   alert('请先保存季节信息')
    //   return
    // }
       
    // findReasonById({
    //   farmLandId: id,
    //   isNew
    // })
    //   .then(e => e.data)
    //   .then(data => {
    //     if (data.msg === '200') {
    //       feature.set('quarterCropsId', data.result.quarterCropsId)
    //       return data.result.quarterCropsId
    //     } else {
    //       alert('请求出现问题，请稍后重试')
    //       return undefined
    //     }
    //   }).then(quarterCropsId => {
    const seasonId = feature.get('season-id')
    if (!seasonId) {
      return
    }
    const fd = new FormData()
    fd.append('pageNo', 1)
    fd.append('pageSize', 14)
    fd.append('landId', id)
    fd.append('seasonId', seasonId)
    findLogPhotoList(fd)
      .then(e=>e.data)
      .then(data => {
        if (data.msg === '200') {
          const {list} = data.result
          if (list) {
            // this.setState({
            //     list
            // })
            console.log(list)
            this.props.updateLists(list)
          }
                        
        } 
      })
    // })
    baguetteBox.run('.gallery', {
      // Custom options
    })
  }
  componentDidUpdate() {
    baguetteBox.run('.gallery', {
      // Custom options
    })
  }
    showMore = () => {
      if (!this.props.picture.show) {
        this.props.showList(true)
      }
    }

    render() {

      const {lists} = this.props.picture
      console.log(lists)
      return (<div className='pictures gallery'>
        {/* {
                lists.map(list =>
                    <a href={list.largeThumbnailPath} data-caption={`${list.log.content} [${moment(new Date(Number(list.log.logDate))).format('YYYY/MM/D')}]`} key={list.id} className='img-box'>
                        <img src={list.smallThumbnailPath} alt={`${list.log.content} [${moment(new Date(Number(list.log.logDate))).format('YYYY/MM/D')}]`} />
                    </a>
                )
            } */}
        <div className='img-box more' onClick={this.showMore}>

          <img src={more} alt="" id='more' /><label htmlFor="more">更多</label>
        </div>
      </div>)
    }
}
Picture.propTypes = {
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
    updateLists: (update) => {
      dispath(updateLists(update))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Picture)