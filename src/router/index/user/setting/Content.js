import React, { Component } from 'react'
import 'css/index/setting/setting.scss'
import classnames from 'classnames'
import BasicInfo from './BasicInfo'
import HeadPortrait from './HeadPortrait'
import Safe from './Safe'
import Custom from './Custom'

class Content extends Component {
  constructor() {
    super()
    this.state = {
      active: 1
    }
  }
    activeList = (key) => {
      if (key !== this.state.active) {
        this.setState({
          active: key
        })
      }
    }
    render() {
      const lists = [
        {
          id: 1,
          name: '基本信息'
        }, {
          id: 2,
          name: '头像'
        }, {
          id: 3,
          name: '安全设置'
        }, {
          id: 4,
          name: '个性设置'
        }
      ]
      return (
        <div className='setting'>
          <ul>
            {
              lists.map(list => 
                <li key={list.id} className={classnames({
                  active: this.state.active === list.id
                })} onClick={this.activeList.bind(this, list.id)}>{list.name}</li>)
            }
          </ul>
          <div className='content'>
            {
              this.state.active === 1 && <BasicInfo/>
            }
            {
              this.state.active === 2 && <HeadPortrait />
            }
            {
              this.state.active === 3 && <Safe />
            }
            {
              this.state.active === 4 && <Custom />
            }
                    
          </div>
        </div>
      )
    }
}

export default Content

