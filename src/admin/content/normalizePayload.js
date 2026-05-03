import { getFallbackPayload } from "../../site/fallbackPayload.js";

/** يضمن وجود كل الحقول المتوقعة بعد تحميلها من السيرفر */
export function normalizePayload(raw) {
  const d = getFallbackPayload();
  const r = raw && typeof raw === "object" ? raw : {};

  return {
    navLinks: Array.isArray(r.navLinks) ? r.navLinks : [...d.navLinks],
    assets: { ...d.assets, ...(r.assets || {}) },
    servicesTitle: r.servicesTitle ?? d.servicesTitle,
    services: Array.isArray(r.services) ? r.services.map((x) => ({ ...x })) : [...d.services],
    toursHeroTitle: r.toursHeroTitle ?? d.toursHeroTitle,
    places: Array.isArray(r.places) ? r.places.map((x) => ({ ...x })) : [...d.places],
    bikes: {
      bikeImages: Array.isArray(r.bikes?.bikeImages)
        ? [...r.bikes.bikeImages]
        : [...d.bikes.bikeImages],
      bikesBannerImage: r.bikes?.bikesBannerImage ?? d.bikes.bikesBannerImage,
    },
    about: {
      ...d.about,
      ...(r.about || {}),
      reasons: Array.isArray(r.about?.reasons)
        ? r.about.reasons.map((x) => ({ ...x }))
        : [...d.about.reasons],
    },
    reviews: {
      galleryTitle: r.reviews?.galleryTitle ?? d.reviews.galleryTitle,
      newReviewsTitle: r.reviews?.newReviewsTitle ?? d.reviews.newReviewsTitle,
      reviewsImages: Array.isArray(r.reviews?.reviewsImages)
        ? [...r.reviews.reviewsImages]
        : [...d.reviews.reviewsImages],
      staticReviews: Array.isArray(r.reviews?.staticReviews)
        ? r.reviews.staticReviews.map((x) => ({ ...x }))
        : [...d.reviews.staticReviews],
    },
    footer: {
      ...d.footer,
      ...(r.footer || {}),
      footerServices: Array.isArray(r.footer?.footerServices)
        ? [...r.footer.footerServices]
        : [...d.footer.footerServices],
      socialLinks: Array.isArray(r.footer?.socialLinks)
        ? r.footer.socialLinks.map((x) => ({ ...x }))
        : [...d.footer.socialLinks],
    },
    floating: {
      ...d.floating,
      ...(r.floating || {}),
    },
  };
}
