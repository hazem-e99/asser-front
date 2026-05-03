/**
 * يحقن مقاطع HTML/Script من أدوات التسويق مع تنفيذ وسوم script بشكل صحيح.
 */
function appendScriptClone(scriptEl, parent) {
  const s = document.createElement("script");
  for (const attr of scriptEl.attributes) {
    s.setAttribute(attr.name, attr.value);
  }
  s.textContent = scriptEl.textContent;
  parent.appendChild(s);
  return s;
}

export function injectHtmlFragment(html, parent) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  const appended = [];
  while (tpl.content.firstChild) {
    const node = tpl.content.firstChild;
    node.remove();
    if (node.nodeName === "SCRIPT") {
      appended.push(appendScriptClone(node, parent));
    } else {
      parent.appendChild(node);
      appended.push(node);
    }
  }
  return appended;
}
