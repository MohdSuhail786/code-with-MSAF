const fs = require('fs');
const path = require('path');
const {logger} = require("./Logger")
const { exec } = require('child_process');

const saveFile = (name,data) => {
  logger.info("Going to save file : "+name)  
  return new Promise((resolve,reject)=> {
      fs.writeFile(name,data,err =>{
          if(err) {
              reject();
          } else {
              logger.info("File "+name+" saved successfully\nData : "+data)
              resolve();
          }
      })
  })
}

const compile = (fileName,compiler)=>{
  logger.info("Going to compile "+fileName)
  return new Promise((resolve,reject)=>{
    const filePath = path.join(__dirname,`../${fileName}`)
    exec(compiler+' ' + filePath,(err,stdout,stderr)=>{
      if(err) {
        reject({
          err: true,
          output: err,
          error: stderr
        })
      } else {
        logger.info("Successfully Compiled")
        resolve({
          err:false,
          output: stdout
        })
      }
    })
  }) 
}

const runCode = (execFile)=>{
  logger.info("Going to run the compiled code")
  return new Promise((resolve,reject)=>{
    exec(execFile+' < '+'input.txt', (err, stdout, stderr) => {
      if(err){
        reject({
          err: true,
          output: err,
          error: stderr
        })
      } else {
        logger.info("Code run successfully")
        resolve({
          err: false,
          output: stdout
        })
      }
    })
  })
}

const cExecute = async (data, input) => {
  try {
    const programFile = "program.c";
    const inputFile = "input.txt";
    await saveFile(programFile,data);
    await saveFile(inputFile,input);
    await compile(programFile,'gcc');
    const output = await runCode('./a.out')
    return output;
  } catch (err) {
    logger.error(err)
    return err;
  }
}

const cppExecute = async (data,input) => {
  try {
    const programFile = "program.cpp";
    const inputFile = "input.txt";
    await saveFile(programFile,data);
    await saveFile(inputFile,input);
    await compile(programFile,'g++');
    const output = await runCode('./a.out');
    return output;
  } catch (err) {
    logger.error(err)
    return err;
  }
}

const pythonExecute = async (data,input) => {
  try {
    const programFile = "program.py";
    const inputFile = "input.txt";
    await saveFile(programFile,data);
    await saveFile(inputFile,input);
    const filePath = path.join(__dirname,`../${programFile}`)
    const output = await runCode('python '+filePath);
    return output;
  } catch (err) {
    logger.error(err)
    return err;
  }
}

const javaExecute = async (data,input) => {
  try {
    const programFile = "MSAF.java";
    const inputFile = "input.txt";
    await saveFile(programFile,data);
    await saveFile(inputFile,input);
    await compile(programFile,'javac')
    const output = await runCode('java MSAF');
    return output;
  } catch (err) {
    logger.error(err)
    return err;
  }
}

module.exports = {
    cExecute, cppExecute, pythonExecute, javaExecute
}