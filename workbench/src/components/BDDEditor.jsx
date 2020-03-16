import React, { useEffect } from 'react';
import "./bddeditor.styles.css";
import Prism from "prismjs";


function BDDEditor(props) {

    const handleKeyDown = evt => {
      let value = props.content,
        selStartPos = evt.currentTarget.selectionStart;
  
      console.log(evt.currentTarget);
  
      // handle 4-space indent on
      if (evt.key === "Tab") {
        value =
          value.substring(0, selStartPos) +
          "    " +
          value.substring(selStartPos, value.length);
        evt.currentTarget.selectionStart = selStartPos + 3;
        evt.currentTarget.selectionEnd = selStartPos + 4;
        evt.preventDefault();
        
        props.changeContent(value);
      }
    };
  
    useEffect(() => {
      Prism.highlightAll();
    }, []);
  
    useEffect(() => {
      Prism.highlightAll();
    }, [props.language, props.content]);
  

    return (
        <>
            <h1 style={{ color: '#ffffff' }} className="mt-3">BDD Editor</h1>
            <div className="code-edit-container">
                <textarea
                    className="code-input"
                    value={props.content}
                    onChange={evt => props.changeContent(evt.target.value)}
                    onKeyDown={handleKeyDown}
                    
                />
                
            </div>
        </>
    );

}

export default BDDEditor;