import React, { useState } from 'react'// eslint-disable-line
import /* css */ './ProfileUpdate.css';

const ProfileUpdate = () => {

const [image,setimage] =useState(false);

  return (
    <div className="profile">
    <div className="profile-container">
    <form>
    <h3> Profile Details </h3>
    <label htmlFor='avatar'>
          <input onchange={(e)=>setimage(e.target.file[0])} type='file' id='avatar' accept='png, .jpeg, jpeg' hidden/>
          <img src={ image? URL.createObjectURL(image):assets.avatar_icon} alt='' />
          upload profile image 
    </label>
          <input type='text' placeholder='Your name ' required/>
          <textarea placeholder='Wirte profile bio' required/>
          <button type='submit'>save</button>
    </form>
    <img className='profile-pic'src ={image?URL.createObjectURL(image) :assets.logo_icon} alt='' />
    </div>
    </div>
    
    
  )
}

export default ProfileUpdate