import React, {useEffect} from 'react';

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
    props.setTargetItems(props.targetItems);
  }, []);

  const fontFamilyElements = props.fontFamilies.map(fontFamily =>
    <option key={fontFamily}>{fontFamily}</option>
  );

  let targetItemElements = <>-</>;
  if (props.targetItems) {
    props.setTargetItems(props.targetItems);
    let idNum = 0;
    targetItemElements = props.targetItems.map(targetItem =>
      <label>
        <input
          type="checkbox"
          key={(idNum++) + "_" + targetItem}
          defaultChecked
          disabled
          onChange={
            e => {
              const checkedTargetItemElements = targetItemElements.filter(elm =>{
                // ここ↓のcheckedがundefinedになる。解決策を求む。
                // console.log(elm.props.children[0].props.checked);
                // return elm.props.children[0].props.checked;
                return true;
              }).map(elm => elm.props.children[1]);
              console.log(checkedTargetItemElements);
              props.setTargetItems(checkedTargetItemElements);
            }
          }/>
          {targetItem}
      </label>
    );
  }
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
        <label key="targetItemsLabel">出力対象項目<b>※未実装機能</b></label>
        {targetItemElements}
      </p>
    </div>
  );
}

export default CsvHeaderSetting;
