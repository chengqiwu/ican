import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
class Bundle extends Component {
    state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null
    } 

    componentWillMount() {
      this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.load !== this.props.load) {
        this.load(nextProps)
      }
    }

    load(props) {
      this.setState({
        mod: null
      }) 
      props.load((mod) => {
        this.setState({
          // handle both es imports and cjs
          mod: mod.default ? mod.default : mod
        })
      })
    }

    render() {
      return this.props.children(this.state.mod)
    }
}
Bundle.propTypes = {
  children: PropTypes.func,
  load: PropTypes.func
}

const createComponent = (component) => class WarppedComponent extends Component {
  render() {
    return (
      <Bundle load={component}>
        {
          (Component) => Component ? <div>
            <Component {...this.props} />
            <ToastContainer
              autoClose={3000}
              position={toast.POSITION.BOTTOM_CENTER}
              // pauseOnHover={false}
              hideProgressBar={true}
            /></div> : null
        }
        
      </Bundle>
    )
  }
}
export default createComponent