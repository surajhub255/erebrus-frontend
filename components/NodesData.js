import React, {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
const EREBRUS_GATEWAY_URL = process.env.NEXT_PUBLIC_EREBRUS_BASE_URL;

const NodesData = () => {

      const [nodesdata, setNodesData] = useState([])

      useEffect(() => {
        const fetchNodesData = async () => {
          try {
            const auth = Cookies.get("erebrus_token");

            const response = await axios.get(
              `${EREBRUS_GATEWAY_URL}/api/v1.0/nodes/all`,
              {
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${auth}`,
                },
              }
            );
        
            if (response.status === 200) {
              const payload = response.data.payload;
              setNodesData(payload);
              console.log("erebrus nodes", payload);
            }
          } catch (error) {
            console.error("Error fetching nodes data:", error);
          } finally {
          }
        };

        fetchNodesData();
  }, []);

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
        {nodesdata.map((node) => (
          <tr style={{paddingTop:'20px'}} key={node.id}>
            <td style={{paddingTop:'20px'}}>{node.id}</td>
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
