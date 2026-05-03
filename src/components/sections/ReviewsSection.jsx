import Carousel from "../common/Carousel";
import ReviewCard from "../cards/ReviewCard";
import ReviewForm from "../common/ReviewForm";
import { useSiteContent } from "../../context/SiteContentContext.jsx";

export default function ReviewsSection() {
  const { payload } = useSiteContent();
  const rev = payload.reviews;

  return (
    <section id="reviews" style={{ padding: "40px 20px" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#30684b",
          fontSize: "2rem",
          fontWeight: 800,
          marginBottom: 10,
        }}
      >
        {rev.galleryTitle}
      </h2>
      <Carousel images={rev.reviewsImages} />

      <div style={{ maxWidth: 1200, margin: "60px auto 40px", padding: "0 20px" }}>
        <h2
          style={{
            textAlign: "center",
            color: "#30684b",
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: 40,
            position: "relative",
          }}
        >
          {rev.newReviewsTitle}
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 60,
              height: 4,
              background: "#c19e66",
              borderRadius: 2,
            }}
          />
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 30,
            marginBottom: 50,
          }}
        >
          {rev.staticReviews.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
        <ReviewForm />
      </div>
    </section>
  );
}
