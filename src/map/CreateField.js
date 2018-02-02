import React, { Component } from 'react'
import PropTypes from 'prop-types' 
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
        this.props.setFeatureId(this.state.name)
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
    setFeatureId: PropTypes.func

}
export default CreateField