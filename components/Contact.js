import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const reCaptchaRef = React.createRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const captchaToken = formData.get("captchaToken");

    const emailData = {
      email: email,
    };

    if (!captchaToken) {
      toast("Please submit captcha");
    } else {
      try {
        await fetch("api/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }).then((response) => {
          if (!response.ok) {
            toast(`Email could not be sent (error: ${response.status})`);
          } else {
            toast("Thanks for contacting us!");
          }
        });
      } catch (error) {
        toast("Error submitting form");
      }
      reCaptchaRef.current.reset();
    }
  };

  const handleChange = (token) => {
    // Add captcha token to form data
    const form = document.querySelector("form");
    const captchaTokenField = document.createElement("input");
    captchaTokenField.setAttribute("type", "hidden");
    captchaTokenField.setAttribute("name", "captchaToken");
    captchaTokenField.setAttribute("value", token);
    form.appendChild(captchaTokenField);
  };

  return (
    <div
      id="features"
      className="scroll-mt-40 w-full flex flex-col items-center justify-center"
    >
      <div className="text-center mb-12">
        <h2 className="font-bold text-4xl lg:text-6xl lg:mb-20 mb-4 text-white">
          Sign Up for Beta!
        </h2>
      </div>
      <div className="max-w-[1240px] m-auto pt-2 pb-5 font-figtree">
        <form className="max-w-[500px] m-auto pl-2" onSubmit={handleSubmit}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
            />
            <label
              for="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="flex justify-center mt-4">
            <ReCAPTCHA
              ref={reCaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center mt-5 mb-24">
            <button
              className={
                "bg-blue-500 text-white font-bold py-4 px-6 rounded-lg"
              }
              type={"submit"}
            >
              Submit
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
