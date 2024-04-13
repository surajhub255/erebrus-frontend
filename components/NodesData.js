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
              `${EREBRUS_GATEWAY_URL}api/v1.0/nodes/all`,
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
      className="flex flex-col items-center justify-start scroll-mt-16 lg:scroll-mt-0 min-h-screen"
      style={{backgroundColor:'#202434'}}
    >
      <div className="font-figtree text-left text-gray-200 w-full">
        {/* <h1 className="font-bold text-4xl lg:mb-16 mb-12 lg:mt-36 text-left">
          Erebrus Nodes Data
        </h1> */}
        <div className="text-white">

          <div className="flex uppercase">
            <div className="flex gap-4 w-1/3 justify-center items-center p-6" style={{border:'solid 1px #FFFFFF66'}}>
              <img src="/nodetable1.png" className="w-20 h-20"/>
              <div>
                <div>No. of Nodes</div>
                <div className="text-3xl">{nodesdata.length}</div>
              </div>
            </div>
            <div className="flex gap-4 w-1/3 justify-center items-center p-6" style={{border:'solid 1px #FFFFFF66'}}>
              <img src="/nodetable2.png" className="w-14 h-14"/>
              <div>
                <div>No. of Regions</div>
                <div className="text-3xl">{nodesdata.length}</div>
              </div>
            </div>
            <div className="flex gap-4 w-1/3 justify-center items-center p-6" style={{border:'solid 1px #FFFFFF66'}}>
              <img src="/nodetable3.png" className="w-20 h-12"/>
              <div>
                <div>Active Nodes</div>
                <div className="text-3xl">{"000000"}</div>
              </div>
            </div>
          </div>
        <table className="w-full text-center">
      <thead>
        <tr>
          <th style={{border:'solid 1px #FFFFFF66'}}>
            <div className="flex gap-4 justify-center items-center pt-2 pb-10 px-4">
              <img src="/nodetable4.png" className="w-12 h-12"/>
              <div>NODE ID</div>
            </div>
            </th>
            <th style={{border:'solid 1px #FFFFFF66'}}>
            <div className="flex gap-4 justify-center items-center pt-2 pb-10 px-4">
              <img src="/nodetable5.png" className="w-10 h-10"/>
              <div>NODE NAME</div>
            </div>
            </th>
            <th style={{border:'solid 1px #FFFFFF66'}}>
            <div className="flex gap-4 justify-center items-center pt-2 pb-10 px-4">
              <img src="/nodetable6.png" className="w-10 h-10"/>
              <div>REGION</div>
            </div>
            </th>
            <th style={{border:'solid 1px #FFFFFF66'}}>
            <div className="flex gap-4 justify-center items-center pt-2 pb-10 px-4">
              <img src="/nodetable7.png" className="w-10 h-10"/>
              <div>NETWORK SPEED</div>
            </div>
            </th>
            <th style={{border:'solid 1px #FFFFFF66'}}>
            <div className="flex gap-4 justify-center items-center pt-2 pb-10 px-4">
              <img src="/nodetable8.png" className="w-10 h-10"/>
              <div>LATENCY</div>
            </div>
            </th>
            <th style={{border:'solid 1px #FFFFFF66'}}>
            <div className="flex gap-4 justify-center items-center pt-2 pb-10 px-4">
              <img src="/nodetable9.png" className="w-10 h-10"/>
              <div>UPTIME</div>
            </div>
            </th>
          {/* <th>Last Pinged</th> */}
        </tr>
      </thead>
      <tbody>
        {nodesdata.map((node) => (
          <tr key={node.id}>
            <td style={{border:'solid 1px #FFFFFF66'}}>
              <div className="flex gap-4 justify-center items-center py-10 px-4">{node.id.slice(0, 4)}...{node.id.slice(-4)}</div>
              </td>
            <td style={{border:'solid 1px #FFFFFF66'}}>
              <div className="flex gap-4 justify-center items-center py-10 px-4">{node.nodeName}</div>
              </td>
            <td style={{border:'solid 1px #FFFFFF66'}}>
              <div className="flex gap-4 justify-center items-center py-10 px-4">{node.region}</div>
              </td>
            <td style={{border:'solid 1px #FFFFFF66'}}>
              <div className="flex gap-4 justify-center items-center py-10 px-4">{node.networkSpeed}</div>
              </td>
            <td style={{border:'solid 1px #FFFFFF66'}}>
              <div className="flex gap-4 justify-center items-center py-10 px-4">{node.latency}</div>
              </td>
            <td style={{border:'solid 1px #FFFFFF66'}}>
              <div className="flex gap-4 justify-center items-center py-10 px-4">{node.uptime}</div>
              </td>
            {/* <td style={{paddingTop:'20px'}}>{node.lastPinged}</td> */}
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
