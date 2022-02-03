import React, {useState} from 'react';

const GENERATE_PDF_FROM_CSV_URL = "https://rbc3vgq16a.execute-api.us-west-2.amazonaws.com/dev/";

const Conversion = () => {
  const onClickConvert = () => {
    // e.preventDefault();
    console.log("Clicked");

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
        console.log("responseの処理");
        console.log(responseJson);
        console.log(JSON.stringify(responseJson));
        const file = ((pdfFileData) => {
          console.log("conversion to file object from base64");
          // console.log(pdfFileData);
          let bin = atob(pdfFileData);
          let buf = new Uint8Array(bin.length);
          for (let index = 0; index < bin.length; index++) {
            buf[index] = bin.charCodeAt(index);
          }
          return new File([buf.buffer], "tmp.pdf", {type: "application/pdf"});
        })(responseJson.PdfFileData);
        console.log(file);
        setPdfFile(file);
      })
      .catch(error => console.log('error', error));
    console.log("fin");
  };

  const onClickDownloadPdf = () => {
    console.log("click downloadPdf");
  }

  const [pdfFile, setPdfFile] = useState(null);

  return (
    <div>
      <p>
        { pdfFile ?
          <button onClick={onClickConvert} disabled>PDFに変換する</button> :
          <button onClick={onClickConvert}>PDFに変換する</button>
        }
      </p>
      <p>
        { pdfFile ?
          <button onClick={onClickDownloadPdf}>PDF ダウンロード</button> :
          <button onClick={onClickDownloadPdf} disabled>PDF ダウンロード</button>
        }
      </p>
      <p>
        <label>※変換したら必ずダウンロードしてください</label>
      </p>
    </div>
  );
}

export default Conversion;
