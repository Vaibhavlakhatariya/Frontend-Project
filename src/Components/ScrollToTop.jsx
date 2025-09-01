import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // compute scroll progress robustly
  useEffect(() => {
    const onScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const viewHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const total = Math.max(docHeight - viewHeight, 1);
      setProgress((scrollTop / total) * 100);
      setVisible(scrollTop > 200); // show after 200px (change if you like)
    };

    onScroll(); // init once
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ring geometry (viewBox 100x100 so math is stable)
  const r = 45;
  const C = 2 * Math.PI * r;
  const dashOffset = C - (progress / 100) * C;

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg hover:scale-110 transition-transform duration-300"
    >
      {/* Circular progress BORDER (no fill) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full -rotate-90"
      >
        {/* gray track */}
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke="#e5e7eb"
          strokeWidth="3"
          fill="none"
        />
        {/* blue progress ring */}
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
          strokeDasharray={C}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>

      {/* center arrow */}
      <svg
        className="relative z-10"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 14l6-6 6 6" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
