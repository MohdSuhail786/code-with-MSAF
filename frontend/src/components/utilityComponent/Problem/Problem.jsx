import React, { useState, useContext } from "react";
import AceEditor from "react-ace";
import "brace/mode/java";
import "brace/theme/xcode";
import "brace/mode/javascript";
import "brace/theme/monokai";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import CodeEditor from "../CodeEditor/CodeEditor"
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Problem.css";
import { fetchData } from "../../../middleware/RequestHandler";
import CircularProgressBar from "../CircularProgress/CircularProgress";
import AppContext from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import PageNotFound from "../PageNotFound/PageNotFound";
import HomeHeader from "../HomeHeader/HomeHeader";
import { useDispatch, useSelector } from "react-redux";
import { runCode } from "./store/action";
import {hideProgressBar, showProgressBar} from "../CircularProgress/store/action"
import { isUserLoggedIn } from "../../../utils";
import {useHistory,useLocation} from "react-router-dom";

function Problem() {
  const appContext = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const {_problemCode} = useParams();
  // const [state,setState] = useState({question:{},testcases:[]})
  const dispatch = useDispatch()
  const [codeLanguage, setCodeLanguage] = React.useState("c");
  const [theme, setTheme] = React.useState("xcode");
  const [textCode, setTextCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showOutput, setShowOutput]= React.useState(true);
  const [storeOutput, setStoreOutput]= React.useState(false);
  const [storeOutputError, setStoreOutputError]= React.useState(false);
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const code = useSelector(state => state.code)
  const result = useSelector(state => state.result)
  const progressBar = useSelector(state => state.progressBar)
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
    problem_code: _problemCode,
    code: code[_problemCode],
    lang: codeLanguage,
  };

  async function handleRunCode() {
    if(!isUserLoggedIn()) {
      // return appContext.showLoginPopup({callback:async()=>{
      //   payload = {...payload,type:"sample"}
      //   dispatch(showProgressBar())
      //   await dispatch(runCode(payload))
      //   dispatch(hideProgressBar())
      // }})
      return history.push("/login?ref="+location.pathname+location.search)
    }
    payload = {...payload,type:'sample'}
    dispatch(showProgressBar())
    await dispatch(runCode(payload))
    dispatch(hideProgressBar())
  }

  async function handleSubmitCode() {
    if(!isUserLoggedIn()) {
      return appContext.showLoginPopup({callback:async()=>{
        payload = {...payload,type:null}
        dispatch(showProgressBar())
        await dispatch(runCode(payload))
        dispatch(hideProgressBar())
      }})
    }
    payload = {...payload,type:null}
    dispatch(showProgressBar())
    await dispatch(runCode(payload))
    dispatch(hideProgressBar())
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
      {/* <CircularProgress style={{position:'absolute',top:'49%',left: '49%'}} color="primary" /> */}
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

        <div style={{ textAlign: "start",marginBottom:100 }}>
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
                <MenuItem value="monokai">Dark </MenuItem>
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
        <div style={{ width: "56vw", borderBottom: "6px solid whiteSmoke",flex:1,overflowY:"scroll" }}>
          <CodeEditor lang={codeLanguage} problem_code={_problemCode} template={data.templates[codeLanguage]}/>
        </div>
        <div className="run_code">
          <button onClick={handleRunCode}>Run Code</button>
          <button style={{marginLeft:10}} onClick={handleSubmitCode}>Submit Code</button>
        </div>
          <div style={{margin:"0px 26px",display:'flex',justifyContent:'space-between'}}>
            <span>Result</span>
            {result.type == "hidden" && result.solved && !progressBar && <span style={{color:"green"}}>Solved</span>}
            {result.type == "hidden" && !result.solved && !progressBar && <span style={{color:"red"}}>Some test cases are failed</span>}
          </div>
        <div className="output">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              flexDirection:"column",
            }}
          >
            <CircularProgressBar />
            {!progressBar && result.output.map(op => {
              if(op.status) {
                return <div style={{display:'flex',flexDirection:'column',color:"blue",marginBottom:10,background:op.opStatus ? "#B6FFCE":"#FFA8A8",padding:20,width:'100%'}}>{
                  <>
                    <h5>Input</h5>
                    <div style={{display:'flex',flexDirection:'column',fontWeight:'bolder',padding:5}}>{op.input.map(i => <span>{i}</span>)}</div>
                    <h5>Output</h5>
                    <div style={{display:'flex',flexDirection:'column',fontWeight:'bolder',padding:5}}>{op.output.map(o => <span>{o}</span>)}</div>
                    <h5>Expected Output</h5>
                    <div style={{display:'flex',flexDirection:'column',fontWeight:'bolder',padding:5}}>{op.expectedOutput.map(o => <span>{o}</span>)}</div>
                  </>
                }</div>
              }
              return <div style={{display:'flex',flexDirection:'column',marginBottom:10}}>{
                <>
                  <div style={{display:'flex',flexDirection:'column',fontWeight:'bolder'}}>{op.input.map(i => <span>{i}</span>)}</div>
                  <div style={{color:'red'}}>{op.error}</div>
                </>
              }</div>
            })}
            {!progressBar && result.finalOutput.map((op,key) => {
              if(op.opStatus) {
                return <div style={{display:'flex',color:"blue",marginBottom:10,background:op.opStatus ? "#B6FFCE":"#FFA8A8",padding:20,width:'100%'}}>{
                  <>
                    <div style={{fontWeight:'bolder',padding:5}}>Testcase : {key+1}</div>
                    <div style={{fontWeight:'bolder',padding:5}}>Success</div>
                  </>
                }</div>
              }
              return <div style={{display:'flex',color:"blue",marginBottom:10,background:op.opStatus ? "#B6FFCE":"#FFA8A8",padding:20,width:'100%'}}>{
                <>
                  <div style={{fontWeight:'bolder',padding:5}}>Testcase : {key+1}</div>
                  <div style={{fontWeight:'bolder',padding:5}}>Failed</div>
                </>
              }</div>
            })}
            {storeOutputError &&  <div style={{color:"red"}}>Compile Error</div>}
           {showOutput && <div> {storeOutput}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Problem;
