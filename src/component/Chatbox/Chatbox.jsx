import React from 'react'

import './Chatbox.css'
import assets from '../../assets/assets'
const Chatbox = () => {
return (
    <div className='chat-box'>
        <div className="chat-user">
            <img src ={assets.profile_img} alt='' />
            <p>Richard Sanford<img className='dot' src ={assets.green_dot} alt="" /></p>
            <img src={assets.help_icon} alt="" />
        </div>

<div className="chat-msg">
    <div className="s-msg">
        <p className='msg'> Lorem ipsum is placeholder text commenly use in ............. </p>
        <div>
            <img src={assets.profile_img} alt='' />
            <p>4:30pm</p>
        </div>
</div>
        <div className="s-msg">
        <img  className='msg-img'src={assets.pic1} alt='' />
        <div>
            <img src={assets.profile_img} alt='' />
            <p>4:30pm</p>
        </div>

    </div>
    <div className="s-msg">
        <p className='msg'> Lorem ipsum is placeholder text commenly use in ............. </p>
        <div>
            <img src={assets.profile_img} alt='' />
            <p>4:30pm</p>
        </div>
    </div>
</div>








<div className="chat-input">
    <input type='text'placeholder='Send a massage ' />
    <input type='file' id='image' accept='image/png , image/jpeg' hidden />
    <label htmlFor='image'>
        <img src={assets.gallery_icon} alt='' />
    </label>
    <img src={assets.send_button} alt='' />
</div>
    </div>
)

}
export default Chatbox