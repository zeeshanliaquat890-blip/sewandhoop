import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

/** Shared OG image design: paper card, stitched border, serif title. */
export async function renderOg({ title, kicker }: { title: string; kicker?: string }) {
  const dir = path.join(process.cwd(), "assets", "fonts");
  const [serif, sansBold] = await Promise.all([
    fs.readFile(path.join(dir, "YoungSerif-Regular.ttf")),
    fs.readFile(path.join(dir, "Figtree-Bold.ttf")),
  ]);
  const size = title.length > 70 ? 58 : title.length > 45 ? 68 : 80;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#26221e", padding: 28 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#fbf7f0",
            borderRadius: 18,
            border: "3px dashed #a63d29",
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", fontFamily: "Figtree", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#a63d29" }}>
            {kicker || "Sew & Hoop"}
          </div>
          <div style={{ display: "flex", fontFamily: "YoungSerif", fontSize: size, lineHeight: 1.1, color: "#26221e", maxWidth: 1000 }}>{title}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", fontFamily: "YoungSerif", fontSize: 38, color: "#26221e" }}>
              Sew <span style={{ color: "#a63d29", margin: "0 10px" }}>&amp;</span> Hoop
            </div>
            <div style={{ display: "flex", fontFamily: "Figtree", fontSize: 24, color: "#6f675f" }}>sewandhoop.com</div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "YoungSerif", data: serif, weight: 400, style: "normal" },
        { name: "Figtree", data: sansBold, weight: 700, style: "normal" },
      ],
    }
  );
}
