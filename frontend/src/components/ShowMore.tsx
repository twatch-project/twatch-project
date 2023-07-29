import React, { useState } from 'react';
import Comment from './Comment';
const MyComponent = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex flex-col justify-center m-5">
      <button className="p-[15px] bg-blue text-white rounded-xl" onClick={handleToggleShowMore}>
        {showMore ? 'ShowLess' : 'ShowMore'}
      </button>
      {showMore && (
        <div>
          <p>
            <Comment />
          </p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
