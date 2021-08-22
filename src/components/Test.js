import React from 'react';

function Test(data) {
  const item = data.data;
  return (
    <div>
      <h1>
        {item.name} {item.classic}
      </h1>
    </div>
  );
}

export default Test;
