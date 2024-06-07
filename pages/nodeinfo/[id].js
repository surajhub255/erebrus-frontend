// pages/nodeinfo/[nodeId].js

import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const EREBRUS_GATEWAY_URL = process.env.NEXT_PUBLIC_EREBRUS_BASE_URL;

const NodeDetail = ({ node, id }) => {
  
    console.log("node data", node, id);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white"
      style={{ padding: "20px" }}
    >
      {/* <Link href="/">
        <a className="text-blue-300 underline mb-4">Back to Nodes</a>
      </Link> */}
      <div className="p-6 max-w-md border border-gray-300 rounded-lg bg-gray-800 shadow-md">
        <h1 className="text-2xl mb-4">Node Details for {id}</h1>
        <div className="mb-2">
          <strong>Name:</strong> {node.name}
        </div>
        <div className="mb-2">
          <strong>Region:</strong> {node.region}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {node.status}
        </div>
        <div className="mb-2">
          <strong>Download Speed:</strong> {node.downloadSpeed}
        </div>
        <div className="mb-2">
          <strong>Upload Speed:</strong> {node.uploadSpeed}
        </div>
        <div className="mb-2">
          <strong>Start Time:</strong> {new Date(node.startTimeStamp * 1000).toLocaleString()}
        </div>
        <div className="mb-2">
          <strong>Last Pinged:</strong> {new Date(node.lastPingedTimeStamp * 1000).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
    const { id } = context.query

    const response = await axios.get(
        `${EREBRUS_GATEWAY_URL}api/v1.0/nodes/all`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );

        const payload = response.data.payload;

        const filteredNode = payload.find((node) => node.id === id);

    return {
        props: {
            node: filteredNode,
            id
        }
    }
}

export default NodeDetail;
