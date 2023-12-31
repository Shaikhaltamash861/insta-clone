import React, { useState } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
  } from "@mui/material";
  import ClearIcon from '@mui/icons-material/Clear';
  import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
  import '../notify.css'
import { FontWeight, TextAlignment } from '@cloudinary/url-gen/qualifiers';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUpdateImage } from '../../reducers/userReducers';
function EditPopUp({open,setOpen}) {
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.user)
    const userId=user.id;
    const userImg=user.avatar;
    
    const [porfileImage,setProfileImage]=useState()
    const handleChange=(e)=>{
          setProfileImage(e.target.files[0])
          const reader = new FileReader();
          reader.onload = (env) => {
                 setProfileImage(env.target.result)
      
          };
      
          reader.readAsDataURL(e.target.files[0]);
    }
    const upload=async(e)=>{

        const formData=new FormData();
        
        formData.append('file',porfileImage)
    
        formData.append('upload_preset','insta_clone')
        formData.append('cloud-name','dwtnjp4gb')
        
        const uri= 'https://api.cloudinary.com/v1_1/cloud2shaikh/image/upload';
        const {data}=await axios.post(uri,formData)
        if(data.url){
       
            const response=await axios.post('http://localhost:8000/api/change/profile',{
                id:userId,
                image:data.url
    
            })
            
            if(response.status){

                setOpen(!open)
                toast('changed successfully')
                dispatch(setUpdateImage({
                    avatar:data.url
                }))
                setProfileImage('')
            }
            else{
                setOpen(!open)
                toast.error(response.message)
            }
          }
          else{
            setOpen(!open)
            toast.error('Cloudinary Error')
          }
       
      
        
    }
    const handler=()=>{
        setOpen(!open)
        setProfileImage('')
    }
  return (
    <div>
  <Dialog open={open}>
  <div className={'dialog'} style={{
            width:'400px',
            height:'500px'
           }}>
  <div className="title" style={{
      display:'flex',
      justifyContent:'end',
      paddingRight:'10px'
             }}
             >
              <p onClick={handler}  >
                <ClearIcon />
              </p>
               </div>
               <div className="content">
        
              {
                porfileImage?(
                    <div style={{
                        display:'flex',
                        flexDirection:'column'
                    }}>

                        <img src={porfileImage} 
                        style={{
                            width:'200px',
                            height:'200px',
                            backgroundSize:'cover',
                            borderRadius:'50%'
                        }}
                        />
                        <button style={{
                            background:' rgb(33, 92, 221)',
                            height:'30px',
                            marginTop:'16px',
                            color:'white',
                            border:'none',
                            cursor:'pointer',
                            FontWeight:'600px'
                        }} onClick={upload}
                        >Upload</button>
                        </div>
                ):(
                    <>
                {
                    userImg?(
                        
                        <img src={userImg} 
                        style={{
                            width:'200px',
                            height:'200px',
                            backgroundSize:'cover',
                            borderRadius:'50%',
                            marginBottom:'13px'
                        }}
                        />
                    ):(<>
            <AccountCircleSharpIcon className="gall" style={{
                width:'100px',
                fontSize:'100px',
                paddingBottom:'20px'
            }}/>
            </>)
        }
           <input type="file" n name="file" id="file" class="inputfile"
           accept="image/*"
           onChange={handleChange}
            />
            {
                userImg?(

                    <label style={{
                        width:'150px',
                        height:'30px',
                        textAlign:'center',
                        fontSize:'17px',
                        fontWeight:'500'
    
                    }} for='file'>Change</label>
                ):(
                    <label for='file'>Select from computer</label>  
                )
            }
            
           </>
       )
     }
           </div>
                 </div>
  </Dialog>
    </div>
  )
}

export default EditPopUp