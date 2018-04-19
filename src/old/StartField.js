import React, { Component } from 'react'
import PropTypes from 'prop-types'
class StartField extends Component {
    constructor() {
        super()
        this.state = {
            name: null
        }
        this.changeInput = this.changeInput.bind(this)
        this.modifyHandle = this.modifyHandle.bind(this)
        this.startHandle = this.startHandle.bind(this)     
    }
    componentDidMount() {
        this.setState({
            name: this.props.name
        })
      
    }
    componentWillUnmount() {
        this.modify.onclick = null
    }
    changeInput(e) {
        e.preventDefault()
        this.setState({
            name: e.target.value
        })
    }
    modifyHandle(e) {
        e.preventDefault()
        console.log(1111)
        this.props.setFeatureId(this.state.name)
    }
    startHandle(e) {
        e.preventDefault()
        this.props.startPlaint()
    }
    render() {
        if (!this.state.name) {
            return null
        }
        this.modify && !this.modify.onclick && (this.modify.onclick = this.modifyHandle)
        
        return (
            <form onSubmit={this.startHandle}>
                <div>
                    <input type="text" name='name' value={this.state.name} onChange={this.changeInput} />
                    <input type="button" value='修改' ref={modify => this.modify = modify} />
                </div>
                <div>{this.props.area}</div>
                <input type='submit' value='开始种植' />
            </form>
        )
    }
}

StartField.propTypes = {
    area: PropTypes.string,
    setFeatureId: PropTypes.func,
    name: PropTypes.string,
    startPlaint: PropTypes.func
}
export default StartField