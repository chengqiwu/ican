import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { farmLandSave } from 'utils/Api'
const statusArr = [
  {
    label: '优',
    value: '0'
  },
  {
    label: '良',
    value: '1'
  },
  {
    label: '差',
    value: '2'
  },
  {
    label: '闲',
    value: '3'
  },
  {
    label: '弃',
    value: '4'
  },
  {
    label: '不选择',
    value: '5'
  }
]
class FarmLand extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: '',
      status: '',
      edit: false,
      res: {}
    }
  }
  componentDidMount() {
    const {feature: {feature}} = this.props
    const id = feature.getId().replace('tb_farmland.', '')
    const name = feature.get('name')
    const status = feature.get('growth_status')
    this.setState({
      id,
      name,
      status: statusArr.filter(s => s.value === status)[0],
      res: {
        name,
        status: statusArr.filter(s => s.value === status)[0],
      }
    })
  }
  inputChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  selectChange = value => {
    this.setState({
      status: value
    })
  }
  submitHandler = e => {
    e.preventDefault()
    const { feature: { feature } } = this.props
    const {map: {map}} = this.props
    const { id, name, status } = this.state
    const fd = new FormData()
    const farmLandInfo = {
      id,
      name,
      status: status.value
    }
    fd.append('farmLandInfo', JSON.stringify(farmLandInfo))
    farmLandSave(fd)
      .then(e => e.data)
      .then(data => {
        console.log(data)
        if (data.msg === '200') {
          feature.set('name', name)
          feature.set('growth_status', status.value)
          this.setState({
            edit: false
          })
          alert('修改成功')
        } else {
          alert('修改失败，请稍后重试')
        }
      })
  }
  activeEdit = (e) => {
    e.preventDefault()
    this.setState({
      edit: true
    })
  }
  abandon = (e) => {
    e.preventDefault()
    console.log(this.state.res)
    this.setState({
      edit: false,
      ...this.state.res
    })
  }
  render() {
    return <div className='farmland'>
      <form onSubmit={this.submitHandler}>
        <div className="input-group">
          <label htmlFor="farmLandName">田地名称：</label>
          <input
            disabled={!this.state.edit}
            type="text"
            id='farmLandName'
            name='name'
            value={this.state.name}
            onChange={this.inputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="framLandStatus">田地状态：</label>
          <Select
            placeholder='请选择'
            isDisabled={!this.state.edit}
            classNamePrefix='select'
            onChange={this.selectChange}
            value={this.state.status}
            options={statusArr}
          />
        </div>
        

        
        {!this.state.edit ? <div><button type='button' className='button edit' onClick={this.activeEdit}>编辑</button></div>
          : <div><button className="button submit">保存</button><button type='button' className="button submit" onClick={this.abandon}>放弃</button></div>}
      </form>
      
    </div>
  }
}
FarmLand.propTypes = {
  map: PropTypes.object,
  feature: PropTypes.object
}
const mapStateToProps = function (state) {
  return {
    map: state.map,
    feature: state.feature
  }
}
export default connect(mapStateToProps)(FarmLand)