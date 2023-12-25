import React, { useState, useEffect } from 'react';

function YourComponent() {
  const [data, setData] = useState([]);
  const [defaultValue, setDefaultValue] = useState('');
  
  useEffect(() => {
    // Fetch data from JSON URL
    fetch('https://your-json-api-url.com/data')
      .then(response => response.json())
      .then(data => {
        setData(data);

        // Set default value (e.g., the first item in the data)
        if (data.length > 0) {
          setDefaultValue(data[0].value); // Change 'value' to the actual property you want to set as the default
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Your Component</h2>
      <select
        value={defaultValue}
        onChange={(e) => setDefaultValue(e.target.value)}
      >
        {data.map(item => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YourComponent;
