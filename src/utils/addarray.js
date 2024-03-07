import React, { useState } from 'react';

const CheckboxGroup = () => {
  const [arr, setArr] = useState([]);

  const myFunction = (inputCB) => {
    // Check if the checkbox is checked
    if (inputCB.checked) {
      // If checked, add the ID to the array
      setArr(prevArr => [...prevArr, inputCB.id]);
    } else {
      // If unchecked, remove the ID from the array
      setArr(prevArr => prevArr.filter(id => id !== inputCB.id));
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((el) => (
        <input
          key={el}
          type="checkbox"
          id={`cb${el}`}
          onChange={(e) => myFunction(e.target)}
        />
      ))}

      {/* Display the selected checkbox IDs */}
      <div>
        Selected Checkboxes: {JSON.stringify(arr)}
      </div>
    </div>
  );
};

export default CheckboxGroup;
