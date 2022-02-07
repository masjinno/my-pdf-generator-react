// import logo from './logo.svg';
import React from 'react';
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
    const margin = [ 20, 21, 22, 23 ];
    const targetItems = [ "A", "B" ];
    return (
      <div>
        <h1>CSV 2 PDF</h1>
        <CsvInput/>
        <PageSetting
          pageSizes={this.state.pdfProperty.PageSizes}
          orientations={this.state.pdfProperty.Orientations}/>
        <CsvHeaderSetting fontFamilies={this.state.pdfProperty.FontFamilies}/>
        <CsvContentSetting fontFamilies={this.state.pdfProperty.FontFamilies}/>
        <Conversion
          csvData="A,B\na1,b1\na2,b2"
          pageSize="A4"
          pageOrientation="縦向き"
          pageMargin={margin}
          headerFontSize="15"
          headerFontFamily="mplus1p-bold"
          headerMarkupStart="【"
          headerMarkupEnd="】"
          targetItems={targetItems}
          contentFontSize="11"
          contentFontFamily="mplus1p-regular"/>
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
