import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Switch from 'react-switch'
import {plantingSeasonCropDelete} from 'utils/Api'
import Dropzone from 'react-dropzone'
const typeArr =  [{
  value: '0',
  label: '底肥'
},{
  value: '1',
  label: '种肥'
},{
  value: '2',
  label: '追肥'
},{
  value: '3',
  label: '叶喷'
},{
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
class AddSingFer extends Component {
  constructor() {
    super()
    this.state = {
      tableData: [],
      frontFile: {},
      backFile: {},
      model: 0
    }
  }
  // 刷新肥的id和文件
  componentDidUpdate(prevProps) {
    const {fertilizers} = this.props
    // fertilizers
    if (this.props.update) {
      const fers = fertilizers.map(f => {
        const {
          backPhoto,
          boron = '',
          copper = '',
          dosage = '',
          frontagePhoto,
          id,
          category = '',
          iron = '',
          magnesium = '',
          manganese = '',
          name = '',
          nitrogen = '',
          phosphorus = '',
          potassium = '',
          sulfur = '',
          type = '',
          zinc = '',
        } = f
        return {
          urlBack: backPhoto,
          boron,
          copper,
          dosage,
          category: ferArr.filter(t => t.value === category)[0] || '',
          urlFront: frontagePhoto,
          id,
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
          frontagePhoto: undefined,
          backPhoto: undefined,
        }
      })
      this.setState({
        tableData: fers,
        frontFile: {},
        backFile: {},
        model: 0
      })
      this.props.updateNo()
    }
  }
  addSingFer = () => {
    const { tableData } = this.state
    tableData.push({
      id: undefined,
      name: '',
      category: '',
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      sulfur: '',
      zinc: '',
      boron: '',
      magnesium: '',
      copper: '',
      iron: '',
      manganese: '',
      frontagePhoto: undefined,
      backPhoto: undefined,
      dosage: '',
      type: '',
    })
    this.setState({
      tableData
    })
  }
  inputChange = (i, e) => {
    console.log(e, i)
    const { name, value } = e.target
    const {tableData} = this.state
    tableData[i][name] = value
    this.setState({
      tableData
    })
  }
  categoryChange = (value) => {
    this.setState({
      category: value
    })
  }
  handleFrontDrop = (i, accepted) => {
    console.log(i)
    const { tableData } = this.state
    const key = Date.now()
    tableData[i].frontagePhoto = key.toString()
    this.setState({
      tableData,
      frontFile: {
        ...this.state.frontFile,
        [key]: accepted[0]
      }
    })
  }
  handleBackDrop = (i, accepted) => {
    console.log(i)
    const { tableData } = this.state
    const key = Date.now()
    tableData[i].backPhoto = key.toString()
    this.setState({
      tableData,
      backFile: {
        ...this.state.backFile,
        [key]: accepted[0]
      }
    })
  }
  
  deleteFrontFile = (i, e) => {
    e.preventDefault()
    const { tableData, frontFile } = this.state
    if (!!tableData[i].urlFront) {
      tableData[i].urlFront = ''
      this.setState({
        tableData
      })
    }
    frontFile[tableData[i].frontagePhoto] = undefined
    tableData[i].frontagePhoto = ''
    this.setState({
      tableData,
      frontFile
    })
  }
  deleteBackFile = (i, e) => {
    e.preventDefault()
    const { tableData, backFile } = this.state
    if (!!tableData[i].urlBack) {
      tableData[i].urlBack = ''
      this.setState({
        tableData
      })
    }
    backFile[tableData[i].frontagePhoto] = undefined
    tableData[i].backPhoto = ''
    this.setState({
      tableData,
      backFile
    })
  }
  removeSingFer = (i, id) => {
    console.log(i, id)
    const { tableData } = this.state
    if (!id) {
      this.setState({
        tableData:[
          ...tableData.slice(0, i),
          ...tableData.slice(i+1)
        ]
      })
    } else if (id.toString().length === 32) {
      const fd = new FormData()
      fd.append('id', id)
      plantingSeasonCropDelete(fd)
        .then(e => e.data)
        .then(data => {
          if (data.msg === '200') {
            this.setState({
              tableData:[
                ...tableData.slice(0, i),
                ...tableData.slice(i+1)
              ]
            })
          } else {
            alert('删除失败，请稍后重试')
          }
        })
    }
   
  }
  typeChange = (i, value) => {
    const { tableData } = this.state
    tableData[i].type = value
    this.setState({
      tableData
    })
  }
  categoryChange = (i, value) => {
    const { tableData } = this.state
    tableData[i].category = value
    this.setState({
      tableData
    })
  }
  modelChange = (model) => {
    if (!!model === !!this.state.model) {
      return
    }
    this.setState({
      model: model ? 1 : 0
    }) 
  }
  render() {
    console.log(this.state.model)
    const { disabled } = this.props
    return <div className="add-sing-fer">
      <div className='switch'>
        <div className='switch-btn'>
          {/* <button type='button' className='button' onClick={this.simpleModel}>简易模式</button>
          <button type='button' className='button' onClick={this.fullModel}>完整模式</button> */}
          <label htmlFor="material-switch">
            <span onClick={disabled ? undefined : this.modelChange.bind(this, false)}>简易模式</span>
            <Switch
              disabled={disabled}
              checked={this.state.model===1}
              onChange={this.modelChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
            <span onClick={disabled ? undefined : this.modelChange.bind(this, true)}>完整模式</span>
          </label>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            {/* 品牌、氮（N%）- 磷 （P2O5%）- 钾 （K2O）- 硫 （S%）- 锌 （ZN%）一硼 （B%）、 镁，铜，铁，锰、肥袋正面照片、肥袋反面照片、施肥量、施肥类型 */}
            <td>品牌</td>
            <td>肥料类型</td>
            <td>氮（N%）</td>
            <td>磷（P<sub>2</sub>O<sub>5</sub>%）</td>
            <td>钾（K<sub>2</sub>O）</td>
            <td>硫（S%）</td>
            <td>锌（Zn%）</td>
            <td>硼（B%）</td>
            {
              this.state.model === 1 && <td>镁</td>
            }
            {
              this.state.model === 1 && <td>铜</td>
            }
            {
              this.state.model === 1 && <td>铁</td>
            }
            {
              this.state.model === 1 && <td>锰</td>
            }
            <td>肥袋正面照片</td>
            <td>肥袋反面照片</td>
            <td>施肥量</td>
            <td>施肥类型</td>
            <td>操作</td>
          </tr>
          {
            this.state.tableData.map((t, i) =>  <tr key={i}>
              <td>
                <input type="text" disabled={disabled} required name='name' value={t.name} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <Select
                  classNamePrefix='react-select'
                  placeholder=''
                  noResultsText='无'
                  isDisabled={disabled}
                  onChange={this.categoryChange.bind(this, i)}
                  value={t.category}
                  maxMenuHeight={'200'}
                  options={
                    // 底肥，种肥，追肥，叶喷，水肥一体
                    ferArr
                  }
                ></Select>
              </td>
              
              <td>
                <input type="number" min="0.0" disabled={disabled} name='nitrogen' value={t.nitrogen} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="number" min="0.0" disabled={disabled} name='phosphorus' value={t.phosphorus} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="number" min="0.0" disabled={disabled} name='potassium' value={t.potassium} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="number" min="0.0" disabled={disabled} name='sulfur' value={t.sulfur} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="number" min="0.0" disabled={disabled} name='zinc' value={t.zinc} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="number" min="0.0" disabled={disabled} name='boron' value={t.boron} onChange={this.inputChange.bind(this, i)}/>
              </td>
              {
                this.state.model === 1 && <td>
                  <input type="number" min="0.0" disabled={disabled} name='magnesium' value={t.magnesium} onChange={this.inputChange.bind(this, i)}/>
                </td>
              }
              {
                this.state.model === 1 && <td>
                  <input type="number" min="0.0" disabled={disabled} name='copper' value={t.copper} onChange={this.inputChange.bind(this, i)}/>
                </td>
              }
              {
                this.state.model === 1 && <td>
                  <input type="number" min="0.0" disabled={disabled} name='iron' value={t.iron} onChange={this.inputChange.bind(this, i)}/>
                </td>
              }
              {
                this.state.model === 1 && <td>
                  <input type="number" min="0.0" disabled={disabled} name='manganese' value={t.manganese} onChange={this.inputChange.bind(this, i)}/>
                </td>
              }
              <td>
                <Dropzone 
                  ref={(node) => this[`dropzoneRef${i}`] = node } 
                  onDrop={this.handleFrontDrop.bind(this, i)}
                  accept='image/*'
                  className='hiden'>
                  
                  <p>Drop files here.</p>
                </Dropzone>
                {(!this.state.frontFile[t.frontagePhoto] && !t.urlFront) ?<button disabled={disabled} type="button" onClick={() => { this[`dropzoneRef${i}`].open() }}>
                  +选择文件
                </button> : <div>
                  <label>
                    <a href={t.urlFront || this.state.frontFile[t.frontagePhoto].preview} target='_blank'>正面图</a>
                  </label>
                  <button type='button' onClick={this.deleteFrontFile.bind(this, i)}>删除</button>
                </div>}
              </td>
              <td>
                <Dropzone 
                  ref={(node) => this[`dropzoneRef2${i}`] = node } 
                  onDrop={this.handleBackDrop.bind(this, i)}
                  accept='image/*'
                  className='hiden'>
                  
                  <p>Drop files here.</p>
                </Dropzone>
                {(!this.state.backFile[t.backPhoto] && !t.urlBack) ? <button type="button" disabled={disabled} onClick={() => { this[`dropzoneRef2${i}`].open() }}>
                  +选择文件
                </button> : <div>
                  <label>
                    <a href={t.urlBack || this.state.backFile[t.backPhoto].preview} target='_blank'>反面图</a>
                  </label>
                  <button type='button' onClick={this.deleteBackFile.bind(this, i)}>删除</button>
                </div>}
              </td>
              <td>
                <input type="number" min="0.0" disabled={disabled} name='dosage' value={t.dosage} onChange={this.inputChange.bind(this, i)} />
              </td>
              <td>
                <Select
                  classNamePrefix='react-select'
                  placeholder=''
                  noResultsText='无'
                  isDisabled={disabled}
                  onChange={this.typeChange.bind(this, i)}
                  value={t.type}
                  maxMenuHeight={'200'}
                  options={
                    // 底肥，种肥，追肥，叶喷，水肥一体
                    typeArr
                  }
                ></Select>
              </td>
              <td>
                <button type='button' className='button' onClick={this.removeSingFer.bind(this, i, t.id)} disabled={disabled}>删除</button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
      <button type='button' className='button' onClick={this.addSingFer} disabled={disabled}>+增加肥料</button>
    </div>
  }
}
AddSingFer.propTypes = {
  updateFertilizers: PropTypes.func,
  fertilizers: PropTypes.array,
  updateNo: PropTypes.func,
  update: PropTypes.bool,
  disabled: PropTypes.bool
}
export default AddSingFer