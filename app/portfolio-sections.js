import data from '../data.json';

export const portfolioSections = [
  { id: 'proyek', title: 'Proyek pilihan', items: data.projects },
  { id: 'keahlian', title: 'Keahlian', items: data.skills },
  { id: 'sertifikasi', title: 'Sertifikasi', items: data.certifications },
].filter(section => section.items.length);
