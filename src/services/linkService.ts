import { Link, LinkCategory } from '../types';
import linksData from '../data/links.json';

// JSON verilerini Link tipine dönüştür
const typedLinks: Link[] = linksData.links.map(link => ({
  ...link,
  category: link.category as LinkCategory // JSON'dan gelen string değerini LinkCategory tipine dönüştür
}));

// Tüm bağlantıları getir
export const getLinks = (): Promise<Link[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(typedLinks);
    }, 300); // Gerçek bir API çağrısını simüle etmek için küçük bir gecikme
  });
};

// Bağlantıları kategoriye göre filtrele
export const getLinksByCategory = (category: LinkCategory | 'all'): Promise<Link[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === 'all') {
        resolve(typedLinks);
      } else {
        resolve(typedLinks.filter(link => link.category === category));
      }
    }, 300);
  });
};

// Bağlantıları aramak için fonksiyon
export const searchLinks = (searchTerm: string): Promise<Link[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const term = searchTerm.toLowerCase().trim();
      if (!term) {
        resolve(typedLinks);
        return;
      }
      
      resolve(typedLinks.filter(link => 
        link.title.toLowerCase().includes(term) || 
        (link.description && link.description.toLowerCase().includes(term))
      ));
    }, 300);
  });
};

// Yeni bağlantı eklemek için (gerçek uygulamada bir API'ye kaydedilir)
export const addLink = (link: Omit<Link, 'id' | 'createdAt'>): Promise<Link> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newLink: Link = {
        ...link,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      // Not: Gerçek bir uygulamada, burada bir API çağrısı yapılır ve veri kalıcı olarak saklanır
      resolve(newLink);
    }, 300);
  });
}; 