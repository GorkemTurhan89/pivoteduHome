export const site = {
  name: 'PivotEdu',
  logo: '/wp-content/uploads/2026/08/cropped-logopivotedu-07-9.png',
  logoAlt: 'PivotEdu Yurt Dışı Eğitim Danışmanlığı',
  email: 'info@pivotedu.com.tr',
  phoneMobile: { label: '0532 337 48 68', href: 'tel:+905323374868' },
  phoneOffice: { label: '0262 320 01 77', href: 'tel:+902623200177' },
  whatsapp: {
    number: '905323374868',
    text: 'Merhaba PivotEdu, programlarınız hakkında bilgi almak istiyorum.',
  },
};

export const whatsappHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.text)}`;

type NavItem = { label: string; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Hakkımızda', href: '/hakkimizda/' },
  {
    label: 'Programlar',
    href: '/yurt-disi-egitim-programlari/',
    children: [
      { label: 'Programlar: Ön Bilgi', href: '/yurt-disi-egitim-programlari/' },
      { label: 'Dil Okulları', href: '/dil-okulu/' },
      { label: 'Kış ve Yaz Okulları', href: '/yaz-okullari/' },
      { label: 'Lisans / Yüksek Lisans', href: '/yurt-disi-universite/' },
      { label: 'Sertifika / Diploma Programları', href: '/sertifika-ve-diploma-programlari/' },
      { label: 'Work and Travel', href: '/work-and-travel/' },
      { label: 'Camp USA', href: '/ulkeler/amerika/camp-usa/' },
    ],
  },
  {
    label: 'Ülkeler',
    href: '/ulkeler/',
    children: [
      { label: 'Ülkeler: Genel', href: '/ulkeler/' },
      { label: 'Almanya', href: '/ulkeler/almanya/' },
      { label: 'Amerika', href: '/ulkeler/amerika/' },
      { label: 'Avustralya', href: '/ulkeler/avustralya/' },
      { label: 'Birleşik Arap Emirlikleri', href: '/ulkeler/birlesik-arap-emirlikleri/' },
      { label: 'İngiltere', href: '/ulkeler/ingiltere/' },
      { label: 'İrlanda', href: '/ulkeler/irlanda/' },
      { label: 'İspanya', href: '/ulkeler/ispanya/' },
      { label: 'İtalya', href: '/ulkeler/italya/' },
      { label: 'Kanada', href: '/ulkeler/kanada/' },
      { label: 'Letonya', href: '/ulkeler/letonya/' },
      { label: 'Macaristan', href: '/ulkeler/macaristan/' },
      { label: 'Malta', href: '/ulkeler/malta/' },
    ],
  },
  {
    label: 'Vize Danışmanlığı',
    href: '/vize-danismanligi/',
    children: [
      { label: 'Vize Danışmanlığı: Ön Bilgi', href: '/vize-danismanligi/' },
      { label: 'Schengen Vizesi', href: '/vize-danismanligi/' },
      { label: 'Amerika Vizesi', href: '/ulkeler/amerika/amerika-vize-danismanligi/' },
      { label: 'Avustralya Vizesi', href: '/vize-danismanligi/avustralya-vizesi/' },
      { label: 'İngiltere Vizesi', href: '/vize-danismanligi/ingiltere-vize-danismanligi/' },
      { label: 'İrlanda Vizesi', href: '/vize-danismanligi/irlanda-vizesi/' },
      { label: 'Kanada Vizesi', href: '/vize-danismanligi/kanada-vizesi/' },
    ],
  },
  { label: 'Ücretsiz Danışmanlık', href: '/ucretsiz-danismanlik-al/' },
  { label: 'İletişim', href: '/iletisim/' },
];

export const footerNav: NavItem[] = [
  { label: 'KVKK, Gizlilik ve Çerez Politikası', href: '/kvkk-aydinlatma-metni/' },
];
