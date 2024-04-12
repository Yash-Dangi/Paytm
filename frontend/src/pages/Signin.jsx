import {Heading} from '../components/Heading'
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { FormButton } from '../components/FormButton';
import { BottomWarning } from '../components/BottomWarning';
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [WarningText , setWarningText] = useState("");
    const navigate = useNavigate();
    return (
        <div className = "h-screen flex justify-center items-center bg-slate-300">
        <div className='min-w-96 max-w-96 z-2 bg-white rounded-md'> 
            <Heading label = {"Sign In"} ></Heading>
            <SubHeading label = {"Enter your credentials to access your account"}></SubHeading>
            <InputBox label = {"Email"} placeholder={"harkirat@gmail.com"} inputType={"email"} onChange={(e) => {
                setUsername(e.target.value)
                if(WarningText != "")
                {
                     setWarningText("");
                }
            }}></InputBox>
            <InputBox onChange = {(e) => {
                setPassword(e.target.value)
                if(WarningText != "")
                {
                     setWarningText("");
                }
            }} label = {"Password"} placeholder={"123456"} inputType={"password"}></InputBox>
            <FormButton onClick = {() =>
                
                {
                    console.log(username);
                console.log(password);
                    axios.post('http://localhost:3000/api/v1/user/signin',{
                    username : username,
                    password : password
                }).then((response) => {
                     if(response.status == 411)
                     {
                          setWarningText("Invalid Credentials/ Please Try Again");
                          return;
                     }
                     localStorage.setItem('token' , response.data.token);
                     navigate('/dashboard');
                })}
            } label = {"Sign in"}></FormButton>
            <BottomWarning label = {"Don't have an account? "} linkText = {"Sign up"} fileName = {"/signup"}></BottomWarning>
            <div className='mt-2 text-red-300'>{WarningText}</div>
        </div>
 </div>
    );
}