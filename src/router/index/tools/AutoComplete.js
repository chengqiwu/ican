import React, {Component} from 'react'
import { Base64 } from 'js-base64'
import ol from 'openlayers'
import PropTypes from 'prop-types'
import search from 'images/tools/search.png'
import pointer from 'images/index/pointer.png'
class AutoComplete extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
      items: [],
      showItem: false
    }
  }
    handleEsc = (e) => {
      switch (event.keyCode) {
      case 27:
        this.hidenItems()
      }
    }
    handleClick = (e) => {
      console.log()
      if (e.target.id !== 'serachInput') {
        this.hidenItems()
      }
    }
    componentDidMount() {
      document.addEventListener('keydown', this.handleEsc)
      document.addEventListener('click', this.handleClick)
      const { map } = this.props.map
      this.sourceVector = new ol.source.Vector({})
      const vectorLayer = new ol.layer.Vector({
        source: this.sourceVector,
        zIndex: 9,
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: pointer
          })
        })
      })
      vectorLayer.set('id', 'no')
      map.addLayer(vectorLayer)
    }
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleEsc)
      document.removeEventListener('click', this.handleClick)
    }
    changeValue= (e) => {
      const {value} = e.target
      let items = JSON.parse(localStorage.getItem('hisory'))
      if (!items) {
        items = []
      }
      this.setState({
        inputValue: value,
        items: items.filter(item => Base64.decode(item).indexOf(value) > -1).map(e => Base64.decode(e))
      })
        
    }
    parseLonLat = (value) => {
      var reg_lngLat = /^[\-\+]?(((\d|([1-9]\d)|(1[0-7]\d))(\.\d*)?)|(180))[, ，]\s*[\-\+]?(((\d|([1-8]\d))(\.\d*)?)|(90))$/
      var reg_latLng = /^[\-\+]?(((\d|([1-8]\d))(\.\d*)?)|(90))[, ，]\s*[\-\+]?(((\d|([1-9]\d)|(1[0-7]\d))(\.\d*)?)|(180))$/

      
      if (value.match(reg_latLng)) {
        value = value.replace(/\s+/g, ' ')
        let result = value.split(' ')
        if (result.length === 2) {
          return ([
            Number.parseFloat(result[1]),
            Number.parseFloat(result[0])
          ])
        } else {
          result = value.split(',')
          if (result.length == 2) {
            return ([
              Number.parseFloat(result[1]),
              Number.parseFloat(result[0])
            ])
          } else {
            result = value.split('，')
            if (result.length == 2) {
              return ([
                Number.parseFloat(result[0]),
                Number.parseFloat(result[1])
              ])
            }
          }
        }

      }

      if (value.match(reg_lngLat)) {
        value = value.replace(/\s+/g, ' ')
        let result = value.split(' ')
        if (result.length === 2) {
          return ([
            Number.parseFloat(result[0]),
            Number.parseFloat(result[1])
          ])
        } else {
          result = value.split(',')
          if (result.length == 2) {
            return ([
              Number.parseFloat(result[0]),
              Number.parseFloat(result[1])
            ])
          } else {
            result = value.split('，')
            if (result.length == 2) {
              return ([
                Number.parseFloat(result[0]),
                Number.parseFloat(result[1])
              ])
            }
          }
        }

      }
      return []
    }
    transform = (coordinates) => {
      return ol.proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857')
    }
    searchValue = (value) => {
      const { map } = this.props.map
      const view = map.getView()
      let items = JSON.parse(localStorage.getItem('hisory'))
      this.sourceVector.clear()
      if (!items) {
        items = []
      }
      if (items.length >= 50) {
        items.splice(-50)
      }
      // ol.proj.fromLonLat([-0.12755, 51.507222])
      if (value.match(/[\u4E00-\u9FA5]+/g)) {
        console.log(value)
        var myGeo = new BMap.Geocoder()
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(value, (pos) => {
          if (pos) {
            console.log([pos.lng, pos.lat])
            this.props.flyTo(view, ol.proj.transform([pos.lng, pos.lat], 'EPSG:4326', 'EPSG:3857'), () => {

              this.sourceVector.addFeature(new ol.Feature({
                geometry: new ol.geom.Point(this.transform([pos.lng, pos.lat])),
              }))
            })

            if (items.indexOf(Base64.encode(value)) === -1) {
              items.push(Base64.encode(value))
              localStorage.setItem('hisory', JSON.stringify(items))
            }

          } else {
            alert('搜索失败，请重新输入')
          }
        })
      } else {
        const pos = this.parseLonLat(value)
        if (pos.length === 0) {
          alert('输入经纬度不正确，请重新输入经纬度或输入地名')

        } else {
          console.log(pos)
          this.props.flyTo(view, ol.proj.transform(pos, 'EPSG:4326', 'EPSG:3857'), () => { 
            this.sourceVector.addFeature(new ol.Feature({
              geometry: new ol.geom.Point(this.transform(pos)),
            }))
          })
          if (items.indexOf(Base64.encode(value)) === -1) {
            items.push(Base64.encode(value))
            localStorage.setItem('hisory', JSON.stringify(items))
          }
        }
      }

    }
    search = (e) => {
      e.preventDefault()

      const value = this.state.inputValue
      this.searchValue(value)

    }
    showItems = () => {
      console.log('fucous')
      const items = JSON.parse(localStorage.getItem('hisory'))
      if (items && !this.state.showItem && !this.state.inputValue) {
            
        this.setState({
          items: items.map(e => Base64.decode(e)),
          showItem: true
        })
      } else if (items && !this.state.showItem && this.state.inputValue) {
        this.setState({
          showItem: true
        })
      }
       
    } 
    hidenItems = () => {
      this.setState({
        showItem: false
      })
    }
    setInputValue = (item) => {
      console.log(item)
      this.setState({
        inputValue: item
      })
      this.hidenItems()
      this.searchValue(item)
    }
    render() {
      return (
        <form className='search' onSubmit={this.search} autoComplete='off'>
          <input id='serachInput' type="text" className='ppfix post' name='serachInput'
            onChange={this.changeValue}
            onFocus={this.showItems} 
            value={this.state.inputValue}
                    
            placeholder='纬度，经度或地名' />
          <button style={{ border: 'none' }}>
            <img src={search} alt="" className='btnHover' />
          </button>
          {this.state.showItem && this.state.items.length !== 0 ? <div className='complete'>
            <div>
              <ul>
                {
                  this.state.items.reverse().slice(-5).map((item, index) => {
                    return <li key={index} onClick={this.setInputValue.bind(this, item)}>{item}</li>
                  })
                }
              </ul>
            </div>
          </div> : null}
                
        </form>  
      )
    }
}
AutoComplete.propTypes = {
  map: PropTypes.object,
  flyTo: PropTypes.func
}
export default AutoComplete