import React, {useEffect} from 'react';

const PageSetting = (props) => {
  // デフォルト値の定義
  const defaultSize = "A4";
  const defaultOrientation = "縦向き";
  const defaultMargin = 20;

  // 初回のみの処理
  useEffect(() => {
    // 各種デフォルト値をコンポーネントの返却値に入れておく
    props.setPageSize(defaultSize);
    props.setPageOrientation(defaultOrientation);
    props.setPageMarginTop(defaultMargin);
    props.setPageMarginLeft(defaultMargin);
    props.setPageMarginRight(defaultMargin);
    props.setPageMarginBottom(defaultMargin);
  }, []);

  // 用紙サイズはPDFプロパティで取得できた設定可能な値を選択肢に設定
  let idNum = 0;
  const pageSizeElements = props.pageSizes.map(pageSize =>
    <option key={(idNum++) + "_" + pageSize}>{pageSize}</option>
  );

  // 用紙の向きも用紙サイズと同様
  idNum = 0;
  const orientationElements = props.orientations.map(orientation =>
    <label>
      <input
        type="radio"
        name="orientation"
        key={(idNum++) + "_" + orientation}
        onClick={e => props.setPageOrientation(orientation)}
        defaultChecked={orientation==defaultOrientation}/>
      {orientation}
    </label>
  );

  return (
    <div>
      <h2>ページ設定</h2>
      <p>
        <label>用紙サイズ</label>
        <select
          defaultValue={defaultSize}
          onChange={e => props.setPageSize(e.target.value)}>
          {pageSizeElements}
        </select>
      </p>
      <p>
        <label>用紙の向き</label>
        {orientationElements}
      </p>
      <p>
        <label>余白</label>
        <label>上
          <input
            type="text"
            defaultValue={defaultMargin}
            onChange={e => props.setPageMarginTop(e.target.value)}/>
        </label>
        <label>左
          <input
            type="text"
            defaultValue={defaultMargin}
            onChange={e => props.setPageMarginLeft(e.target.value)}/>
        </label>
        <label>右
          <input
            type="text"
            defaultValue={defaultMargin}
            onChange={e => props.setPageMarginRight(e.target.value)}/>
        </label>
        <label>下
          <input
            type="text"
            defaultValue={defaultMargin}
            onChange={e => props.setPageMarginBottom(e.target.value)}/>
        </label>
      </p>
    </div>
  );
}

export default PageSetting;
