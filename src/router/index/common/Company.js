import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'css/index/common/company.scss'
const Company = (props) => {
  const {user} = props
  return <div className='showCompany'>
    {user.companyLogo ?
      <img src={user.companyLogo} alt="" />  :
      user.companyName ?
        <div>{user.companyName}</div> :
        null}
  </div>
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