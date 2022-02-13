import React, {useEffect} from 'react';

const CsvContentSetting = (props) => {
  const defaultFontSize = 11;
  const defaultFontFamily = "mplus1p-regular";

  useEffect(() => {
    props.setFontSize(defaultFontSize);
    props.setFontFamily(defaultFontFamily);
  }, []);

  const fontFamilyTags = props.fontFamilies.map(fontFamily => 
    <option key={fontFamily}>{fontFamily}</option>
  );
  return (
    <div>
      <h2>CSV内容の設定</h2>
      <p>
        <label>
          フォントサイズ
          <input
            type="text"
            defaultValue={defaultFontSize}
            onChange={e => props.setFontSize(e.target.value)}/>
        </label>
      </p>
      <p>
        <label>
          フォント名
          <select
            defaultValue={defaultFontFamily}
            onChange={e => props.setFontFamily(e.target.value)}>
            {fontFamilyTags}
          </select>
        </label>
      </p>
    </div>
  );
}

export default CsvContentSetting;
