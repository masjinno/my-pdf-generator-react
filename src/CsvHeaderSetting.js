import React, {useState, useEffect} from 'react';

const CsvHeaderSetting = (props) => {
  const defaultFontSize = 14;
  const defaultFontFamily = "mplus1p-bold";
  const defaultMarkupStart = "【";
  const defaultMarkupEnd = "】";

  useEffect(() => {
    props.setFontSize(defaultFontSize);
    props.setFontFamily(defaultFontFamily);
    props.setMarkupStart(defaultMarkupStart);
    props.setMarkupEnd(defaultMarkupEnd);
  }, []);

  const fontFamilyElements = props.fontFamilies.map(fontFamily =>
    <option key={fontFamily}>{fontFamily}</option>
  );
  const targetItemElements = !props.targetItems ? <>-</> :
    props.targetItems.map(targetItem =>
      <label>
        <input
          type="checkbox"
          defaultChecked
          key={targetItem}
          onChange={
            e => {
              console.log(`${targetItem} is ${e.target.checked}`);
              let checkedTargetItemElements = targetItemElements.filter(elm =>{
                return true;
              }).map(elm => {
                return elm.props.children[1];
              });
              console.log(checkedTargetItemElements);
              props.setTargetItems(checkedTargetItemElements);
            }
          }/>
          {targetItem}
      </label>
    );
  props.setTargetItems(props.targetItems);
  return (
    <div>
      <h2>CSVヘッダ設定</h2>
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
        <label>フォント名</label>
        <select
          defaultValue={defaultFontFamily}
          onChange={e => props.setFontFamily(e.target.value)}>
          {fontFamilyElements}
        </select>
      </p>
      <p>
        <label>ヘッダマークの先頭</label>
        <input
          type="text"
          defaultValue={defaultMarkupStart}
          onChange={e => props.setMarkupStart(e.target.value)}/>
      </p>
      <p>
        <label>ヘッダマークの末尾</label>
        <input
          type="text"
          defaultValue={defaultMarkupEnd}
          onChange={e => props.setMarkupEnd(e.target.value)}/>
      </p>
      <p>
        <label>出力対象項目</label>
        {targetItemElements}
      </p>
    </div>
  );
}

export default CsvHeaderSetting;