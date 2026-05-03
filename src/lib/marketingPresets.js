/** قوالب بيكسل شائعة — تُبنى من معرفات بسيطة */

export const PLATFORM_OPTIONS = [
  { id: "custom", label: "كود مخصص (لصق كامل)" },
  { id: "meta", label: "Meta (Facebook) Pixel" },
  { id: "tiktok", label: "TikTok Pixel" },
  { id: "snap", label: "Snapchat Pixel" },
  { id: "gtm", label: "Google Tag Manager" },
  { id: "ga4", label: "Google Analytics 4 (gtag)" },
];

function esc(s) {
  if (s == null) return "";
  return String(s).replace(/[<>"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

export function getPresetFieldDefs(platform) {
  switch (platform) {
    case "meta":
      return [{ key: "pixelId", label: "Pixel ID (أرقام فقط)", placeholder: "مثال: 1234567890" }];
    case "tiktok":
      return [{ key: "pixelId", label: "TikTok Pixel / SDK ID", placeholder: "مثال: XXXXX" }];
    case "snap":
      return [{ key: "pixelId", label: "Snapchat Pixel ID", placeholder: "UUID من مدير Snap" }];
    case "gtm":
      return [
        {
          key: "containerId",
          label: "معرّف الحاوية GTM",
          placeholder: "GTM-XXXXXXX",
        },
      ];
    case "ga4":
      return [
        {
          key: "measurementId",
          label: "Measurement ID",
          placeholder: "G-XXXXXXXXXX",
        },
      ];
    default:
      return [];
  }
}

export function buildCodeFromPreset(platform, presetFields = {}) {
  const f = presetFields || {};
  switch (platform) {
    case "meta": {
      const id = (f.pixelId || "").trim();
      if (!id) return "";
      return `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${esc(id)}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${esc(id)}&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`;
    }
    case "tiktok": {
      const id = (f.pixelId || "").trim();
      if (!id) return "";
      return `<!-- TikTok Pixel -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=r+"?sdkid="+e+"&lib="+t;var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(a,c)};
  ttq.load('${esc(id)}');
  ttq.page();
}(window, document, 'ttq');
</script>`;
    }
    case "snap": {
      const id = (f.pixelId || "").trim();
      if (!id) return "";
      return `<!-- Snapchat Pixel -->
<script type="text/javascript">
(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
snaptr('init', '${esc(id)}');
snaptr('track', 'PAGE_VIEW');
</script>`;
    }
    case "gtm": {
      let cid = (f.containerId || "").trim();
      if (!cid.toUpperCase().startsWith("GTM-")) {
        cid = cid.replace(/^gtm-?/i, "");
        if (cid) cid = `GTM-${cid}`;
      }
      if (!cid) return "";
      return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${esc(cid)}');</script>
<!-- End Google Tag Manager -->`;
    }
    case "ga4": {
      const mid = (f.measurementId || "").trim();
      if (!mid) return "";
      return `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(mid)}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${esc(mid)}');
</script>`;
    }
    default:
      return "";
  }
}
