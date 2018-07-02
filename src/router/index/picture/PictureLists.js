import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scrollbar from 'smooth-scrollbar'
import baguetteBox from 'baguettebox.js'
import moment from 'moment'
import { findLogPhotoList } from 'utils/Api'
import more from 'images/index/picture/more.png'

import { connect } from 'react-redux'
import { showList, updateLists } from '_redux/actions/picture.js'
class PictureLists extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            isMore: 'flex'
        }
    }
    componentDidMount() {
        this.index = 2
        console.log('PictureLists componentDidMount')
        // this.getMore(this.index)
        Scrollbar.init(this.pictureLists)
         
        baguetteBox.run('.gallery', {
            // Custom options
        })
       

    }
    componentWillUpdate() {
        console.log('componentWillUpdate')
        Scrollbar.destroy(this.pictureLists)
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
        Scrollbar.init(this.pictureLists)
        baguetteBox.run('.gallery', {
            // Custom options
        })
       
    }
    getMore = () => {
        const { feature } = this.props.feature
        const id = feature.getId().replace('tb_farmland.', '')
        const quarterCropsId = feature.get('quarterCropsId')
        const fd = new FormData()
        fd.append('pageNo', this.index)
        fd.append('pageSize', 14)
        fd.append('landId', id)
        fd.append('quarterCropsId', quarterCropsId)
        findLogPhotoList(fd)
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    
                    const { list } = data.result
                    const { pageNo, cont, pageSize } = data.result
                   
                    if (list) {
                        this.index++
                        this.setState({
                            list: [
                                ...this.state.list,
                                ...list
                            ]
                        })
                    }
                    console.log(Number(pageNo),(Number(cont) + 1),Number(pageSize))
                    if (Number(pageNo) >= (Number(cont) + 1) / Number(pageSize)) {
                        // alert('已经加载')
                        this.setState({
                            isMore: 'none'
                        })
                        return
                    }

                }
            })
    }
    editByLoggerId = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        // const id = e.target.getAttribute('logger-id')
        // console.log(id)
        
    }

    render() {
        const { lists } = this.props.picture
        return (
            <div className='picture-list gallery' ref={pictureLists => this.pictureLists = pictureLists}>
                {
                    lists.map(list =>
                        <a href={list.largeThumbnailPath} data-caption={`${list.log.content} [${moment(new Date(Number(list.log.logDate))).format('YYYY/MM/D')}]`} key={list.id} className='img-box'>
                            <img src={list.smallThumbnailPath} alt={`${list.log.content} [${moment(new Date(Number(list.log.logDate))).format('YYYY/MM/D')}]`} />
                            <i className="iconfont icon-xiugai" logger-id={list.log.id} onClick={this.editByLoggerId}></i>
                        </a>
                        
                    )
                }
                {
                    this.state.list.map(list =>
                        <a href={list.largeThumbnailPath} data-caption={`${list.log.content} [${moment(new Date(Number(list.log.logDate))).format('YYYY/MM/D')}]`} key={list.id} className='img-box'>
                            <img src={list.smallThumbnailPath} alt={`${list.log.content} [${moment(new Date(Number(list.log.logDate))).format('YYYY/MM/D')}]`} />
                            <i className="iconfont icon-xiugai" logger-id={list.log.id} onClick={this.editByLoggerId}></i>
                        </a>

                    )
                }
                <div className='img-box more' style={{display: this.state.isMore}} onClick={this.getMore}>

                    <img src={more} alt="" id='more' /><label htmlFor="more">更多</label>
                </div>
            </div>
        )
    }
}
PictureLists.propTypes = {
    feature: PropTypes.object,
    updateLists: PropTypes.func,
    picture: PropTypes.object
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
export default connect(mapStateToProps, mapDispatchToProps)(PictureLists)