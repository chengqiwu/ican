import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnams from 'classnames'

import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { getArea } from 'utils/tools'
import FromMessage from './fromMessage'
import ShowMessage from './showMessage'

import { findReasonById, saveSeasonInfo } from 'utils/Api'

import { setFieldMessage, showFieldMessage, startFieldMessage } from '_redux/actions/fieldMessage'


import 'css/index/common/filedMessage.scss'

class FiledMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMessage: false,
            initialize: {}
        }
        this.nextSubmit = this.nextSubmit.bind(this)
    }
    nextSubmit(submitData) {

    }
    componentDidUpdate() {

        this.mess && this.mess.scrollIntoView(true)
        this.showMess && this.showMess.scrollIntoView(true)

    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps, nextState)
        const { feature: {feature} } = nextProps
        console.log(feature.get('name'))
        
        if (!feature.get('name')) {
            return false
        }
        
        return true
    }
    getMessage(defaultValue) {
        const { feature } = this.props.feature
        const id = this.props.feature.feature.getId()
        if (!id) {
            return
        }
        findReasonById({
            farmLandId: id,
            isNew: feature.get('status')
        }).then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    console.log(data)
                    this.props.setFieldMessage(data.result)
                }
            })
    }
    closer() {
        const { start, show } = this.props.fieldMessage
        start && this.props.startFieldMessage(false)
        show  && this.props.showFieldMessage(false)
    }
    render() {
        const feature = this.props.feature.feature
        const { message, start, show } = this.props.fieldMessage
        return  show 
            ? 
            <div className='filed-message' ref={showMess => this.showMess = showMess}>
                <h3 ref={title => this.title = title} className='filed-title'>{feature.get('name')}-田地信息 | 位置：{feature.get('address')} | 面积：{getArea(feature).acre} 亩 / {getArea(feature).hectare} 公顷</h3>
                <a href="#" className="filed-closer" onClick={this.closer.bind(this)}></a>
                <div className="filed-content">
                    <ShowMessage />                
                </div>
            </div> 
            :
            start 
                ?
                <div ref={mess => this.mess = mess} className='filed-message'>
                    <h3 ref={title => this.title = title} className='filed-title'>{this.props.feature.feature.get('name')}-田地信息</h3>
                    <a href="#" className="filed-closer" onClick={this.closer.bind(this)}></a>
                    <div className="filed-content">
                        <FromMessage {...this.props} feature={this.props.feature.feature} getMessage={this.getMessage.bind(this)}/>
                                                
                    </div>
                </div>
                :
                null
        
    }
}
FiledMessage.propTypes = {
    flag: PropTypes.bool,
    fromFeature: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    feature: PropTypes.object,
    initialize: PropTypes.func,
    fieldMessage: PropTypes.object,
    setFieldMessage: PropTypes.func,
    showFieldMessage: PropTypes.func,
    startFieldMessage: PropTypes.func
}
const mapStateToProps = (state) => {
    return {
        feature: state.feature,
        fieldMessage: state.fieldMessage
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        startFieldMessage: (start) => {
            dispatch(startFieldMessage(start))
        },
        setFieldMessage: (message) => {
            dispatch(setFieldMessage(message))
        },
        showFieldMessage: (show) => {
            dispatch(showFieldMessage(show))
        }
    }
}

export default (connect(mapStateToProps, mapDispathToProps)(FiledMessage))