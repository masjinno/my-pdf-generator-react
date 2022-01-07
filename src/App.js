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

class CsvInput extends React.Component {
  render() {
    return (
      <p>
        <label for="csv_file">
          CSVファイル
          <input type="file" id="csv_file" accept="text/csv"/>
        </label>
      </p>
    );
  }
}

class PageSetting extends React.Component {
  render() {
    return (
      <div>
        <h2>ページ設定</h2>
        <p>
          <label for="page_size">
            用紙サイズ
            <select>
              <option>a</option>
              <option>b</option>
            </select>
          </label>
        </p>
        <p>
          <label>用紙の向き</label>
          <label><input type="radio" name="orientation" value="a"/>縦向き</label>
          <label><input type="radio" name="orientation" value="b"/>横向き</label>
        </p>
        <p>
          <label>余白</label>
          <label for="margin_top">上
            <input type="text" id="margin_top"/>
          </label>
          <label for="margin_left">左
            <input type="text" id="margin_left"/>
          </label>
          <label for="margin_right">右
            <input type="text" id="margin_right"/>
          </label>
          <label for="margin_bottom">下
            <input type="text" id="margin_bottom"/>
          </label>
        </p>
      </div>
    );
  }
}

class CsvHeaderSetting extends React.Component {
  render() {
    return (
      <div>
        <h2>CSVヘッダ設定</h2>
        <p>
          <label for="header_font_size">
            フォントサイズ
            <input type="text" id="header_font_size"/>
          </label>
        </p>
        <p>
          <label for="header_font_family">
            フォント名
            <input type="text" id="header_font_family"/>
          </label>
        </p>
        <p>
          <label for="header_markup_start">
            ヘッダマークの先頭
            <input type="text" id="header_markup_start"/>
          </label>
        </p>
        <p>
          <label for="header_markup_end">
            ヘッダマークの末尾
            <input type="text" id="header_markup_end"/>
          </label>
        </p>
        <p>
          <label>
            出力対象項目
            <label>
              <input type="checkbox" id="header_markup_end"/>aaa
            </label>
            <label>
              <input type="checkbox" id="header_markup_end"/>bbb
            </label>
          </label>
        </p>
      </div>
    );
  }
}

class CsvContentSetting extends React.Component {
  render() {
    return (
      <div>
        <h2>CSV内容の設定</h2>
        <p>
          <label for="content_font_size">
            フォントサイズ
            <input type="text" id="header_font_size"/>
          </label>
        </p>
        <p>
          <label for="content_font_family">
            フォント名
            <input type="text" id="header_font_family"/>
          </label>
        </p>
      </div>
    );
  }
}

class Conversion extends React.Component {
  render() {
    return (
      <p>
        <input type="submit" value="PDFに変換する"/>
      </p>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>CSV 2 PDF</h1>
        <CsvInput/>
        <PageSetting/>
        <CsvHeaderSetting/>
        <CsvContentSetting/>
        <Conversion/>
      </div>
    );
  }
}

export default App;
