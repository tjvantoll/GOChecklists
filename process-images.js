const fs = require("fs");
const { exec } = require("child_process");

const inputDirectory = "./src/app/images/sprites"
const outputDirectory = "./src/app/images/sprites-black";

fs.readdirSync(inputDirectory).forEach(fileName => {
  if (fileName.match(/png/)) {
    var inputFileWithPath = inputDirectory + "/" + fileName;
    var outputFileWithPath = outputDirectory + "/" + fileName
    exec("convert " + inputFileWithPath + " -fill black +opaque transparent " + outputFileWithPath, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      console.log("Successfully processed " + fileName);
    });
  }
});
