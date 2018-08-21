import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { soilLandSave, deleteSoilLand, deleteSoilLandFile } from 'utils/Api'
import Dropzone from 'react-dropzone'
class AddSoil extends Component {
  constructor() {
    super()
    this.state = {
      res: {},
      id: '',
      landId: '',
      soilType: '',
      ph: '',
      organicMatter: '',
      pics: [],
      urlPics: [],
      files: [],
      urlFiles: [],
      edit: true,
      collapsed: false,
      saving: false
    }
  }
  componentDidMount() {
    const { soilLand, soilType, collapsed } = this.props
    if (soilLand && soilLand.id.toString().length ===32) {
      const {
        id,
        landId,
        soilId = '',
        ph = '',
        organicMatter = '',
        profilePaths = [],
        detectionReports = []
      } = soilLand
      this.setState({
        res: soilLand,
        id,
        landId,
        soilType: soilType.filter(t => t.value === soilId)[0],
        ph: ph,
        organicMatter: organicMatter,
        urlPics: profilePaths,
        urlFiles: detectionReports,
        edit: false,
        collapsed: !!collapsed 
      })
    } else if (soilLand && soilLand.id.toString().length === 13) {
      this.setState({
        id: soilLand.id,
        collapsed: !!collapsed 
      })
    }
  }
  soilChange = (value) => {
    this.setState({
      soilType: value
    })
  }
  submitHandler = (e) => {
    e.preventDefault()
    if (!this.state.soilType) {
      alert('土壤类型必须选择')
      return
    }
    const soilLandInfo = {}
    if (this.state.id.toString().length === 32) {
      soilLandInfo.id = this.state.id
    }
    const { feature: { feature } } = this.props
    soilLandInfo.landId = feature.getId().replace(/tb_farmland./g, '')
    !!this.state.soilType && (soilLandInfo.soilId = this.state.soilType.value)
    !!this.state.ph && (soilLandInfo.ph = this.state.ph)
    !!this.state.organicMatter && (soilLandInfo.organicMatter = this.state.organicMatter)

    const fd = new FormData()
    fd.append('soilLandInfo', decodeURI(JSON.stringify(soilLandInfo)))
    this.state.pics.map(file => {
      fd.append('planeSurfaceFigure',file)
    })
    this.state.files.map(file => {
      fd.append('detectionReport', file)
    })
    this.setState({
      saving: true
    })
    soilLandSave(fd)
      .then(e => e.data)
      .then(data => {
        if(data.msg === '200') {
          const {
            id,
            landId,
            soilId = '',
            ph = '',
            organicMatter = '',
            profilePaths= [],
            detectionReports = []
          } = data.result
          this.setState({
            res: data.result,
            id,
            landId,
            soilType: this.props.soilType.filter(soil => soil.value === soilId)[0],
            ph,
            organicMatter,
            pics: [],
            // urlPics: [],
            files: [],
            urlPics: profilePaths,
            urlFiles: detectionReports,
            edit: false,
            saving: false
          })
        }
      }).catch(e=> {
        this.setState({
          saving: false
        })
      })
  }
  inputChange = (e) => {
    const {value, name} = e.target
    this.setState({
      [name]: value
    })
  }
  handlePicDrop = (acceptFiles, rejectFiles) => {
    if (acceptFiles.length > 3) {
      alert('只允许上传三张图片')
      return
    }
    for (let file of this.state.pics) {
      if (acceptFiles[0].name === file.name) {
        alert('上传的文件重复文件名')
        return
      }
    }
    this.setState({
      pics: [
        ...this.state.pics,
        ...acceptFiles
      ]
    })
  }
  handleFileDrop = (acceptFiles, rejectFiles) => {
    if (acceptFiles.length > 3) {
      alert('只允许上传三张图片')
      return
    }
    this.setState({
      files: [
        ...this.state.files,
        ...acceptFiles
      ]
    })
  } 
  activeEdit = (e) => {
    this.setState({
      edit: true
    })
  }
  collapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  deleteSoilLandById = (id) => {
    if (id.toString().length === 32) {
      const fd = new FormData()
      fd.append('id', id)
      deleteSoilLand(fd)
        .then(e => e.data)
        .then(data => {
          if (data.msg === '200') {
            this.props.updateSoilLands(
              this.props.soilLands.filter(soilLand => soilLand.id !== id)
            )
          }
        })
    } else if (id.toString().length === 13) {
      this.props.updateSoilLands(
        this.props.soilLands.filter(soilLand => soilLand.id !== id)
      )
    }
  }
  noSave = () => {
    const {
      id,
      landId,
      soilId = '',
      ph = '',
      organicMatter = '',
      profilePaths = [],
      detectionReports = []
    } = this.state.res
    this.setState({
      id,
      landId,
      soilType: this.props.soilType.filter(soil => soil.value === soilId)[0],
      ph,
      organicMatter,
      pics: [],
      files: [],
      urlPics: profilePaths,
      urlFiles: detectionReports,
      edit: false
    })
  }
  deleteLocal = (type, e) => {
    const { id } = e.target
    const files = this.state[type]
    this.setState({
      [type]: files.filter(file => file.name !== id)
    })
  }
  deleteUrl = (type, e) => {
    const { id } = e.target
    const atype = e.target.getAttribute('atype')
    const fd = new FormData()
    fd.append('id', this.state.id)
    fd.append('fileName', id)
    fd.append('type', atype)
    deleteSoilLandFile(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg=== '200') {
          const files = this.state[type]
          console.log(files, id)
          this.setState({
            [type]: files.filter(file => file.key !== id),
            res: {
              ...this.state.res,
              profilePaths: this.state.res.profilePaths.filter(path => path.key !== id)
            }
          })
        }
      })
    
  }
  render() {
    return <div className='add-soil'>
      <div
        className={
          classnames({
            collapse: true,
            borderRadius: this.state.collapsed
          })
        }
        onClick={this.collapsed}>{!this.state.collapsed ? '展开列表' : '折叠列表'}</div>
      <form onSubmit={this.submitHandler} className={
        classnames({
          panelBody: true,
          hide: !this.state.collapsed
        })
      }>
        <div className='items'>
          <div className='flex-left-right'>
            <div className='item'>
              <label>土壤类型</label>
              <Select
                classNamePrefix='react-select'
                placeholder=''
                isDisabled={!this.state.edit}
                noResultsText='无'
                onChange={this.soilChange}
                value={this.state.soilType}
                noOptionsMessage={() => {return '无选项'}}
                options={
                  this.props.soilType
                }>
              </Select>  
            </div>
            <div className='item'>
              <label>酸碱度</label>
              <input type="text" value={this.state.ph} disabled={!this.state.edit} onChange={this.inputChange} name='ph'/>
            </div>
          </div>
          <div className='item'>
            <label>有机质范围</label>
            <input type="text" value={this.state.organicMatter} disabled={!this.state.edit} onChange={this.inputChange} name='organicMatter'/>
          </div>
        </div>
        <div className='item'>
          <label>1米刨面图</label>
          <Dropzone 
            ref={(node) => this.dropzoneRef = node } 
            onDrop={this.handlePicDrop}
            accept='image/*'
            className='hiden'>
            <p>Drop files here.</p>
          </Dropzone>
          {(this.state.pics.length + this.state.urlPics.length < 3) ? 
            <div>
              <button type="button" onClick={() => { this.dropzoneRef.open() }}  disabled={!this.state.edit}>
                +选择文件
              </button>
              <span>（允许上传三张图片）</span>  
            </div>
            : <span>（已达图片数量上限）</span>  }
         
        </div>
        <div className='files-list'>
          <ul>
            {this.state.pics.map((f) => <li key={f.name}>
              <span><a href={f.preview} target='_blank'>{f.name}</a>
              </span>
              {this.state.edit && <button type='button' className='button delete' id={f.name} onClick={this.deleteLocal.bind(this, 'pics')}>删除图片</button>}
            </li>)}
          </ul>
          <ul>
            {this.state.urlPics.map((f) => <li key={f.key}>
              <span><a href={f.value} target='_blank'>{f.key}</a></span>
              {this.state.edit && <button type='button' className='button delete' atype='0' id={f.key} onClick={this.deleteUrl.bind(this, 'urlPics')}>删除图片</button>}
            </li>)}
          </ul>
        </div>
        <div className='item'>
          <label>测土报告</label>
          <Dropzone
            ref={(node) => this.dropzoneRef2 = node}
            onDrop={this.handleFileDrop}
            className='hiden'>
            <p>Drop files here.</p>
          </Dropzone>
          {(this.state.files.length + this.state.urlFiles.length < 3) ? 
            <div>
              <button type="button" onClick={() => { this.dropzoneRef2.open() }}  disabled={!this.state.edit}>
                +选择文件
              </button>
              <span>（允许上传三个文件）</span>
            </div>
            : <span>（已达图片数量上限）</span>  }
         
        </div>
        <div className='files-list'>
          <ul>
            {this.state.files.map((f) => <li key={f.name}>
              <span><a href={f.preview} target='_blank'>{f.name}</a></span>
              {this.state.edit && <button type='button' className='button delete' id={f.name} onClick={this.deleteLocal.bind(this, 'files')}>删除图片</button>}
            </li>)}
          </ul>
          <ul>
            {this.state.urlFiles.map((f) => <li key={f.key}>
              <span><a href={f.value} target='_blank'>{f.key}</a></span>
              {this.state.edit && <button type='button' className='button delete' atype='1' id={f.key} onClick={this.deleteUrl.bind(this, 'urlFiles')}>删除图片</button>}
            </li>)}
          </ul>
        </div>
        {this.state.id.toString().length === 13 && <div className='action'>
          <input className='button save' type="submit" value={this.state.saving ? '保存中':'保存'} disabled={this.state.saving}/>
          <button type='button' className='button delete' disabled={this.state.saving} onClick={this.deleteSoilLandById.bind(this, this.props.soilLand.id)}>删除</button>
        </div> }
        {this.state.id.toString().length === 32 
          && !this.state.edit 
          && <div className='action'>
            <button type='button' className='button edit' onClick={this.activeEdit}>编辑</button>
            <button type='button' className='button delete' onClick={this.deleteSoilLandById.bind(this, this.props.soilLand.id)}>删除</button>
          </div>}
        {this.state.id.toString().length === 32 
          && this.state.edit 
          && <div className='action'>
            <input className='button save' type="submit" value={this.state.saving ? '保存中':'保存'} disabled={this.state.saving}/>
            <button type='button' className='button no-save' onClick={this.noSave} disabled={this.state.saving}>放弃</button>
          </div>}
      </form>
    </div>
  }
}
AddSoil.propTypes = {
  soilType: PropTypes.array,
  feature: PropTypes.object,
  soilLand: PropTypes.object,
  collapsed: PropTypes.bool,
  soilLands: PropTypes.array,
  updateSoilLands: PropTypes.func
}
const mapStateToProps = (state) => {
  return {
    feature: state.feature
  }
}

export default connect(mapStateToProps)(AddSoil)