import React from 'react';

class PageSetting extends React.Component {
  constructor(props) {
    super(props);
    this.pageSizes = props.pageSizes;
    this.orientations = props.orientations;
  }

  render() {
    const pageSizeTags = this.pageSizes.map(pageSize => {
      return <option>{pageSize}</option>
    });

    const orientationTags = this.orientations.map(orientation =>
      <label><input type="radio" name="orientation"/>{orientation}</label>
    );

    return (
      <div>
        <h2>ページ設定</h2>
        <p>
          <label>
            用紙サイズ
            <select>
              {pageSizeTags}
            </select>
          </label>
        </p>
        <p>
          <label>用紙の向き</label>
          {orientationTags}
        </p>
        <p>
          <label>余白</label>
          <label>上
            <input type="text"/>
          </label>
          <label>左
            <input type="text"/>
          </label>
          <label>右
            <input type="text"/>
          </label>
          <label>下
            <input type="text"/>
          </label>
        </p>
      </div>
    );
  }
}

export default PageSetting;
