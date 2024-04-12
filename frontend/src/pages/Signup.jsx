import {Heading} from '../components/Heading'
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { FormButton } from '../components/FormButton';
import { BottomWarning } from '../components/BottomWarning';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios'
export const Signup = () => {
    const [firstname , setFirstname] = useState("");
    const [lastname , setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [username , setUsername] = useState("");
    const navigate = useNavigate();
    return (
         <div className = "h-screen flex justify-center items-center bg-slate-300">
                <div className='min-w-96 max-w-96 z-2 bg-white rounded-md'> 
                    <Heading label = {"Sign Up"} ></Heading>
                    <SubHeading label = {"Enter your information to create an account"}></SubHeading>
                    <InputBox onChange = {(e) => {
                        setFirstname(e.target.value);
                    }} label = {"First Name"} placeholder={"John"} inputType={"text"}></InputBox>
                    <InputBox onChange = {(e) => {
                        setLastname(e.target.value);
                    }}label = {"Last Name"} placeholder = {"Doe"} inputType={"text"}></InputBox>
                    <InputBox onChange = {(e) => {
                        setUsername(e.target.value);
                    }}label = {"Email"} placeholder={"harkirat@gmail.com"} inputType={"email"}></InputBox>
                    <InputBox onChange = {(e) => {
                        setPassword(e.target.value);
                    }}label = {"Password"} placeholder={"123456"} inputType={"password"}></InputBox>
                    <FormButton onClick = {
                        async () => {
                              const reponse = await axios.post("http://localhost:3000/api/v1/user/signup" , {
                                   username ,
                                   password,
                                   firstname,
                                   lastname
                              })
                              localStorage.setItem("token" , reponse.data.token)
                              navigate('/dashboard')
                        }
                    } label = {"Sign up"}></FormButton>
                    <BottomWarning label = {"Already have an account? "} linkText = {"Sign in"} fileName = {"/signin"}></BottomWarning>
                </div>
         </div>
    );
}