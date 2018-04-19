import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromFeature } from '_redux/actions/feature'
import { findReasonById, saveSeasonInfo } from 'utils/Api'
import Abstract from './Abstract'
class FiledInfo extends Component {
    constructor(props) {
        super(props)
        const { feature } = props.feature
        const isNew = feature.get('isNew')
        console.log(isNew)
        this.state = {
            isNew,
            message: {}
        }
    }
    componentDidMount() {
        if ( 0 === this.state.isNew) {
            const { id } = this.props.feature
            findReasonById({
                farmLandId: id,
                isNew: 0
            }).then(e => e.data)
                .then(data => {
                    console.log(data)
                    if (data.msg === '200') {
                        this.setState({
                            message: data.result
                        })
                    }
                })
        }
    }
    start() {
        this.props.fromFeature(true)
    }
    render() {
        return this.state.isNew === 1 ? <div>
            <div>你目前还没有填写田地信息</div>
            <button className='content-btn' onClick={this.start.bind(this)}>开始填写</button>
        </div> : <Abstract fieldMessage={this.state.message}/>
    }
}
FiledInfo.propTypes = {
    fromFeature: PropTypes.func,
    feature: PropTypes.object
}
const mapStateToProps = (state) => {
    return {
        feature: state.feature,
        fieldMessage: state.fieldMessage
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        fromFeature: (flag) => {
            dispatch(fromFeature(flag))
        },
       
    }
}
export default connect(mapStateToProps, mapDispathToProps)(FiledInfo)