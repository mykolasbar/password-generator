import React, { useState, useEffect, useRef } from 'react';


const CopyButton = (props) => {

    let [mouseOver, setMouseOver] = useState(false)
    let [passwordCopied, setPasswordCopied] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
          setPasswordCopied(false)
        }, 2000);
        return () => clearTimeout(timer);
      }, [passwordCopied]);

    return (
        
        <>
            <div style = {{display: passwordCopied ? "block" : "none", fontSize: '20px', backgroundColor: 'white', padding: '4px', border: '1px dotted', borderRadius: '5px', position: 'absolute', top: '-430px'}}>Nukopijuota į iškarpinę</div>
            <div>
            <button onClick = {() => {navigator.clipboard.writeText(props.copiedPassword); setPasswordCopied(true); console.log(passwordCopied)} } onMouseEnter = {() => {setMouseOver(true)}} onMouseLeave = {() => {setMouseOver(false)}} className = "passwordCopy" style = {{position:"relative", top: '-40px', left: '10px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            <br /></button>
            <div style = {{display: mouseOver ? "block" : "none", fontSize: '12px', backgroundColor: 'rgb(246, 246, 172)', padding: '2px', width:'110px', border: '1px solid', position: 'absolute'}}>{props.onHoverMessage}</div>
            </div>
        </>
    );
};

export default CopyButton;