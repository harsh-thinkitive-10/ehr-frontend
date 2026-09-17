/**
 * Click-to-source: hold Alt and click any element to open it in your editor.
 *
 * Pairs with plugins/vite-plugin-jsx-locator.mjs, which stamps `data-loc` onto
 * every JSX element in dev. Nothing here touches React internals, so it cannot
 * be broken by a React upgrade the way Locator.js was by React 19.
 *
 * Loaded only under `import.meta.env.DEV`, so it is absent from production.
 */

const ATTRIBUTE = "data-loc";
const OVERLAY_ID = "jsx-locator-overlay";

let armed = false;
let overlay: HTMLDivElement | null = null;

function ensureOverlay(): HTMLDivElement {
  if (overlay) {
    return overlay;
  }

  overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.style.cssText = [
    "position:fixed",
    "z-index:2147483647",
    // The overlay must never eat the click it is advertising.
    "pointer-events:none",
    "border:1px solid #4d9fff",
    "background:rgba(77,159,255,0.18)",
    "border-radius:3px",
    "display:none",
    "font:12px ui-monospace,SFMono-Regular,Menlo,monospace",
  ].join(";");

  const label = document.createElement("span");
  label.dataset.role = "label";
  label.style.cssText = [
    "position:absolute",
    "left:0",
    "top:-20px",
    "padding:1px 6px",
    "border-radius:3px",
    "background:#4d9fff",
    "color:#fff",
    "white-space:nowrap",
  ].join(";");
  overlay.append(label);

  document.body.append(overlay);
  return overlay;
}

/** The nearest ancestor carrying a source location, including the target. */
function locatable(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) {
    return null;
  }
  return target.closest<HTMLElement>(`[${ATTRIBUTE}]`);
}

function show(element: HTMLElement) {
  const box = ensureOverlay();
  const rect = element.getBoundingClientRect();

  box.style.display = "block";
  box.style.left = `${rect.left}px`;
  box.style.top = `${rect.top}px`;
  box.style.width = `${rect.width}px`;
  box.style.height = `${rect.height}px`;

  const label = box.querySelector<HTMLElement>('[data-role="label"]');
  if (label) {
    label.textContent = element.getAttribute(ATTRIBUTE) ?? "";
    // Flip below the element when there is no room above it.
    label.style.top = rect.top < 24 ? `${rect.height}px` : "-20px";
  }
}

function hide() {
  if (overlay) {
    overlay.style.display = "none";
  }
}

function disarm() {
  armed = false;
  hide();
  document.body.style.cursor = "";
}

function onPointerMove(event: PointerEvent) {
  if (!armed) {
    return;
  }

  const element = locatable(event.target);
  if (element) {
    show(element);
  } else {
    hide();
  }
}

function onClick(event: MouseEvent) {
  if (!armed) {
    return;
  }

  const element = locatable(event.target);
  if (!element) {
    return;
  }

  // Captured and cancelled, or the click also triggers whatever it landed on —
  // opening a dialog while jumping to its source is disorienting.
  event.preventDefault();
  event.stopPropagation();

  const location = element.getAttribute(ATTRIBUTE);
  if (location) {
    // Vite's own dev-server endpoint, the one its error overlay uses.
    void fetch(`/__open-in-editor?file=${encodeURIComponent(location)}`);
  }

  disarm();
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    disarm();
    return;
  }

  if (event.altKey && !armed) {
    armed = true;
    document.body.style.cursor = "crosshair";
  }
}

function onKeyUp(event: KeyboardEvent) {
  if (!event.altKey) {
    disarm();
  }
}

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
document.addEventListener("pointermove", onPointerMove, true);
// Capture phase, so the app's own handlers never see the click first.
document.addEventListener("click", onClick, true);
// Alt-tabbing away leaves the key stuck down otherwise.
window.addEventListener("blur", disarm);

console.info("[locator] Hold Alt and click an element to open it in your editor.");
