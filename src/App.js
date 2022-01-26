// import logo from './logo.svg';
import React from 'react';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const GET_PDF_PROPERTIES_URL = "https://gx8vyib51l.execute-api.us-west-2.amazonaws.com/dev/";
const GENERATE_PDF_FROM_CSV_URL = "https://rbc3vgq16a.execute-api.us-west-2.amazonaws.com/dev/";

class CsvInput extends React.Component {
  render() {
    return (
      <p>
        <label>
          CSVファイル
          <input type="file" id="csv_file" accept="text/csv"/>
        </label>
      </p>
    );
  }
}

class PageSetting extends React.Component {
  constructor(props) {
    super(props);
    this.pageSizes = props.pageSizes;
    this.orientations = props.orientations;
  }

  render() {
    const pageSizeTags = this.pageSizes.map(pageSize => {
      return <option>{pageSize}</option>
    });

    const orientationTags = this.orientations.map(orientation =>
      <label><input type="radio" name="orientation"/>{orientation}</label>
    );

    return (
      <div>
        <h2>ページ設定</h2>
        <p>
          <label>
            用紙サイズ
            <select>
              {pageSizeTags}
            </select>
          </label>
        </p>
        <p>
          <label>用紙の向き</label>
          {orientationTags}
        </p>
        <p>
          <label>余白</label>
          <label>上
            <input type="text"/>
          </label>
          <label>左
            <input type="text"/>
          </label>
          <label>右
            <input type="text"/>
          </label>
          <label>下
            <input type="text"/>
          </label>
        </p>
      </div>
    );
  }
}

class CsvHeaderSetting extends React.Component {
  constructor(props) {
    super(props)
    this.fontFamilies = props.fontFamilies;
  }

  render() {
    const fontFamilyTags = this.fontFamilies.map(fontFamily => 
      <option key={fontFamily}>{fontFamily}</option>
    );
    return (
      <div>
        <h2>CSVヘッダ設定</h2>
        <p>
          <label>
            フォントサイズ
            <input type="text"/>
          </label>
        </p>
        <p>
          <label>
            フォント名
            <select>
              {fontFamilyTags}
            </select>
          </label>
        </p>
        <p>
          <label>
            ヘッダマークの先頭
            <input type="text"/>
          </label>
        </p>
        <p>
          <label>
            ヘッダマークの末尾
            <input type="text"/>
          </label>
        </p>
        <p>
          <label>
            出力対象項目
            <label>
              <input type="checkbox"/>aaa
            </label>
            <label>
              <input type="checkbox"/>bbb
            </label>
          </label>
        </p>
      </div>
    );
  }
}

class CsvContentSetting extends React.Component {
  constructor(props) {
    super(props)
    this.fontFamilies = props.fontFamilies;
  }

  render() {
    const fontFamilyTags = this.fontFamilies.map(fontFamily => 
      <option key={fontFamily}>{fontFamily}</option>
    );
    return (
      <div>
        <h2>CSV内容の設定</h2>
        <p>
          <label>
            フォントサイズ
            <input type="text"/>
          </label>
        </p>
        <p>
          <label>
            フォント名
            <select>
              {fontFamilyTags}
            </select>
          </label>
        </p>
      </div>
    );
  }
}

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfProperty: null
    };
  }

  getProperty() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    fetch(GET_PDF_PROPERTIES_URL, requestOptions)
      .then(response => response.json())
      .then(responseJson =>
        this.setState(
          {
            pdfProperty: responseJson
          }
        ))
      .catch(error => console.log('error', error));
  }

  componentDidMount() {
    this.getProperty();
  }

  render() {
    if (!this.state.pdfProperty) {
      return <div>...Loading</div>;
    }
    return (
      <div>
        <h1>CSV 2 PDF</h1>
        <CsvInput/>
        <PageSetting
          pageSizes={this.state.pdfProperty.PageSizes}
          orientations={this.state.pdfProperty.Orientations}/>
        <CsvHeaderSetting fontFamilies={this.state.pdfProperty.FontFamilies}/>
        <CsvContentSetting fontFamilies={this.state.pdfProperty.FontFamilies}/>
        <Conversion/>
        <div>
          <h2>デバッグエリア</h2>
          <p>
            <label>
              getPdfProperty
              <textarea value={JSON.stringify(this.state.pdfProperty)} readOnly/>
            </label>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
