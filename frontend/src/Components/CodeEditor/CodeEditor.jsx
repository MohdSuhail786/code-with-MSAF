import React, { useState, useRef } from "react";
import * as ace from "brace";
import AceEditor from "react-ace";
import "brace/mode/java";
import "brace/theme/xcode";
import "brace/mode/javascript";
import "brace/theme/monokai";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./CodeEditor.css";
import { fetchData } from "../../middleware/RequestHandler";
import CircularProgress from '@mui/material/CircularProgress';


function CodeEditor() {
  const [codeLanguage, setCodeLanguage] = React.useState("c");
  const [theme, setTheme] = React.useState("xcode");
  const [textCode, setTextCode]= React.useState("");
  const [loading, setLoading]= React.useState(false);

  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleChangeLanguage = (event) => {
    setCodeLanguage(event.target.value);
  };

  const handleChangeTheme = (event) => {
    console.log(event.target.value);
    setTheme(event.target.value);
  };

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
 let payload ={
   "code":textCode,
   "lang":codeLanguage,

 }

function submitCode(){
  fetchData('/code/submit',{method:"POST",body:JSON.stringify(payload)});
  setLoading(true)
}
   
  function sourceCode(c) {
    // console.log(c);
    setTextCode(c);
    
  }

  return (
    <div className="ques_code">
      <div className="cq_des">
        <div  className="ques_head"> 
        <h1>Largest Element in Array </h1>
        <div>Basic</div>
        </div>
        
        <p style={{ display: "flex", flexWrap: "wrap" }}>
        Given an array A[] of size n. The task is to find the largest element in it.
        </p>
        <h4 style={{textAlign: "start"}}> Example 1:</h4>
       <div className="input">
         <div>
       n = 5 
       </div> <div>
        A[] = {1, 8, 7, 56, 90}
        </div>
        <div>
        Output:
        90
        </div>
        <div>
        Explanation:
The largest element of given array is 90.
        </div>

       </div>
       <h4 style={{textAlign: "start"}}> Example 2:</h4>
       <div className="input">
         <div>
       n = 5 
       </div> <div>
        A[] = {1, 8, 7, 56, 90}
        </div>
        <div>
        Output:
        90
        </div>
        <div>
        Explanation:
The largest element of given array is 90.
        </div>

       </div>

       
      <h3 style={{display:"flex",alignItems:"flexStart"}}> Your Task:  </h3> 
      <div style={{textAlign:"start"}}>
      You don't need to read input or print anything. Your task is to complete the function largest() which takes the array A[] and its size n as inputs and returns the maximum element in the array.
      </div>

      <div style={{textAlign:"start"}}>
    <h3>Constraints:</h3>  
 <div>  1   <span>&#62;</span> <span>&#61;</span>n <span>&#60;</span><span>&#61;</span> 10<sup>3</sup></div>
 <div>
0 
<span>&#62;</span> <span>&#61;</span>A[i] <span>&#60;</span><span>&#61;</span> 10<sup>3</sup></div>
Array may contain duplicate elements. 
      </div>
        
      </div>
      <div className="code_editor">
        <div
          style={{
            display: "flex",

            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
         
          <Box sx={{ minWidth: 120, margin: 2 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={theme}
                onChange={handleChangeTheme}
              >
                <MenuItem value="monokai">Monokai </MenuItem>
                <MenuItem value="xcode">Light</MenuItem>
              </Select>
            </FormControl>
          </Box>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:4}}>
        <div style={{margin:10}}>
            <CopyToClipboard text={textCode} onCopy={onCopyText}>
          
              <div className="copy-area">
                <button>Copy to Clipboard</button>
                <span className={`copy-feedback ${isCopied ? "active" : ""}`}>
                  Copied!
                </span>
              </div>
            </CopyToClipboard>
          </div>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={codeLanguage}
                onChange={handleChangeLanguage}
              >
                <MenuItem value="c">C </MenuItem>
                <MenuItem value="cpp">C++</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="python">Python</MenuItem>
              </Select>
            </FormControl>
          </Box>
          </div>
        </div>
        <div style={{ width: "56vw", borderBottom:"6px solid whiteSmoke" }}>
          <AceEditor
            width="inherit"
            mode="java"
            theme={theme}
            onChange={sourceCode}
            name="UNIQUE_ID_OF_DIV"
            showPrintMargin={false}
            editorProps={{
              $blockScrolling: true,
            }}
          />
        </div>
        <div className="run_code">
          <button onClick={submitCode}>Run Code</button>
        </div>
        <div className="output">
          <div>Output</div>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>  { loading && <CircularProgress color="secondary" />} </div>

        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
