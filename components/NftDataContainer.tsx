// ReviewContainer.tsx
import React from 'react';
import NftdataCard from './NftdataCard';
import { useEffect, useState } from "react";

interface MyReviewContainerProps {
  metaDataArray: any[];
  MyReviews?: boolean;
}

const NftdataContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray, MyReviews = false }) => {

  const handleReviewDeleted = () => {
    window.location.reload();
  };


  useEffect(() => {
    const call = () => {
        console.log("metaDataArray",metaDataArray);

    }
  call();
  }, [])
  

  const renderNoReviewsFound = () => (
    <div
      className="w-full text-center py-10"
      
    >
      <h2 className="text-4xl font-semibold text-gray-700">No Verified Projects</h2>
    </div>
  );

  return (
    <>
      <div
        className="container mx-auto px-4" style={{ overflowY: 'auto', maxHeight: '500px' }}
      >
        {metaDataArray?.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '2rem',
            // '@media (min-width: 768px)': {
            //   gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            // },
            // '@media (min-width: 1024px)': {
            //   gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            // },
            // '@media (min-width: 1280px)': {
            //   gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            // },
          }}
          >
            {metaDataArray?.map((metaData, index) => (
              <div key={index} className="py-2 flex">
                <NftdataCard
                  metaData={metaData}
                  MyReviews={MyReviews}
                  onReviewDeleted={handleReviewDeleted}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NftdataContainer;