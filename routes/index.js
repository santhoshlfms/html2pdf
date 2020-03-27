var express = require('express');
var router = express.Router();
var path = require('path');
const convertToPDF = require("pdf-puppeteer");
var fs = require('fs');


router.post('/generate-pdf', function(req, res, next) {
  let d = new Date();
  let seconds = Math.round(d.getTime() / 1000);
  let outputPdfName = seconds + '.pdf';
  let PUBLIC_WRITE_PATH = path.resolve('./public/pdf/' + outputPdfName);
  convertToPDF(req.body, pdf => writeTOfile(res,PUBLIC_WRITE_PATH, pdf),null, null, true);
});

//helpers 

function writeTOfile(res, path, data, outputPdfName) {
  try{
    fs.writeFileSync(path, data);
    console.log("PDF write success");
    let filePath = 'public/pdf/' + outputPdfName
    res.json({
      pdfFilePath : filePath, error: null
    })
  }catch(e) {
    console.log("PDF write error");
    res.json({
      pdfFilePath : null,
      error : e
    })
  }

}


module.exports = router;
