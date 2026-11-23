import data from '../data.json';
import SiteHeader from './site-header';

export default function Interior({ title, current, children }) {
  return (
    <>
      <SiteHeader profile={data.profile} current={current} />
      <main className="frame page" id="isi" tabIndex="-1">
        <h1 className="page-title">{title}</h1>
        {children}
      </main>
    </>
  );
}
