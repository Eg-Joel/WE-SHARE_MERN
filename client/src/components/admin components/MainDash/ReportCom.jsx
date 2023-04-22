import React from 'react'
import './MainDash.css'
import  { useEffect, useState } from "react";
import axios from "../../../utils/axios"
import { useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import Swal from 'sweetalert2'
import "./datatable.css"

function ReportCom() {

  const adminDetails = useSelector((state)=>state.admin)
  const token= adminDetails.admin.accessToken
  const config = {
        headers: { token: ` ${token}` }
    }
    const [status, setStatus] = useState('')
    const [err, setErr] = useState(false);
    const [data, setData] = useState(false);
    const userColumns = [ { field: "_id", headerName: "ID", width: 220 }, 
   {
    field: "name",
    headerName: "Reported by",
    width: 150,
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 105,
  },
  {
    field: "createdAt",
    headerName: "Reported on",
    width: 115,
  },
  {
    field: "type",
    headerName: "Type",
    width: 105,
  }
  ,
  ]



  useEffect(()=>{

    const getReports = async () => {
        try {
            
            const response =await axios.get(`post/reports/1`,config)
          //  console.log(response);
            const res=response.data
            
            setData(res)
            // setPageCount(res.pageCount)
        } catch (error) {
          localStorage.removeItem("user");
          setErr(err.response.data)
          }
        };
        getReports()
    },[status])

    function handleDelete(item,postId,email,type){
      if (type=="post") {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`post/${postId}/rejectReport?id=${item}&name=${email}`,config).then((response) => {
               console.log(response,"op");
                if (response.data) {
                    console.log(response,"pp");
                    setStatus(new Date())
                } else {
                    setErr('Something went wrong')

                }
            }).catch((err) => {
              localStorage.removeItem("user");
                setErr(err.response.data)
          
            })
          }
        })
      }else{
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, block'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`user/${postId}/rejectReport?id=${item}&name=${email}`,config).then((response) => {
              //  console.log(response);
                if (response.data) {
                    // console.log(response);
                    setStatus(new Date())
                } else {
                    setErr('Something went wrong')
                }
            }).catch((err) => {
              localStorage.removeItem("user");
                setErr(err.response.data)
          
            })
          }
        })
      }
      
      
    }
    function handleReject(item,postId,email,type){
     
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject it!'
      }).then((result) => {
        if (result.isConfirmed) {
          if (type=="post") {
            axios.delete(`post//${postId}/report?id=${item}&name=${email}`,config).then((response) => {
              //  console.log(response);
                if (response.data) {
                    // console.log(response);
                    setStatus(new Date())
                } else {
                    setErr('Something went wrong')
                }
            }).catch((err) => {
              localStorage.removeItem("user");
                setErr(err.response.data)
          
            })
          }else{ 
            console.log("not posts",type);
            axios.delete(`user//${postId}/report?id=${item}&name=${email}`,config).then((response) => {
              //  console.log(response);
                if (response.data) {
                    // console.log(response);
                    setStatus(new Date())
                } else {
                    setErr('Something went wrong')
                }
            }).catch((err) => {
              localStorage.removeItem("user");
                setErr(err.response.data)
          
            })
          }
          
        }
      })
      
    }
      const actionColumn = [
        {
          field: "image",
          headerName: "Image",
          width: 130,
       
          renderCell: (params) => {
    
            // console.log(params,"params apps");
            return (
             <img className="image" src={params.row.post} style={{width: "100%", height: "100%", objectFit: "cover"}}  alt="no image" />
            );
          },
        }
        ,
        {
          field: "action",
          headerName: "Action",
          width: 250,
          renderCell: (params) => {
            // console.log(params,"params apps");
            return (
             
              <div className="cellAction">
              
                <div className="deleteButton" onClick={()=>{handleDelete(params.id,params.row.postId,params.row.userId,params.row.type)}}>{params.row.type=="post"?"Delete post":"Block user"}</div>
                <div className="deleteButton" onClick={()=>{handleReject(params.id,params.row.postId,params.row.userId,params.row.type)}} style={{color:"orange"}}>Reject report</div>
                
              </div>
            );
          },
        }
      ];
  
  return (
    <div className='MainDash'>
      <div className="datatable">
       {err && <div className="p-4 mb-4 text-center text-sm text-danger bg-danger bg-gradient rounded-lg shadow-lg" role="alert" 
       onClick={()=>{window.location.replace('/login')}} style={{cursor:"pointer"}}> {err} click here to re-login</div>}
      <div className="datatableTitle">
    Reports
        
      </div>
      {data&&<DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId ={(row) => row._id}
        rowHeight={65}
      />}
      
    </div>
    </div>
  )
}

export default ReportCom