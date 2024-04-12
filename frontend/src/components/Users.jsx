export const Users = ({usersArray}) => {
      return(
           <div>
               <div className="mt-6 px-4 py-2 font-bold text-lg">Users</div>
               <div className="my-2 px-4"><input type="text" placeholder="Search users..."  className = "w-full h-8 border rounded-sm border-slate-300" /></div>
               {usersArray.map((user) => {
                   <User user = {user}></User>
               })}
           </div>
      );
};
function User({user})
{
      return(
          <div className="flex gap-4 px-4 ">
               <div className="flex">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex justify center mt-1 mr-2"><div className="flex flex-col justify-center h-full text-xl">{user.firstname[0]}</div></div>
                    <div className="h-full flex flex-col justify-center"><div>{User.firstname}  {User.lastname}</div></div>
               </div>
               <div className="flex flex-col justify-center h-full">
                  <button label = {"Send Money"} />
               </div>
          </div>
      );
}