import React, { Component } from 'react'
import { Player, BigPlayButton } from 'video-react'
import RxDragDrop from './RxDragDrop'
import video_bg from 'images/login/video_bg.jpg'
import video from 'images/login/video.png'
import videoBtn from 'images/login/videoBtn.png'
import Rx from 'rxjs/Rx'
import { videoUrl } from '../../url'

class Video extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  componentDidMount() {
    console.log(this.player)
    // if (this.player) {
    // const { player } = this.player.getState()
    // console.log(this.player)
    // this.ticksObservable = Rx.Observable.interval(1000).subscribe(() => {
    //     if (player.ended) {
    //         this.destory()
    //     }
    // })
    //}
      
  }
  componentDidUpdate() {
    // if (this.player) {
        
    this.ticksObservable = Rx.Observable.interval(1000).subscribe(() => {
      if (!this.player) {
        this.ticksObservable.unsubscribe()
        return
      }
      const { player } = this.player.getState()
      if (player.ended) {
        this.ticksObservable.unsubscribe()
        this.destory()
                
      }
    })
    // }
  }
    destory = () => {
      this.setState({
        show: false
      })
    }
    show = () => {
      if (this.state.show) {
        return
      }
      this.setState({
        show: true
      })
    }
    render() {
      return (
      // <video width="320" height="240" poster="/images/logo.png" controls>
      //     <source src="movie.mp4" type="video/mp4"/>
      //     <source src="movie.ogg" type="video/ogg"/>
      //             您的浏览器不支持 video 标签。
      // </video>
        <div>
          <div className='video_group'>
            <img src={video} alt="" />
            <img src={videoBtn} alt="" className='video' onClick={this.show}/>
          </div>
               
          {this.state.show ? <RxDragDrop title={'了解精禾'} destory={this.destory}>                
            <Player ref={player => this.player = player}
              fluid={false}
              width={853}
              preload='none'
              // height={496}
                        
              poster={video_bg}>
                       
              <source src={videoUrl} />
              <BigPlayButton position="center" />
            </Player>
          </RxDragDrop> : null}
        </div>
           
      )
    }
}

export default Video