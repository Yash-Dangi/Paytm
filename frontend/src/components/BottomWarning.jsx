import { Link } from "react-router-dom";

export const BottomWarning = ({label, linkText,fileName}) => {
     return(
          <div className = "text-center px-2 py-2 w-full h-8">
            <div >{label}<Link to = {fileName}>{linkText}</Link></div>
          </div>
     ); 
};