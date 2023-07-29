import React, { useState } from 'react';

export default function DisplayBlock() {
  const [inputData, setInputData] = useState<string>('');
  const [displayData, setDisplayData] = useState<string[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const trimmedInput = inputData.trim();

      if (trimmedInput !== '') {
        setDisplayData((prevData) => [...prevData, trimmedInput]);
        setInputData('');
      }
    }
  };
  return (
    <div>
      <input
        type="text"
        value={inputData}
        onChange={(event) => setInputData(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div>
        {displayData.map((data, index) => (
          <div key={index}>{data}</div>
        ))}
      </div>
    </div>
  );
}
