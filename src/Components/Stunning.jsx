import { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";

const Stunning = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  const baseItem = data?.content?.colPos0?.[16]?.content?.items?.[0];
  const titleHTML = baseItem?.contentElements?.[0]?.content?.bodytext;
  const contentHTML = baseItem?.contentElements?.[1]?.content?.bodytext;

  // Map HTML tags to React components with styles
  const tagMap = {
    h2: (children) => (
      <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white text-center">
        {children}
      </h2>
    ),
    p: (children) => (
      <p className="text-base md:text-lg text-white mb-4 text-center">
        {children}
      </p>
    ),
    a: (children, attribs) => (
      <a
        href={attribs?.href || "#"}
        className="inline-block mt-6 px-6 py-3 text-white font-semibold shadow-md 
                   bg-blue-500 bg-[length:100%_200%] bg-bottom hover:bg-top transition-all duration-500"
      >
        {children}
      </a>
    ),
    span: (children, attribs) => {
      if (attribs?.class?.includes("highlight-underline")) {
        return (
          <span>
            <a
              href="#"
              target="_blank"
              className="bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] 
                         bg-[length:100%_15px] bg-no-repeat bg-bottom"
            >
              {children}
            </a>
          </span>
        );
      }
      return <span>{children}</span>;
    },
  };

  const parseOptions = {
    replace: (domNode) => {
      const { name, children, attribs } = domNode;
      if (name && tagMap[name]) {
        return tagMap[name](domToReact(children, parseOptions), attribs);
      }
    },
  };

  return (
    <div className="bg-[var(--secondryClr)] text-center py-16 px-4 md:px-16">
      {titleHTML && parse(titleHTML, parseOptions)}
      {contentHTML && (
        <div className="mt-8">{parse(contentHTML, parseOptions)}</div>
      )}
    </div>
  );
};

export default Stunning;
