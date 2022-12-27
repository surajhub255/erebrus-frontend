import { useState, useEffect } from "react";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import axios from "axios";
import QRCode from "qrcode.react";

export default function FormResultPage() {
  const [formData, setFormData] = useState({
    name: "",
    tags: ["mobile"],
    email: "",
    enable: true,
    allowedIPs: ["0.0.0.0/0", "::/0"],
    address: ["10.0.0.1/24"],
    createdBy: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleEmail = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
      createdBy: e.target.value,
    });
  };

  const handleName = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    let UUID;
    e.preventDefault();
    setLoading(true);
    try {
      // Make a POST request to your server
      await fetch("/api/createClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          UUID = data.client.UUID;
        });

      // QR code data
      await fetch(`/api/getClientConfig?UUID=${UUID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/config",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setQrCodeData(data);
        });

      // // Make another GET request to your server to get the data for the config file
      // const configResponse = await axios.get("/api/get-config-data");
      setConfigData(qrCodeData);

      // Show the result page
      setShowResult(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex mx-auto items-center justify-center">
      <AnimatePresence>
        <AnimateSharedLayout>
          {!showResult && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleName}
                  required
                  className="mb-8"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleEmail}
                  required
                  className="mb-4"
                />
                <div className="mt-4 ml-10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-white bg-blue-500 font-bold py-2 px-4 rounded-full"
                  >
                    Submit
                  </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </form>
          )}
          {showResult && (
            <div>
              <svg
                className="absolute top-0 left-0 text-white"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setShowResult(false)}
              >
                <path
                  d="M20 11H7.8L13.6 5.2L12 4L4 12L12 20L13.6 18.8L7.8 13H20V11Z"
                  fill="currentColor"
                />
              </svg>
              {error && <p className="text-red-500">{error}</p>}
              {qrCodeData && (
                <div className="text-white">
                  <QRCode value={qrCodeData} />
                  <div className="mt-8 -ml-8">
                    <a
                      href={`data:application/octet-stream,${encodeURIComponent(
                        qrCodeData
                      )}`}
                      download="vpn.conf"
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Download config file
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </AnimateSharedLayout>
      </AnimatePresence>
    </div>
  );
}
