import React from 'react'
import PropTypes from 'prop-types'
import { updateUnit } from '_redux/actions/cropPlan'
import classNames from 'classnames'
import { connect } from 'react-redux'

const Units = (props) => {
  function updateUnits(i) {
    props.updateUnit(i)
  }
  const { cropPlan: {unit}} = props
  return (
    <ul className='units'>
      <li className={classNames({
        active: unit === 0
      })} onClick={updateUnits.bind(this, 0)}>公斤/亩</li>
      <span>/</span>
      <li className={classNames({
        active: unit === 1
      })} onClick={updateUnits.bind(this, 1)}>公斤/公顷</li>
      <span>/</span>
      {/* <li className={classNames({
        active: unit === 2
      })} onClick={updateUnits.bind(this, 2)}>百分比</li> */}
    </ul>
  )

}
Units.propTypes = {
  cropPlan: PropTypes.object,
  updateUnit: PropTypes.func,
}
export default connect(({ cropPlan }) => ({ cropPlan }), (dispatch) => ({
  updateUnit: (unit) => dispatch(updateUnit(unit))
}))(Units)