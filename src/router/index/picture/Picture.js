import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findReasonById, findLogPhotoList } from 'utils/Api'
import 'css/index/picture/picture.scss'
import baguetteBox from 'baguettebox.js'
import { connect } from 'react-redux'
import { showList } from '_redux/actions/picture.js'
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
        const isNew = feature.get('status')
        if (isNew !== '0') {
            alert('请先保存季节信息')
            return
        }
       
        findReasonById({
            farmLandId: id,
            isNew
        })
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    feature.set('quarterCropsId', data.result.quarterCropsId)
                    return data.result.quarterCropsId
                } else {
                    alert('请求出现问题，请稍后重试')
                    return undefined
                }
            }).then(quarterCropsId => {
                if (!quarterCropsId) {
                    return
                }
                const fd = new FormData()
                fd.append('pageNo', 1)
                fd.append('pageSize', 14)
                fd.append('landId', id)
                fd.append('quarterCropsId', quarterCropsId)
                findLogPhotoList(fd)
                    .then(e=>e.data)
                    .then(data => {
                        if (data.msg === '200') {
                            const {list} = data.result
                            if (list) {
                                this.setState({
                                    list
                                })
                            }
                            
                        } 
                    })
            })
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
        return (<div className='pictures gallery'>
            {
                this.state.list.map(list =>
                    <a href={list.largeThumbnailPath} data-caption={`${list.log.content} [${list.log.createDate}]`} key={list.id} className='img-box'>
                        <img src={list.smallThumbnailPath} alt="" />
                    </a>
                )
            }
            <div className='img-box more' onClick={this.showMore}>

                <img src={more} alt="" id='more' /><label htmlFor="more">更多</label>
            </div>
        </div>)
    }
}
Picture.propTypes = {
    picture: PropTypes.object,
    showList: PropTypes.func,
    feature: PropTypes.object
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Picture)