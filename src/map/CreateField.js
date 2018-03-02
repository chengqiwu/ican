import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import {farmLandSave} from '../utils/Api.js'
import ol from 'openlayers'

class CreateField extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
        this.submitHandle = this.submitHandle.bind(this)
        this.changeInput = this.changeInput.bind(this)
    }
    changeInput(e) {
        e.preventDefault()
        this.setState({
            name: e.target.value
        })
    }
    submitHandle(e) {
        e.preventDefault()

        // 圈地

        const farmLandInfo = {
            name: this.state.name,
            geom: this.props.geom
        }
        farmLandSave({
            farmLandInfo: JSON.stringify(farmLandInfo)
        }).then(res => res.data).then(data => {
            console.log(data)
            if (data.msg === '200') {
                this.props.setFeatureId(this.state.name)
            } else {
                data.msg === '209'
                alert(data.result+ ' ，请重绘。。。')
            }
        })


    }
    render() {

        return (
            <form onSubmit={this.submitHandle} >
                <div>
                    <input type="text" name='name' value={this.state.name} onChange={this.changeInput} />
                    <input type="submit" value='保存' />
                </div>
                <div>{this.props.area}</div>
            </form>
        )
    }
  
}

CreateField.propTypes = {
    submitHandle: PropTypes.func,
    changeInput: PropTypes.func,
    area: PropTypes.string,
    setFeatureId: PropTypes.func,
    geom: PropTypes.string

}
export default CreateField