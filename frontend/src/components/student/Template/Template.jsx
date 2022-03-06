import { useState } from "react"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { STARTER_TEMPLATE, studentHomeRoute } from "../../../config"
import "./Template.css"
const initialStyle = {
    c:'',
    cpp:'',
    java:'',
    python:''
}
export default function Template() {

    const [style,setStyle] = useState({...initialStyle,c:'active'})
    const [template,setTemplate] = useState(STARTER_TEMPLATE);

    return (
        <>
        <div style={{width:'100%',background:'white',padding:20,marginTop:-10,marginBottom:10}}>
         <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={studentHomeRoute}>
          Dashboard
        </Link>
        <Typography color="text.primary">Template</Typography>
      </Breadcrumbs>
      </div>
        <div className="template-container">
            <ul class="nav nav-tabs">
            <li class="nav-item" onClick={()=>setStyle({...initialStyle,c:'active'})}>
                <a class={"nav-link " + style.c} >C</a>
                <div class="input-group">
                    <textarea rows={20} class="form-control" value={template.c} aria-label="With textarea"></textarea>
                </div>
            </li>
            <li class="nav-item" onClick={()=>setStyle({...initialStyle,cpp:'active'})}>
                <a class={"nav-link "+style.cpp} >Cpp</a>
                <div class="input-group">
                    <textarea rows={20} class="form-control" value={template.cpp} aria-label="With textarea"></textarea>
                </div>
            </li>
            <li class="nav-item" onClick={()=>setStyle({...initialStyle,java:'active'})}>
                <a class={"nav-link "+style.java} >Java</a>
                <div class="input-group">
                    <textarea rows={20} class="form-control" value={template.java} aria-label="With textarea"></textarea>
                </div>
            </li>
            <li class="nav-item" onClick={()=>setStyle({...initialStyle,python:'active'})}>
                <a class={"nav-link "+style.python} >Python</a>
                <div class="input-group">
                    <textarea rows={20} class="form-control" value={template.python} aria-label="With textarea"></textarea>
                </div>
            </li>
            </ul>

            
            <button type="button" class="mt-2 px-5 btn btn-outline-dark">Save</button>
        </div>
        </>
    )
}