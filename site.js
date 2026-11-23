const shell = document.querySelector("#situs");
const originalMain = document.querySelector("#isi");
const isCv = document.body.classList.contains("cv");

function element(tag, { text, className, ...attributes } = {}, ...children) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

function link(label, href) {
  return element("a", { text: label, href });
}

function contactList(profile) {
  const items = profile.contacts.map(({ label, value, href }) => {
    if (isCv && label === "WhatsApp") {
      const number = new URL(href).pathname.slice(1).replace(/^62/, "0");
      const formatted = number.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");
      return element("li", {}, link(formatted, href));
    }
    return element("li", {}, link(value ?? label, href));
  });
  return element("ul", { className: "contacts", "aria-label": "Kontak", role: "list" }, ...items);
}

function identity(profile) {
  return [
    element("h1", { className: "name", text: profile.name }),
    element("p", { className: "position", text: profile.role }),
    element("p", { className: "location", text: profile.location }),
    contactList(profile)
  ];
}

function section(id, title, children, number) {
  const heading = element("h2", { id: id + "-judul", text: title });
  const header = element("header", { className: "section-heading" }, heading);
  if (number !== undefined) {
    header.prepend(element("span", { className: "section-number", text: number, "aria-hidden": "true" }));
  }
  return element("section", { id, "aria-labelledby": heading.id }, header, ...children);
}

function projectEntry(project) {
  return element("article", { className: "entry project", id: project.id },
    element("div", { className: "entry-heading" },
      element("h3", { text: project.title }),
      element("p", { className: "meta", text: project.context })),
    element("p", { className: "project-copy", text: project.sentences.join(" ") })
  );
}

function certificateEntry(cert) {
  const year = cert.date.split(" ").at(-1);
  const metadata = isCv ? [cert.issuer, cert.field, cert.date] : [cert.issuer, year];
  const entry = element("article", { className: "entry certificate" },
    element("h3", { text: cert.title }),
    element("p", { className: "meta", text: metadata.join(" · ") }),
    element("p", { className: "meta certificate-number", text: cert.number })
  );
  if (isCv) {
    entry.append(element("p", {
      className: "meta",
      text: "No. registrasi " + cert.registration + " · Berlaku " + cert.validity
    }));
  }
  return entry;
}

function skillEntry(group) {
  return element("div", { className: "entry skill" },
    element("h3", { text: group.title }),
    element("p", { text: group.items.join(", ") })
  );
}

function cvEntry(item) {
  const entry = element("article", { className: "entry cv-entry" },
    element("h3", { text: item.title }));
  const metadata = [item.place, item.period].filter(Boolean);
  if (metadata.length) {
    entry.append(element("p", { className: "meta", text: metadata.join(" · ") }));
  }
  if (item.detail) entry.append(element("p", { text: item.detail }));
  if (item.tasks?.length) {
    entry.append(element("ul", { className: "tasks" },
      ...item.tasks.map(text => element("li", { text }))));
  }
  return entry;
}

function main() {
  return element("main", { id: "isi", tabindex: "-1" });
}

function makePortfolio(data) {
  const sections = [
    ["proyek", "Proyek pilihan", data.projects.map(projectEntry)],
    ["keahlian", "Keahlian", data.skills.map(skillEntry)],
    ["sertifikasi", "Sertifikasi", data.certifications.map(certificateEntry)]
  ].filter(([, , items]) => items.length);

  const featured = data.projects.find(project => project.sentences[project.pullQuoteSentence]);
  if (featured) {
    const projects = sections.find(([id]) => id === "proyek")[2];
    const entryIndex = data.projects.indexOf(featured);
    projects.splice(entryIndex + 1, 0,
      element("figure", { className: "pull-quote" },
        element("blockquote", {},
          element("p", { text: featured.sentences[featured.pullQuoteSentence] }))));
  }

  const sidebar = element("header", { className: "sidebar" }, ...identity(data.profile),
    element("nav", { className: "navigation", "aria-label": "Navigasi portofolio" },
      element("ul", { role: "list" },
        ...sections.map(([id, title]) => element("li", {}, link(title, "#" + id))),
        element("li", { className: "cv-link" }, link("Lihat CV", "./cv.html")))));

  const content = main();
  content.append(...sections.map(([id, title, items], index) =>
    section(id, title, items, String(index + 1).padStart(2, "0"))));
  return [sidebar, content];
}

function makeCv(data) {
  const print = element("button", { type: "button", text: "Cetak / simpan PDF" });
  print.addEventListener("click", () => window.print());

  const nav = element("nav", { className: "cv-toolbar", "aria-label": "Navigasi CV" },
    link("Kembali ke portofolio", "./index.html"), print);
  const header = element("header", { className: "cv-header" }, ...identity(data.profile));
  const content = main();
  content.append(header);

  const selectedProject = data.projects.find(project => project.id === "kbbi");
  const otherWork = [...data.otherWork];
  if (selectedProject) {
    otherWork.unshift({
      title: selectedProject.title,
      place: selectedProject.context,
      detail: selectedProject.sentences.at(-1)
    });
  }

  const sections = [
    ["pengalaman", "Pengalaman kerja", data.experience, cvEntry],
    ["pendidikan", "Pendidikan", data.education, cvEntry],
    ["keahlian", "Keahlian", data.skills, skillEntry],
    ["organisasi", "Pengalaman organisasi", data.organizations, cvEntry],
    ["proyek", "Proyek dan kegiatan pilihan", otherWork, cvEntry],
    ["prestasi", "Prestasi", data.awards, cvEntry],
    ["sertifikasi", "Sertifikasi", data.certifications, certificateEntry]
  ];
  for (const [id, title, items, render] of sections) {
    if (items.length) content.append(section(id, title, items.map(render)));
  }
  return [nav, content];
}

async function renderPage() {
  try {
    const response = await fetch(new URL("./data.json", import.meta.url));
    if (!response.ok) throw new Error("Gagal memuat data: " + response.status);
    const data = await response.json();
    document.title = (isCv ? "CV" : "Portofolio") + " — " + data.profile.name;

    const canonical = element("link", {
      rel: "canonical",
      href: new URL(isCv ? "/cv.html" : "/", data.profile.site).href
    });
    document.head.append(canonical);
    shell.replaceChildren(...(isCv ? makeCv(data) : makePortfolio(data)));
    const fragment = window.location.hash.slice(1);
    if (fragment) document.getElementById(fragment)?.scrollIntoView();
  } catch (error) {
    console.error(error);
    const message = element("p", {
      role: "alert",
      text: "Halaman gagal dimuat. Muat ulang untuk mencoba lagi."
    });
    originalMain.replaceChildren(message);
    shell.replaceChildren(originalMain);
  } finally {
    shell.setAttribute("aria-busy", "false");
  }
}

renderPage();
