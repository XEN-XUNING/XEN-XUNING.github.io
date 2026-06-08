const storageKey = "hatsune.theme";

function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
}

function getSavedTheme() {
  try {
    const v = localStorage.getItem(storageKey);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {}
}

function setToast(text) {
  const el = document.querySelector("[data-toast]");
  if (!el) return;
  el.textContent = text;
  el.hidden = false;
  window.clearTimeout(setToast._t);
  setToast._t = window.setTimeout(() => {
    el.hidden = true;
  }, 1600);
}

function initTheme() {
  const saved = getSavedTheme();
  const initial = saved ?? getSystemTheme();
  applyTheme(initial);

  const btn = document.querySelector("[data-theme-toggle]");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
      saveTheme(next);
      setToast(next === "light" ? "已切换到浅色模式" : "已切换到深色模式");
    });
  }

  if (window.matchMedia) {
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    mql.addEventListener?.("change", () => {
      if (getSavedTheme()) return;
      applyTheme(getSystemTheme());
    });
  }
}

async function copyText(text) {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const t = document.createElement("textarea");
      t.value = text;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.left = "-9999px";
      document.body.appendChild(t);
      t.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(t);
      return ok;
    } catch {
      return false;
    }
  }
}

function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((el) => {
    el.addEventListener("click", async () => {
      const text = el.getAttribute("data-copy") || "";
      const ok = await copyText(text);
      setToast(ok ? "已复制到剪贴板" : "复制失败");
    });
  });
}

function initYear() {
  const y = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = y;
  });
}

function initLastUpdated() {
  const el = document.querySelector("[data-last-updated]");
  if (!el) return;
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const val = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  el.textContent = `更新于 ${val}`;
}

function initNavDrawer() {
  const drawer = document.querySelector("[data-nav-drawer]");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!drawer || !toggle) return;

  const closeButtons = drawer.querySelectorAll("[data-nav-close]");
  const links = drawer.querySelectorAll("[data-nav-link]");
  const body = document.body;

  const setOpen = (open) => {
    drawer.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => {
    setOpen(drawer.hidden);
  });

  closeButtons.forEach((btn) => btn.addEventListener("click", () => setOpen(false)));
  links.forEach((a) => a.addEventListener("click", () => setOpen(false)));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function main() {
  initTheme();
  initCopyButtons();
  initYear();
  initLastUpdated();
  initNavDrawer();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
