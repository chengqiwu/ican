import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-switch'

class FacSwitch extends Component {
  constructor() {
    super()
  }

  handleChange = (checked) => {
    this.props.updateState(this.props.id, checked ? '1' : '0')
  }

  render() {
    return (
      <Switch
        disabled={this.props.disabled} 
        onChange={this.handleChange}
        checked={this.props.checked === '1'}
        className="react-switch"
        height={20}
        width={40}
        uncheckedIcon={false}
        checkedIcon={false}
      />
    )
    
  }
}
FacSwitch.propTypes = {
  updateState: PropTypes.func,
  id: PropTypes.string,
  checked: PropTypes.string,
  disabled: PropTypes.bool
}
export default FacSwitch