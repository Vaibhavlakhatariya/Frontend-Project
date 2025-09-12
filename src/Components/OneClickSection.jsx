import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

const OneClickSection = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section
      className={`px-10 py-16 transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#61dcdf]" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2
          className={`text-[42px] md:text-4xl font-bold mb-4 transition-colors ${
            darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
          }`}
        >
          Easy{" "}
          <span className="bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] text-transparent bg-clip-text">
            one-click
          </span>{" "}
          demo install
        </h2>

        {/* Paragraph */}
        <p
          className={`text-lg mb-12 transition-colors ${
            darkMode === "dark" ? "text-white/80" : "text-[var(--textClr)]"
          }`}
        >
          Set up your website to look and function <br /> just like the demo in
          under a minute
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[var(--primaryClr)] text-white text-2xl font-bold w-22 h-22 flex items-center justify-center shadow">
              1
            </div>
            <p
              className={`mt-6 font-medium text-2xl transition-colors ${
                darkMode === "dark"
                  ? "text-white"
                  : "text-[var(--secondryClr)]"
              }`}
            >
              Select a demo
            </p>
            <img
               src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjI5Ljc5IDk0LjA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYxNzA4NyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0uNzUuNjZzMS40IDEuNTkgNC4xNSA0LjMzIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjE3MDg3IiBzdHJva2UtZGFzaGFycmF5PSIwIDAgMTEuOTcgMTEuOTciIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTMuNjUgMTMuMTVjMjYuNDcgMjMuMzggOTIuOTEgNzEuMzkgMTkyLjExIDcxLjM5Ii8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjE3MDg3IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTIxMS43NCA4NC40OWMxLjk5LS4wNCAzLjk5LS4xIDYtLjE3Ii8+PHBhdGggZmlsbD0iIzYxNzA4NyIgZD0iTTIyOS43OSA4My42MmMtNS41NSAyLjQyLTEyLjM5IDYuNC0xNi41NCAxMC40NGwyLjkxLTkuNjktMy45Ni05LjNjNC41NyAzLjU2IDExLjgxIDYuNzYgMTcuNTkgOC41NXoiLz48L3N2Zz4=" // arrow
              alt="arrow"
              className="hidden md:block absolute right-[-80px] top-10 w-35"
            />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center relative top-11">
            <div className="bg-[var(--primaryClr)] text-white text-2xl font-bold w-22 h-22 flex items-center justify-center shadow">
              2
            </div>
            <p
              className={`mt-4 font-medium text-2xl transition-colors ${
                darkMode === "dark"
                  ? "text-white"
                  : "text-[var(--secondryClr)]"
              }`}
            >
              Import content
            </p>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjI5Ljc5IDk0LjA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYxNzA4NyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0uNzUuNjZzMS40IDEuNTkgNC4xNSA0LjMzIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjE3MDg3IiBzdHJva2UtZGFzaGFycmF5PSIwIDAgMTEuOTcgMTEuOTciIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTMuNjUgMTMuMTVjMjYuNDcgMjMuMzggOTIuOTEgNzEuMzkgMTkyLjExIDcxLjM5Ii8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjE3MDg3IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTIxMS43NCA4NC40OWMxLjk5LS4wNCAzLjk5LS4xIDYtLjE3Ii8+PHBhdGggZmlsbD0iIzYxNzA4NyIgZD0iTTIyOS43OSA4My42MmMtNS41NSAyLjQyLTEyLjM5IDYuNC0xNi41NCAxMC40NGwyLjkxLTkuNjktMy45Ni05LjNjNC41NyAzLjU2IDExLjgxIDYuNzYgMTcuNTkgOC41NXoiLz48L3N2Zz4="// arrow
              alt="arrow"
              className="hidden md:block absolute right-[-80px] top-10 w-35"
            />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center relative top-20">
            <div className="bg-[var(--primaryClr)] text-white text-2xl font-bold w-22 h-22 flex items-center justify-center shadow">
              3
            </div>
            <p
              className={`mt-2 font-medium text-2xl transition-colors ${
                darkMode === "dark"
                  ? "text-white"
                  : "text-[var(--secondryClr)]"
              }`}
            >
              Done. Have fun
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneClickSection;
