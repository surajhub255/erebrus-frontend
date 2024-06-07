// pages/nodeinfo/[nodeId].js

import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { ReactWorldCountriesMap } from "react-world-countries-map";


const EREBRUS_GATEWAY_URL = process.env.NEXT_PUBLIC_EREBRUS_BASE_URL;

const NodeDetail = ({ node, id }) => {
  console.log("node data", node, id);

  const data = [
    { country: `${node.region}`, value: `${node.ipinfocity}` },
  ];

  return (
    <div className="bg-black text-white p-20">
      <div className="text-4xl font-semibold">{node.name}</div>

      <div className="text-lg">
      <div className="mt-10">
        Status: <span className={node.status === "active" ? "text-green-500" : "text-red-300"}>{node.status}</span>
        </div>
        <div className="mt-2">Domain: {node.domain}</div>
        <div className="mt-2">Start Time: {new Date(node.startTimeStamp * 1000).toLocaleString()}</div>
        <div className="mt-2">Last Pinged: {new Date(node.lastPingedTimeStamp * 1000).toLocaleString()}</div>
      </div>

      <div className="flex gap-4 mt-10">
        <div
          className="w-4/5 rounded-xl px-10 py-4"
          style={{
            backgroundColor: "#040819",
            backgroundImage: "linear-gradient(180deg, #5696FF33, #1B213A66)",
            border: "1px solid #5696FF",
          }}
        >
          <div className="text-xl" style={{ color: "#FFFFFF99" }}>
              Bandwidth trans. data
            </div>
        </div>
        <div className="w-1/5 rounded-xl text-black">
        <ReactWorldCountriesMap
        color="blue"
        title="Node Region"
        value-prefix="IP info city:   "
        size="sm"
        data={data}
      />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div
          className="w-1/2 rounded-xl px-10 py-4"
          style={{
            backgroundColor: "#1B213A",
            backgroundImage: "radial-gradient(#5F9AF933, #5F9AF900)",
          }}
        >
          <div className="text-xl" style={{ color: "#FFFFFF99" }}>
          Total clients
            </div>
        </div>
        <div
          className="w-1/2 rounded-xl px-10 py-4"
          style={{
            backgroundColor: "#1B213A",
            backgroundImage: "radial-gradient(#5F9AF933, #5F9AF900)",
          }}
        >
          <div className="text-xl" style={{ color: "#FFFFFF99" }}>
          DNS
            </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div
          className="w-2/3 rounded-xl px-10 py-4"
          style={{
            backgroundColor: "#1B213A",
          }}
        >
          <div className="text-xl" style={{ color: "#FFFFFF99" }}>
          All clients
            </div>
        </div>
        <div
          className="w-1/3 rounded-xl px-10 py-4"
          style={{
            backgroundColor: "#1B213A",
          }}
        >
          <div>
            <div className="text-xl" style={{ color: "#FFFFFF99" }}>
              Bandwidth trans. data
            </div>
          </div>
          <div className="flex gap-4 justify-between mt-4">
            <div>
              <div className="relative text-center">
                <img src="/ellipse1.png" className="w-40 h-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {node.uploadSpeed}
                </div>
              </div>
              <div className="text-center">Upload</div>
            </div>
            <div>
              <div className="relative text-center">
                <img src="/ellipse1.png" className="w-40 h-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {node.downloadSpeed}
                </div>
              </div>
              <div className="text-center">Download</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  const response = await axios.get(`${EREBRUS_GATEWAY_URL}api/v1.0/nodes/all`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  const payload = response.data.payload;

  const filteredNode = payload.find((node) => node.id === id);

  return {
    props: {
      node: filteredNode,
      id,
    },
  };
}

export default NodeDetail;