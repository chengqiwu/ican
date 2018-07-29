import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
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
class AddSingFer extends Component {
  constructor() {
    super()
    this.state = {
      tableData: [],
      frontFile: {},
      backFile: {},
    }
  }
  componentDidMount() {
    const {fertilizers} = this.props
    console.log(this.props)
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
        console.log('dosage', dosage)
        console.log(typeArr.filter(t => t.value === type)[0])
        return {
          urlBack: backPhoto,
          boron,
          copper,
          dosage,
          urlFront: frontagePhoto,
          id,
          iron,
          magnesium,
          manganese,
          name,
          nitrogen,
          phosphorus,
          potassium,
          frontagePhoto: '',
          backPhoto: '',
          sulfur,
          type: typeArr.filter(t => t.value === type)[0] || '',
          zinc,
        }
      })
      this.setState({
        tableData: fers
      })
      this.props.updateNo()
    }
  }
  addSingFer = () => {
    const { tableData } = this.state
    tableData.push({
      id: undefined,
      name: '',
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
      frontagePhoto: '',
      backPhoto: '',
      dosage: '',
      type: '',
    })
    console.log(tableData.length)
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
    tableData[i].frontagePhoto = key
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
    tableData[i].backPhoto = key
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
  removeSingFer = (i) => {
    console.log(i)
    const { tableData } = this.state

    this.setState({
      tableData: tableData.filter((t, index) => index !== i)
    })
  }
  typeChange = (i, value) => {
    const { tableData } = this.state
    tableData[i].type = value
    this.setState({
      tableData
    })
  }
  render() {
    return <div className="add-sing-fer">
      <table>
        <tbody>
          <tr>
            {/* 品牌、氮（N%）- 磷 （P2O5%）- 钾 （K2O）- 硫 （S%）- 锌 （ZN%）一硼 （B%）、 镁，铜，铁，锰、肥袋正面照片、肥袋反面照片、施肥量、施肥类型 */}
            <td>品牌</td>
            <td>氮（N%）</td>
            <td>磷（P2O5%）</td>
            <td>钾（K2O）</td>
            <td>硫（S%）</td>
            <td>锌（ZN%）</td>
            <td>硼（B%）</td>
            <td>镁</td>
            <td>铜</td>
            <td>铁</td>
            <td>锰</td>
            <td>肥袋正面照片</td>
            <td>肥袋反面照片</td>
            <td>施肥量</td>
            <td>施肥类型</td>
            <td>操作</td>
          </tr>
          {
            this.state.tableData.map((t, i) =>  <tr key={i}>
              <td>
                <input type="text" required name='name' value={t.name} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='nitrogen' value={t.nitrogen} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='phosphorus' value={t.phosphorus} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='potassium' value={t.potassium} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='sulfur' value={t.sulfur} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='zinc' value={t.zinc} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='boron' value={t.boron} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='magnesium' value={t.magnesium} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='copper' value={t.copper} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='iron' value={t.iron} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <input type="text" name='manganese' value={t.manganese} onChange={this.inputChange.bind(this, i)}/>
              </td>
              <td>
                <Dropzone 
                  ref={(node) => this[`dropzoneRef${i}`] = node } 
                  onDrop={this.handleFrontDrop.bind(this, i)}
                  accept='image/*'
                  className='hiden'>
                  
                  <p>Drop files here.</p>
                </Dropzone>
                {(!this.state.frontFile[t.frontagePhoto] && !t.urlFront) ?<button type="button" onClick={() => { this[`dropzoneRef${i}`].open() }}>
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
                {(!this.state.backFile[t.backPhoto] && !t.urlBack) ? <button type="button" onClick={() => { this[`dropzoneRef2${i}`].open() }}>
                  +选择文件
                </button> : <div>
                  <label>
                    <a href={t.urlBack || this.state.backFile[t.backPhoto].preview} target='_blank'>反面图</a>
                  </label>
                  <button type='button' onClick={this.deleteBackFile.bind(this, i)}>删除</button>
                </div>}
              </td>
              <td>
                <input type="text" name='dosage' value={t.dosage} onChange={this.inputChange.bind(this, i)} />
              </td>
              <td>
                <Select
                  classNamePrefix='react-select'
                  placeholder=''
                  noResultsText='无'
                  onChange={this.typeChange.bind(this, i)}
                  value={t.type}
                  options={
                    // 底肥，种肥，追肥，叶喷，水肥一体
                    typeArr
                  }
                ></Select>
              </td>
              <td>
                <button type='button' className='button' onClick={this.removeSingFer.bind(this, i)}>删除</button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
      <button type='button' className='button' onClick={this.addSingFer}>+增加肥料</button>
    </div>
  }
}
AddSingFer.propTypes = {
  updateFertilizers: PropTypes.func,
  fertilizers: PropTypes.array,
  updateNo: PropTypes.func,
  update: PropTypes.bool
}
export default AddSingFer