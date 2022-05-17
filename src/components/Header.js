import React, { Component } from 'react'
import picture from '../static/pic.jpeg'

export class Header extends Component {
  render() {
    return (
        <div style={{ backgroundImage: `url(${picture})`, height:'300px',width:'100%'  }}>
   
     </div>
    )
  }
}

export default Header

 // //   <div >
    //       <img style='height:400px; width:100%' src={picture}/>