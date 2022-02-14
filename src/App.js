import React, {useState, useEffect} from 'react';
import './App.css';
import CsvInput from './CsvInput.js';
import PageSetting from './PageSetting.js';
import CsvHeaderSetting from './CsvHeaderSetting.js';
import CsvContentSetting from './CsvContentSetting.js';
import Conversion from './Conversion.js';

const GET_PDF_PROPERTIES_URL = "https://gx8vyib51l.execute-api.us-west-2.amazonaws.com/dev/";

const App = () => {
  const [pdfProperty, setPdfProperty] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [csvHeaderItems, setCsvHeaderItems] = useState(null);
  const [pageSize, setPageSize] = useState(null);
  const [pageOrientation, setPageOrientation] = useState(null);
  const [pageMarginTop, setPageMarginTop] = useState(null);
  const [pageMarginLeft, setPageMarginLeft] = useState(null);
  const [pageMarginRight, setPageMarginRight] = useState(null);
  const [pageMarginBottom, setPageMarginBottom] = useState(null);
  const [headerFontSize, setHeaderFontSize] = useState(null);
  const [headerFontFamily, setHeaderFontFamily] = useState(null);
  const [headerMarkupStart, setHeaderMarkupStart] = useState(null);
  const [headerMarkupEnd, setHeaderMarkupEnd] = useState(null);
  const [targetItems, setTargetItems] = useState(null);
  const [contentFontSize, setContentFontSize] = useState(null);
  const [contentFontFamily, setContentFontFamily] = useState(null);

  // 初回のみプロパティ取得を実行
  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    console.log("GetPdfProperties calling");
    fetch(GET_PDF_PROPERTIES_URL, requestOptions)
      .then(response => response.json())
      .then(responseJson => setPdfProperty(responseJson))
      .catch(error => console.log('error', error));
  }, []);

  // PDFのプロパティ取得前の表示
  if (!pdfProperty) {
    return <div>...Loading</div>;
  }

  // PDFのプロパティ取得後の表示
  const pageMargin = [pageMarginTop, pageMarginLeft, pageMarginRight, pageMarginBottom];
  return (
    <div>
      <h1>CSV 2 PDF</h1>
      <CsvInput setCsvData={setCsvData} setCsvHeaderItems={setCsvHeaderItems}/>
      <PageSetting
        pageSizes={pdfProperty.PageSizes}
        setPageSize={setPageSize}
        orientations={pdfProperty.Orientations}
        setPageOrientation={setPageOrientation}
        setPageMarginTop={setPageMarginTop}
        setPageMarginLeft={setPageMarginLeft}
        setPageMarginRight={setPageMarginRight}
        setPageMarginBottom={setPageMarginBottom}/>
      <CsvHeaderSetting
        setFontSize={setHeaderFontSize}
        fontFamilies={pdfProperty.FontFamilies}
        setFontFamily={setHeaderFontFamily}
        setMarkupStart={setHeaderMarkupStart}
        setMarkupEnd={setHeaderMarkupEnd}
        targetItems={csvHeaderItems}
        setTargetItems={setTargetItems}/>
      <CsvContentSetting
        setFontSize={setContentFontSize}
        fontFamilies={pdfProperty.FontFamilies}
        setFontFamily={setContentFontFamily}/>
      <Conversion
        csvData={csvData}
        pageSize={pageSize}
        pageOrientation={pageOrientation}
        pageMargin={pageMargin}
        headerFontSize={headerFontSize}
        headerFontFamily={headerFontFamily}
        headerMarkupStart={headerMarkupStart}
        headerMarkupEnd={headerMarkupEnd}
        targetItems={targetItems}
        contentFontSize={contentFontSize}
        contentFontFamily={contentFontFamily}/>
    </div>
  );
}

export default App;
