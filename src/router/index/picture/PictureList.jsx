import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from './List'
import Scrollbar from 'smooth-scrollbar'
import { connect } from 'react-redux'
import RxDragDrop from './RxDragDrop'
import Top from './Top'
import { showList, updateLists } from '_redux/actions/picture.js'
import { findReasonById, findlandLogList } from 'utils/Api'
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
        console.log(list)
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
        if (isNew !== '0') {
            alert('该田地还没有种植季信息，请尽快完善！')
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
                fd.append('pageSize', -1)
                fd.append('landId', id)
                fd.append('quarterCropsId', quarterCropsId)
                findlandLogList(fd)
                    .then(e => e.data)
                    .then(data => {
                        if (data.msg === '200') {
                            const { list } = data.result
                            if (list) {
                                // this.setState({
                                //     list
                                // })
                                this.props.updateLists(list)
                            } else {
                                this.props.updateLists([])
                            }


                        }
                    })
            })
    }
    componentWillUpdate() {
        
        Scrollbar.destroyAll()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.feature.feature.getId().replace('tb_farmland.', '') 
            !== prevProps.feature.feature.getId().replace('tb_farmland.', '')) {
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
    render() {
        const { picture: { lists }} = this.props
        const flag = (this.state.show && this.state.logger.id)
        console.log(flag)
        return (
            <div className='lists'>
                { flag && <RxDragDrop title={this.state.logger.id ? '编辑日志' : '新建日志'} logger={this.state.logger} close={this.destory} />}
                {!this.state.close && <Top closer={this.closer} logger={this.state.list}/>}
                <div ref={lists => this.lists = lists}>
                    {lists.map(list =>
                        <List key={list.id} list={list} showList={this.showList} show={this.show} />
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