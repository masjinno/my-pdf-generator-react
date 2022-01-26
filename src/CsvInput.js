import React from 'react';

class CsvInput extends React.Component {
  render() {
    return (
      <p>
        <label>
          CSVファイル
          <input type="file" id="csv_file" accept="text/csv"/>
        </label>
      </p>
    );
  }
}

export default CsvInput;
