import React from "react";
import './Leftsidebar.css'
import assets from "../../assets/assets";

const Leftsidebar = ()=> {
    return (
<div className="ls">
<div className="is-top">
    <div className="ls-nav">
     <img src={assets.logo} className="logo" alt=""/>
     <div className="menu">
        <img src={assets.menu_icon} alt=""/>
        <div className="sub-men">
            <p>Edit Profile </p>
            <hr/>
            <p>Logout</p>
        </div>
     </div>
    </div>
    <div className="ls-search">
        <img src={assets.search_icon} alt="" />
        <input type="text" placeholder="Search here.." />
    </div>
</div>
<div className="ls-list">
    {Array(12).fill("").map((item, index)=>(
        <div key={index }className="friends">
        <img src={assets.profile_img} alt=''  />
    <div>
    <p>Richard Sanford</p>
    <span>Hello ,How are you </span>
    
    </div>
</div>
))}
    
</div>
</div>
    )
}

export default Leftsidebar