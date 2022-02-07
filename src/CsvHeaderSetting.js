import React from 'react';

const CsvHeaderSetting = (props) => {
  const fontFamilyTags = props.fontFamilies.map(fontFamily => 
    <option key={fontFamily}>{fontFamily}</option>
  );
  return (
    <div>
      <h2>CSVヘッダ設定</h2>
      <p>
        <label>
          フォントサイズ
          <input type="text" defaultValue="14"/>
        </label>
      </p>
      <p>
        <label>
          フォント名
          <select defaultValue="mplus1p-bold">
            {fontFamilyTags}
          </select>
        </label>
      </p>
      <p>
        <label>
          ヘッダマークの先頭
          <input type="text" defaultValue="【"/>
        </label>
      </p>
      <p>
        <label>
          ヘッダマークの末尾
          <input type="text" defaultValue="】"/>
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

export default CsvHeaderSetting;