import React from 'react';

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

export default CsvHeaderSetting;