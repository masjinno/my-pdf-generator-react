import React, {useState} from 'react';

const GENERATE_PDF_FROM_CSV_URL = "https://rbc3vgq16a.execute-api.us-west-2.amazonaws.com/dev/";

const Conversion = () => {

  const onClickConvert = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // reqBodyはダミー値
    let reqBody = JSON.stringify({
      csvData: "A,B\na1,b1\na2,b2",
      pageSetting: {
        size: "A4",
        orientation: "縦向き",
        margin: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 20
        }
      },
      headerSetting: {
        fontSize: 15,
        fontFamily: "mplus1p-bold",
        markupStart: "【",
        markupEnd: "】",
        targetItems: [ "A", "B" ]
      },
      contentSetting: {
        fontSize: 11,
        fontFamily: "mplus1p-regular"
      }
    });
    let requestOptions = {
        method: 'PUT',
        body: reqBody,
        headers: myHeaders
    };
    fetch(GENERATE_PDF_FROM_CSV_URL, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        const file = ((pdfFileData) => {
          let bin = atob(pdfFileData);
          let buf = new Uint8Array(bin.length);
          for (let index = 0; index < bin.length; index++) {
            buf[index] = bin.charCodeAt(index);
          }
          return new File([buf.buffer], "tmp.pdf", {type: "application/pdf"});
        })(responseJson.PdfFileData);

        const myUrl = window.URL || window.webkitUrl;
        const blob = new Blob([file], { type: file.type });
        const objectUrl = myUrl.createObjectURL(blob);
        setPdfFileLink(objectUrl);
      })
      .catch(error => console.log('error', error));
  };

  const [pdfFileLink, setPdfFileLink] = useState(null);

  return (
    <div>
      <p>
        {
          pdfFileLink ?
          <button onClick={onClickConvert} disabled>PDFに変換する</button> :
          <button onClick={onClickConvert}>PDFに変換する</button>
        }
      </p>
      <p>
        {
          pdfFileLink ?
          <a download="output.pdf" href={pdfFileLink}>PDF ダウンロード</a>
          :
          <a download="output.pdf" href={pdfFileLink} disabled>PDF ダウンロード</a>
        }
        <label>※変換したら必ずダウンロードしてください</label>
      </p>
    </div>
  );
}

export default Conversion;
