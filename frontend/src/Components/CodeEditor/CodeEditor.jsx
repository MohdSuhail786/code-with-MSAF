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

function CodeEditor() {
  const [codeLanguage, setCodeLanguage] = React.useState("c");
  const [theme, setTheme] = React.useState("xcode");
  const [textCode, setTextCode]= React.useState("")

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
  fetchData('/code/submit',{method:"POST",body:JSON.stringify(payload)})
}
   
  function sourceCode(c) {
    // console.log(c);
    setTextCode(c);
    
  }

  return (
    <div className="ques_code">
      <div className="cq_des">
        <h1>coding questions</h1>
        <p style={{ display: "flex", flexWrap: "wrap" }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt,
          assumenda recusandae fugit animi, similique aperiam exercitationem
          reiciendis est commodi ipsa nesciunt, tempore praesentium labore
          dolorem quos? Sed, sapiente? Ab, dicta.
        </p>
        <h4>Input</h4>
        <p>this is input 1</p>
        <p>this is input 1</p>
        <p>this is input 1</p>
        <p>this is input 1</p>
        <p>this is input 1</p>
        <h4>Output format</h4>
        <p>this is input 1</p>
        <p>this is input 1</p>
        <p>this is input 1</p>
        <p>this is input 1</p>
        <p>this is input 1</p>
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
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
