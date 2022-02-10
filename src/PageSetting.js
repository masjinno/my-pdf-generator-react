import React, {useEffect} from 'react';

const PageSetting = (props) => {
  const defaultSize = "A4";
  const defaultOrientation = "縦向き";
  const defaultMargin = 20;

  useEffect(() => {
    props.setPageSize(defaultSize);
    props.setPageOrientation(defaultOrientation);
    props.setPageMarginTop(defaultMargin);
    props.setPageMarginLeft(defaultMargin);
    props.setPageMarginRight(defaultMargin);
    props.setPageMarginBottom(defaultMargin);
  }, []);

  const pageSizeElements = props.pageSizes.map(pageSize =>
    <option key={pageSize}>{pageSize}</option>
  );

  const orientationElements = props.orientations.map(orientation => {
    if(orientation == defaultOrientation) {
      return (
        <label>
          <input
            type="radio"
            name="orientation"
            onClick={e => props.setPageOrientation(orientation)}
            defaultChecked/>
          {orientation}
        </label>
      );
    } else {
      return (
        <label>
          <input
            type="radio"
            name="orientation"
            onClick={e => props.setPageOrientation(orientation)}/>
            {orientation}
        </label>
      );
    }
  });

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
