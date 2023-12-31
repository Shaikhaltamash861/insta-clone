import React, { useState } from 'react'
import logo from '../../../assests/images/logos/instagram_logo.svg.png'
import './side.css'
import profile from '../../../assests/images/hero.png'
import OtherHousesSharpIcon from '@mui/icons-material/OtherHousesSharp';
import instalogo from '../../../assests/images/logos/intalogo.png'
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ExploreSharpIcon from '@mui/icons-material/ExploreSharp';
import MovieSharpIcon from '@mui/icons-material/MovieSharp';
import MarkunreadSharpIcon from '@mui/icons-material/MarkunreadSharp';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogout } from '../../../reducers/userReducers';
import ConfirmNotification from '../../Notification';
import { useEffect } from 'react';
import SearchBar from '../search/SearchBar';
import Banner from '../../User/dropDown/Banner';
function Sidebar({reduce}) {
  const navigate=useNavigate();
  const dispatch=useDispatch()
 const location=useLocation()

  const [searchInput,setSearchInput]=useState(false)
  const [open,setOpen]=useState(false)
  const [layout,setLayout]=useState(true)
  const [openSetting,setOpenSetting]=useState(false)       
  const user=useSelector((state)=>state.user)
  const username=user.username
  const myImg=user.avatar;
  const handleScreen=()=>{

    console.log(window.innerWidth)
    if(window.innerWidth<780){
      setLayout(false)
    }
    else{
      setLayout(true)
    }
  }
  window.addEventListener('resize',handleScreen)

  const logOut=()=>{
    dispatch(setUserLogout())
  }
  useEffect(()=>{
    if(location.pathname==='/'){

      setLayout(true)
    }
           if(location.pathname===username){
            setLayout(true)
           }
  },[location])
  const handleSearch=()=>{
    setSearchInput(!searchInput)
    setLayout(!layout)
    
  }
  const navigator=(path)=>{
     if(path!==location.pathname){
  
      navigate(path)
     }
  }
  return (<div className={searchInput?'full':''}>
    <div className={layout?'sidebar':'tag'}  >
        <div className='logo' onClick={()=>navigate('/')}>
          {
            !layout?(
            <img src={instalogo} />
            
            ):(
              <img onClick={logOut} src={logo}/>
              )
            }
        </div>
        <ul className='list'>
            <li className='item' onClick={()=>navigator('/')}>
              <OtherHousesOutlinedIcon className='icon'/>
              <h3>Home</h3>
            </li>
            <li className='item' onClick={handleSearch}>
            <SearchSharpIcon className='icon'/>
             
               
              <h3>Search</h3>
            </li>
            <li className='item'>
            <ExploreSharpIcon className='icon'/>
            <h3>Explore</h3>
            </li>
            <li className='item'>
            <MovieSharpIcon className='icon'/>
            <h3>Reels</h3>
            </li>
            <li className='item' onClick={()=>navigator('/direct/inbox')}>
            <MarkunreadSharpIcon className='icon'/>
            <h3>Messages</h3>
            </li>
            <li className='item'>
            <FavoriteBorderOutlinedIcon className='icon'/>
            <h3>Notifications</h3>
            </li>
            <li className='item'>
            <AddBoxOutlinedIcon className='icon'/>
            <h3 onClick={()=>setOpen(!open)}>Create</h3>
            </li>
            <li className='item' onClick={()=>navigator('/profile')}>
                <img src={myImg} alt='profile'/>
            <h3>Profile</h3>
            </li>
          
        </ul>
        < ConfirmNotification open={open} setOpen={setOpen}/>
         
        <div className='menu' onClick={()=>setOpenSetting(!openSetting)} >
          {/* <p>LogOut</p> */}
          <MenuIcon className='m'/> <h3>More</h3>
          {/* {
            openSetting?(

              <Banner/>
            ):(<></>)
          } */}
        </div>
        </div>
        {
          searchInput?(
            <SearchBar/>
            ):(<></>)
          }
          </div>
  )
}

export default Sidebar