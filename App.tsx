import React, { useState, useEffect } from 'react';
import { Menu, X, Camera, MapPin, Phone, Mail, ChevronDown, Sparkles, Send, Printer, Calendar } from 'lucide-react';
import { Section } from './components/Section';
import { SERVICES, PRINT_SERVICES, TESTIMONIALS, GALLERY_ITEMS, NAV_LINKS } from './constants';
import { SectionId } from './types';
import { generatePhotoTip } from './services/geminiService';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SectionId.HOME);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'studio' | 'outdoor' | 'events'>('all');
  
  // Gemini State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Scroll handler for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleGenerateTip = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setAiResponse(null);
    try {
      const result = await generatePhotoTip(aiPrompt);
      setAiResponse(result);
    } catch (e) {
      setAiResponse("מצטערים, משהו השתבש. נסה שוב.");
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredGallery = galleryFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800" dir="rtl">
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection(SectionId.HOME)}>
              <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white mr-2">
                <Camera size={24} />
              </div>
              <span className="text-2xl font-bold text-brand-blue mr-3">סטודיו כפר סבא</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 space-x-reverse">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-base font-medium transition-colors hover:text-brand-orange ${
                    activeSection === link.href ? 'text-brand-orange' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-right px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id={SectionId.HOME} className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/433/1920/1080" 
            alt="Studio Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            משמרים רגעים <br/> כבר 20 שנה
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light opacity-90">
            הסטודיו לצילום המוביל בכפר סבא והסביבה. מקצועיות, יחס אישי ואהבה לאנשים.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection(SectionId.CONTACT)}
              className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              הזמן סשן צילום
            </button>
            <button 
              onClick={() => scrollToSection(SectionId.GALLERY)}
              className="bg-white/10 hover:bg-white/20 border-2 border-white text-white font-bold py-4 px-8 rounded-full backdrop-blur-md transition-all"
            >
              צפה בגלריה
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70">
          <ChevronDown size={40} />
        </div>
      </section>

      {/* About Section */}
      <Section id={SectionId.ABOUT} title="הסיפור שלנו" subtitle="יותר מרק סטודיו לצילום - בית של יצירה וזיכרונות">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute top-4 -right-4 w-full h-full bg-brand-orange/20 rounded-lg -z-10"></div>
            <img 
              src="https://picsum.photos/id/338/600/400" 
              alt="Photographer Team" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              לפני 20 שנה פתחנו את הסטודיו שלנו בלב כפר סבא מתוך תשוקה אמיתית לתפוס את הרגעים הקטנים שהופכים לזיכרונות הגדולים ביותר.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              הצוות שלנו מורכב מצלמים מקצועיים בוגרי בצלאל, שמתמחים בעבודה עם אנשים, ילדים ותינוקות. הפילוסופיה שלנו היא פשוטה: צילום טוב הוא צילום שמרגישים בו בנוח.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <span className="block text-3xl font-bold text-brand-blue">20+</span>
                <span className="text-sm text-gray-500">שנות ניסיון</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-brand-blue">5000+</span>
                <span className="text-sm text-gray-500">לקוחות מרוצים</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-brand-blue">15</span>
                <span className="text-sm text-gray-500">פרסי צילום</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id={SectionId.SERVICES} title="שירותי צילום" subtitle="חבילות מותאמות אישית לכל צורך ומטרה" className="bg-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map(service => (
            <div key={service.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 h-20 text-sm">{service.description}</p>
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <span className="font-bold text-brand-orange text-lg">{service.price}</span>
                  <button className="text-brand-blue text-sm font-semibold hover:underline">פרטים נוספים</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Printing Services */}
      <Section id={SectionId.PRINTING} title="שירותי הדפסה ועיצוב" className="bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto border border-gray-200">
          <div className="grid md:grid-cols-3">
            {PRINT_SERVICES.map((service, index) => (
              <div key={index} className={`p-8 ${index !== PRINT_SERVICES.length - 1 ? 'border-l border-gray-200' : ''} md:border-b-0 border-b border-gray-200 last:border-b-0`}>
                <h3 className="text-xl font-bold text-brand-blue mb-6 flex items-center justify-center">
                  <Printer size={20} className="ml-2 text-brand-orange" />
                  {service.type}
                </h3>
                <ul className="space-y-4">
                  {service.sizes.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                      <span className="text-gray-600">{item.size}</span>
                      <span className="font-bold text-gray-800">{item.price} ₪</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-brand-blue p-4 text-center text-white">
            <p className="text-sm font-medium">כל ההדפסות מתבצעות על הניירות וחומרי הגלם האיכותיים ביותר בשוק</p>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section id={SectionId.GALLERY} title="גלריה" subtitle="טעימה קטנה מהעבודות שלנו" className="bg-white">
        <div className="flex justify-center space-x-4 space-x-reverse mb-10">
          {[
            { id: 'all', label: 'הכל' },
            { id: 'studio', label: 'סטודיו' },
            { id: 'outdoor', label: 'חוץ' },
            { id: 'events', label: 'אירועים' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setGalleryFilter(filter.id as any)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                galleryFilter === filter.id 
                  ? 'bg-brand-orange text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-lg shadow-md aspect-[3/4] cursor-pointer">
              <img 
                src={item.src} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                <span className="text-white font-medium text-lg border-r-4 border-brand-orange pr-3">
                  {item.category === 'studio' ? 'צילומי סטודיו' : item.category === 'outdoor' ? 'צילומי חוץ' : 'אירועים'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id={SectionId.TESTIMONIALS} title="לקוחות מספרים" className="bg-brand-blue/5">
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="absolute top-8 left-8 text-brand-orange/20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.896 14.912 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H15.017C14.465 8 14.017 8.448 14.017 9V11C14.017 11.552 13.569 12 13.017 12H12.017V5H22.017V15C22.017 18.314 19.331 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.896 5.91197 16 7.01697 16H10.017C10.569 16 11.017 15.552 11.017 15V9C11.017 8.448 10.569 8 10.017 8H6.01697C5.46497 8 5.01697 8.448 5.01697 9V11C5.01697 11.552 4.56897 12 4.01697 12H3.01697V5H13.017V15C13.017 18.314 10.331 21 7.01697 21H5.01697Z" />
                </svg>
              </div>
              <div className="flex items-center mb-6">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md ml-4" />
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.date}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed relative z-10">"{t.text}"</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Blog & AI Assistant */}
      <Section id={SectionId.BLOG} title="בלוג וטיפים" subtitle="השראה ורעיונות לצילומים המושלמים" className="bg-white">
        <div className="grid md:grid-cols-2 gap-12">
           {/* Static Blog Post Teaser */}
           <div className="space-y-6">
             <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <span className="text-brand-orange font-bold text-sm mb-2 block">טיפים לצילום</span>
                <h3 className="text-xl font-bold mb-2">איך מתכוננים לצילומי משפחה?</h3>
                <p className="text-gray-600 text-sm mb-4">בחירת הבגדים, השעה הנכונה ביום ואיך גורמים לילדים לחייך...</p>
                <div className="flex items-center text-brand-blue text-sm font-semibold">
                  קרא עוד <ChevronDown className="mr-1 rotate-90" size={16} />
                </div>
             </div>
             <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <span className="text-brand-orange font-bold text-sm mb-2 block">רעיונות</span>
                <h3 className="text-xl font-bold mb-2">לוקיישנים מנצחים באזור השרון</h3>
                <p className="text-gray-600 text-sm mb-4">מהיערות הקסומים ועד השדות הפתוחים, הנה המקומות שאנחנו הכי אוהבים.</p>
                <div className="flex items-center text-brand-blue text-sm font-semibold">
                  קרא עוד <ChevronDown className="mr-1 rotate-90" size={16} />
                </div>
             </div>
           </div>

           {/* Gemini Interaction Box */}
           <div className="bg-gradient-to-br from-brand-blue to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-brand-orange rounded-lg ml-3">
                     <Sparkles size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">היועץ היצירתי שלנו</h3>
                </div>
                
                <p className="text-blue-100 mb-6">
                  מתלבטים איזה סגנון צילום מתאים לכם? מחפשים רעיון מקורי ליום הולדת? 
                  שאלו את היועץ החכם שלנו וקבלו השראה מיידית!
                </p>

                <div className="space-y-4">
                  <input 
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="למשל: רעיון לצילום רומנטי בים..."
                    className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white/95 focus:ring-2 focus:ring-brand-orange focus:outline-none placeholder-gray-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerateTip()}
                  />
                  
                  <button 
                    onClick={handleGenerateTip}
                    disabled={isGenerating || !aiPrompt.trim()}
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center transition-all ${
                      isGenerating 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-brand-orange hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30'
                    }`}
                  >
                    {isGenerating ? (
                      <span className="animate-pulse">חושב על רעיון...</span>
                    ) : (
                      <>
                        צור רעיון <Sparkles size={18} className="mr-2" />
                      </>
                    )}
                  </button>
                </div>

                {aiResponse && (
                   <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 animate-fade-in">
                     <p className="text-sm leading-relaxed text-blue-50">{aiResponse}</p>
                   </div>
                )}
              </div>
           </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id={SectionId.CONTACT} title="צור קשר" className="bg-gray-50">
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-brand-blue mb-6">דברו איתנו</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">שם מלא</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">טלפון</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">הודעה</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"></textarea>
              </div>
              <button className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center">
                שלח הודעה <Send size={18} className="mr-2" />
              </button>
            </form>
          </div>
          
          <div className="bg-brand-blue text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-8">פרטי התקשרות</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="ml-4 text-brand-orange flex-shrink-0" />
                  <div>
                    <p className="font-bold">כתובת הסטודיו</p>
                    <p className="text-blue-200">רחוב ויצמן 100, כפר סבא</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="ml-4 text-brand-orange flex-shrink-0" />
                  <div>
                    <p className="font-bold">טלפון</p>
                    <p className="text-blue-200">09-7654321</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="ml-4 text-brand-orange flex-shrink-0" />
                  <div>
                    <p className="font-bold">אימייל</p>
                    <p className="text-blue-200">studio@kfarsaba.co.il</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="ml-4 text-brand-orange flex-shrink-0" />
                  <div>
                    <p className="font-bold">שעות פעילות</p>
                    <p className="text-blue-200">א'-ה': 09:00 - 19:00</p>
                    <p className="text-blue-200">ו': 09:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
               <div className="w-full h-48 bg-gray-300 rounded-lg overflow-hidden relative">
                 {/* Placeholder for map */}
                 <img src="https://picsum.photos/id/1015/600/400" alt="Map" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded text-sm font-bold border border-white/40">מפה (להמחשה)</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t-4 border-brand-orange">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-6">
            <Camera size={32} className="ml-3 text-brand-orange" />
            <span className="text-2xl font-bold">סטודיו כפר סבא</span>
          </div>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            אנחנו כאן כדי לתעד את הרגעים החשובים שלכם באהבה ומקצועיות. 
            סטודיו לצילום מוביל בשרון עם ותק של 20 שנה.
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse mb-8">
            {['פייסבוק', 'אינסטגרם', 'וואטסאפ'].map(social => (
              <a key={social} href="#" className="text-gray-400 hover:text-brand-orange transition-colors">
                {social}
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} סטודיו כפר סבא. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;