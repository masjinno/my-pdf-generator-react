import React, {useState} from 'react';

const GENERATE_PDF_FROM_CSV_URL = "https://rbc3vgq16a.execute-api.us-west-2.amazonaws.com/dev/";

const Conversion = (props) => {
  if (isNaN(Number(props.headerFontSize)) ||
      isNaN(Number(props.contentFontSize))) {
    alert('ERROR!');
  }

  const pageSetting = {
    size: props.pageSize,
    orientation: props.pageOrientation,
    margin: {
      top: props.pageMargin[0],
      left: props.pageMargin[1],
      right: props.pageMargin[2],
      bottom: props.pageMargin[3]
    }
  };
  const headerSetting = {
    fontSize: Number(props.headerFontSize),
    fontFamily: props.headerFontFamily,
    markupStart: props.headerMarkupStart,
    markupEnd: props.headerMarkupEnd,
    targetItems: props.targetItems
  };
  const contentSetting = {
    fontSize: Number(props.contentFontSize),
    fontFamily: props.contentFontFamily
  }

  const onClickConvert = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // reqBodyのcsvDataはダミー値
    let reqBody = JSON.stringify({
      csvData: "A,B\na1,b1\na2,b2",
      pageSetting: pageSetting,
      headerSetting: headerSetting,
      contentSetting: contentSetting
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
