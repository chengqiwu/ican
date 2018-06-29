import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scrollbar from 'smooth-scrollbar'
import baguetteBox from 'baguettebox.js'

import { findLogPhotoList } from 'utils/Api'
import more from 'images/index/picture/more.png'
class PictureLists extends Component {
    constructor() {
        super()
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        this.index = 1
        console.log('PictureLists componentDidMount')
        this.getMore(this.index ++)
        // Scrollbar.init(this.pictureLists)
         
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
    getMore = (i) => {
        const { feature } = this.props.feature
        const id = feature.getId().replace('tb_farmland.', '')
        const quarterCropsId = feature.get('quarterCropsId')
        const fd = new FormData()
        fd.append('pageNo', i)
        fd.append('pageSize', 14)
        fd.append('landId', id)
        fd.append('quarterCropsId', quarterCropsId)
        findLogPhotoList(fd)
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    const { list } = data.result
                    if (list) {
                        this.setState({
                            list: [
                                ...this.state.list,
                                ...list
                            ]
                        })
                    }

                }
            })
    }
    render() {
        return (
            <div className='picture-list gallery' ref={pictureLists => this.pictureLists = pictureLists}>
                {
                    this.state.list.map(list =>
                        <a href={list.largeThumbnailPath} data-caption={`${list.log.content} [${list.log.createDate}]`} key={list.id} className='img-box'>
                            <img src={list.smallThumbnailPath} alt="" />
                        </a>
                    )
                }
                <div className='img-box more' onClick={this.getMore.bind(this, this.index ++)}>

                    <img src={more} alt="" id='more' /><label htmlFor="more">更多</label>
                </div>
            </div>
        )
    }
}
PictureLists.propTypes = {
    feature: PropTypes.object
}
export default PictureLists