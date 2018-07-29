import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Form from 'map/Form'
import Form2 from 'map/Form2'
class FormField extends Component {
  constructor() {
    super()
    this.state = {
      next: 0
    }
    this.next = this.next.bind(this)
  }
  next() {
    this.setState({
      next: 1
    })
  }
  render() {
    console.log(this.state.next)
        
    const form = this.state.next === 0 ?
      <Form next={this.next} {...this.props}/>
      :
      <Form2 {...this.props}/>
    return (
      <div>
        {form}
      </div>
    )
  }
}
FormField.propTypes = {

}
export default FormField