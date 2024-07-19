import React, { useState } from 'react';

const NodeDwifiStream = () => {
  const [data, setData] = useState([
    {
      id: 1,
      gateway: "192.168.146.901",
      created_at: "2024-07-18T05:39:08+05:30",
      updated_at: "2024-07-18T05:39:08+05:30",
      status: [
        {
          macAddress: "02:42:ac:11:00:02",
          ipAddress: "172.17.0.2",
          connectedAt: "2024-07-18T00:09:08.096117593+05:30",
          totalConnectedTime: 157816739609,
          connected: true,
          lastChecked: "2024-07-18T00:09:08.096117783+05:30",
          defaultGateway: "192.168.146.198",
          manufacturer: "Unknown Manufacturer",
          interfaceName: "docker0",
          hostSSID: "docker0"
        },
        {
          macAddress: "02:42:ac:11:00:03",
          ipAddress: "172.17.0.3",
          connectedAt: "2024-07-18T00:09:08.096245773+05:30",
          totalConnectedTime: 155652484334,
          connected: true,
          lastChecked: "2024-07-18T00:09:08.096246063+05:30",
          defaultGateway: "192.168.146.198",
          manufacturer: "Unknown Manufacturer",
          interfaceName: "docker0",
          hostSSID: "docker0"
        },
        {
          macAddress: "9e:ce:0b:56:a2:fc",
          ipAddress: "192.168.146.198",
          connectedAt: "2024-07-18T00:09:00.719585384+05:30",
          totalConnectedTime: 172140026407,
          connected: true,
          lastChecked: "2024-07-18T00:09:00.719585926+05:30",
          defaultGateway: "192.168.146.198",
          manufacturer: "(Unknown: locally administered)",
          interfaceName: "wlp1s0",
          hostSSID: "AndroidAP"
        },
        {
          macAddress: "e0:1f:88:2f:74:2f",
          ipAddress: "192.168.146.89",
          connectedAt: "2024-07-18T00:08:51.552908326+05:30",
          totalConnectedTime: 45642751993,
          connected: false,
          lastChecked: "2024-07-18T00:08:51.5529087+05:30",
          defaultGateway: "192.168.146.198",
          manufacturer: "Xiaomi Communications Co Ltd",
          interfaceName: "wlp1s0",
          hostSSID: "AndroidAP"
        }
      ]
    }
  ]);

  return (
    <div className='text-white'>
      <h1>NodeDwifi Stream Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Gateway</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>MAC Address</th>
            <th>IP Address</th>
            <th>Connected At</th>
            <th>Total Connected Time</th>
            <th>Connected</th>
            <th>Last Checked</th>
            <th>Default Gateway</th>
            <th>Manufacturer</th>
            <th>Interface Name</th>
            <th>Host SSID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            item.status.map((device, index) => (
              <tr key={`${item.id}-${index}`}>
                {index === 0 && (
                  <>
                    <td rowSpan={item.status.length}>{item.id}</td>
                    <td rowSpan={item.status.length}>{item.gateway}</td>
                    <td rowSpan={item.status.length}>{new Date(item.created_at).toLocaleString()}</td>
                    <td rowSpan={item.status.length}>{new Date(item.updated_at).toLocaleString()}</td>
                  </>
                )}
                <td>{device.macAddress}</td>
                <td>{device.ipAddress}</td>
                <td>{new Date(device.connectedAt).toLocaleString()}</td>
                <td>{device.totalConnectedTime}</td>
                <td>{device.connected.toString()}</td>
                <td>{new Date(device.lastChecked).toLocaleString()}</td>
                <td>{device.defaultGateway}</td>
                <td>{device.manufacturer}</td>
                <td>{device.interfaceName}</td>
                <td>{device.hostSSID}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NodeDwifiStream;
