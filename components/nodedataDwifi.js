"use client"
import React, { useState, useEffect } from 'react';

const NodeDwifiStream = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('wss://dev.gateway.erebrus.io/api/v1.0/nodedwifi/stream');

    socket.onopen = function (event) {
      console.log('WebSocket is open now.');
    };

    socket.onmessage = function (event) {
      const newData = JSON.parse(event.data);

      setData((prevData) => {
        // Update existing data if the ID already exists
        const updatedData = prevData.map((item) => {
          if (item.id === newData.id) {
            return newData;
          }
          return item;
        });

        // If the ID doesn't exist, append the new data
        const existingIndex = prevData.findIndex((item) => item.id === newData.id);
        if (existingIndex === -1) {
          updatedData.push(newData);
        }

        return updatedData;
      });
    };

    socket.onerror = function (event) {
      console.error('WebSocket error:', event);
    };

    socket.onclose = function (event) {
      console.log('WebSocket is closed now.');
    };

    return () => {
      socket.close();
    };
  }, []);

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