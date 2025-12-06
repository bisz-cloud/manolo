import { PrintService, Service, Testimonial, GalleryItem } from './types';
import React from 'react';
import { Camera, Image as ImageIcon, Video, Printer, Calendar, Heart } from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'צילומי משפחה וילדים',
    description: 'סשן מהנה ומשוחרר בסטודיו או בחיק הטבע, לתפיסת הרגעים האמיתיים של המשפחה שלכם.',
    price: 'החל מ-800 ₪',
    image: 'https://picsum.photos/id/1027/400/300'
  },
  {
    id: '2',
    title: 'צילומי הריון',
    description: 'תיעוד התקופה הקסומה והמרגשת ביותר, באווירה אינטימית ומקצועית.',
    price: 'החל מ-1000 ₪',
    image: 'https://picsum.photos/id/1011/400/300'
  },
  {
    id: '3',
    title: 'בוק בת/בר מצווה',
    description: 'יום צילום חוויתי ומעצים לנער/ה, כולל החלפת תלבושות ולוקיישנים מגוונים.',
    price: 'החל מ-1500 ₪',
    image: 'https://picsum.photos/id/1012/400/300'
  },
  {
    id: '4',
    title: 'צילומי תדמית לעסקים',
    description: 'צילום מקצועי שמציג אותך ואת העסק שלך בצורה הטובה והמחמיאה ביותר.',
    price: 'החל מ-600 ₪',
    image: 'https://picsum.photos/id/1025/400/300'
  }
];

export const PRINT_SERVICES: PrintService[] = [
  {
    type: 'הדפסה על קנבס איכותי',
    sizes: [
      { size: '30x40 ס"מ', price: 120 },
      { size: '50x70 ס"מ', price: 250 },
      { size: '70x100 ס"מ', price: 400 },
    ]
  },
  {
    type: 'הדפסה על זכוכית אקרילית',
    sizes: [
      { size: '30x40 ס"מ', price: 200 },
      { size: '50x70 ס"מ', price: 450 },
      { size: '60x90 ס"מ', price: 650 },
    ]
  },
  {
    type: 'אלבומים דיגיטליים',
    sizes: [
      { size: 'אלבום כיס (20 עמודים)', price: 350 },
      { size: 'אלבום פרימיום (30 עמודים)', price: 800 },
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'משפחת כהן',
    text: 'הגענו לסטודיו לצילומי גיל שנה, והחוויה הייתה פשוט נהדרת! הסבלנות לילדים והתוצאות המדהימות השאירו אותנו עם טעם של עוד.',
    date: 'ינואר 2024',
    avatar: 'https://picsum.photos/id/64/100/100'
  },
  {
    id: '2',
    name: 'דנה לוי',
    text: 'עשיתי בוק בת מצווה והיה כל כך כיף! הרגשתי כמו דוגמנית ליום אחד. התמונות יצאו מושלמות.',
    date: 'מרץ 2024',
    avatar: 'https://picsum.photos/id/65/100/100'
  },
  {
    id: '3',
    name: 'רון הייטק',
    text: 'הצטלמנו לתמונות פרופיל לינקדאין לכל החברה. מקצועיות ברמה הגבוהה ביותר ושירות מעולה.',
    date: 'פברואר 2024',
    avatar: 'https://picsum.photos/id/91/100/100'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', category: 'studio', src: 'https://picsum.photos/id/338/600/800' },
  { id: '2', category: 'outdoor', src: 'https://picsum.photos/id/342/800/600' },
  { id: '3', category: 'studio', src: 'https://picsum.photos/id/349/600/800' },
  { id: '4', category: 'events', src: 'https://picsum.photos/id/433/800/600' },
  { id: '5', category: 'outdoor', src: 'https://picsum.photos/id/449/800/800' },
  { id: '6', category: 'studio', src: 'https://picsum.photos/id/453/600/800' },
];

export const NAV_LINKS = [
  { label: 'אודות', href: 'about', icon: <Heart size={18} /> },
  { label: 'שירותי צילום', href: 'services', icon: <Camera size={18} /> },
  { label: 'הדפסות', href: 'printing', icon: <Printer size={18} /> },
  { label: 'גלריה', href: 'gallery', icon: <ImageIcon size={18} /> },
  { label: 'בלוג וטיפים', href: 'blog', icon: <Calendar size={18} /> },
  { label: 'צור קשר', href: 'contact', icon: <Video size={18} /> },
];