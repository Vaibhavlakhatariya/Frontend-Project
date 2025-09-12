import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const ContactUs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/") 
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Contact Us:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading Contact Us...</div>;
  }

  if (!data) {
    return <div className="py-20 text-center text-red-500"> No data found</div>;
  }


  const title = data?.page?.title || "Contact Us";

  const body =
    data?.content?.colPos0?.[0]?.contentElements?.[0]?.content?.bodytext || "";

  return (
    <section className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-center text-[var(--primaryClr)]">
        {title}
      </h1>

      <div className="mt-8 text-lg text-gray-700 leading-relaxed text-center">
        {parse(body)}
      </div>

  
      <form className="mt-10 max-w-2xl mx-auto grid grid-cols-1 gap-6">
        <input
          type="text"
          placeholder="Your Name"
          className="p-4 border rounded-lg w-full"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-4 border rounded-lg w-full"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="p-4 border rounded-lg w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-[var(--primaryClr)] text-white py-3 px-6 rounded-lg hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
