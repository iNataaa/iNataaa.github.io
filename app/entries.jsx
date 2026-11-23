export function Contacts({ contacts, printNumber = false }) {
  return (
    <ul className="contacts" role="list" aria-label="Kontak">
      {contacts.map(({ label, value, href }) => {
        if (printNumber && label === 'WhatsApp') {
          const local = new URL(href).pathname.slice(1).replace(/^62/, '0');
          value = local.replace(/^(\d{4})(\d{4})(\d+)$/, '$1-$2-$3');
        }
        return <li key={label}><a href={href}>{value ?? label}</a></li>;
      })}
    </ul>
  );
}

export function Section({ id, title, number, children }) {
  return (
    <section id={id} aria-labelledby={id + '-judul'}>
      <header className="section-heading">
        {number && <span className="section-number" aria-hidden="true">{number}</span>}
        <h2 id={id + '-judul'}>{title}</h2>
      </header>
      {children}
    </section>
  );
}

export function Skill({ item }) {
  return (
    <div className="entry skill">
      <h3>{item.title}</h3>
      <p>{item.items.join(', ')}</p>
    </div>
  );
}

export function Certificate({ item, detail = false }) {
  const issuer = detail
    ? [item.issuer, item.field, item.date].join(' · ')
    : [item.issuer, item.date.split(' ').at(-1)].join(' · ');
  return (
    <article className="entry certificate">
      <h3>{item.title}</h3>
      <p className="meta">{issuer}</p>
      {detail && <>
        <p className="meta">{item.number}</p>
        <p className="meta">No. registrasi {item.registration} · Berlaku {item.validity}</p>
      </>}
    </article>
  );
}
