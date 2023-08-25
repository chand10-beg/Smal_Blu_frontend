import React from "react";

function footer(){
    const date=new Date();
    const year= date.getFullYear();

    return (
        <div>
            <h2 className="footer" style={{"color":"#fff"}}><i class="fa-solid fa-copyright" style={{"color": "#ffffff;"}}></i> Made by Devansh Goel in {year}</h2>
        </div>
    )

};
export default footer;