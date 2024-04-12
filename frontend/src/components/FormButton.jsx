export const FormButton = ({label , onClick}) => {
      return(
        <div className = "mt-2 px-2 py-2 flex justify-center">
            <button onClick={onClick} className="w-72 h-10 py-2 px-4 bg-slate-950 text-white rounded-md"> {label} </button>
        </div>
      )
};