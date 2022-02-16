import React, { useState } from 'react';

const useDistance = (startDistance) => {
  const [totalDistance, setTotalDistance] = useState(startDistance);
  const reduceDistance = (distance) => {
    setTotalDistance((prevDistance) => {
      const reducedDistance = prevDistance + distance;

      return reducedDistance;
    });
  };

  return [totalDistance, reduceDistance];
};

export default useDistance;
