import React from 'react';

const PageSetting = (props) => {
  const pageSizeTags = props.pageSizes.map(pageSize =>
    <option key={pageSize}>{pageSize}</option>
  );

  let isChecked = false;
  const orientationTags = props.orientations.map(orientation => {
    if(!isChecked) {
      isChecked = true;
      return <label><input type="radio" name="orientation" defaultChecked/>{orientation}</label>;
    } else {
      return <label><input type="radio" name="orientation"/>{orientation}</label>;
    }
  });

  return (
    <div>
      <h2>ページ設定</h2>
      <p>
        <label>用紙サイズ</label>
        <select
          defaultValue="A4"
          onChange={e => props.setPageSize(e.target.value)}>
          {pageSizeTags}
        </select>
      </p>
      <p>
        <label>用紙の向き</label>
        {orientationTags}
      </p>
      <p>
        <label>余白</label>
        <label>上
          <input type="text" defaultValue="20"/>
        </label>
        <label>左
          <input type="text" defaultValue="20"/>
        </label>
        <label>右
          <input type="text" defaultValue="20"/>
        </label>
        <label>下
          <input type="text" defaultValue="20"/>
        </label>
      </p>
    </div>
  );
}

export default PageSetting;
