import React, { Component } from 'react'
import PropTypes from 'prop-types'
import JobLogging from './picture/JobLogging'
import Message from './fieldMessage/Message'
import { connect } from 'react-redux'
class Appends extends Component {
  constructor() {
    super()
    this.state = {
      keys: [],
      doms: []
    }
  }

  componentDidUpdate() {
    const { picture, fieldMessage } = this.props
    console.log(fieldMessage)
    this.handler(picture, JobLogging)
    this.handler(fieldMessage, Message)
  }
  handler = (state, dom) => {
    const { keys, doms } = this.state
    if (state.show && !keys.includes(state.name)) {
      this.setState({
        keys: [...keys, state.name],
        doms: [
          ...doms,
          dom
        ]
      })
    } else if (!state.show) {
      if (keys.includes(state.name)) {
        this.setState({
          keys: keys.filter(e => e !== state.name),
          doms: doms.filter(e => e !== dom)
        })
      }
      
    }
  }
  render() {
    return <div>
      {this.state.doms.map((Dom, i) => <Dom key={i}/>)}
    </div>
  }
}
Appends.propTypes = {
  picture: PropTypes.object,
  fieldMessage: PropTypes.object
}
const mapStateToProps = function (state) {
  return {
    picture: state.picture,
    fieldMessage: state.fieldMessage
  }
}
export default connect(mapStateToProps)(Appends)