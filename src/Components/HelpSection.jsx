import React, { useEffect, useState } from "react";

const HelpSection = () => {
  const [cards, setCards] = useState([]);
  const [titleHtml, setTitleHtml] = useState("");

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((data) => {
        const col0 = data?.content?.colPos0 || [];
        let foundBlock = null;

        // find "Need help?" section
        for (const block of Object.values(col0)) {
          const items = block?.content?.items || [];
          for (const item of items) {
            const textEl = item?.contentElements?.find(
              (ce) =>
                ce?.type === "text" &&
                /need\s*help/i.test(ce?.content?.bodytext || "")
            );
            if (textEl) {
              foundBlock = item;
              setTitleHtml(textEl.content.bodytext || "");
              break;
            }
          }
          if (foundBlock) break;
        }

        if (!foundBlock) return;

        // grab icon boxes
        const rawBoxes = [];
        foundBlock.contentElements.forEach((ce) => {
          if (Array.isArray(ce?.content?.items)) {
            ce.content.items.forEach((col) =>
              col.contentElements.forEach((inner) => {
                if (
                  inner?.type === "mask_ns_icon_box" ||
                  inner?.type === "mask_ns_content_box"
                )
                  rawBoxes.push(inner);
              })
            );
          }
        });

        // normalize cards
        const formatted = rawBoxes.map((b) => {
          const c = b.content || {};
          return {
            title: c.header || c.iconTitle || "",
            desc: c.text || c.subheader || "",
            icon: c.icon?.[0]?.publicUrl || "",
            checks:
              (c.listBlock &&
                c.listBlock
                  .map((x) => x?.list || x?.bodytext)
                  .filter(Boolean)) ||
              [],
            linkHref: c.link?.href || "#",
            linkText: c.link?.text || "Read more",
          };
        });
        setCards(formatted);
      })
      .catch((err) => console.error("Help section fetch error:", err));
  }, []);

  return (
    <section className="bg-[#cfcdcd42] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title + subtitle */}
        <div
          className="mx-auto max-w-3xl text-[36px] text-[#61dcdf] font-bold"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />

        {/* Cards */}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-15   ">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white  shadow-md hover:shadow-lg transition p-8 text-left"
            >
              {card.icon && (
                <img src={card.icon} alt="" className="w-9 h-9 mb-4" />
              )}
              <h3 className="text-xl font-semibold text-[#61dcdf] mb-5">
                {card.title}
              </h3>
              {card.desc && (
                <div
                  className="text-[#617798] mb-5 text-[20px]"
                  dangerouslySetInnerHTML={{ __html: card.desc }}
                />
              )}
              {/* ✅ Checkpoints */}
              {card.checks.length > 0 && (
                <ul className="space-y-3 text-[#617798] text-[14px]">
                  {card.checks.map((c, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-[#4c6fff]">✔</span>
                      <span dangerouslySetInnerHTML={{ __html: c }} />
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={card.linkHref}
                className="mt-9 inline-block px-3 py-3 bg-gradient-to-r from-[#4c6fff] to-[#f43fe2] text-white font-semibold "
              >
                {card.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
