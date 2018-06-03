import React, { Component } from 'react'
import { Player, BigPlayButton } from 'video-react'
import video_bg from 'images/login/video_bg.png'
class Video extends Component {
    render() {
        return (
            // <video width="320" height="240" poster="/images/logo.png" controls>
            //     <source src="movie.mp4" type="video/mp4"/>
            //     <source src="movie.ogg" type="video/ogg"/>
            //             您的浏览器不支持 video 标签。
            // </video>
            <Player 
                fluid={false}
                width={833}
                preload='none'
                // height={496}
                poster={video_bg}>
               
                <source src="http://47.104.81.112:8080/video.mp4" />
                <BigPlayButton position="center" />
            </Player>
        )
    }
}

export default Video