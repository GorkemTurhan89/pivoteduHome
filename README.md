# PivotEdu — statik yeniden yazım

`pivotedu.com.tr` sitesinin Astro ile yeniden yazılmış hâli. **Tüm metinler ve görseller
orijinal siteden birebir alınmıştır**; içerik değiştirilmemiştir.

## Ortamlar

| | Adres | Teknoloji | Google |
|---|---|---|---|
| **Canlı** | `pivotedu.com.tr` | WordPress | İndeksleniyor — SEO aynen devam |
| **Staging** | `pivotedu.gorkemturhan.com` | Astro (bu depo) | **Kapalı** — indekslenmez |

Staging'in indekslenmemesi koda gömülüdür, manuel bir adım değildir. `SITE_URL`
`pivotedu.com.tr` değilse otomatik olarak:

- `robots.txt` → `Disallow: /`
- her sayfada `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">`
- sitemap hiç üretilmez
- `public/_headers` ile `X-Robots-Tag: noindex` (Cloudflare Pages / Netlify)

Varsayılan güvenli taraftadır: adres tanınmıyorsa noindex uygulanır.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ klasörüne statik çıktı
npm run verify   # build + kırık görsel kontrolü
```

Staging build:

```bash
SITE_URL=https://pivotedu.gorkemturhan.com npm run build
```

## Yapı

| Yol | Ne işe yarar |
|---|---|
| `src/data/pages.json` | 58 sayfanın çıkarılmış içeriği (blok ağacı + SEO meta) |
| `src/data/styles.json` | Elementor CSS'inden kurtarılan bölüm stilleri (zemin, dolgu, renk) |
| `src/data/site.ts` | Menü, iletişim bilgileri, marka sabitleri |
| `src/lib/env.ts` | Ortam tespiti — canlı mı staging mi |
| `src/lib/style.ts` | Stil nesnelerini CSS'e çevirir, koyu zemin tespiti |
| `src/pages/[...slug].astro` | Tüm sayfaları `pages.json`'dan üretir |
| `src/pages/robots.txt.ts` | Ortama göre robots.txt üretir |
| `src/components/Block.astro` | Blok ağacını HTML'e çeviren özyinelemeli render |
| `src/components/LeadForm.astro` | Danışmanlık formu (alanlar orijinal WPForms'tan birebir) |
| `public/wp-content/uploads/` | Görseller — **orijinal yolları korunmuştur** |
| `scripts/check-assets.mjs` | Kırık görsel referansı var mı kontrol eder |

Görsel yolları bilerek değiştirilmedi: canlıya alındığında Google'ın indekslediği görsel
URL'leri kırılmasın diye.

## İçerik doğruluğu

Orijinal HTML ile üretilen çıktı kelime bazında karşılaştırıldı.

- **58 sayfanın 55'i birebir**
- Ortalama kelime kapsamı **%99.92** (87.442 kelime)
- Görsel referansları: **42 referans, 0 kırık**

Farklı olan 3 sayfadaki tek fark, orijinal sitede işlenmeden ham metin olarak görünen
`[instagram feed="3423"]` shortcode'udur; kasıtlı olarak taşınmamıştır.

## Ağırlık farkı

| | Orijinal | Bu sürüm |
|---|---|---|
| Ana sayfa HTML | 159.7 KB | 32.6 KB |
| CSS | 27 dosya / 236 KB | 2 dosya / 13.9 KB |
| JavaScript | 7 dosya | 0 |
| Sunucu yanıtı | 1.640–2.200 ms | ~12 ms |

## Canlıya almadan önce yapılacaklar

- [ ] `PUBLIC_FORM_ENDPOINT` tanımla ve form gönderimini uçtan uca test et
- [ ] Meta Pixel / Google Tag Manager kodlarını ekle (şu an yok)
- [ ] Çerez onay bandını ekle (orijinalde Complianz vardı, taşınmadı)
- [ ] Görselleri WebP'ye çevir (şu an 17 MB, ~3 MB'ye inebilir)
- [ ] **`public/_headers` dosyasını sil** — yoksa canlı da noindex olur
- [ ] `public/_redirects` dosyasındaki 301'i hosting'e uygula
- [ ] 58 URL'nin birebir eşleştiğini doğrula, Search Console'dan takip et

## Bilinen farklar

Aşağıdakiler orijinalde vardı, bu sürümde **yok** — bilerek:

- **Instagram feed** — orijinalde de çalışmıyor, ham shortcode metni olarak görünüyor
- **Çerez onay bandı** (Complianz) — yeniden kurulması gerekiyor
- **Meta Pixel / GTM** — takip kodları taşınmadı
- **"Hemen Arayın" sabit butonu** — WhatsApp butonu korundu, telefon butonu eklenmedi
