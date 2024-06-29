import React from "react";
import { useNavigate } from "react-router-dom";

export default function Company({image}) {
    const navigate = useNavigate()
    function handleCompanyClick() {
        navigate('/trainee',{replace: true});
    }
  return (
      <div class="border-accent flex justify-center items-center border-4 rounded-md p-4 bg-primary hover:bg-hover cursor-pointer" onClick={handleCompanyClick}>
        <img
          className="w-1/2"
          src={image}
          alt="error"
        />        
      </div>
  );
}
