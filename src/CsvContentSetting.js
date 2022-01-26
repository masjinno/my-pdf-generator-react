import React from 'react';

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

export default CsvContentSetting;
