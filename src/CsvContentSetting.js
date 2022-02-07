import React from 'react';

const CsvContentSetting = (props) => {
  const fontFamilyTags = props.fontFamilies.map(fontFamily => 
    <option key={fontFamily}>{fontFamily}</option>
  );
  return (
    <div>
      <h2>CSV内容の設定</h2>
      <p>
        <label>
          フォントサイズ
          <input type="text" defaultValue="11"/>
        </label>
      </p>
      <p>
        <label>
          フォント名
          <select defaultValue="mplus1p-regular">
            {fontFamilyTags}
          </select>
        </label>
      </p>
    </div>
  );
}

export default CsvContentSetting;
