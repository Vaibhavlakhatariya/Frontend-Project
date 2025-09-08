const OneClickSection = () => {
  return (
    <section className="px-10 py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-[42px] md:text-4xl font-bold mb-4">
          <span className="text-[var(--secondryClr)]">Easy</span>{" "}
          <span className="bg-gradient-to-r from-[#4e8ef7] to-[#f23ad1] text-transparent bg-clip-text">
            one-click
          </span>{" "}
          <span className="text-[var(--secondryClr)]">demo install</span>
        </h2>
        <p className="text-[var(--textClr)] text-lg mb-12">
          Set up your website to look and function <br /> just like the demo in
          under a minute
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#4c6fff] text-white text-2xl font-bold w-22 h-22 flex items-center justify-center shadow">
              1
            </div>
            <p className="mt-6 text-[var(--secondryClr)] font-medium text-2xl">
              Select a demo
            </p>
            {/* Arrow */}
            <img
              src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjI5Ljc5IDk0LjA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYxNzA4NyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0uNzUuNjZzMS40IDEuNTkgNC4xNSA0LjMzIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjE3MDg3IiBzdHJva2UtZGFzaGFycmF5PSIwIDAgMTEuOTcgMTEuOTciIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTMuNjUgMTMuMTVjMjYuNDcgMjMuMzggOTIuOTEgNzEuMzkgMTkyLjExIDcxLjM5Ii8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjE3MDg3IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTIxMS43NCA4NC40OWMxLjk5LS4wNCAzLjk5LS4xIDYtLjE3Ii8+PHBhdGggZmlsbD0iIzYxNzA4NyIgZD0iTTIyOS43OSA4My42MmMtNS41NSAyLjQyLTEyLjM5IDYuNC0xNi41NCAxMC40NGwyLjkxLTkuNjktMy45Ni05LjNjNC41NyAzLjU2IDExLjgxIDYuNzYgMTcuNTkgOC41NXoiLz48L3N2Zz4="
              alt="arrow"
              className="hidden md:block absolute right-[-80px] top-10 w-35"
            />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center relative top-11">
            <div className="bg-[#4c6fff] text-white text-2xl font-bold w-22 h-22 flex items-center justify-center shadow">
              2
            </div>
            <p className="mt-4 text-[var(--secondryClr)] font-medium text-2xl">
              Import content
            </p>
            {/* Arrow */}
            <img
              src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjI5Ljc5IDk0LjA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYxNzA4NyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0uNzUuNjZzMS40IDEuNTkgNC4xNSA0LjMzIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjE3MDg3IiBzdHJva2UtZGFzaGFycmF5PSIwIDAgMTEuOTcgMTEuOTciIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTMuNjUgMTMuMTVjMjYuNDcgMjMuMzggOTIuOTEgNzEuMzkgMTkyLjExIDcxLjM5Ii8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjE3MDg3IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTIxMS43NCA4NC40OWMxLjk5LS4wNCAzLjk5LS4xIDYtLjE3Ii8+PHBhdGggZmlsbD0iIzYxNzA4NyIgZD0iTTIyOS43OSA4My42MmMtNS41NSAyLjQyLTEyLjM5IDYuNC0xNi41NCAxMC40NGwyLjkxLTkuNjktMy45Ni05LjNjNC41NyAzLjU2IDExLjgxIDYuNzYgMTcuNTkgOC41NXoiLz48L3N2Zz4="
              alt="arrow"
              className="hidden md:block absolute right-[-80px] top-10 w-35"
            />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center relative top-20">
            <div className="bg-[#4c6fff] text-white text-2xl font-bold w-22 h-22 flex items-center justify-center shadow">
              3
            </div>
            <p className="mt-4 text-[var(--secondryClr)] font-medium text-2xl">
              Done. Have fun
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneClickSection;
