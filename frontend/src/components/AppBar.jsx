import { useNavigate } from "react-router-dom";
export const AppBar = () => {
     const navigate = useNavigate();
     return (
          <div className = "flex w-screen justify-between p-2 shadow-md shadow-slate-300 otems-center">
              <div className="flex justify-center items-center"><div>PayTM App</div></div>
              <div className="flex gap-2 items-center" >
                      <div className=""> Hello </div>
                      <div className="text-center w-8 h-8 rounded-full bg-slate-300 flex justify-center items-center"><div>U</div></div>
                      <div><button onClick= {() => {
                          localStorage.removeItem('token');
                          navigate('/signin')
                      }}>Logout</button></div>
              </div>
          </div> 
     );
};