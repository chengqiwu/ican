import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'css/index/common/company.scss'
class Company extends Component {
  constructor() {
    super()
    this.state = {
      companyName: '',
      companyLogo: undefined
    }
  }
  // componentDidMount() {
  //   getUserInfo2()
  //     .then(e=>e.data)
  //     .then(data => {
  //       if (data.msg === '200') {
  //         const { result } = data
  //         this.setState({
  //           companyName: result.companyName,
  //           companyLogo: result.companyLogo
  //         })
  //       }
  //     })
  // }
  render() {
    const {user} = this.props
    return <div className='showCompany'>
      {user.companyLogo ?
        <img src={user.companyLogo} alt="" />  :
        user.companyName ?
          <div>{user.companyName}</div> :
          null}
    </div>
  }
}
Company.propTypes = {
  user: PropTypes.object
}
const mapStateToProps = function ({user}) {
  return {
    user
  }
}
export default connect(mapStateToProps)(Company)