import React from "react";
import Link from "next/link";

const NodesData = () => {

    const data = [
        {
          nodeId: 1,
          nodeName: "Node A",
          region: "US",
          networkSpeed: "1 Gbps",
          latency: "10 ms",
          uptime: "99.9%",
          lastPinged: "2024-04-10T12:00:00Z"
        },
        {
          nodeId: 2,
          nodeName: "Node B",
          region: "EU",
          networkSpeed: "500 Mbps",
          latency: "20 ms",
          uptime: "99.5%",
          lastPinged: "2024-04-10T12:05:00Z"
        },
        {
          nodeId: 3,
          nodeName: "Node C",
          region: "Asia",
          networkSpeed: "250 Mbps",
          latency: "30 ms",
          uptime: "98.7%",
          lastPinged: "2024-04-10T12:10:00Z"
        }
      ];

  return (
    <div
      id="howto"
      className="flex flex-col items-center justify-start scroll-mt-16 lg:scroll-mt-0 lg:mb-36 mb-24"
    >
      <div className="mb-2 font-figtree w-[70%] text-left text-gray-200">
        <h1 className="font-bold text-4xl lg:mb-16 mb-12 lg:mt-36 text-left">
          Erebrus Nodes Data
        </h1>
        <div className="p-20 rounded-xl text-black"  style={{backgroundColor:'#8EB9FF'}}>
        <table className="w-full text-center">
      <thead>
        <tr>
          <th>Node ID</th>
          <th>Node Name</th>
          <th>Region</th>
          <th>Network Speed</th>
          <th>Latency</th>
          <th>Uptime</th>
          <th>Last Pinged</th>
        </tr>
      </thead>
      <tbody>
        {data.map((node) => (
          <tr style={{paddingTop:'20px'}} key={node.nodeId}>
            <td style={{paddingTop:'20px'}}>{node.nodeId}</td>
            <td style={{paddingTop:'20px'}}>{node.nodeName}</td>
            <td style={{paddingTop:'20px'}}>{node.region}</td>
            <td style={{paddingTop:'20px'}}>{node.networkSpeed}</td>
            <td style={{paddingTop:'20px'}}>{node.latency}</td>
            <td style={{paddingTop:'20px'}}>{node.uptime}</td>
            <td style={{paddingTop:'20px'}}>{node.lastPinged}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
      </div>
    </div>
  );
};

export default NodesData;
