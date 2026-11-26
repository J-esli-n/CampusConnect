const announcements = [
  { title: "Registration for Spring semester is now open", text: "Choose your modules before Friday, 28 February. Check your degree requirements before submitting.", time: "2 hours ago", tag: "ACADEMICS", urgent: true, icon: "↗" },
  { title: "Library hours extended during exam season", text: "The main library will remain open until midnight from Monday through the end of exams.", time: "Yesterday", tag: "CAMPUS LIFE", icon: "▤", tone: "orange" },
  { title: "Campus shuttle route update", text: "The evening shuttle now stops at the West Residence every 20 minutes after 6 pm.", time: "Mon, 17 Feb", tag: "TRANSPORT", icon: "↗", tone: "green" },
  { title: "Applications open: Student research grants", text: "Undergraduate students can apply for up to $1,500 in project funding this term.", time: "Mon, 17 Feb", tag: "OPPORTUNITY", icon: "✦" }
];

const events = [
  { offset: 1, title: "Design & Innovation Fair", detail: "Student Union · 11:00 AM", category: "Campus" },
  { offset: 3, title: "Intro to Data Science Workshop", detail: "Tech Lab 204 · 2:30 PM", category: "Workshop" },
  { offset: 5, title: "Open Mic: Voices of Northfield", detail: "The Green Room · 6:00 PM", category: "Arts" },
  { offset: 8, title: "Inter-college Basketball Finals", detail: "Northfield Arena · 4:00 PM", category: "Sports" },
  { offset: 11, title: "Career Paths in Product Design", detail: "Innovation Hall · 1:00 PM", category: "Workshop" }
].map(event => {
  const date = new Date();
  date.setDate(date.getDate() + event.offset);
  return {
    ...event,
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    dateLabel: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  };
});

const schedule = [
  { time: "09:00", title: "Human Computer Interaction", room: "Tech Building · Room 204", tone: "" },
  { time: "11:00", title: "Database Systems", room: "West Hall · Room 118", tone: "mint" },
  { time: "14:00", title: "Software Engineering", room: "Tech Building · Room 310", tone: "gold" }
];

const resources = [
  { title: "Computer Science — Year 2 Notes", text: "Lecture notes, revision guides and practice papers shared by your classmates.", type: "Study notes", author: "Maya Chen" },
  { title: "Academic Writing Toolkit", text: "A quick guide to citations, structuring essays and finding credible sources.", type: "Guide", author: "Learning Centre" },
  { title: "Student Software Collection", text: "Access free licenses for development, design and productivity tools.", type: "Useful links", author: "IT Services" },
  { title: "Exam Revision: Data Structures", text: "A curated collection of flashcards and worked examples for your next exam.", type: "Study notes", author: "Leo Park" }
];

const lostItems = [
  { title: "Blue water bottle", text: "Found outside the North Library entrance on Tuesday afternoon.", type: "Found · Accessories", author: "Posted 2 hours ago" },
  { title: "Wireless earbuds case", text: "Lost near the student cafeteria. White case with a small green sticker.", type: "Lost · Electronics", author: "Posted yesterday" },
  { title: "Set of keys with red tag", text: "Handed in at the Student Union front desk. Claim with a description.", type: "Found · Other", author: "Posted yesterday" },
  { title: "Grey knit scarf", text: "Left in West Hall lecture room 118 after the 11am class.", type: "Lost · Clothing", author: "Posted Monday" }
];

const clubs = [
  { title: "Northfield Design Society", text: "For curious minds who love design, creative collaboration, and making things that matter.", type: "Design · 128 members", icon: "✳", tone: "" },
  { title: "Campus Film Collective", text: "Weekly screenings, filmmaking workshops and a place to share your love of cinema.", type: "Arts · 86 members", icon: "▶", tone: "pink" },
  { title: "Green Campus Initiative", text: "Small steps, real impact. Join students making our campus greener and more sustainable.", type: "Community · 214 members", icon: "♧", tone: "green" },
  { title: "Code & Coffee", text: "Build side projects, learn from one another and meet your next hackathon teammates.", type: "Technology · 173 members", icon: "</>", tone: "orange" }
];

const pageNames = {
  dashboard: "Overview",
  announcements: "Announcements",
  events: "Events",
  timetable: "Timetable",
  "lost-found": "Lost & found",
  resources: "Resources",
  clubs: "Clubs & societies"
};
let activePage = "dashboard";
let activeFilter = "All";
let toastTimer;

function announcementMarkup(item) {
  return `<article class="notice searchable"><div class="notice-mark ${item.tone || ""}">${item.icon}</div><div class="notice-body"><div class="notice-title"><strong>${item.title}</strong><time>${item.time}</time></div><p>${item.text}</p><span class="tag ${item.urgent ? "urgent" : ""}">${item.tag}</span></div></article>`;
}

function eventMarkup(item, showAction) {
  return `<article class="event-card searchable"><div class="event-date"><b>${item.day}</b><small>${item.month}</small></div><div class="event-details"><strong>${item.title}</strong><small>${item.detail}</small></div>${showAction ? `<button class="action-button" data-action="event" data-title="${item.title}">Join</button>` : `<span class="event-arrow">→</span>`}</article>`;
}

function dashboard() {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const greeting = today.getHours() < 12 ? "Good morning" : today.getHours() < 18 ? "Good afternoon" : "Good evening";
  return `<div class="welcome-row"><div><div class="eyebrow">YOUR CAMPUS AT A GLANCE</div><h1>${greeting}, Jordan <span>✦</span></h1><p>Here’s what’s happening around your campus today.</p></div><div class="date-pill"><span>▦</span>${date}</div></div>
    <section class="campus-brief"><div class="brief-icon">✦</div><div class="brief-copy"><div class="brief-title">Your campus, in sync <span class="beta-tag">TODAY</span></div><p>${announcements.length} fresh updates, ${events.length} upcoming events, and everything you need for a great day — all in one place.</p><div class="brief-pills"><span>✓ &nbsp; All caught up</span><span>◷ &nbsp; ${schedule.length} classes today</span></div></div><button class="brief-link" data-page="announcements">Explore updates <span>→</span></button></section>
    <section class="metrics-grid" aria-label="Campus overview">
      <article class="metric-card"><span class="metric-icon metric-purple">▤</span><span class="metric-label">Campus updates</span><strong>${announcements.length}</strong><small>Notices to explore</small></article>
      <article class="metric-card"><span class="metric-icon metric-orange">▦</span><span class="metric-label">Upcoming events</span><strong>${events.length}</strong><small>Find your next thing</small></article>
      <article class="metric-card"><span class="metric-icon metric-green">◷</span><span class="metric-label">Classes today</span><strong>${schedule.length}</strong><small>Next class at ${schedule[0].time}</small></article>
      <article class="metric-card"><span class="metric-icon metric-blue">♧</span><span class="metric-label">Student clubs</span><strong>${clubs.length}</strong><small>Find your community</small></article>
    </section>
    <div class="dashboard-grid"><div class="left-stack"><section class="panel"><div class="panel-heading"><div><h3>Latest announcements</h3><p>Important updates from around campus</p></div><button class="text-link" data-page="announcements">View all →</button></div><div class="notice-list">${announcements.slice(0,3).map(announcementMarkup).join("")}</div></section>
      <section class="panel"><div class="panel-heading"><div><h3>Coming up on campus</h3><p>Save a spot at something you’ll love</p></div><button class="text-link" data-page="events">All events →</button></div>${events.slice(0,3).map(item => eventMarkup(item, false)).join("")}</section></div>
      <div class="right-stack">      <section class="panel"><div class="panel-heading"><div><h3>Your day</h3><p>${today.toLocaleDateString("en-US", { weekday: "long" })} · 3 classes</p></div><button class="text-link" data-page="timetable">Full week →</button></div><div class="schedule-list">${schedule.map(item => `<div class="schedule-item"><time class="schedule-time">${item.time}</time><span class="schedule-color ${item.tone}"></span><div class="schedule-info"><strong>${item.title}</strong><small>${item.room}</small></div></div>`).join("")}</div></section>
      <section class="panel"><div class="panel-heading"><div><h3>Quick links</h3><p>Your everyday essentials</p></div></div><div class="quick-links"><button class="filter-button" data-page="resources">▣ &nbsp; Course resources</button> <button class="filter-button" data-page="lost-found">⌕ &nbsp; Lost &amp; found</button> <button class="filter-button" data-page="clubs">♧ &nbsp; Find a club</button></div></section></div></div>`;
}

function listingPage(title, subtitle, items, filters, kind) {
  const headingAction = kind === "lost" ? `<button class="action-button" data-action="report">＋ Report an item</button>` : "";
  const cards = items.map(item => {
    if (kind === "club") return `<article class="listing-card searchable"><div class="club-icon ${item.tone}">${item.icon}</div><h3>${item.title}</h3><p>${item.text}</p><div class="listing-meta"><span>${item.type}</span><button class="action-button" data-action="join" data-title="${item.title}">Join club</button></div></article>`;
    if (kind === "event") return `<article class="listing-card searchable"><div class="event-listing-head"><div class="event-date"><b>${item.day}</b><small>${item.month}</small></div><span class="tag">${item.type}</span></div><h3>${item.title}</h3><p>${item.text}</p><div class="listing-meta"><span>${item.dateLabel} · ${item.author}</span><button class="action-button" data-action="event" data-title="${item.title}">Join event</button></div></article>`;
    const categoryTag = item.tag ? `<span class="tag ${item.urgent ? "urgent" : ""}">${item.tag}</span>` : "";
    const listingDetail = item.tag ? item.author || item.time : `${item.type} · ${item.author}`;
    return `<article class="listing-card searchable"><h3>${item.title}</h3><p>${item.text}</p>${categoryTag}<div class="listing-meta"><span>${listingDetail}</span><button class="action-button" data-action="${kind === "resource" ? "resource" : "contact"}" data-title="${item.title}">${kind === "resource" ? "Open resource" : "View details"}</button></div></article>`;
  }).join("");
  return `<div class="section-heading"><div><div class="eyebrow">CAMPUS CONNECT</div><h1>${title}</h1><p>${subtitle}</p></div>${headingAction}</div>${filters ? `<div class="filter-row">${filters.map((filter, index) => `<button class="filter-button ${index === 0 ? "selected" : ""}" data-filter="${filter}">${filter}</button>`).join("")}</div>` : ""}<div class="listing-grid">${cards}</div>`;
}

function renderPage(page) {
  activePage = pageNames[page] ? page : "dashboard";
  activeFilter = "All";
  document.getElementById("crumb-current").textContent = pageNames[activePage];
  document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.page === activePage));
  const content = document.getElementById("content");
  if (activePage === "dashboard") content.innerHTML = dashboard();
  if (activePage === "announcements") content.innerHTML = listingPage("Announcements", "The latest news, notices and updates from across Northfield.", announcements, ["All", "Academics", "Campus life", "Opportunities"], "notice");
  if (activePage === "events") content.innerHTML = listingPage("Events", "Find your next thing. There’s always something happening here.", events.map(event => ({ ...event, text: event.detail, type: event.category, author: "Northfield Events" })), ["All", "Campus", "Workshop", "Arts", "Sports"], "event");
  if (activePage === "resources") content.innerHTML = listingPage("Student resources", "Notes, guides and useful links shared by your campus community.", resources, ["All", "Study notes", "Guide", "Useful links"], "resource");
  if (activePage === "lost-found") content.innerHTML = listingPage("Lost & found", "Lost something or found an item? Help it find its way home.", lostItems, ["All", "Lost", "Found"], "lost");
  if (activePage === "clubs") content.innerHTML = listingPage("Clubs & societies", "Find your people. Explore the groups that make Northfield yours.", clubs, ["All", "Arts", "Community", "Technology", "Design"], "club");
  if (activePage === "timetable") {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    const selectedDay = today.getDay() === 0 || today.getDay() === 6 ? 0 : today.getDay() - 1;
    const weekDays = Array.from({ length: 5 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return {
        label: `${date.toLocaleDateString("en-US", { weekday: "long" })} · ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        heading: date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
      };
    });
    content.innerHTML = `<div class="section-heading"><div><div class="eyebrow">SPRING SEMESTER · WEEK 4</div><h1>Your timetable</h1><p>Your classes and campus schedule at a glance.</p></div><button class="action-button" data-toast="Your timetable is up to date.">↻ &nbsp; Sync schedule</button></div><div class="filter-row">${weekDays.map((day, index) => `<button class="filter-button ${index === selectedDay ? "selected" : ""}" data-day="${day.label}">${day.label}</button>`).join("")}</div><div class="panel"><div class="panel-heading"><div><h3 id="timetable-day">${weekDays[selectedDay].heading}</h3><p>3 classes · 9:00 AM – 3:00 PM</p></div></div><div class="schedule-list">${schedule.map(item => `<div class="schedule-item"><time class="schedule-time">${item.time}</time><span class="schedule-color ${item.tone}"></span><div class="schedule-info"><strong>${item.title}</strong><small>${item.room}</small></div></div>`).join("")}<div class="schedule-item"><time class="schedule-time">16:30</time><span class="schedule-color" style="background:#c295db"></span><div class="schedule-info"><strong>Design Society weekly meetup</strong><small>Student Union · Studio 2</small></div></div></div></div>`;
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function showModal(title, message, actionLabel) {
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" aria-label="Close dialog">×</button><h2 id="modal-title">${title}</h2><p>${message}</p><button class="action-button modal-confirm">${actionLabel}</button></div>`;
  document.body.appendChild(backdrop);
  const close = () => backdrop.remove();
  backdrop.querySelector(".modal-close").addEventListener("click", close);
  backdrop.addEventListener("click", event => { if (event.target === backdrop) close(); });
  backdrop.querySelector(".modal-confirm").addEventListener("click", () => { close(); showToast("Done — you’re all set!"); });
}

document.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    event.preventDefault();
    renderPage(pageButton.dataset.page);
    document.getElementById("sidebar").classList.remove("open");
    return;
  }
  const toastButton = event.target.closest("[data-toast]");
  if (toastButton) return showToast(toastButton.dataset.toast);
  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    activeFilter = filterButton.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(button => button.classList.toggle("selected", button === filterButton));
    const filterKey = activeFilter.toLowerCase();
    document.querySelectorAll(".searchable").forEach(card => {
      const text = card.textContent.toLowerCase();
      const match = activeFilter === "All" || text.includes(filterKey) || (filterKey === "opportunities" && text.includes("opportunity"));
      card.hidden = !match;
    });
    return;
  }
  const dayButton = event.target.closest("[data-day]");
  if (dayButton) {
    document.querySelectorAll("[data-day]").forEach(button => button.classList.toggle("selected", button === dayButton));
    document.getElementById("timetable-day").textContent = dayButton.dataset.day.replace(" · ", ", ");
    return showToast("Showing your schedule for " + dayButton.dataset.day.split(" · ")[0] + ".");
  }
  const action = event.target.closest("[data-action]");
  if (action) {
    const title = action.dataset.title || "your item";
    if (action.dataset.action === "event") return showModal(`Join ${title}?`, "Add this event to your campus plans. You can always change your mind later.", "Add to my events");
    if (action.dataset.action === "join") {
      action.textContent = "Joined ✓";
      action.disabled = true;
      return showToast(`You’re now a member of ${title}.`);
    }
    if (action.dataset.action === "resource") return showModal(title, "This resource is available to Northfield students. Sign in with your campus account to access the full document.", "Continue to resource");
    if (action.dataset.action === "contact") return showModal(title, "Contact the Student Union front desk to arrange a pickup or share more details about this item.", "Got it");
    if (action.dataset.action === "report") return showModal("Report a lost or found item", "Visit the Student Union front desk to submit a report. Include when and where you lost or found the item so we can help reunite it with its owner.", "Got it");
  }
});

document.getElementById("global-search").addEventListener("input", event => {
  const query = event.target.value.trim().toLowerCase();
  if (query && activePage === "dashboard") {
    renderPage("announcements");
    event.target.value = query;
  }
  document.querySelectorAll(".searchable").forEach(card => { card.hidden = !!query && !card.textContent.toLowerCase().includes(query); });
});

document.getElementById("mobile-menu").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.getElementById("global-search").focus();
  }
  if (event.key === "Escape") document.getElementById("sidebar").classList.remove("open");
});
renderPage("dashboard");
