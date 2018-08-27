import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames'
import { connect } from 'react-redux'
import { updateManure } from '_redux/actions/manure'
import Scrollbar from 'smooth-scrollbar'
import { plantingSeasonCropDelete, getFertilizer } from 'utils/Api'
import delete1 from 'images/index/crop/delete.png'
// import delete1 from 'images/circle/red.png'
const ferType = '尿素，一铵，二铵，硫酸钾，硫酸锌，硼肥，磷酸二氢钾，芸苔素，氯化钾，菌肥，有机肥，其它'.split('，')
class Manure extends Component {
  componentDidUpdate() {
    Scrollbar.init(this.content)
  }
  componentWillUpdate() {
    Scrollbar.destroy(this.content)
  }
  addSingFer = (e) => {
    e.preventDefault()
    console.log()
    const rect = this.content.getBoundingClientRect()
    const pos = {
      left: rect.left+300,
      top: rect.top-112
    }
    const { manure, updateManure, plantingSeasonCropsId, update, updateNo } = this.props
    if (!plantingSeasonCropsId) {
      alert('保存作物之后才能添加肥料')
      return
    }
    if (manure.show) {
      return
    }
    updateManure({
      id: Date.now(),
    }, plantingSeasonCropsId, update, updateNo, pos)
  }
  deleteFerById = (id) => {
    const fd = new FormData()
    fd.append('id', id)
    plantingSeasonCropDelete(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          // this.setState({
          //   fertilizers: this.state.fertilizers.filter(fer => fer.id !== id)
          // })
          this.props.updateFertilizers()
        } else {
          alert('删除失败，请稍后重试')
        }
      })

  }
  showFerDetial = (id, e) => {
    e.preventDefault()
    const { manure, updateManure, plantingSeasonCropsId, update, updateNo } = this.props
    const rect = this.content.getBoundingClientRect()
    const pos = {
      left: rect.left+300,
      top: rect.top-112
    }
    const fd = new FormData()
    fd.append('id', id)
    getFertilizer(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          this.props.updateManure(data.result, plantingSeasonCropsId, update, updateNo, pos)
        }
      })
  }
  render() {
    return (<div className='warp manure'>
      <div className='warp-title'>
        肥料
      </div>
      <div className='warp-content' >
        <ul ref={content => this.content = content}>
          {
            this.props.fertilizers.map(fer => <li key={fer.id}>
              <div>
                <a href='#' onClick={this.showFerDetial.bind(this, fer.id)}>{ferType[Number(fer.category)]}</a>
                <span>{fer.dosage}公斤/亩</span>
                <button type='button' className='delete' onClick={this.deleteFerById.bind(this, fer.id)}>
                  <img src={delete1}/>
                </button>
              </div>
            </li>)
          }
        </ul>
        <button type='button' className='button' onClick={this.addSingFer}>增加肥料</button>
      </div>
    </div>
    )  
  }
}
Manure.propTypes = {
  fertilizers: PropTypes.array,
  disabled: PropTypes.bool,
  manure: PropTypes.object,
  updateManure: PropTypes.func,
  plantingSeasonCropsId: PropTypes.string,
  updateFertilizers: PropTypes.func,
  update: PropTypes.func,
  updateNo: PropTypes.func
}
const mapStateToProps = (state) => {
  return {
    manure: state.manure
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    // showManure: (manure) => {
    //   dispatch(showSeason(manure))
    // },
    updateManure: (manure, plantingSeasonCropsId, update, updateNo,pos) => {
      dispatch(updateManure(manure, plantingSeasonCropsId, update, updateNo, pos))
    }
  }
}
// updateSeason
export default connect(mapStateToProps, mapDispathToProps)(Manure)