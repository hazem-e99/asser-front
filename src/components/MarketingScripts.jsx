import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api.js";
import { injectHtmlFragment } from "../lib/injectMarketing.js";

export default function MarketingScripts() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    apiFetch("/api/marketing")
      .then((d) => setSnippets(d.snippets || []))
      .catch(() => setSnippets([]));
  }, []);

  useEffect(() => {
    const headNodes = [];
    const bodyNodes = [];
    snippets.forEach((s) => {
      if (!s.code?.trim()) return;
      if (s.placement === "head") {
        headNodes.push(...injectHtmlFragment(s.code, document.head));
      } else if (s.placement === "bodyEnd") {
        bodyNodes.push(...injectHtmlFragment(s.code, document.body));
      }
    });
    return () => {
      [...headNodes, ...bodyNodes].forEach((n) => {
        try {
          n.remove();
        } catch {
          /* ignore */
        }
      });
    };
  }, [snippets]);

  return null;
}
