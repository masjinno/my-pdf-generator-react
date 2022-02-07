import React, {useState} from 'react';

const GENERATE_PDF_FROM_CSV_URL = "https://rbc3vgq16a.execute-api.us-west-2.amazonaws.com/dev/";

const Conversion = (props) => {
  if (isNaN(Number(props.headerFontSize)) ||
      isNaN(Number(props.contentFontSize))) {
    alert(`Error!\nfont size is ${NaN}`);
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
    if (!props.csvData) {
      alert(`Error!\nCSV is empty or null`);
      return;
    }
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let reqBody = JSON.stringify({
      csvData: props.csvData,
      pageSetting: pageSetting,
      headerSetting: headerSetting,
      contentSetting: contentSetting
    });
    console.log("★★★");
    console.log(reqBody);
    console.log("★★★");
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
          //pdfFileLink ?
          props.csvData ?
          <button onClick={onClickConvert}>PDFに変換する</button> :
          <button onClick={onClickConvert} disabled>PDFに変換する</button>
        }
      </p>
      <p>
        {
          pdfFileLink ?
          <a download="output.pdf" href={pdfFileLink}>PDF ダウンロード</a> :
          <a download="output.pdf" href={pdfFileLink} disabled>PDF ダウンロード</a>
        }
      </p>
    </div>
  );
}

export default Conversion;
