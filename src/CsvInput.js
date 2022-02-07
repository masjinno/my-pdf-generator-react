import React from 'react';

const CsvInput = () => {
  return (
    <p>
      <label>
        CSVファイル
        <input type="file" id="csv_file" accept="text/csv"/>
      </label>
    </p>
  );
}

export default CsvInput;
