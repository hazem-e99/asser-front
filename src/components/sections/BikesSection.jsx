import Carousel from "../common/Carousel";
import { useSiteContent } from "../../context/SiteContentContext.jsx";
import { resolveMediaUrl } from "../../lib/mediaUrl.js";

export default function BikesSection() {
  const { payload } = useSiteContent();
  const { bikeImages, bikesBannerImage } = payload.bikes;

  return (
    <section id="bikes" style={{ padding: "40px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img
          src={resolveMediaUrl(bikesBannerImage)}
          alt="الدراجات"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
        />
      </div>
      <Carousel images={bikeImages} />
    </section>
  );
}
