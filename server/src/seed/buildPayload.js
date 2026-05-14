/**
 * محتوى افتراضي للـ seed. الملفات تحت defaultData/ مكررة من واجهة Vite (`src/data`)
 * حتى يعمل الخادم وحده على Render دون مجلد الفرونت.
 */
import { navLinks } from "./defaultData/navigation.js";
import {
  logoUrl,
  heroBannerUrl,
  toursVideoUrl,
} from "./defaultData/assets.js";
import { services } from "./defaultData/services.js";
import { places } from "./defaultData/places.js";
import { bikeImages, bikesBannerImage } from "./defaultData/bikes.js";
import { reviewsImages, staticReviews } from "./defaultData/reviews.js";
import { reasons, aboutPortraitUrl } from "./defaultData/about.js";

const footerServices = [
  "جولات سياحية يومية في أبها - عسير",
  "تنظيم الرحلات للعائلات والأفراد",
  "تأجير سيارات ودراجات لمرافقة الرحلات",
];

const socialLinks = [
  {
    href: "https://www.instagram.com/abdullah_alasiri_abha",
    icon: "fa-instagram",
  },
  {
    href: "https://www.tiktok.com/@abdullah_asiri_tours",
    icon: "fa-tiktok",
  },
  {
    href: "https://www.snapchat.com/add/alfaris9779",
    icon: "fa-snapchat-ghost",
  },
];

export function buildDefaultPayload() {
  return {
    navLinks,
    assets: {
      logoUrl,
      heroBannerUrl,
      toursVideoUrl,
    },
    servicesTitle: "خدماتنا",
    services,
    toursHeroTitle: "الجولات والتجارب المميزة في عسير",
    places,
    bikes: {
      bikeImages,
      bikesBannerImage,
    },
    about: {
      name: "عبد الله العسيري",
      subtitle: "مرشد سياحي مرخص",
      intro:
        "مرشد سياحي معتمد في منطقة عسير – أبها. أقدّم تجربة سياحية شخصية متكاملة، تجمع بين الطبيعة، الثقافة، والترفيه، بدءًا من استقبالك وحتى توديعك بأجمل اللحظات.",
      visionTitle: "رؤيتي",
      visionText:
        "أن أقدّم لكل سائح تجربة أصيلة في عسير، بحيث يتمكن من اكتشاف جمال الطبيعة والريف والثقافة المحلية بطريقة ممتعة وآمنة ومريحة.",
      missionTitle: "رسالتي",
      missionText:
        "نقل صورة مشرفة للعالم عن المملكة العربية السعودية وعن منطقة عسير من خلال توفير جولات سياحية شخصية ومتنوعة، مع التركيز على تجربة محلية حقيقية، وتقديم كل ما يلزم لجعل رحلتك إلى أبها ذكرى لا تُنسى، من وسائل النقل حتى الأنشطة والفعاليات.",
      whyTitle: "لماذا تختارني",
      reasons,
      aboutPortraitUrl,
    },
    reviews: {
      galleryTitle: "آراء عملائنا الكرام",
      newReviewsTitle: "تقييمات عملائنا الجدد",
      reviewsImages,
      staticReviews,
    },
    footer: {
      servicesColumnTitle: "الخدمات",
      contactColumnTitle: "تواصل معنا",
      footerServices,
      whatsappLabel: "واتس آب: ",
      whatsappDisplay: "+966 53 536 9779",
      mapsUrl: "https://maps.app.goo.gl/L9uNovdtBPAHZUSG9",
      mapsButtonText: "الموقع على الخريطة",
      socialLinks,
    },
    floating: {
      whatsappUrl: "https://wa.me/966535369779",
    },
  };
}
