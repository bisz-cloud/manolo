export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export interface PrintService {
  type: string;
  sizes: { size: string; price: number }[];
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  src: string;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  PRINTING = 'printing',
  GALLERY = 'gallery',
  TESTIMONIALS = 'testimonials',
  BLOG = 'blog',
  CONTACT = 'contact',
}