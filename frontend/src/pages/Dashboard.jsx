import { AppBar } from "../components/AppBar";
import { BalanceaBar } from "../components/Balance";
import { useEffect, useState } from "react";
import {SendMoneyButton} from "../components/SendMoneyButton";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export const Dashboard = () => {
      const [users , setUser] = useState([]);
      const [filter , setFilter] = useState("");
      const [balance, setBalance] = useState(0); 
      const navigate = useNavigate();
      useEffect(() => {
          const getData = setTimeout(() => {
               const token = localStorage.getItem('token')
               console.log(token);
               axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
                    headers : {
                         'authorization' : `Bearer ${token}`
                    }
               }).then((response) => {
                    setUser(response.data.users);
               })
               
          }, 500);
          return () => (clearTimeout(getData));
      }, [filter])

      useEffect(() => {
          const getData = setTimeout(() => {
               const token = localStorage.getItem('token')
               console.log(token);
               axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers : {'authorization' : `Bearer ${localStorage.getItem('token')}`}
               }).then((response) => {
                    setBalance(response.data.balance);
               })
               
          }, 500);
          return () => (clearTimeout(getData));
      },[])
     
      return (
           <> 
              <AppBar></AppBar>
              <BalanceaBar balance = {balance}></BalanceaBar>
              <div>
              <div className="mt-6 px-4 py-2 font-bold text-lg">Users</div>
              <div className="my-2 px-4"><input onChange = {(e) =>{
                setFilter(e.target.value);
              }}type="text" placeholder="Search users..."  className = "w-full h-8 border rounded-sm border-slate-300" /></div>
              <div>
                    {users.map(user => <User user={user}/>)}
               </div>
              </div>
           </>
      );
}


function User({user}) {
     {console.log(user)}
     const navigate = useNavigate();
     return <div className="flex justify-between px-4">
         <div className="flex">
             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                 <div className="flex flex-col justify-center h-full text-xl">
                     {user.firstname[0]}
                 </div>
             </div>
             <div className="flex flex-col justify-center h-ful">
                 <div>
                     {user.firstname} {user.lastname}
                 </div>
             </div>
         </div>
 
         <div className="flex flex-col justify-center h-ful">
             <SendMoneyButton onClick = {(e) => {
                  navigate('/send?id=' + user._id + "&name=" + user.firstname);
             }}label={"Send Money"} />
         </div>
     </div>
 }