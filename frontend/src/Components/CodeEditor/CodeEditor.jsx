import * as React from "react";
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
import "./CodeEditor.css";

function CodeEditor() {
  const [codeLanguage, setCodeLanguage] = React.useState("c");
  const [theme, setTheme] = React.useState("light");
  
  const handleChangeLanguage = (event) => {
    setCodeLanguage(event.target.value);
  };
  

  const handleChangeTheme = (event) => {
    setTheme(event.target.value);
  };
  function sourceCode(c) {
    console.log(c);
  }

  return (
    <div style={{width:"50%"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
           <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={theme}
                label="theme"
                onChange={handleChangeTheme}
              >
                <MenuItem value="monokai">Monokai </MenuItem>
                <MenuItem value="light">Light</MenuItem>
               
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
            
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={codeLanguage}
                label="Age"
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
      <div style={{height:400,width:"100vw"}}>
      <AceEditor
    
        mode={codeLanguage}
        theme={theme}
        onChange={sourceCode}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
        }}
      />
      </div>
    </div>
  );
}

export default CodeEditor;
