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

const compile = (fileName)=>{
  logger.info("Going to compile "+fileName)
  return new Promise((resolve,reject)=>{
    const filePath = path.join(__dirname,`../${fileName}`)
    exec('gcc ' + filePath,(err,stdout,stderr)=>{
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

const runCode = ()=>{
  logger.info("Going to run the compiled code")
  return new Promise((resolve,reject)=>{
    exec('./a.out < '+'input.txt', (err, stdout, stderr) => {
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
    const programFile = "test.c";
    const inputFile = "input.txt";
    await saveFile(programFile,data);
    await saveFile(inputFile,input);
    await compile(programFile);
    const output = await runCode()
    return output;
  } catch (err) {
    logger.error(err)
    return err;
  }
}

module.exports = {
    cExecute
}