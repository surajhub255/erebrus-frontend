// ReviewContainer.tsx
"use client"
import React from "react";
import NftdataCard from "./NftdataCard";
// import { useEffect, useState } from "react";

interface MyReviewContainerProps {
  metaDataArray: any[];
  MyReviews?: boolean;
  selectCollection: any;
}

const NftdataContainer: React.FC<MyReviewContainerProps> = ({
  metaDataArray,
  MyReviews = false,
  selectCollection,
}) => {
  const handleReviewDeleted = () => {
    window.location.reload();
  };

  // useEffect(() => {
  //   const call = () => {
  //     console.log("metaDataArray", metaDataArray);
  //   };
  //   call();
  // }, []);

  const handleClick = (collection_id: string) => {
    // Call the function passed as prop to change parent state
    selectCollection(collection_id);
  };
  const renderNoReviewsFound = () => (
    <div className="w-full text-center py-10">
      <h2 className="text-4xl font-semibold text-gray-700">
        No Verified Projects
      </h2>
    </div>
  );

  return (
    <>
      <div
        className="mx-auto px-4"
        // style={{ overflowY: "auto", maxHeight: "500px" }}
      >
        {metaDataArray?.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "2rem",
            }}
          >
            {metaDataArray?.map((metaData, index) => (
              <div
                key={index}
                className="py-2 flex"
                onClick={() =>
                  handleClick(metaData.current_token_data.token_data_id)
                }
              >
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
