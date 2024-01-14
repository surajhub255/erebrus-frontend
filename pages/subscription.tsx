import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import MyVpnContainer from "../components/Myvpncontainer";
import NftdataContainer from "../components/NftDataContainer";
// import emoji from "../../../public/EmojiMessage.png";
// import connectWallet from "../../../modules/connectwallet";
import novpn from "../public/novpn2.png";
import vpn1 from "../public/vpn1.png";
import vpn2 from "../public/vpn2.png";
import vpn3 from "../public/vpn3.png";
import vpn4 from "../public/vpn4.png";
import vpn5 from "../public/vpn5.png";
import vpn6 from "../public/vpn6.png";
import vpn7 from "../public/vpn7.png";
import Image from "next/image";
// import erebrus from "../../../public/erebrus.png";
// import sotreus from "../../../public/sotreus.png";
// import Image from "next/image";
// import Link from "next/link";
// import VpnContainerDedicated from "../../../components/VpnContainerDedicated";
const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
export interface FlowIdResponse {
  eula: string;
  flowId: string;
}

export interface WalletData {
  walletAddress: string | undefined;
}

interface FormData {
  name: string;
  region: string;
  // type: "decentralized";
  // domain: string;
}
const transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

const Subscription = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileset, setprofileset] = useState<boolean>(true);
  const [buttonset, setbuttonset] = useState<boolean>(false);
  const [projectsData, setprojectsData] = useState<any>(null);
  const [dedicatedVpnData, setdedicatedVpnData] = useState<any>(null);
  const [nftdata, setnftdata] = useState<any>(null);
  const [msg, setMsg] = useState<string>("");
  const [successmsg, setsuccessMsg] = useState<string>("");
  const [errormsg, seterrorMsg] = useState<string>("");
  const [region, setregion] = useState<string>("");
  const [verify, setverify] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>("");
  const [vpntype, setvpntype] = useState<string>("decentralized");
  const [subscription, setSubscription] = useState<string>("option");
  const [about, setabout] = useState<boolean>(false);
  const [collectionsPage, setcollectionsPage] = useState<boolean>(true);
  const [collectionId, setcollectionId] = useState<string>();
  const [vpnPage, setvpnPage] = useState<boolean>(false);
  //const txtvalue = localStorage.getItem("txtvalue");
  const bg2 = {
    backgroundColor: "white",
  };

  const bg = {
    backgroundColor: "#30385F",
  };

  const border = {
    backgroundColor: "#30385F",
    border: "1px solid #788AA3",
  };

  const button = {
    backgroundColor: "#11D9C5",
  };

  const text = {
    color: "#788AA3",
  };

  const text2 = {
    color: "#11D9C5",
  };

  const successtext = {
    color: "#141a31",
  };

  const errortext = {
    color: "#EE4B2B",
  };

  const bgverify = {
    backgroundColor: "#141a31",
  };

  const initialFormData: FormData = {
    name: "",
    region: "",
    // type: "",
    // domain: '',
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const auth = Cookies.get("platform_token");

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("region", formData.region);
      formDataObj.append("collectionId", collectionId);

      // Convert FormData to JavaScript Object
      const formDataObject: { [key: string]: string | File | null } = {};
      formDataObj.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Convert JavaScript Object to JSON string
      const jsonData = JSON.stringify(formDataObject);
      // console.log(formData.type);
      // if (formData.type === "dedicated") {
      //   const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/vpn`, {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json, text/plain, */*",
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${auth}`,
      //     },
      //     body: jsonData,
      //   });

      //   if (response.status === 200) {
      //     const responseData = await response.json();
      //     setFormData(initialFormData);
      //     console.log("vpn data", responseData);
      //     setverify(true);
      //   } else {
      //     setMsg("error");
      //   }
      // } else
      // if (formData.type === "decentralized") {
      const response = await fetch(
        `${REACT_APP_GATEWAY_URL}api/v1.0/erebrus/client/${formData.region}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: jsonData,
        }
      );

      if (response.status === 200) {
        const responseData = await response.json();
        setFormData(initialFormData);
        console.log("vpn data", responseData);
        setverify(true);
      } else {
        setMsg("error");
      }
      // }
    } catch (error) {
      console.error("Error:", error);
      setMsg("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProjectsData = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/erebrus/clients`,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
          }
        );

        console.log("vpn decentralized", response);

        if (response.status === 200) {
          // Filter the data based on the domain ID
          const wallet = Cookies.get("platform_wallet");
          const payload: any[] = response.data.payload;
          const filteredData = payload.filter(
            (item) => item?.walletAddress === wallet
          );
          setprojectsData(filteredData);
          console.log("decentralized", filteredData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    const vpnnft = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const graphqlbody = {
          query: `
            query getAccountCurrentTokens($address: String!, $where: [current_token_ownerships_v2_bool_exp!]!, $offset: Int, $limit: Int) {
              current_token_ownerships_v2(
                where: { owner_address: { _eq: $address }, amount: { _gt: 0 }, _or: [{ table_type_v1: { _eq: "0x3::token::TokenStore" } }, { table_type_v1: { _is_null: true } }], _and: $where }
                order_by: [{ last_transaction_version: desc }, { token_data_id: desc }]
                offset: $offset
                limit: $limit
              ) {
                amount
                current_token_data {
                  ...TokenDataFields
                }
                last_transaction_version
                property_version_v1
                token_properties_mutated_v1
                is_soulbound_v2
                is_fungible_v2
              }
              current_token_ownerships_v2_aggregate(where: { owner_address: { _eq: $address }, amount: { _gt: 0 } }) {
                aggregate {
                  count
                }
              }
            }
        
            fragment TokenDataFields on current_token_datas_v2 {
              description
              token_uri
              token_name
              token_data_id
              current_collection {
                ...CollectionDataFields
              }
              token_properties
              token_standard
              cdn_asset_uris {
                cdn_image_uri
              }
            }
        
            fragment CollectionDataFields on current_collections_v2 {
              uri
              max_supply
              description
              collection_name
              collection_id
              creator_address
              cdn_asset_uris {
                cdn_image_uri
              }
            }
          `,
          variables: {
            address: `${wallet}`,
            limit: 12,
            offset: 0,
            where: [],
          },
          operationName: "getAccountCurrentTokens",
        };

        const response = await axios.post(
          "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql", // Remove the `$` before `https`
          graphqlbody,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              // Authorization: `Bearer ${auth}`,
            },
          }
        );

        console.log("vpn nft", response.data.data.current_token_ownerships_v2);
        setnftdata(response.data.data.current_token_ownerships_v2);
      } catch (error) {
        console.error("Error fetching nft data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (vpnPage === true) {
      fetchProjectsData();
    }
    if (collectionsPage === true) {
      vpnnft();
    }
  }, [collectionsPage, collectionId]);

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // Update the selected region when the dropdown value changes
    setregion(e.target.value);
  };

  const loggedin = Cookies.get("platform_token");
  const wallet = Cookies.get("platform_wallet");

  const handleCollectionClick = (collection) => {
    setcollectionId(collection);
    setvpnPage(true);
    setcollectionsPage(false);
  };

  return (
    <div className="py-0">
      <section className="">
        <div className="px-10 mx-auto">
          <div className="w-full mx-auto text-left md:text-center">
            {collectionsPage === true && (
              <NftdataContainer
                metaDataArray={nftdata}
                MyReviews={false}
                selectCollection={handleCollectionClick}
              />
            )}

            {vpnPage === true && (
              <>
                <h1 className="mb-8 ml-6 text-start text-2xl font-bold leading-none tracking-normal text-gray-100 md:text-2xl md:tracking-tight">
                  <span className="text-white">My Clients</span>
                </h1>
                {buttonset && (
                  <>
                    <div className="flex text-xs mb-4">
                      <button
                        className="p-4 px-3 rounded-l-lg"
                        style={{
                          backgroundColor: buttonset ? "#11D9C5" : "#222944",
                          color: buttonset ? "black" : "white",
                        }}
                        onClick={() => setvpntype("decentralized")}
                      >
                        Create VPNs
                      </button>
                      <button
                        className="p-4 px-6 rounded-r-lg"
                        style={{
                          backgroundColor: !buttonset ? "#11D9C5" : "#222944",
                          color: !buttonset ? "black" : "white",
                        }}
                        onClick={() => setbuttonset(false)}
                      >
                        My Clients
                      </button>
                    </div>
                    <section className="rounded-xl" style={bg}>
                      <div className="px-5 mx-auto max-w-3xl rounded-xl">
                        <div className="w-full mx-auto text-left py-24">
                          <h1 className="text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                            <span className="text-white text-center">
                              Create your client
                            </span>
                          </h1>

                          <form
                            id="myForm"
                            className="rounded pt-10"
                            onSubmit={handleSubmit}
                          >
                            <div className="mb-10">
                              <div className="flex gap-4">
                                <div className="mb-4 w-1/2">
                                  <input
                                    type="text"
                                    id="name"
                                    style={border}
                                    className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>

                                <div className="mb-4 w-1/2">
                                  <select
                                    id="region"
                                    style={border}
                                    className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formData.region}
                                    onChange={handleInputChange}
                                    required
                                  >
                                    <option
                                      className="bg-white text-black"
                                      value=""
                                    >
                                      Select Region
                                    </option>
                                    <option
                                      className="bg-white text-black"
                                      value="us"
                                    >
                                      US
                                    </option>
                                    <option
                                      className="bg-white text-black"
                                      value="sg"
                                    >
                                      Singapore
                                    </option>
                                    {/* {(formData.type === "decentralized") && <> */}
                                    <option
                                      className="bg-white text-black"
                                      value="eu"
                                    >
                                      Europe
                                    </option>
                                    <option
                                      className="bg-white text-black"
                                      value="ca"
                                    >
                                      Canada
                                    </option>
                                    <option
                                      className="bg-white text-black"
                                      value="jp"
                                    >
                                      Japan
                                    </option>
                                    {/* </>} */}
                                  </select>
                                </div>
                              </div>

                              <div className="flex-col gap-4 mr-4">
                                {/* <div className="mb-6 w-1/2">
                                <select
                                  id="type"
                                  style={border}
                                  className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                  value={formData.type}
                                  onChange={handleInputChange}
                                  required
                                >
                                  <option
                                    className="bg-white text-black"
                                    value=""
                                  >
                                    Select VPN type
                                  </option>
                                  <option
                                    className="bg-white text-black"
                                    value="dedicated"
                                  >
                                    Dedicated
                                  </option>
                                  <option
                                    className="bg-white text-black"
                                    value="decentralized"
                                  >
                                    Decentralized
                                  </option>
                                </select>
                              </div> */}

                                <div className="text-center w-1/2 mt-10">
                                  <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                                    <button
                                      style={button}
                                      type="submit"
                                      value="submit"
                                      className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                                    >
                                      Create
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>

                          {verify && (
                            <div
                              style={{ backgroundColor: "#222944E5" }}
                              className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
                              id="popupmodal"
                            >
                              <div className="relative p-4 w-full max-w-2xl max-h-full">
                                <div
                                  className="relative rounded-lg shadow dark:bg-gray-700"
                                  style={{ backgroundColor: "#37406D" }}
                                >
                                  <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                                    <button
                                      onClick={() => setbuttonset(false)}
                                      type="button"
                                      className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">
                                        Close modal
                                      </span>
                                    </button>
                                  </div>

                                  <div className="p-4 md:p-5 space-y-4">
                                    <p className="text-3xl text-center font-bold text-white">
                                      Successfully created!
                                    </p>
                                    <p
                                      className="text-md text-center w-1/2 mx-auto"
                                      style={text}
                                    >
                                      Your Client Creation is deployed
                                      successfully. Check your Client listing
                                    </p>
                                  </div>

                                  <div className="flex items-center pb-10 pt-4 rounded-b w-1/2 mx-auto">
                                    <button
                                      style={button}
                                      onClick={() => setbuttonset(false)}
                                      type="button"
                                      className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                      My Cients
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {loading && (
                            <div
                              style={{
                                position: "absolute",
                                top: 700,
                                left: 0,
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  zIndex: 9999,
                                }}
                              >
                                <div
                                  style={{
                                    border: "8px solid #f3f3f3",
                                    borderTop: "8px solid #3498db",
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    animation: "spin 1s linear infinite",
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                          {msg == "success" && (
                            <p className="text-green-500">Successful</p>
                          )}

                          {msg == "error" && (
                            <p className="text-red-500">
                              Failed to create VPN. Enter unique name.
                            </p>
                          )}
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {!buttonset && (
                  <>
                    <section className="pb-10 rounded-xl">
                      {loading ? (
                        // <Loader />
                        <div className="min-h-screen"></div>
                      ) : (
                        (!projectsData || projectsData?.length == 0) &&
                        (!dedicatedVpnData ||
                          dedicatedVpnData?.length == 0) && (
                          <div className="mx-6">
                            <div className="flex gap-4">
                              <div className="ml-auto text-white">
                                <button
                                  style={{ border: "1px solid #11D9C5" }}
                                  onClick={() => setbuttonset(true)}
                                  className="px-4 py-3 mb-2 text-xs font-semibold rounded-lg w-full sm:mb-0"
                                >
                                  Add More Clients
                                </button>
                              </div>
                            </div>

                            {/* {vpntype === "decentralized" && (
                            <> */}
                            <div
                              className="w-full h-full rounded-xl mt-4 pb-2"
                              style={bg}
                            >
                              <div className="w-full flex justify-between px-14 p-4">
                                <h3 className="text-lg leading-12 w-1/4 text-left">
                                  <div style={text}>Id</div>
                                </h3>

                                <div className="text-start w-1/4">
                                  <div>
                                    <div className="text-lg " style={text}>
                                      Name
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="text-lg text-center w-1/4"
                                  style={text}
                                >
                                  Region
                                </div>

                                <div
                                  className="text-lg flex w-1/4 justify-end"
                                  style={text}
                                >
                                  <p>Actions</p>
                                </div>
                              </div>
                              <MyVpnContainer
                                metaDataArray={projectsData}
                                MyReviews={false}
                              />
                            </div>
                          </div>
                        )
                      )}

                      {loading && (
                        <div
                          style={{
                            position: "absolute",
                            top: 700,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              zIndex: 9999,
                            }}
                          >
                            <div
                              style={{
                                border: "8px solid #f3f3f3",
                                borderTop: "8px solid #3498db",
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                animation: "spin 1s linear infinite",
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </section>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
