import { useSiteContent } from "../../context/SiteContentContext.jsx";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

export default function HeroBanner() {
  const { payload } = useSiteContent();
  const url = resolveMediaUrl(payload.assets?.heroBannerUrl);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <img
        src={url}
        alt="عسير"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
