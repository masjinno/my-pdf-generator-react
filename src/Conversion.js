import React from 'react';

const GENERATE_PDF_FROM_CSV_URL = "https://rbc3vgq16a.execute-api.us-west-2.amazonaws.com/dev/";

class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfFile: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Clicked");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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
    const procRespJson = (json) => {
      console.log("responseJsonの処理");
      const convertFileObjectFromBase64 = (PdfFileData) => {
        console.log("conversion to file object from base64");
        let bin = atob(PdfFileData);
        let buf = new Uint8Array(bin.length);
        for (let index = 0; index < bin.length; index++) {
          buf[index] = bin.charCodeAt(index);
        }
        return new File([buf.buffer],"tmp.pdf", {type: "application/pdf"});
      };
      const file = convertFileObjectFromBase64(json.PdfFileData);
      console.log(this);
      this.setState(
        {
          pdfFile: file
        }
      );
    };
    fetch(GENERATE_PDF_FROM_CSV_URL, requestOptions)
      .then(response => response.json())
      .then((responseJson => {
        console.log("responseの処理");
        console.log(responseJson);
        console.log(JSON.stringify(responseJson));
        console.log("this:");
        console.log(this);
        const file = ((pdfFileData) => {
          console.log("conversion to file object from base64");
          // console.log(pdfFileData);
          let bin = atob(pdfFileData);
          let buf = new Uint8Array(bin.length);
          for (let index = 0; index < bin.length; index++) {
            buf[index] = bin.charCodeAt(index);
          }
          return new File([buf.buffer],"tmp.pdf", {type: "application/pdf"});
        })(responseJson.PdfFileData);
        this.setState(
          {
            pdfFile: file
          }
        );
      }).bind(this))
      .catch(error => console.log('error', error));
    console.log("fin");
  }

  downloadPdf() {
    window.location.href = this.state.pdfFilePath;
  }

  render() {
    if (this.state.pdfFilePath == null) {
      return (
        <div>
          <p>
            <form onSubmit={this.handleSubmit}>
              <button type="submit">PDFに変換する</button>
            </form>
          </p>
          <p>
            <button onClick={this.downloadPdf} disabled>PDFダウンロード</button>
          </p>
          <p>
            <label>※変換したら必ずダウンロードしてください</label>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            <form onSubmit={this.handleSubmit}>
              <button type="submit" disabled>PDFに変換する</button>
            </form>
          </p>
          <p>
            <button onClick={this.downloadPdf}>PDFダウンロード</button>
          </p>
          <p>
            <label>※変換したら必ずダウンロードしてください</label>
          </p>
        </div>
      );
    }
  }
}

export default Conversion;
