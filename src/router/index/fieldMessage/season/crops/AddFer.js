import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { fertilizerSave } from 'utils/Api'

import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify'
const typeArr = [{
  value: '0',
  label: '底肥'
}, {
  value: '1',
  label: '种肥'
}, {
  value: '2',
  label: '追肥'
}, {
  value: '3',
  label: '叶喷'
}, {
  value: '4',
  label: '水肥一体'
},]
const ferType = '尿素，一铵，二铵，硫酸钾，硫酸锌，硼肥，磷酸二氢钾，芸苔素，氯化钾，菌肥，有机肥，其它'
const ferArr = ferType
  .split('，')
  .map((f, i) => ({
    value: i.toString(),
    label: f
  }))

const phArr = [{
  value: '0',
  label: '酸性'
}, {
  value: '1',
  label: '中性'
}, {
  value: '2',
  label: '碱性'
}]
class AddFer extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: '',
      category: '',
      ph: '',
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      sulfur: '',
      zinc: '',
      boron: '',
      magnesium: '',
      calcium: '',
      copper: '',
      iron: '',
      manganese: '',
      frontagePhoto: '',
      backPhoto: '',
      dosage: '',
      type: '',
      frontFile: {},
      backFile: {},
      urlFront: '',
      urlBack: ''
    }
  }
  // 刷新肥的id和文件
  componentDidMount(prevProps) {
    const {manure: fertilizers } = this.props.manure
    // // fertilizers
    // if (update) {
    this.successCallback(fertilizers)
  }
  componentDidUpdate(prevProps) {
   
    const { manure } = prevProps
    const { manure: manure2 } = this.props
    console.log(manure, manure2)
    if (manure.manure.id !== manure2.manure.id) {
      this.successCallback(manure2.manure)
    }
  }
  inputChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    this.setState({
      [name]: value
    })
  }
  categoryChange = (value) => {
    this.setState({
      category: value
    })
  }
  handleFrontDrop = (accepted) => {
    const key = Date.now()
    this.setState({
      frontagePhoto: key.toString(),
      frontFile: {
        [key]: accepted[0]
      }
    })
  }
  handleBackDrop = (accepted) => {
    const key = Date.now()
    this.setState({
      backPhoto: key.toString(),
      backFile: {
        [key]: accepted[0]
      }
    })
  }

  deleteFrontFile = (e) => {
    e.preventDefault()
    const { urlFront } = this.state
    if (!!urlFront) {
      this.setState({
        urlFront: ''
      })
      return
    }
    this.setState({
      frontagePhoto: '',
      frontFile: {}
    })
  }
  deleteBackFile = (e) => {
    e.preventDefault()
    const { urlBack } = this.state
    if (!!urlBack) {
      this.setState({
        urlBack: ''
      })
      return
    }
    this.setState({
      backPhoto: '',
      backFile: {}
    })
  }
  typeChange = (value) => {
    this.setState({
      type: value
    })
  }
  phChange = (value) => {
    this.setState({
      ph: value
    })
  }
  submitHandle = (e) => {
    const { update } = this.props.manure
    e.preventDefault()
    if (!this.state.category) {
      toast.info('请选择肥料类型')
      return
    }
    const fertilizerStr = {}
    const { plantingSeasonCropsId} = this.props.manure
    if (plantingSeasonCropsId.toString().length !== 32) {
      toast.info('请先保存作物')
      return
    }
    if (this.state.id.toString().length === 32) {
      fertilizerStr.id = this.state.id
    }
    !!this.state.name && (fertilizerStr.name = this.state.name)
    !!this.state.category && (fertilizerStr.category = this.state.category.value)
    !!this.state.ph && (fertilizerStr.ph = this.state.ph.value)
    !!this.state.nitrogen && (fertilizerStr.nitrogen = this.state.nitrogen)
    !!this.state.phosphorus && (fertilizerStr.phosphorus = this.state.phosphorus)
    !!this.state.potassium && (fertilizerStr.potassium = this.state.potassium)
    !!this.state.sulfur && (fertilizerStr.sulfur = this.state.sulfur)
    !!this.state.zinc && (fertilizerStr.zinc = this.state.zinc)
    !!this.state.boron && (fertilizerStr.boron = this.state.boron)
    !!this.state.magnesium && (fertilizerStr.magnesium = this.state.magnesium)
    !!this.state.calcium && (fertilizerStr.calcium = this.state.calcium)
    !!this.state.copper && (fertilizerStr.copper = this.state.copper)
    !!this.state.iron && (fertilizerStr.iron = this.state.iron)
    !!this.state.manganese && (fertilizerStr.manganese = this.state.manganese)
    !!this.state.frontagePhoto && (fertilizerStr.frontagePhoto = this.state.frontagePhoto)
    !!this.state.backPhoto && (fertilizerStr.backPhoto = this.state.backPhoto)
    !!this.state.dosage && (fertilizerStr.dosage = this.state.dosage)
    !!this.state.type && (fertilizerStr.type = this.state.type.value)
    const fd = new FormData()
    fd.append('fertilizerStr', encodeURI(JSON.stringify(fertilizerStr)))
    fd.append('plantingSeasonCropsId', plantingSeasonCropsId)
    // frontFile: { },
    // backFile: { },
    const { frontFile, backFile }= this.state
    Object.keys(frontFile).forEach(key => fd.append(key, frontFile[key]))
    Object.keys(backFile).forEach(key => fd.append(key, backFile[key]))
    fertilizerSave(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          toast.success('保存成功', {
            autoClose: 2000
          })
          this.successCallback(data.result)
          update()
        }
      })
  }
  successCallback(result) {
    const {
      id,
      name = '',
      category = '',
      ph = '',
      nitrogen='',
      phosphorus = '',
      potassium = '',
      sulfur = '',
      zinc = '',
      boron = '',
      magnesium = '',
      calcium = '',
      copper = '',
      iron = '',
      manganese = '',
      dosage = '',
      type = '',
      frontagePhoto = '',
      backPhoto = ''
    } = result
    this.setState({
      urlBack: backPhoto,
      boron,
      copper,
      dosage,
      category: ferArr.filter(t => t.value === category)[0] || '',
      urlFront: frontagePhoto,
      id,
      ph: phArr.filter(t => t.value === ph)[0] || '',
      calcium,
      iron,
      magnesium,
      manganese,
      name,
      nitrogen,
      phosphorus,
      potassium,
      sulfur,
      type: typeArr.filter(t => t.value === type)[0] || '',
      zinc,
      frontagePhoto: '',
      backPhoto: '',
      frontFile: {},
      backFile: {},
    })
  }
  render() {
    const { disabled } = this.props
    return <div className="addFer">
      <form onSubmit={this.submitHandle}>
        <div className='input-group'>
          <label htmlFor="">品牌</label>
          <input type="text" disabled={disabled} required name='name' value={this.state.name} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">肥料类型</label>
          <Select
            classNamePrefix='custom-select'
            className='custom-select'
            placeholder=''
            noResultsText='无'
            isDisabled={disabled}
            onChange={this.categoryChange}
            value={this.state.category}
            maxMenuHeight={'200'}
            options={
              // 底肥，种肥，追肥，叶喷，水肥一体
              ferArr
            }
          ></Select>
        </div>
        <div className='input-group'>
          <label htmlFor="">施肥量</label>
          <input type="number" placeholder='公斤/亩' required min="0.0" disabled={disabled} name='dosage' value={this.state.dosage} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">施肥类型</label>
          <Select
            classNamePrefix='custom-select'
            className='custom-select'
            placeholder=''
            noResultsText='无'
            isDisabled={disabled}
            onChange={this.typeChange}
            value={this.state.type}
            maxMenuHeight={'200'}
            options={
              // 底肥，种肥，追肥，叶喷，水肥一体
              typeArr
            }
          ></Select>
        </div>
        <div className='input-group'>
          <label htmlFor="">酸碱度</label>
          {/*  (0:酸性;1:中性;2:碱性) */}
          <Select
            classNamePrefix='custom-select'
            className='custom-select'
            placeholder=''
            noResultsText='无'
            isDisabled={disabled}
            onChange={this.phChange}
            value={this.state.ph}
            maxMenuHeight={'200'}
            options={
              // 底肥，种肥，追肥，叶喷，水肥一体
              phArr
            }
          ></Select>
          
           
        </div>
        <div className='input-group'>
          <label htmlFor="">氮（N%）</label>
          <input type="text" disabled={disabled} name='nitrogen' value={this.state.nitrogen} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">磷（P<sub>2</sub>O<sub>5</sub>%）</label>
          <input type="text" disabled={disabled} name='phosphorus' value={this.state.phosphorus} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">钾（K<sub>2</sub>O）</label>
          <input type="text" disabled={disabled} name='potassium' value={this.state.potassium} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">硫（S%）</label>
          <input type="text" disabled={disabled} name='sulfur' value={this.state.sulfur} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">锌（Zn%）</label>
          <input type="text" disabled={disabled} name='zinc' value={this.state.zinc} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">硼（B%）</label>
          <input type="text" disabled={disabled} name='boron' value={this.state.boron} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">镁（Mg%）</label>
          <input type="text" disabled={disabled} name='magnesium' value={this.state.magnesium} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">钙（Ca%）</label>
          <input type="text" disabled={disabled} name='calcium' value={this.state.calcium} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">铜（Cu%）</label>
          <input type="text" disabled={disabled} name='copper' value={this.state.copper} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">铁（Fe%）</label>
          <input type="text" disabled={disabled} name='iron' value={this.state.iron} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">锰（Mn%）</label>
          <input type="text" disabled={disabled} name='manganese' value={this.state.manganese} onChange={this.inputChange} />
        </div>
        <div className='input-group'>
          <label htmlFor="">肥带正面照片</label>
          <Dropzone
            ref={(node) => this.dropzoneRef = node}
            onDrop={this.handleFrontDrop}
            accept='image/*'
            className='hiden'>

            <p>Drop files here.</p>
          </Dropzone>
          {(!this.state.frontFile[this.state.frontagePhoto] && !this.state.urlFront) ? <button disabled={disabled} className='fileButton' type="button" onClick={() => { this.dropzoneRef.open() }}>
            +选择文件
          </button> : <div>
            <a href={this.state.urlFront || this.state.frontFile[this.state.frontagePhoto].preview} target='_blank'>正面图</a>
            <button type='button' onClick={this.deleteFrontFile}>删除</button>
          </div>}
        </div>
        
        <div className='input-group'>
          <label htmlFor="">肥带正面照片</label>
          <Dropzone
            ref={(node) => this.dropzoneRef2 = node}
            onDrop={this.handleBackDrop}
            accept='image/*'
            className='hiden'>

            <p>Drop files here.</p>
          </Dropzone>
          {(!this.state.backFile[this.state.backPhoto] && !this.state.urlBack) ? <button type="button" className='fileButton' disabled={disabled} onClick={() => { this.dropzoneRef2.open() }}>
            +选择文件
          </button> : <div>
            <a href={this.state.urlBack || this.state.backFile[this.state.backPhoto].preview} target='_blank'>反面图</a>
            <button type='button' onClick={this.deleteBackFile}>删除</button>
          </div>}
        </div>
        <div className='action'>
          <button className='button' disabled={disabled}>保存</button>
        </div>
      </form>
     
    </div>
  }
}
AddFer.propTypes = {
  disabled: PropTypes.bool,
  manure: PropTypes.object
}
export default AddFer