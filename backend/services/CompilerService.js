const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const saveFile = (name,data) => {
    return new Promise((resolve,reject)=> {
        fs.writeFile(name,data,err =>{
            if(err) {
                console.log(err);
                reject();
            } else {
                console.log("File saved");
                resolve();
            }
        })
    })
}

const cExecute = (data, input) => {
    return new Promise((resolve, reject)=>{
        const fileName = "test.c"
        saveFile(fileName, data)
          .then(()=>{
            // Create Input file
            fs.writeFile("input.txt", input, function(err) {
              if(err) {
                  console.log(err);
                  reject()
              } 
            });  
              // FILE SAVED SUCCESSFULLY
              // Generate the output file for it
              const filePath = path.join(__dirname,"../test.c")
              exec('gcc '+filePath, (err, stdout, stderr) => {
                  if (err) {
                    // IF COMPILATION ERROR
                    console.error(`exec error: ${err}`);
                    resolve({
                      err: true,
                      output: err,
                      error: stderr
                    })
                  }
                  
                  // SUCCESSFULL COMPILATION EXECUTING
                  console.log("SUCCESSFULLY COMPILED")
                  exec('./a.out < '+'input.txt', (err, stdout, stderr) => {
                    if(err){
                      console.log("ERROR "+err)
                      resolve({
                        err: true,
                        output: err,
                        error: stderr
                      })
                    }
          
                    console.log("OUTPUT ", stdout)
                    resolve({
                      err: false,
                      output: stdout
                    })
                  })
                })
  
          })
          .catch(()=>{
            console.log("ERROR SAVE FILE")
            const err = {
              err: true,
              output: "Internal Server Error!"
            }
            resolve(err)
          })
    }) 
  }


module.exports = {
    cExecute
}