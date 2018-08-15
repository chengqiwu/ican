import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { farmLandSave, findSeasonLists } from '../utils/Api.js'
import ol from 'openlayers'
import { connect } from 'react-redux'
import 'css/index/common/createFiled.scss'
import 'css/map/popup1.scss'
import Select from 'react-select'
import { setFeature } from '_redux/actions/feature'
class CreateField extends Component {
  constructor() {
    super()
    this.state = {
      position: undefined,
      status: '0',
      seasons: [],
      season: '',
      saving: false
    }
    this.submitHandle = this.submitHandle.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.closeClick = this.closeClick.bind(this)
  }
  componentDidMount() {
    this.overlay = new ol.Overlay({
      element: this.popup,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      },
      stopEvent: true
    })
    this.props.map.map.addOverlay(this.overlay)
    this.load()
    this.closer.onclick = this.closeClick
    this.clear.onclick = this.clearHandler.bind(this)
        
        

    var geoc = new BMap.Geocoder()

    var pt = ol.proj.transform(this.props.coord, 'EPSG:3857', 'EPSG:4326')

    geoc.getLocation(new BMap.Point(...pt), (rs) => {
      const { province = '', city = '', distract ='' } = rs.addressComponents
      this.position.value = `${province} ${city} ${distract}`
    })
    findSeasonLists()
      .then(e => e.data)
      .then(data => {
        if(data.msg === '200') {
          const seasons = data.result.map(r => ({
            value: r.id,
            label: r.name
          }))
          this.setState({
            seasons,
            season: seasons[seasons.length-1].value
          })
        }
      }) 
  }
  clearHandler(e) {
    e.preventDefault()
    this.props.setDefault()
    this.props.sourceClear()
  }
  componentDidUpdate() {
    this.load()
    var geoc = new BMap.Geocoder()
    if (this.props.coord) {
      var pt = ol.proj.transform(this.props.coord, 'EPSG:3857', 'EPSG:4326')

      geoc.getLocation(new BMap.Point(...pt), (rs) => {
        const { province = '', city = '', distract = '' } = rs.addressComponents
        this.position.value = `${province} ${city} ${distract}`
      })
    }
       
  }
  componentWillUnmount() {
    this.overlay = null
  }
  load() {
    const { coord } = this.props
    this.overlay.setPosition(coord)
  }
  closeClick(e) {
    e.preventDefault()
    this.overlay.setPosition(undefined)
    this.closer.blur()
    this.props.setInitial()
  }
  changeInput(e) {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }
  submitHandle(e) {
    e.preventDefault()
    if (!this.input.value.trim()) {
      alert('地的名称不为空')
      return
    }
    const id = this.props.feature.feature.get('id')
    // 圈地
    const geojson = new ol.format.GeoJSON()
    const farmLandInfo = {
      name: this.input.value,
      geom: geojson.writeGeometry(this.props.feature.feature.getGeometry(), {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      }),
      address: this.position.value,
      season: this.state.season,
      status: this.state.status
    }
    this.setState({
      saving: true,
    })
    const fd = new FormData()
    fd.append('farmLandInfo', JSON.stringify(farmLandInfo))
    // {
    //   farmLandInfo: JSON.stringify(farmLandInfo)
    // }
    farmLandSave(fd).then(res => res.data).then(data => {
      if (data.msg === '200') {
        this.props.feature.feature.set('address', this.position.value)
        this.props.feature.feature.set('area', this.props.area)
        this.props.feature.feature.set('name', this.input.value)
        this.props.feature.feature.set('status', '1')
        this.props.feature.feature.set('growth_status', this.state.status)
        this.props.feature.feature.set('season_id', this.state.season)
        this.props.feature.feature.setId(data.result)
        this.props.setFeature({
          address: this.position.value,
          name: this.input.value,
          id: data.result,
          growthStatus: this.state.status
                    
        }) 
        this.props.setDefault()
        this.props.drawText()
        this.input.value = ''
       
                
      } else if (data.msg === '209') {
        this.input.value = ''
        this.props.setDefault()  
        alert(data.result+ ' ，请重绘。。。')
      }
      this.setState({
        saving: false
      })
    }).catch(err=> {
      this.setState({
        saving: false
      })
    })
    

  }
  seasonChange = (e) => {
    this.setState({
      season: e.target.value
    })
  }
  statusChange = (e) => {
    this.setState({
      status: e.target.value
    })
  }
  render() {
    const area = this.props.area 
    return (
      <div ref={popup => this.popup = popup} className="ol-popup">
        <a href="#" id='close' className="ol-popup-closer"
          ref={closer => this.closer = closer}></a>
        <div className="popup-content">
          <form onSubmit={this.submitHandle}>
            <input required type="text" className='ppfix post email' name='name' ref={input => this.input = input} />
            <div>
              <label>位置：</label><input type="text" style={{ border: 'none', background: 'none' }} disabled ref={position => this.position = position} />
            </div>
            <div>面积：{area.acre} 亩 / {area.hectare} 公顷</div>
            <div className='season-status'>
              <div>
                <label>种植季节：</label>
                <select value={this.state.season} onChange={this.seasonChange}>
                  {
                    // 0:闲置;1:优;2:中;3:差
                    this.state.seasons.map(season => <option key={season.value} value={season.value}>{season.label}</option>)
                  }
                </select> 
              </div>
              <div>
                <label>状态：</label>
                <select value={this.state.status} onChange={this.statusChange}>
                  {
                    // 0:闲置;1:优;2:中;3:差
                    [{
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
                    }].map(status => <option key={status.value} value={status.value}>{status.label}</option>)
                  }
                </select>
              </div>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button className='button blue' disabled={this.state.saving}>{!this.state.saving ? '保存' : '保存中'}</button>                   
              {!this.state.saving && <button type='button' className='button blue' ref={clear => this.clear = clear} >清除</button>}
            </div>
          </form>
        </div>
      </div>
            
    )
  }
  
}

CreateField.propTypes = {
  area: PropTypes.object,
  setFeature: PropTypes.func,
  geom: PropTypes.string,
  map: PropTypes.object,
  coord: PropTypes.array,
  drawText: PropTypes.func,
  feature: PropTypes.object,
  setDefault: PropTypes.func,
  setInitial: PropTypes.func,
  sourceClear: PropTypes.func
}
const mapStateToProps = (state) => {
  return {
    map: state.map,
    feature: state.feature
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    setFeature: (feature) => {
      dispatch(setFeature(feature))
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(CreateField)