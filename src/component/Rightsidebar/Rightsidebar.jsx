import React from "react";
import './Rightsidebar.css'

const Rightsidebar = ()=> {
    return (
 <div className="rs">
    <div className="rs-profile">
        <img src={assest.profile_img} alt='' />
        <h3>Richard Sanford <img src={assest.green_dot} className="dot" alt=''  /></h3>
        <p> Hey, There I am Sanford using Chat app</p>
    </div>
    <hr/>
    <div className="rs-media">
        <p>Media</p>
        <div>
            <img src={assest.pic1} alt="" />
            <img src={assest.pic2} alt="" />
            <img src={assest.pic3} alt="" />
            <img src={assest.pic4} alt="" />
            <img src={assest.pic2} alt="" />
            <img src={assest.pic3} alt="" />
            <img src={assest.pic1} alt="" />

        </div>
    </div>
    <button>Logout</button>
 </div>




    )
}

export default Rightsidebar