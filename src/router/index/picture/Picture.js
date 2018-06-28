import React, { Component } from 'react'
import 'css/index/picture/picture.scss'
import baguetteBox from 'baguettebox.js'

import more from 'images/index/picture/more.png'
import picture from 'images/circle/blue.png'

class Picture extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
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
            { id: 14, url: picture }
        ]
        return (<div className='pictures gallery'>
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
        </div>)
    }
}

export default Picture