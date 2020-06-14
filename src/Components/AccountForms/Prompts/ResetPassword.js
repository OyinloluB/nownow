import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Modal, Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";

import UserSignInfo from "../User/UserInfo"
import UserInfo from "../User/UserInfo";

import axios from "../../../helpers/axios-client";

const ResetPassword = ({ userID, setResetPassword , type}) => {
  const [pwd, setPwd] = useState({});
  const [notice, setNotice] = useState('');

  const handleSetPassword = () => {
    if(pwd.password===pwd.cpassword){
        if(pwd.password==='DDLCPD'){
            setNotice('Please use a non-default password!')
        } 

        else {
            let password = pwd.password;
            if(type==="distributor"){
              axios.patch(`/Distributor/changepassword/${userID}`, { password: password}).then(list=>{
                window.location.reload(false);
              })
            }
          
            else if(type==="bulkbreaker"){console.log({userID});
                axios.patch(`/BulkBreaker/changepassword/${userID}`, { password: password }).then(list=>{
                    window.location.reload(false); 
                    console.log(list)
                })
            }
            else if(type==="poc"){
                axios.patch(`/Poc/changepassword/${userID}`, { password: password }).then(list=>{
                  console.log(list)
                    window.location.reload(false);
                }).catch(error=>console.log(error))
            }
        }
    }
    else{
        setNotice('Confirm Password is not the same as your Password!')
    }
  }

    const handleChange = (e) => {
        setPwd({ ...pwd, [e.target.name]: e.target.value });
      };

    return(
        <div>
        <div style={{color: '#b11917', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid grey'}} >Set your Password</div>
        <div className={'text-danger font-weight-bold'} style={{fontSize: '13px'}}>{notice}</div>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className={'mt-3 font-weight-bold'}>Choose a Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter New Password"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className={'mt-3 font-weight-bold'}>Confirm Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              name="cpassword"
              placeholder="Confirm New Password"
            />
          </Form.Group>

          <Button
            // type="submit"
            style={{
              backgroundColor: "#b11917",
              border: "none",
              width: "100%",
              margin: "10px 0 10px 0",
            }}
            onClick={handleSetPassword}
          >
            Set Password
          </Button>
          </div>
    )

}


export default ResetPassword;

