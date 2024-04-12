import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { FormButton } from "../components/FormButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
export const SendMoney = () => {
    const [searhParams] = useSearchParams();
    const id = searhParams.get('id');
    const name = searhParams.get('name');
    const [amount , setAmount] = useState(0);
 
    const navigate = useNavigate();
   
    return (
        <div className = "h-screen flex justify-center items-center bg-slate-50">
        <div className='min-w-80 max-w-80 z-10 bg-white rounded-md shadow border '> 
             <div className="font-bold text-2xl py-8 text-center"> Send Money </div>
             <div className="flex pt-8 px-8 gap-2">
                    <div className = "w-8 h-8 bg-green-300 rounded-full flex justify-center items-center font-bold text-2xl"><div>{name[0].toUpperCase()}</div></div>
                    <div className="font-bold text-2xl">{name}</div>
             </div>
             <div className="lex-cols gap-y-20">
             <div className="mb-2 px-8"><label className="text-base font-semibold">Amount (in Rs)</label></div>
             <div className="flex justify-center"><input onChange = {(e) => { 
                 setAmount(e.target.value);
             }}className = "h-10 p-2 text-slate-800 placeholder-slate-500 w-64 border-solid rounded-md border border-slate-300" type= {"text"} placeholder = {"Enter Amount"} name = {"Amount"}id = {"Amount"}/></div>
             </div> 
             <div className = "mt-2 px-2 py-2 mb-4 flex justify-center">
               <button onClick = {(e) =>{
                     axios.post('http://localhost:3000/api/v1/account/transfer' , {
                       to : id,
                       amount : amount
                     }, {
                        headers : {'authorization' : `Bearer ${localStorage.getItem('token')}`}
                     }).then((response) => {
                          navigate('/dashboard')
                     })
               }}className="w-64 h-10 py-2 px-4 bg-green-500 text-white rounded-md"> Initiate Transfer</button>
             </div>
        </div>
        </div>
    );
}