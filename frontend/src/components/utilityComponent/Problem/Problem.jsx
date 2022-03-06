import React, { useState, useContext } from "react";
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
import "./Problem.css";
import { fetchData } from "../../../middleware/RequestHandler";
import CircularProgress from "@mui/material/CircularProgress";
import AppContext from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import PageNotFound from "../PageNotFound/PageNotFound";
import HomeHeader from "../HomeHeader/HomeHeader";

function Problem() {
  const appContext = useContext(AppContext);
  const {_problemCode} = useParams();
  // const [state,setState] = useState({question:{},testcases:[]})

  const [codeLanguage, setCodeLanguage] = React.useState("c");
  const [theme, setTheme] = React.useState("xcode");
  const [textCode, setTextCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showOutput, setShowOutput]= React.useState(true);
  const [storeOutput, setStoreOutput]= React.useState(false);
  const [storeOutputError, setStoreOutputError]= React.useState(false);
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const {data,waiting,error} = useFetch(`/question?problemCode=${_problemCode}`,"GET")
  console.log(data,error)

  const handleChangeLanguage = (event) => {
    setCodeLanguage(event.target.value);
  };

  const handleChangeTheme = (event) => {
    console.log(event.target.value);
    setTheme(event.target.value);
  };
console.log(_problemCode)
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  let payload = {
    code: textCode,
    lang: codeLanguage,
    input: "1",
  };

  async function submitCode() {
    setLoading(true);
   const codeData =  await fetchData("/code/submit", {
      method: "POST",
      body: JSON.stringify(payload),
    });
   
    
    if(!codeData.err && codeData){
      
      setLoading(false);
      console.log(codeData.output)
      setStoreOutput(codeData.output);
      setStoreOutputError(false);
      
      return;
    }
    setStoreOutputError(true);
    setLoading(false);
  }

  React.useEffect(() => {
    setShowOutput(true);
  }, [storeOutput])

  function sourceCode(c) {
    console.log(c);
    setTextCode(c);
  }

  if(waiting) {
    return <>
      <CircularProgress style={{position:'absolute',top:'49%',left: '49%'}} color="primary" />
    </>
  }

  if(error || !data) {
    return <>
      <PageNotFound />
    </>
  }

  return (
    <>
    <HomeHeader />
    <div className="ques_code">
      <div className="cq_des">
        <div className="ques_head">
          <h1>{data.question.name} </h1>
          <div>{data.question.level}</div>
        </div>

        <p style={{ display: "flex", flexWrap: "wrap" }}>
          {data.question.description}
        </p>
        {data.testcases.map((testcase,id)=>{
            return <>
            <h4 style={{ textAlign: "start" }}> Testcase {id+1}:</h4>
            <div className="input">
            <span>Input</span>
            {testcase.input.map(i=>{
              return <div>{i}</div>
            })}
            <span>Output</span>
            {testcase.output.map(o=>{
              return <div>{o}</div>
            })}
            <span>Explanation</span>
            <div>{testcase.description }</div>
          </div>
          </>
        })}
      
        {data.question.note && 
        <>
          <h3 style={{ display: "flex", alignItems: "flexStart" }}>
          Note:
        </h3>
        <div style={{ textAlign: "start" }}>
          {data.question.note}          
        </div>
        </>
        }

        <div style={{ textAlign: "start" }}>
          <h3>Constraints:</h3>
          {data.question.constraints.map((constraint)=>{
          return <>
            <div>{constraint}</div>
          </>
          })}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 4,
            }}
          >
            <div style={{ margin: 10 }}>
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
        <div style={{ width: "56vw", borderBottom: "6px solid whiteSmoke" }}>
          <AceEditor
            width="inherit"
            mode="javascript"
            theme={theme}
            onChange={sourceCode}
            name="UNIQUE_ID_OF_DIV"
            showPrintMargin={true}
            value={data.template}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor:"black",
              color:"white",
              flexDirection:"coulmn"
            }}
          >
            {" "}
            {loading && <CircularProgress color="secondary" />}{" "}
            {console.log(storeOutput)}
            {storeOutputError &&  <div style={{color:"red"}}>Compile Error</div>}
           {showOutput && <div> {storeOutput}</div>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Problem;
