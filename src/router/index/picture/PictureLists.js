import React, { Component } from 'react'
import Scrollbar from 'smooth-scrollbar'
import baguetteBox from 'baguettebox.js'
import picture from 'images/circle/blue.png'
import more from 'images/index/picture/more.png'
class PictureLists extends Component {
    componentDidMount() {
        Scrollbar.init(this.pictureLists)
       
        baguetteBox.run('.gallery', {
            // Custom options
        })

    }
    render() {
        this.lists = [
            { id: 1, url: picture },
            { id: 2, url: picture },
            { id: 3, url: picture },
            { id: 4, url: picture },
            { id: 5, url: picture },
            { id: 6, url: picture },
            { id: 7, url: picture },
            { id: 8, url: picture },
            { id: 9, url: picture },
            { id: 10, url: picture },
            { id: 11, url: picture },
            { id: 12, url: picture },
            { id: 13, url: picture },
            { id: 14, url: picture },
            { id: 15, url: picture },
            { id: 16, url: picture },
            { id: 17, url: picture },
            { id: 18, url: picture },
            { id: 19, url: picture },
            { id: 20, url: picture },
            { id: 21, url: picture },
            { id: 22, url: picture },
            { id: 23, url: picture },
            { id: 24, url: picture },
            { id: 25, url: picture },
            { id: 26, url: picture },
            { id: 27, url: picture },
            { id: 28, url: picture },
            { id: 29, url: picture },
            { id: 30, url: picture },
            { id: 31, url: picture },
            { id: 32, url: picture },
        ]
        return (
            <div className='picture-list gallery' ref={pictureLists => this.pictureLists = pictureLists}>
                {
                    this.lists.map(list =>
                        <a href={list.url} data-caption={list.title} key={list.id} className='img-box'>
                            <img src={list.url} alt="" />
                        </a>
                    )
                }
                <div className='img-box more'>

                    <img src={more} alt="" id='more' /><label htmlFor="more">更多</label>
                </div>
            </div>
        )
    }
}
export default PictureLists