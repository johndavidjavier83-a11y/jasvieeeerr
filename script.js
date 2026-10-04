const $ = (s) => document.querySelector(s);
const IMG = /\.(jpe?g|png|gif|webp|svg|avif)$/i;
const ext = (f) => (f.split(".").pop() || "file").toUpperCase();
const keys = Object.keys(WORK);
let current = keys[0];

/* ---------- Profile ---------- */
document.title = PROFILE.name + " | Portfolio";
$("#brand").textContent = PROFILE.name;
$("#heroName").textContent = PROFILE.name;
$("#heroTag").textContent = PROFILE.tagline;
$("#heroCourse").textContent = [PROFILE.course, PROFILE.school].filter(Boolean).join(", ");
$("#aboutText").innerHTML = PROFILE.about.map((p) => `<p>${esc(p)}</p>`).join("");
$("#skills").innerHTML = PROFILE.skills.map((s) => `<li>${esc(s)}</li>`).join("");
$("#contact").innerHTML = PROFILE.email ? `Contact: <a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a>` : "";
$("#foot").textContent = `© ${new Date().getFullYear()} ${PROFILE.name}`;
const av = $("#avatar");
if (PROFILE.photo) av.style.backgroundImage = `url("${PROFILE.photo}")`;
else av.textContent = PROFILE.name.trim().charAt(0).toUpperCase();

function esc(t) {
  return String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- Home tiles ---------- */
$("#tiles").innerHTML = keys.map((k) => {
  const n = WORK[k].items.length;
  return `<button class="tile" data-cat="${k}"><b>${esc(WORK[k].label)}</b><span>${n} ${n === 1 ? "item" : "items"}</span></button>`;
}).join("");
$("#tiles").addEventListener("click", (e) => {
  const t = e.target.closest(".tile");
  if (!t) return;
  current = t.dataset.cat;
  location.hash = "work";
  renderWork();
});

/* ---------- Work ---------- */
function renderWork() {
  $("#tabs").innerHTML = keys.map((k) =>
    `<button class="tab" role="tab" data-cat="${k}" aria-selected="${k === current}">${esc(WORK[k].label)}<small>${WORK[k].items.length}</small></button>`
  ).join("");
  const items = WORK[current].items;
  $("#grid").innerHTML = items.length
    ? items.map((it, i) => {
        const thumb = IMG.test(it.file)
          ? `<img src="${esc(it.file)}" alt="${esc(it.title)}" loading="lazy">`
          : `<span class="ext">${ext(it.file)}</span>`;
        return `<button class="item" data-i="${i}"><div class="thumb">${thumb}</div><div class="meta"><b>${esc(it.title)}</b>${it.note ? `<span>${esc(it.note)}</span>` : ""}</div></button>`;
      }).join("")
    : `<p class="empty">Nothing in ${esc(WORK[current].label)} yet.</p>`;
}
$("#tabs").addEventListener("click", (e) => {
  const t = e.target.closest(".tab");
  if (t) { current = t.dataset.cat; renderWork(); }
});
$("#grid").addEventListener("click", (e) => {
  const b = e.target.closest(".item");
  if (b) openItem(WORK[current].items[b.dataset.i]);
});

/* ---------- Viewer ---------- */
const lb = $("#lb");
function openItem(it) {
  let html;
  if (IMG.test(it.file)) html = `<img src="${esc(it.file)}" alt="${esc(it.title)}">`;
  else if (/\.pdf$/i.test(it.file)) html = `<iframe src="${esc(it.file)}" title="${esc(it.title)}"></iframe>`;
  else html = `<div class="dl"><p>${ext(it.file)} files can't be previewed.</p><p><a class="btn" href="${esc(it.file)}" download>Download file</a></p></div>`;
  $("#lbBody").innerHTML = html;
  $("#lbCap").innerHTML = `${esc(it.title)}${it.note ? " – " + esc(it.note) : ""} · <a href="${esc(it.file)}" target="_blank" rel="noopener" style="color:#ffd84d">Open in new tab</a>`;
  lb.hidden = false;
}
const closeLb = () => { lb.hidden = true; $("#lbBody").innerHTML = ""; };
$("#lbClose").onclick = closeLb;
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLb(); });

/* ---------- Pages ---------- */
function route() {
  const id = ["home", "about", "work"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
  document.querySelectorAll(".page").forEach((p) => p.classList.toggle("on", p.id === id));
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("on", a.dataset.nav === id));
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
renderWork();
route();
