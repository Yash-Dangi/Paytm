export const InputBox = ({label, placeholder , inputType, onChange}) => {
       return(
        <div className="pt-2 px-2 flex-cols gap-y-20">
        <div className="mb-2 px-10"><label className="text-base font-semibold">{label}</label></div>
        <div className="flex justify-center"><input onChange = {onChange} className = "h-10 p-2 text-slate-800 placeholder-slate-500 w-72 border-solid rounded-md border border-slate-300" type={inputType} placeholder={placeholder} name = {label} id = {label}/></div>
        </div>
       )
}