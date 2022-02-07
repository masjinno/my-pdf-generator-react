// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import CsvInput from './CsvInput.js';
import PageSetting from './PageSetting.js';
import CsvHeaderSetting from './CsvHeaderSetting.js';
import CsvContentSetting from './CsvContentSetting.js';
import Conversion from './Conversion.js';

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

const App = () => {
  const [pdfProperty, setPdfProperty] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [pageSize, setPageSize] = useState("B4");
  const [pageOrientation, setPageOrientation] = useState("横向き");
  const [pageMargin, setPageMargin] = useState([30,31,32,33]);

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    fetch(GET_PDF_PROPERTIES_URL, requestOptions)
      .then(response => response.json())
      .then(responseJson => setPdfProperty(responseJson))
      .catch(error => console.log('error', error));
  }, []);

  if (!pdfProperty) {
    return <div>...Loading</div>;
  }
  const targetItems = [ "性別", "年齢", "楽器経験", "楽器は何ですか？",
    "ご来場は、何回目ですか？", "本日の演奏会を、何でお知りになりましたか？（複数回答可）",
    "詳細", "エルガー／エニグマ変奏曲", "マーラー／交響曲第1番「巨人」", "お気づきの点"
  ];
  return (
    <div>
      <h1>CSV 2 PDF</h1>
      <CsvInput setCsvData={setCsvData}/>
      <PageSetting
        pageSizes={pdfProperty.PageSizes}
        setPageSize={setPageSize}
        orientations={pdfProperty.Orientations}
        setPageOrientation={setPageOrientation} />
      <CsvHeaderSetting fontFamilies={pdfProperty.FontFamilies}/>
      <CsvContentSetting fontFamilies={pdfProperty.FontFamilies}/>
      <Conversion
        csvData={csvData}
        pageSize={pageSize}
        pageOrientation={pageOrientation}
        pageMargin={pageMargin}
        headerFontSize="15"
        headerFontFamily="mplus1p-bold"
        headerMarkupStart="【"
        headerMarkupEnd="】"
        targetItems={targetItems}
        contentFontSize="11"
        contentFontFamily="mplus1p-regular"/>
    </div>
  );
}

export default App;
