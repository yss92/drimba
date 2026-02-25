import { useEffect, useState } from "react";

type Language = "bm" | "en";

export function App() {
  const [lang, setLang] = useState<Language>("bm");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [productItems, setProductItems] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const isBm = lang === "bm";

  // Track scroll position for a slim progress bar under the header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show promotional popup after a short delay (once per visit in this tab)
  useEffect(() => {
    const hasSeen = window.sessionStorage.getItem("dr-promo-seen");
    if (hasSeen) return;

    const timer = window.setTimeout(() => {
      setShowPromo(true);
      window.sessionStorage.setItem("dr-promo-seen", "1");
    }, 4500);

    return () => window.clearTimeout(timer);
  }, []);

  // Fetch products from deruanrimba.my to populate the Penginapan section
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);
        setProductError(null);

        // Use WooCommerce Store API (no auth needed for published products)
        const response = await fetch(
          "https://deruanrimba.my/wp-json/wc/store/products?page=1&per_page=12"
        );

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setProductItems(data);
        } else {
          setProductItems([]);
        }
      } catch (error) {
        console.error("Failed to load products from deruanrimba.my", error);
        setProductError("failed");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    void fetchProducts();
  }, []);

  const navItems = isBm
    ? [
        { label: "Tentang", href: "#about" },
        { label: "Penginapan", href: "#stays" },
        { label: "Pakej", href: "#packages" },
        { label: "Cara tempah", href: "#how-to-book" },
        { label: "Aktiviti", href: "#experiences" },
        { label: "Galeri", href: "#gallery" },
        { label: "Hubungi", href: "#contact" },
      ]
    : [
        { label: "About", href: "#about" },
        { label: "Stays", href: "#stays" },
        { label: "Packages", href: "#packages" },
        { label: "How to book", href: "#how-to-book" },
        { label: "Experiences", href: "#experiences" },
        { label: "Gallery", href: "#gallery" },
        { label: "Contact", href: "#contact" },
      ];

  const stays = isBm
    ? [
        {
          name: "Villa Deruan Rimba 1",
          capacity: "2–4 orang",
          description:
            "Villa moden yang selesa dengan tingkap besar, balkoni dan pemandangan hijau yang menenangkan.",
          size: "Anggaran 45–60 m²",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-9-1536x864.jpg",
        },
        {
          name: "Villa Deruan Rimba 2",
          capacity: "4–6 orang",
          description:
            "Susun atur luas, sesuai untuk keluarga kecil dengan ruang rehat untuk berkumpul.",
          size: "Anggaran 60–80 m²",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-8-1536x864.jpg",
        },
        {
          name: "Villa Deruan Rimba 3",
          capacity: "6–10 orang",
          description:
            "Unit lebih besar yang sesuai untuk kumpulan, berdekatan kawasan berkongsi dan ruang aktiviti.",
          size: "Anggaran 80–120 m²",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-10-1536x864.jpg",
        },
      ]
    : [
        {
          name: "Deruan Rimba Villa 1",
          capacity: "2–4 guests",
          description:
            "Warm, modern villa with large windows, balcony, and tranquil views over the surrounding greenery.",
          size: "Approx. 45–60 m²",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-9-1536x864.jpg",
        },
        {
          name: "Deruan Rimba Villa 2",
          capacity: "4–6 guests",
          description:
            "Spacious layout suitable for small families or groups, complete with comfortable bedding and living area.",
          size: "Approx. 60–80 m²",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-8-1536x864.jpg",
        },
        {
          name: "Deruan Rimba Villa 3",
          capacity: "6–10 guests",
          description:
            "Thoughtfully arranged unit for larger groups, close to shared facilities and open gathering spaces.",
          size: "Approx. 80–120 m²",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-10-1536x864.jpg",
        },
      ];

  const packages = isBm
    ? [
        {
          name: "Pakej Santai Keluarga",
          nights: "2 hari 1 malam",
          guests: "4 – 8 orang",
          tag: "Paling popular",
          highlights: [
            "Penginapan villa / chalet keluarga",
            "Cadangan jadual aktiviti santai",
            "Dek tepi sungai untuk sesi bergambar",
          ],
        },
        {
          name: "Pakej Reunion & Rakan",
          nights: "2H1M atau 3H2M",
          guests: "10 – 20 orang",
          tag: "Untuk kumpulan",
          highlights: [
            "Gabungan beberapa unit bersebelahan",
            "Ruang BBQ dan makan malam berkumpul",
            "Bantuan asas susunan permainan ringan",
          ],
        },
        {
          name: "Pakej Retreat Syarikat",
          nights: "1 – 2 malam",
          guests: "15 – 40 orang",
          tag: "Untuk syarikat",
          highlights: [
            "Penggunaan dewan / ruang serbaguna",
            "Pilihan susun atur kerusi & meja asas",
            "Cadangan slot aktiviti team‑building ringkas",
          ],
        },
      ]
    : [
        {
          name: "Family Escape Package",
          nights: "2 days 1 night",
          guests: "4 – 8 guests",
          tag: "Most popular",
          highlights: [
            "Family villa or chalet stay",
            "Suggested light, family‑friendly itinerary",
            "Riverside deck session for photos",
          ],
        },
        {
          name: "Reunion & Friends Package",
          nights: "2D1N or 3D2N",
          guests: "10 – 20 guests",
          tag: "For groups",
          highlights: [
            "Cluster of units located close together",
            "Shared BBQ and casual dinner space",
            "Simple games & bonding activities (on request)",
          ],
        },
        {
          name: "Corporate Retreat Package",
          nights: "1 – 2 nights",
          guests: "15 – 40 guests",
          tag: "For teams",
          highlights: [
            "Use of hall / multi‑purpose indoor space",
            "Basic table & chair arrangements included",
            "Suggested light team‑building slots",
          ],
        },
      ];

  const experiences = isBm
    ? [
        {
          name: "Jalan‑jalan alam & hiking ringan",
          description:
            "Laluan santai di sekitar kawasan hijau untuk anda terokai mengikut keselesaan sendiri.",
        },
        {
          name: "BBQ & unggun api",
          description:
            "Berkumpul beramai‑ramai di sekitar BBQ atau unggun api sambil menikmati suasana malam.",
        },
        {
          name: "Team‑building & retreat syarikat",
          description:
            "Ruang fleksibel untuk sesi santai, perbincangan dan aktiviti asas pasukan.",
        },
      ]
    : [
        {
          name: "Nature walks & hiking",
          description:
            "Gentle trails and nearby tracks to explore the surrounding greenery at your own pace.",
        },
        {
          name: "BBQ & campfire",
          description:
            "Gather around the grill or campfire for warm conversations under the stars.",
        },
        {
          name: "Team‑building & retreats",
          description:
            "Flexible spaces and light activities suitable for corporate off‑sites and workshops.",
        },
      ];

  const facilities = isBm
    ? [
        "Surau & kemudahan solat",
        "Dewan & ruang serbaguna dalam bangunan",
        "Tempat BBQ & ruang makan luar",
        "Akses tepi sungai & dek santai",
        "Parkir dalam kawasan penginapan",
        "Wi‑Fi percuma di kawasan terpilih",
      ]
    : [
        "Surau & prayer facilities",
        "Event hall & multi‑purpose indoor spaces",
        "BBQ pit & outdoor dining areas",
        "Riverside access & chill‑out decks",
        "Ample on‑site parking within the compound",
        "Complimentary Wi‑Fi in selected common areas",
      ];

  const galleryItems = isBm
    ? [
        {
          title: "Villa tepi sungai",
          subtitle: "Deretan villa moden berhampiran kawasan hijau.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.36.jpeg",
        },
        {
          title: "Laluan dan landskap",
          subtitle: "Jalan kecil dan landskap yang terjaga untuk ke setiap unit.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.36-1.jpeg",
        },
        {
          title: "Pandangan dari atas",
          subtitle: "Gambaran keseluruhan susun atur Deruan Rimba.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.35.jpeg",
        },
        {
          title: "Kawasan villa berbukit",
          subtitle: "Unit yang tersusun di lereng bukit dengan suasana hijau.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.37-1.jpeg",
        },
        {
          title: "Dek dan ruang santai",
          subtitle: "Sudut sesuai untuk sesi santai dan bergambar.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-9-1536x864.jpg",
        },
        {
          title: "Suasana malam",
          subtitle: "Lampu yang lembut dengan bunyi deruan air.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-8-1536x864.jpg",
        },
      ]
    : [
        {
          title: "Riverside villas",
          subtitle: "Modern villas set close to the surrounding greenery.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.36.jpeg",
        },
        {
          title: "Paths & landscaping",
          subtitle: "Neatly kept walkways and landscaping leading to each unit.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.36-1.jpeg",
        },
        {
          title: "Aerial overview",
          subtitle: "A wider view of the overall Deruan Rimba layout.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.35.jpeg",
        },
        {
          title: "Hillside villas",
          subtitle: "Units arranged along the slope with lush surroundings.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.37-1.jpeg",
        },
        {
          title: "Deck & chill‑out spaces",
          subtitle: "Spots made for relaxed moments and photos.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-9-1536x864.jpg",
        },
        {
          title: "Night ambience",
          subtitle: "Soft lighting with the sound of flowing water.",
          image:
            "https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-8-1536x864.jpg",
        },
      ];

  const howToBookSteps = isBm
    ? [
        {
          step: "1",
          title: "Buka laman web Deruan Rimba",
          description:
            "Buka laman web Deruan Rimba di www.deruanrimba.my dan klik butang \"Book Now\" di bahagian atas.",
        },
        {
          step: "2",
          title: "Pilih lot / jenis tapak",
          description:
            "Pilih lot tapak atau jenis penginapan yang anda mahukan. Setiap lot mempunyai saiz dan harga berbeza.",
        },
        {
          step: "3",
          title: "Lihat layout & pilih kawasan",
          description:
            "Klik pada gambar layout tapak untuk membuka pelan penuh. Pilih nombor tapak mengikut lot yang dipilih pada Langkah 2.",
        },
        {
          step: "4",
          title: "Pilih nombor tapak & semak tarikh",
          description:
            "Di borang tempahan, pilih nombor tapak (contoh: Tapak 28) dan semak kekosongan pada kalendar.",
          points: [
            "Hijau: tarikh tersedia (available)",
            "Merah: tarikh tidak tersedia",
            "Hijau gelap: tarikh yang anda pilih",
          ],
          note: "Penting: Klik hanya tarikh check‑in dan check‑out. Contoh: 22 Jun (tarikh masuk) dan 25 Jun (tarikh keluar).",
        },
        {
          step: "5",
          title: "Pilih bayaran deposit atau full payment",
          description:
            "Pada langkah pembayaran, pilih sama ada untuk bayar deposit (contoh 50%) atau membuat bayaran penuh.",
          note: "Ikuti arahan sehingga transaksi selesai. Pengesahan tempahan akan dihantar melalui e‑mel atau WhatsApp.",
        },
        {
          step: "6",
          title: 'Semak tempahan melalui "View cart"',
          description:
            "Selepas memilih lot dan tarikh, klik butang \"View cart\" untuk semak semula butiran tempahan (tarikh, jenis lot dan jumlah bayaran).",
        },
        {
          step: "7",
          title: 'Klik "Proceed to checkout"',
          description:
            "Scroll ke bawah dan klik butang \"Proceed to checkout\" untuk pergi ke halaman pembayaran.",
        },
        {
          step: "8",
          title: "Isi maklumat diri",
          description:
            "Di bahagian \"Billing details\", isi nama penuh, emel, nombor telefon dan maklumat lain yang diperlukan.",
        },
        {
          step: "9",
          title: "Tulis apa‑apa pesanan tambahan",
          description:
            "Gunakan ruangan \"Order notes\" untuk menulis permintaan khas, masa ketibaan atau maklumat penting lain.",
        },
        {
          step: "10",
          title: "Buat bayaran & terima resit",
          description:
            "Lengkapkan pembayaran mengikut arahan di skrin. Resit dan pengesahan tempahan akan dihantar ke e‑mel anda.",
          note: "Jika ada apa‑apa yang tidak jelas, anda boleh hubungi pihak Deruan Rimba melalui WhatsApp: 0123767093.",
        },
      ]
    : [
        {
          step: "1",
          title: "Open the Deruan Rimba website",
          description:
            'Go to www.deruanrimba.my and click the "Book Now" button at the top of the page.',
        },
        {
          step: "2",
          title: "Choose your lot / site type",
          description:
            "Select the lot or type of accommodation you prefer. Each lot has different sizes and pricing.",
        },
        {
          step: "3",
          title: "View layout & pick a site number",
          description:
            "Click on the site layout image to open the full plan. Choose a site number that matches the lot you selected in Step 2.",
        },
        {
          step: "4",
          title: "Select site number & check dates",
          description:
            "In the booking form, choose your site number (for example: Lot 28) and check availability in the calendar.",
          points: [
            "Green: date is available",
            "Red: date is not available",
            "Dark green: the dates you selected",
          ],
          note: "Important: Click only the check‑in and check‑out dates. Example: 22 June (check‑in) and 25 June (check‑out).",
        },
        {
          step: "5",
          title: "Choose deposit or full payment",
          description:
            "On the payment step, decide whether to pay a deposit (for example 50%) or the full amount.",
          note: "Follow the instructions until payment is completed. Your booking confirmation will be sent via email or WhatsApp.",
        },
        {
          step: "6",
          title: 'Review your booking via "View cart"',
          description:
            'After choosing your lot and dates, click the "View cart" button to review the booking details (dates, lot type and total amount).',
        },
        {
          step: "7",
          title: 'Click "Proceed to checkout"',
          description:
            'Scroll down and click the "Proceed to checkout" button to go to the payment page.',
        },
        {
          step: "8",
          title: "Fill in your details",
          description:
            "In the \"Billing details\" section, enter your full name, email, phone number and any required information.",
        },
        {
          step: "9",
          title: "Add any extra notes",
          description:
            'Use the "Order notes" field for special requests, arrival time or any important information.',
        },
        {
          step: "10",
          title: "Make payment & check your email",
          description:
            "Complete the payment as shown on screen. Your receipt and booking confirmation will be sent to your email.",
          note: "If you are unsure about anything, contact the Deruan Rimba team directly via WhatsApp: 0123767093.",
        },
      ];

  const faqs = isBm
    ? [
        {
          question: "Bagaimana untuk semak tarikh yang masih kosong?",
          answer:
            "Anda boleh semak terus di kalendar ketika membuat tempahan di laman web Deruan Rimba. Warna hijau menunjukkan tarikh tersedia, merah tidak tersedia dan hijau gelap ialah tarikh yang anda pilih.",
        },
        {
          question: "Adakah makanan disediakan?",
          answer:
            "Biasanya tetamu bawa sendiri makanan atau menggunakan khidmat katering luar. Untuk program kumpulan, anda boleh maklumkan kepada kami dan kami akan cadangkan pilihan katerer setempat.",
        },
        {
          question: "Bolehkah bawa kanak‑kanak kecil?",
          answer:
            "Ya, Deruan Rimba mesra keluarga. Walau bagaimanapun, pengawasan ibu bapa adalah penting terutamanya berhampiran sungai dan kawasan bertangga.",
        },
        {
          question: "Bagaimana cara sahkan tempahan saya?",
          answer:
            "Tempahan akan disahkan selepas bayaran deposit atau bayaran penuh diterima. Resit dan butiran penginapan akan dihantar melalui e‑mel atau WhatsApp untuk rujukan anda.",
        },
      ]
    : [
        {
          question: "How do I check which dates are available?",
          answer:
            "You can check dates directly on the calendar when booking on the Deruan Rimba website. Green means available, red is unavailable and dark green shows the dates you have selected.",
        },
        {
          question: "Is food provided?",
          answer:
            "Most guests bring their own food or arrange external catering. For group programmes, let us know and we can suggest nearby caterers that previous guests have used.",
        },
        {
          question: "Is the retreat suitable for young children?",
          answer:
            "Yes, Deruan Rimba is family‑friendly. However, parental supervision is important, especially near the river and staircase areas.",
        },
        {
          question: "When is my booking confirmed?",
          answer:
            "Your booking is confirmed once your deposit or full payment is received. A confirmation email or WhatsApp message will be sent with stay details for your reference.",
        },
      ];

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900" id="top">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-500 to-sky-600 text-[0.7rem] text-sky-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-1.5 sm:px-6 lg:px-8">
          <p className="flex-1">
            {isBm
              ? "Tempahan untuk tarikh 2025 kini dibuka. Tarikh hujung minggu popular cepat penuh."
              : "Bookings for 2025 dates are now open. Popular weekends tend to fill up early."}
          </p>
          <a
            href="#contact"
            className="hidden shrink-0 rounded-full border border-sky-100/70 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sky-50 hover:bg-white/15 md:inline-flex"
          >
            {isBm ? "Hubungi kami" : "Talk to us"}
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-sky-200 bg-sky-50">
              <img
                src="https://deruanrimba.my/wp-content/uploads/2022/11/306396207_115879651261376_4303864236368841302_n.png"
                alt={isBm ? "Ikon Deruan Rimba" : "Deruan Rimba icon"}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Deruan Rimba
              </div>
              <p className="text-[0.7rem] text-slate-500">
                {isBm
                  ? "Retreat Hutan & Penginapan Tepi Sungai"
                  : "Forest Retreat & Riverside Stay"}
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative pb-1 transition-colors hover:text-sky-700"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-sky-500 to-sky-400 transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language toggle (always visible) */}
            <div className="flex items-center rounded-full border border-sky-200 bg-sky-50 p-0.5 text-[0.7rem]">
              <button
                type="button"
                onClick={() => setLang("bm")}
                className={`rounded-full px-2 py-1 font-semibold ${
                  isBm
                    ? "bg-sky-600 text-white"
                    : "text-sky-700 hover:text-sky-900"
                }`}
                aria-pressed={isBm}
              >
                BM
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-2 py-1 font-semibold ${
                  !isBm
                    ? "bg-sky-600 text-white"
                    : "text-sky-700 hover:text-sky-900"
                }`}
                aria-pressed={!isBm}
              >
                EN
              </button>
            </div>

            {/* Desktop CTA */}
            <a
              href="#contact"
              className="hidden rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm shadow-sky-300 hover:bg-sky-500 md:inline-flex"
            >
              {isBm ? "Tempah Sekarang" : "Book Now"}
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={isBm ? "Buka menu" : "Open menu"}
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-0.5">
                <span className="block h-[2px] w-4 rounded-full bg-slate-700" />
                <span className="block h-[2px] w-3 rounded-full bg-slate-700" />
                <span className="block h-[2px] w-4 rounded-full bg-slate-700" />
              </span>
            </button>
          </div>
        </div>
        <div className="h-0.5 w-full bg-slate-100">
          <div
            className="h-0.5 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/70 backdrop-blur-md md:hidden">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between px-4 pt-4">
              <a href="#top" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-sky-200 bg-sky-50">
                  <img
                    src="https://deruanrimba.my/wp-content/uploads/2022/11/306396207_115879651261376_4303864236368841302_n.png"
                    alt={isBm ? "Ikon Deruan Rimba" : "Deruan Rimba icon"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
                  Deruan Rimba
                </span>
              </a>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/70 bg-slate-900/40 text-slate-100 hover:bg-slate-900/70"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={isBm ? "Tutup menu" : "Close menu"}
              >
                ×
              </button>
            </div>

            <nav className="mt-6 flex-1 space-y-1 px-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-semibold text-slate-900 bg-white/90 mb-2"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="space-y-4 px-6 pb-8">
              <div className="flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3">
                <span className="text-xs font-medium text-slate-700">
                  {isBm ? "Bahasa" : "Language"}
                </span>
                <div className="flex items-center rounded-full border border-sky-200 bg-sky-50 p-0.5 text-[0.7rem]">
                  <button
                    type="button"
                    onClick={() => setLang("bm")}
                    className={`rounded-full px-2 py-1 font-semibold ${
                      isBm
                        ? "bg-sky-600 text-white"
                        : "text-sky-700 hover:text-sky-900"
                    }`}
                    aria-pressed={isBm}
                  >
                    BM
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`rounded-full px-2 py-1 font-semibold ${
                      !isBm
                        ? "bg-sky-600 text-white"
                        : "text-sky-700 hover:text-sky-900"
                    }`}
                    aria-pressed={!isBm}
                  >
                    EN
                  </button>
                </div>
              </div>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm shadow-sky-300"
              >
                {isBm ? "Tempah Sekarang" : "Book Now"}
              </a>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* HERO */}
        <section className="border-b border-slate-200 bg-gradient-to-b from-sky-50 to-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14 lg:py-16 lg:px-8">
            {/* HERO COPY */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span>
                  {isBm
                    ? "Lari sekejap dari bandar · Tenang di tepi sungai"
                    : "Escape the city · Riverside forest retreat"}
                </span>
              </p>

              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {isBm ? "Retreat hutan tepi sungai untuk " : "A riverside forest retreat for "}
                <span className="bg-gradient-to-r from-sky-700 via-sky-500 to-sky-400 bg-clip-text text-transparent">
                  {isBm ? "keluarga, rakan & pasukan" : "families, friends & teams"}
                </span>
                .
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {isBm
                  ? "Deruan Rimba ialah penginapan tepi sungai yang dikelilingi alam hijau. Sesuai untuk cuti hujung minggu, family day kecil, program syarikat dan reunion rakan."
                  : "Deruan Rimba is a calm riverside retreat surrounded by greenery – ideal for weekends away, small family days, gatherings with friends, and corporate off‑sites."}
              </p>

              <dl className="mt-6 grid max-w-md grid-cols-3 gap-4 text-sm text-slate-700">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                    {isBm ? "Saiz kumpulan" : "Group size"}
                  </dt>
                  <dd className="mt-1 text-base font-semibold">2 – 40</dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                    {isBm ? "Jarak dari bandar" : "Distance"}
                  </dt>
                  <dd className="mt-1 text-base font-semibold">
                    {isBm ? "± 1 jam pemanduan" : "± 1 hour drive"}
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                    {isBm ? "Jenis acara" : "Occasions"}
                  </dt>
                  <dd className="mt-1 text-sm">
                    {isBm
                      ? "Percutian, family day, retreat"
                      : "Holidays, family days, retreats"}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#stays"
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white shadow-sm shadow-sky-300 hover:bg-sky-500"
                >
                  {isBm ? "Lihat penginapan" : "View stays"}
                </a>
                <a
                  href="#how-to-book"
                  className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-white/80 px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-sky-700 hover:border-sky-400 hover:bg-sky-50"
                >
                  {isBm ? "Langkah tempahan" : "How to book"}
                </a>
                <p className="text-[0.7rem] text-slate-500 sm:ml-2">
                  {isBm
                    ? "Tempahan melalui laman web rasmi Deruan Rimba."
                    : "Bookings made via the official Deruan Rimba website."}
                </p>
              </div>
            </div>

            {/* HERO IMAGE CARD */}
            <aside className="relative">
              <div className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full bg-sky-200/60 blur-3xl" />
              <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-52 rounded-full bg-sky-100 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2.1rem] border border-sky-100 bg-white shadow-xl shadow-sky-100">
                <div className="relative h-72 w-full overflow-hidden sm:h-80 lg:h-[26rem]">
                  <img
                    src="https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-1-e1667625245925.jpg"
                    alt={isBm ? "Pemandangan Deruan Rimba" : "Deruan Rimba riverside view"}
                    className="h-full w-full object-cover transition duration-700 ease-out hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/5 to-slate-900/0" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <div className="rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-medium text-slate-800 shadow-sm">
                      {isBm ? "Pemandangan sebenar" : "Actual on-site view"}
                    </div>
                    <div className="hidden rounded-full bg-sky-600/90 px-3 py-1 text-[0.7rem] font-semibold text-white shadow-sm sm:inline-flex">
                      {isBm ? "Suasana pagi yang tenang" : "Calm morning atmosphere"}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <div>
                      <p className="font-semibold">
                        {isBm
                          ? "Deruan Rimba · Sg. Gabai"
                          : "Deruan Rimba · Sg. Gabai"}
                      </p>
                      <p className="text-slate-100/80">
                        {isBm
                          ? "Villa & chalet dikelilingi kehijauan dan deruan sungai."
                          : "Villas and chalets surrounded by greenery and river sounds."}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/90 px-3 py-1 text-[0.7rem] font-semibold text-slate-900">
                      ⭐ 4.8 · {isBm ? "Tetamu" : "Guests"}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 border-t border-slate-100 bg-white p-4 text-xs text-slate-700 sm:grid-cols-3">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
                      {isBm ? "Jenis penginapan" : "Stay types"}
                    </p>
                    <p className="mt-1">
                      {isBm
                        ? "Villa, chalet & suite keluarga"
                        : "Villas, chalets & family suites"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
                      {isBm ? "Sesuai untuk" : "Perfect for"}
                    </p>
                    <p className="mt-1">
                      {isBm
                        ? "Percutian, family day & retreat"
                        : "Holidays, family days & retreats"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
                      {isBm ? "Kadar dari" : "Rates from"}
                    </p>
                    <p className="mt-1 font-semibold">RM ··· / {isBm ? "malam" : "night"}</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="relative overflow-hidden border-b border-slate-200 bg-sky-50"
        >
          {/* Background image + soft gradient overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-9-1536x864.jpg')",
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/96 via-white/94 to-sky-50/96" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            {/* Glassmorphism card */}
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md lg:p-8">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.95fr)] lg:items-start">
                {/* LEFT: STORY & HIGHLIGHTS */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      {isBm ? "Tentang Deruan Rimba" : "About Deruan Rimba"}
                    </p>
                    <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                      {isBm
                        ? "Retreat moden di tengah hijau Hulu Langat."
                        : "A modern retreat surrounded by Hulu Langat greenery."}
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
                      {isBm
                        ? "Deruan Rimba menggabungkan penginapan villa dan chalet yang selesa dengan suasana hutan dan deruan sungai yang menenangkan. Direka untuk keluarga, rakan dan pasukan kecil yang mahu lari seketika dari bandar tanpa perlu memandu jauh."
                        : "Deruan Rimba combines comfortable villas and chalets with a calming forest and riverside setting. It is designed for families, friends and small teams who want a quick escape from the city without a long drive."}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
                      {isBm
                        ? "Setiap unit mempunyai ruang privasi sendiri, manakala kawasan bersama seperti dek tepi sungai, tempat BBQ dan dewan serbaguna memudahkan penganjuran aktiviti – dari makan malam santai hingga sesi ringkas team‑building."
                        : "Each unit offers its own privacy, while shared spaces such as the riverside deck, BBQ corners and multi‑purpose hall make it easy to host activities – from relaxed dinners to light team‑building sessions."}
                    </p>
                  </div>

                  {/* Highlight chips */}
                  <div className="flex flex-wrap gap-2 text-[0.7rem] text-sky-900">
                    <span className="rounded-full bg-sky-50 px-3 py-1">
                      {isBm
                        ? "Penginapan berhadapan alam hijau & deruan sungai"
                        : "Stays facing greenery and gentle river sounds"}
                    </span>
                    <span className="rounded-full bg-sky-50 px-3 py-1">
                      {isBm
                        ? "Lokasi di Hulu Langat, Selangor"
                        : "Located in Hulu Langat, Selangor"}
                    </span>
                    <span className="rounded-full bg-sky-50 px-3 py-1">
                      {isBm
                        ? "Sesuai untuk 2 – 40 tetamu (bergantung susunan)"
                        : "Suitable for 2 – 40 guests (depending on setup)"}
                    </span>
                  </div>

                  <dl className="mt-2 grid gap-4 text-xs sm:grid-cols-3 sm:text-sm">
                    <div className="rounded-2xl border border-sky-100 bg-sky-50/80 p-4">
                      <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-sky-700">
                        {isBm ? "Sesuai untuk" : "Perfect for"}
                      </dt>
                      <dd className="mt-2 space-y-1 text-slate-700">
                        <p>{isBm ? "Percutian keluarga" : "Family getaways"}</p>
                        <p>
                          {isBm
                            ? "Reunion & perjumpaan rakan"
                            : "Reunions & gatherings"}
                        </p>
                        <p>
                          {isBm
                            ? "Retreat & program syarikat"
                            : "Retreats & off‑sites"}
                        </p>
                      </dd>
                    </div>
                    <div className="rounded-2xl border border-sky-100 bg-sky-50/80 p-4">
                      <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-sky-700">
                        {isBm ? "Jenis penginapan" : "Stay types"}
                      </dt>
                      <dd className="mt-2 space-y-1 text-slate-700">
                        <p>{isBm ? "Villa peribadi" : "Private villas"}</p>
                        <p>{isBm ? "Chalet moden" : "Modern chalets"}</p>
                        <p>{isBm ? "Suite keluarga" : "Family suites"}</p>
                      </dd>
                    </div>
                    <div className="rounded-2xl border border-sky-100 bg-sky-50/80 p-4">
                      <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-sky-700">
                        {isBm ? "Waktu daftar masuk" : "Check‑in times"}
                      </dt>
                      <dd className="mt-2 space-y-1 text-slate-700">
                        <p>
                          {isBm
                            ? "Check‑in: 3.00 petang"
                            : "Check‑in: 3:00 pm"}
                        </p>
                        <p>
                          {isBm
                            ? "Check‑out: 12.00 tengah hari"
                            : "Check‑out: 12:00 pm"}
                        </p>
                        <p>
                          {isBm
                            ? "Lewat check‑out tertakluk pada ketersediaan"
                            : "Late check‑out subject to availability"}
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* RIGHT: LOCATION & GUEST JOURNEY */}
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-3xl border border-sky-100 bg-sky-50/80 p-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sky-700">
                      {isBm ? "Lokasi" : "Location"}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      Deruan Rimba Campsite
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      Jalan Sungai Gabai, 43100 Hulu Langat, Selangor
                    </p>
                    <div className="mt-3 grid gap-2 text-[0.7rem] text-slate-700 sm:grid-cols-2">
                      <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-[0.7rem] text-white">
                          📍
                        </span>
                        <span>
                          {isBm
                            ? "Kawasan hijau Hulu Langat berhampiran Sg. Gabai."
                            : "Green surroundings of Hulu Langat near Sg. Gabai."}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-[0.7rem] text-white">
                          🚗
                        </span>
                        <span>
                          {isBm
                            ? "Sekitar ± 1 jam pemanduan dari Kuala Lumpur."
                            : "Around ± 1‑hour drive from Kuala Lumpur."}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200/80 bg-white/85 px-4 py-4 text-xs text-slate-700 backdrop-blur-sm">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sky-700">
                      {isBm ? "Aliran hari di Deruan Rimba" : "A day at Deruan Rimba"}
                    </p>
                    <ol className="mt-2 space-y-2">
                      <li className="flex gap-2">
                        <span className="mt-[2px] h-4 w-4 flex-none rounded-full border border-sky-400 bg-sky-50 text-center text-[0.65rem] font-semibold text-sky-700">
                          1
                        </span>
                        <span>
                          {isBm
                            ? "Tiba, daftar masuk dan terokai kawasan sekitar villa / chalet anda."
                            : "Arrive, check in and explore the villa or chalet surroundings."}
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-[2px] h-4 w-4 flex-none rounded-full border border-sky-400 bg-sky-50 text-center text-[0.65rem] font-semibold text-sky-700">
                          2
                        </span>
                        <span>
                          {isBm
                            ? "Petang dan malam diisi dengan sesi santai, BBQ atau aktiviti kumpulan ringan."
                            : "Spend the evening with relaxed gatherings, BBQ or light group activities."}
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-[2px] h-4 w-4 flex-none rounded-full border border-sky-400 bg-sky-50 text-center text-[0.65rem] font-semibold text-sky-700">
                          3
                        </span>
                        <span>
                          {isBm
                            ? "Keesokan pagi, nikmati udara segar sebelum daftar keluar dan kembali ke bandar dengan lebih segar."
                            : "The next morning, enjoy fresh air before checking out and heading back to the city refreshed."}
                        </span>
                      </li>
                    </ol>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200/80 bg-white/85 px-4 py-3 text-[0.7rem] text-slate-700 backdrop-blur-sm">
                      <p className="font-semibold text-slate-900">
                        {isBm ? "Waktu tenang" : "Quiet hours"}
                      </p>
                      <p className="mt-1">
                        {isBm
                          ? "Kami mengekalkan suasana terkawal pada waktu malam supaya tetamu boleh berehat dengan tenang."
                          : "We keep evenings calm so guests can rest and enjoy the natural ambience."}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200/80 bg-white/85 px-4 py-3 text-[0.7rem] text-slate-700 backdrop-blur-sm">
                      <p className="font-semibold text-slate-900">
                        {isBm ? "Tempahan kumpulan" : "Group enquiries"}
                      </p>
                      <p className="mt-1">
                        {isBm
                          ? "Untuk 15 tetamu ke atas atau program khas, hubungi kami lebih awal supaya kami boleh bantu susun penginapan dan ruang aktiviti."
                          : "For 15+ guests or special programmes, contact us early so we can help arrange stays and activity spaces."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extra quick facts row */}
              <div className="mt-6 flex flex-wrap gap-2 text-[0.7rem] text-slate-600">
                <span className="rounded-full bg-sky-50/95 px-3 py-1 text-sky-800">
                  {isBm
                    ? "± 1 jam pemanduan dari bandar Kuala Lumpur"
                    : "± 1‑hour drive from Kuala Lumpur city"}
                </span>
                <span className="rounded-full bg-sky-50/95 px-3 py-1 text-sky-800">
                  {isBm
                    ? "Tempahan dibuka untuk tarikh 2025 (tertakluk pada kekosongan)"
                    : "Bookings open for 2025 dates (subject to availability)"}
                </span>
                <span className="rounded-full bg-sky-50/95 px-3 py-1 text-sky-800">
                  {isBm
                    ? "Semua tempahan dibuat melalui laman web rasmi Deruan Rimba"
                    : "All reservations are made via the official Deruan Rimba website"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STAYS */}
        <section
          id="stays"
          className="relative overflow-hidden border-b border-slate-200 bg-sky-50"
        >
          {/* Background image */}
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://deruanrimba.my/wp-content/uploads/2022/11/RUJUKAN-8-1536x864.jpg')",
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/96 via-white/94 to-sky-50/97" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md lg:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    {isBm ? "Penginapan" : "Stays"}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    {isBm
                      ? "Bilik, villa & chalet untuk pelbagai jenis percutian."
                      : "Rooms, villas & chalets for every kind of stay."}
                  </h2>
                </div>
                <p className="max-w-md text-sm text-slate-600">
                  {isBm
                    ? "Kongsikan tarikh dan jumlah tetamu, kami akan cadangkan kombinasi unit yang sesuai. Kadar hujung minggu dan musim puncak mungkin berbeza mengikut permintaan."
                    : "Share your dates and group size and we’ll suggest the right mix of units. Weekend and peak‑season rates may vary based on demand."}
                </p>
              </div>

              <div className="mt-8">
                {isLoadingProducts && (
                  <p className="mb-4 text-xs text-slate-500">
                    {isBm
                      ? "Sedang memuatkan penginapan terus dari deruanrimba.my ..."
                      : "Loading stays directly from deruanrimba.my ..."}
                  </p>
                )}

                {!isLoadingProducts && productError && (
                  <p className="mb-4 text-xs text-amber-700">
                    {isBm
                      ? "Maaf, kami tidak dapat memaparkan senarai penginapan terkini. Paparan di bawah adalah contoh susun atur."
                      : "Sorry, we couldn’t load the latest stay list. The cards below are example layouts only."}
                  </p>
                )}

                <div className="grid gap-6 md:grid-cols-3">
                  {(productItems && productItems.length > 0 ? productItems : stays).map(
                    (item: any) => {
                      const name = item.name ?? item.title ?? item.slug;
                      const imageSrc = item.images?.[0]?.src ?? item.image;
                      const capacityLabel = item.capacity ?? (isBm ? "2–4 orang" : "2–4 guests");
                      const priceHtml = item.prices?.price ?? item.price_html ?? null;
                      const permalink = item.permalink ?? "https://deruanrimba.my";
                      const descriptionText = item.short_description
                        ? String(item.short_description).replace(/<[^>]+>/g, "")
                        : item.description ?? "";

                      return (
                        <article
                          key={permalink + name}
                          className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
                        >
                          <div className="relative h-40 w-full overflow-hidden">
                            <img
                              src={imageSrc}
                              alt={name}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/0 to-slate-900/0" />
                            <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-medium text-slate-800">
                              {capacityLabel}
                            </div>
                          </div>

                          <div className="flex flex-1 flex-col p-5">
                            <div className="mb-3 flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                  {name}
                                </h3>
                                {item.size && (
                                  <p className="mt-1 text-xs text-slate-500">{item.size}</p>
                                )}
                              </div>
                              <div className="rounded-2xl bg-sky-50 px-3 py-1 text-[0.7rem] font-semibold text-sky-700">
                                {priceHtml
                                  ? `RM ${Number(priceHtml) / 100} / ${
                                      isBm ? "malam" : "night"
                                    }`
                                  : `RM ··· / ${isBm ? "malam" : "night"}`}
                              </div>
                            </div>

                            <p className="flex-1 text-sm text-slate-600 line-clamp-4">
                              {descriptionText ||
                                (isBm
                                  ? "Penginapan selesa dengan kemudahan asas dan akses mudah ke kawasan bersama."
                                  : "Comfortable stay with essential amenities and easy access to shared spaces.")}
                            </p>

                            <ul className="mt-4 space-y-1 text-xs text-slate-600">
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                                <span>
                                  {isBm
                                    ? "Maklumat lanjut kadar & ketersediaan dipaparkan di laman rasmi."
                                    : "Full rates & availability are shown on the official website."}
                                </span>
                              </li>
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                                <span>
                                  {isBm
                                    ? "Klik untuk lihat butiran lot / bilik secara terus di deruanrimba.my."
                                    : "Click to view the detailed lot / room page directly on deruanrimba.my."}
                                </span>
                              </li>
                            </ul>

                            <a
                              href={permalink}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-4 inline-flex items-center justify-center rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-sky-700 hover:border-sky-400 hover:bg-sky-100"
                            >
                              {isBm ? "Lihat di deruanrimba.my" : "View on deruanrimba.my"}
                            </a>
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section
          id="packages"
          className="relative overflow-hidden border-b border-slate-200 bg-white"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.1),_transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {isBm ? "Pakej" : "Packages"}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {isBm
                    ? "Contoh pakej untuk bantu anda merancang penginapan."
                    : "Sample packages to help you plan your stay."}
                </h2>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                {isBm
                  ? "Gunakan pakej ini sebagai rujukan awal. Beritahu kami bajet dan objektif program, kami boleh sesuaikan cadangan mengikut keperluan kumpulan anda."
                  : "Use these packages as a starting point. Share your budget and objectives with us and we can tailor a recommendation for your group."}
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {packages.map((pkg) => (
                <article
                  key={pkg.name}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm ring-1 ring-transparent transition hover:-translate-y-1 hover:border-sky-300 hover:ring-sky-100"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {pkg.name}
                    </h3>
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sky-700">
                      {pkg.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {pkg.nights} · {pkg.guests}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                    {pkg.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center justify-between text-[0.7rem] text-slate-500">
                    <span>
                      {isBm ? "Anggaran kadar dari" : "Indicative rate from"}
                    </span>
                    <span className="font-semibold text-sky-700">
                      RM ··· / {isBm ? "malam" : "night"}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-sky-700 hover:border-sky-400 hover:bg-sky-100"
                  >
                    {isBm ? "Tanya tentang pakej ini" : "Ask about this package"}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW TO BOOK */}
        <section
          id="how-to-book"
          className="relative overflow-hidden border-b border-slate-200 bg-white"
        >
          {/* Background related to booking / UI */}
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/98 via-white/95 to-sky-50/97" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md lg:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    {isBm ? "Cara tempah" : "How to book"}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    {isBm
                      ? "Tempahan mudah melalui website Deruan Rimba."
                      : "A simple, step‑by‑step booking flow on our website."}
                  </h2>
                </div>
                <p className="max-w-md text-sm text-slate-600">
                  {isBm
                    ? "Ikuti sepuluh langkah ringkas ini – daripada pilih lot, semak kalendar sehingga membuat bayaran dan terima resit di emel."
                    : "Follow these ten clear steps – from choosing your lot, checking the calendar, to making payment and receiving your confirmation email."}
                </p>
              </div>

              <ol className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {howToBookSteps.map((item) => (
                  <li
                    key={item.step}
                    className="flex flex-col rounded-3xl border border-slate-200/90 bg-sky-50/85 p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-white text-base font-semibold text-sky-700 ring-1 ring-sky-200">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {item.points && (
                      <ul className="mt-3 space-y-1 text-xs text-slate-600">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-500" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.note && (
                      <p className="mt-3 text-[0.7rem] text-slate-500">
                        {item.note}
                      </p>
                    )}
                  </li>
                ))}
              </ol>

              <p className="mt-6 text-[0.7rem] text-slate-500">
                {isBm
                  ? "Tip: Sediakan nombor tapak pilihan dan tarikh cadangan sebelum mula menempah untuk memudahkan proses."
                  : "Tip: Decide your preferred lot numbers and tentative dates before starting the booking to make the process smoother."}
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCES */}
        <section
          id="experiences"
          className="relative overflow-hidden border-b border-slate-200 bg-sky-50"
        >
          {/* Background image to decorate section */}
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.37-1.jpeg')",
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/96 via-white/94 to-sky-50/98" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md lg:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    {isBm ? "Aktiviti" : "Experiences"}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    {isBm
                      ? "Nikmati masa anda sepenuhnya di Deruan Rimba."
                      : "Make the most of your time at the retreat."}
                  </h2>
                </div>
                <p className="max-w-md text-sm text-slate-600">
                  {isBm
                    ? "Daripada pagi yang perlahan di tepi sungai, sesi BBQ hingga aktiviti team‑building ringkas, kawasan ini direka untuk bantu anda berehat dari kesibukan bandar."
                    : "From slow mornings by the river, BBQ sessions to light team‑building, the property is set up to help you switch off from the city."}
                </p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {experiences.map((exp) => (
                  <article
                    key={exp.name}
                    className="flex flex-col rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-sm backdrop-blur-sm"
                  >
                    <h3 className="text-sm font-semibold text-slate-900">
                      {exp.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-slate-600">
                      {exp.description}
                    </p>
                    <p className="mt-3 text-xs text-slate-500">
                      {isBm
                        ? "Tertakluk kepada cuaca & jadual. Sila maklumkan semasa membuat tempahan."
                        : "Subject to weather and scheduling – let us know when enquiring."}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section
          id="gallery"
          className="relative overflow-hidden border-b border-slate-200 bg-white"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {isBm ? "Galeri" : "Gallery"}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {isBm
                    ? "Lihat sendiri suasana sebenar Deruan Rimba."
                    : "See what Deruan Rimba really looks like."}
                </h2>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                {isBm
                  ? "Semua gambar di bawah adalah daripada kawasan sebenar Deruan Rimba – termasuk laluan, villa dan susun atur keseluruhan."
                  : "All photos below are taken around Deruan Rimba – from the walkways and villas to the overall layout."}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* Video highlight card */}
              <figure className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm md:col-span-2">
                <div className="relative h-52 w-full overflow-hidden sm:h-64">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                    poster="https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.36-1.jpeg"
                  >
                    <source src="https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Video-2023-06-07-at-13.29.20.mp4" type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-slate-900/0" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-[0.7rem] font-medium text-white">
                    {isBm ? "Video suasana Deruan Rimba" : "Deruan Rimba ambience video"}
                  </div>
                </div>
              </figure>

              {galleryItems.map((item, index) => (
                <figure
                  key={item.image}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={
                        isBm
                          ? "Foto Deruan Rimba"
                          : "Deruan Rimba photo"
                      }
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 via-slate-900/5 to-slate-900/0" />
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2 py-0.5 text-[0.7rem] font-medium text-white">
                      {index + 1} / {galleryItems.length}
                    </span>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FACILITIES, CONTACT & FAQ */}
        <section id="contact" className="bg-sky-50">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {isBm ? "Kemudahan & fasiliti" : "Facilities & amenities"}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {isBm
                    ? "Lengkap untuk penginapan yang selesa & fleksibel."
                    : "Everything you need for a comfortable, flexible stay."}
                </h2>
                <p className="mt-4 text-sm text-slate-600">
                  {isBm
                    ? "Kemudahan mungkin berbeza sedikit antara unit. Kongsi rancangan anda, kami akan cadangkan susunan yang sesuai dengan kumpulan dan jenis percutian anda."
                    : "Facilities may differ slightly between units. Share your plans and we will propose a setup that suits your group and type of stay."}
                </p>

                <ul className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  {facilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-3"
                    >
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Facilities photos */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                    {isBm ? "Gambar kemudahan" : "Facilities photos"}
                  </p>
                  <p className="mt-2 text-xs text-slate-600">
                    {isBm
                      ? "Beberapa sudut sebenar kemudahan di Deruan Rimba, termasuk dewan, laluan dan kawasan berkongsi."
                      : "A few real snapshots of Deruan Rimba’s facilities – halls, walkways and shared areas."}
                  </p>

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {[
                      "https://deruanrimba.my/wp-content/uploads/2025/07/20250715_111316-scaled.jpg",
                      "https://deruanrimba.my/wp-content/uploads/2025/07/20250715_111820-scaled.jpg",
                      "https://deruanrimba.my/wp-content/uploads/2025/07/20250715_112424-scaled.jpg",
                      "https://deruanrimba.my/wp-content/uploads/2025/07/20250715_112303-scaled.jpg",
                      "https://deruanrimba.my/wp-content/uploads/2025/07/20250715_112456-scaled.jpg",
                      "https://deruanrimba.my/wp-content/uploads/2025/07/20250715_111507-scaled.jpg",
                      "https://deruanrimba.my/wp-content/uploads/2025/07/20250715_112424-scaled.jpg",
                      "https://deruanrimba.my/wp-content/uploads/2025/07/20250715_111719-scaled.jpg",
                    ].map((src, index) => (
                      <div
                        key={src + index}
                        className="relative h-28 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                      >
                        <img
                          src={src}
                          alt={
                            isBm
                              ? `Kemudahan Deruan Rimba ${index + 1}`
                              : `Deruan Rimba facility ${index + 1}`
                          }
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 via-slate-900/5 to-slate-900/0" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
                  <p className="text-[0.7rem] uppercase tracking-[0.16em]">
                    {isBm ? "Nota penting" : "Important note"}
                  </p>
                  <p className="mt-2">
                    {isBm
                      ? "Acara dengan sistem bunyi atau aktiviti luar yang berpanjangan perlu dimaklumkan lebih awal supaya kami boleh menasihatkan kesesuaian dan peraturan rumah."
                      : "Events with sound systems or extended outdoor activities should be highlighted early so we can advise on suitability and house rules."}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">
                  {isBm
                    ? "Hantar pertanyaan tempahan"
                    : "Send a booking enquiry"}
                </h3>
                <p className="mt-2 text-xs text-slate-600">
                  {isBm
                    ? "Isi butiran di bawah atau hubungi kami terus melalui WhatsApp. Di bawah ini juga disertakan alamat, nombor telefon dan emel rasmi Deruan Rimba."
                    : "Share your details below or contact us directly via WhatsApp. Below are also the official address, phone number and email for Deruan Rimba."}
                </p>

                <div className="mt-4 space-y-1 text-[0.7rem] text-slate-600">
                  <p className="font-semibold text-slate-800">
                    Deruan Rimba Campsite, Jalan Sungai Gabai, 43100 Hulu Langat, Selangor
                  </p>
                  <p>
                    {isBm ? "Telefon" : "Phone"}: + 6017 327 0551
                  </p>
                  <p>
                    Email : deruanrimbaofficial@gmail.com
                  </p>
                </div>

                <form
                  className="mt-5 space-y-4 text-xs"
                  onSubmit={(event) => {
                    event.preventDefault();
                    alert(
                      isBm
                        ? "Terima kasih atas pertanyaan anda. Kami akan hubungi anda secepat mungkin."
                        : "Thank you for your enquiry. We will be in touch shortly."
                    );
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-700"
                      >
                        {isBm ? "Nama" : "Name"}
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        placeholder={isBm ? "Nama penuh anda" : "Your full name"}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="phone"
                        className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-700"
                      >
                        {isBm ? "Telefon / WhatsApp" : "Phone / WhatsApp"}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        placeholder={isBm ? "+60 ..." : "+60 ..."}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkin"
                        className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-700"
                      >
                        {isBm ? "Check‑in" : "Check‑in"}
                      </label>
                      <input
                        id="checkin"
                        type="date"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkout"
                        className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-700"
                      >
                        {isBm ? "Check‑out" : "Check‑out"}
                      </label>
                      <input
                        id="checkout"
                        type="date"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="guests"
                        className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-700"
                      >
                        {isBm ? "Bil. tetamu" : "No. of guests"}
                      </label>
                      <input
                        id="guests"
                        type="number"
                        min={1}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        placeholder={isBm ? "cth. 12" : "e.g. 12"}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="stayType"
                      className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-700"
                    >
                      {isBm ? "Jenis penginapan" : "Type of stay"}
                    </label>
                    <select
                      id="stayType"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    >
                      {isBm ? (
                        <>
                          <option>Percutian keluarga</option>
                          <option>Reunion / perjumpaan rakan</option>
                          <option>Retreat / program syarikat</option>
                          <option>Acara peribadi</option>
                          <option>Lain‑lain</option>
                        </>
                      ) : (
                        <>
                          <option>Family holiday</option>
                          <option>Friends / gathering</option>
                          <option>Corporate retreat</option>
                          <option>Private event</option>
                          <option>Others</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-700"
                    >
                      {isBm ? "Maklumat tambahan" : "Additional details"}
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.8rem] text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      placeholder={
                        isBm
                          ? "Contoh: jenis acara, julat umur tetamu, keperluan khas."
                          : "For example: type of event, guest age range, special requirements."
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white shadow-sm shadow-sky-300 hover:bg-sky-500"
                    >
                      {isBm ? "Hantar pertanyaan" : "Submit enquiry"}
                    </button>
                    <p className="text-[0.7rem] text-slate-500">
                      {isBm
                        ? "Atau hubungi terus WhatsApp: 012‑376 7093"
                        : "Or message us directly on WhatsApp: 012‑376 7093"}
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                    {isBm ? "Soalan lazim tetamu" : "Guest FAQs"}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 sm:text-[0.8rem]">
                    {isBm
                      ? "Beberapa soalan yang sering ditanya tetamu sebelum membuat tempahan. Jika anda perlukan penjelasan lanjut, hubungi kami bila‑bila masa."
                      : "A few common questions guests ask before booking. If you need anything else, feel free to reach out to our team."}
                  </p>
                </div>
                <div className="space-y-3">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={faq.question}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                      >
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                          onClick={() =>
                            setOpenFaqIndex(isOpen ? null : index)
                          }
                        >
                          <span className="text-xs font-medium text-slate-900 sm:text-sm">
                            {faq.question}
                          </span>
                          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-[0.75rem] text-slate-600">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 sm:text-[0.8rem]">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PROMOTIONAL POPUP */}
      {showPromo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="relative max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-sky-200">
            <button
              type="button"
              onClick={() => setShowPromo(false)}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs text-slate-500 shadow-sm hover:bg-slate-50"
              aria-label={isBm ? "Tutup promosi" : "Close promotion"}
            >
              ×
            </button>

            <div className="relative h-40 w-full overflow-hidden">
              <img
                src="https://deruanrimba.my/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-07-at-13.31.36.jpeg"
                alt={isBm ? "Promosi Deruan Rimba" : "Deruan Rimba promotion"}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-slate-900/0" />
              <div className="absolute bottom-3 left-3 rounded-full bg-sky-500/90 px-3 py-1 text-[0.7rem] font-semibold text-white">
                {isBm ? "PROMOSI TERHAD" : "LIMITED OFFER"}
              </div>
            </div>

            <div className="space-y-3 px-5 pb-5 pt-4 text-xs text-slate-700">
              <h2 className="text-sm font-semibold text-slate-900">
                {isBm
                  ? "Diskaun istimewa untuk tempahan awal terpilih"
                  : "Special savings on selected early‑bird bookings"}
              </h2>
              <p>
                {isBm
                  ? "Kongsi tarikh cadangan anda dan nyatakan bahawa anda melihat popup promosi ini. Pasukan kami akan semak jika sebarang promosi semasa boleh digunakan untuk tarikh tersebut."
                  : "Share your preferred dates and mention that you saw this promotion popup. Our team will check if any current offers can be applied for those dates."}
              </p>
              <p className="rounded-2xl bg-sky-50 px-3 py-2 text-[0.7rem] text-sky-900">
                {isBm
                  ? "Promosi tertakluk pada kekosongan dan tarikh terpilih sahaja. Tidak semua tarikh layak untuk diskaun."
                  : "Offers are subject to availability and selected dates only. Not all dates will be eligible for discounts."}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#packages"
                  onClick={() => setShowPromo(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-sky-600 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-sky-500"
                >
                  {isBm ? "Lihat pakej" : "View packages"}
                </a>
                <a
                  href="https://wa.me/60123767093?text=Saya%20ingin%20tanya%20tentang%20promosi%20Deruan%20Rimba"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-sky-200 bg-white px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-sky-700 hover:border-sky-400 hover:bg-sky-50"
                >
                  {isBm ? "Tanya di WhatsApp" : "Ask on WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS MODAL */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-sky-200">
            <button
              type="button"
              onClick={() => setIsTermsOpen(false)}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs text-slate-500 shadow-sm hover:bg-slate-50"
              aria-label={isBm ? "Tutup terma dan syarat" : "Close terms and conditions"}
            >
              ×
            </button>
            <div className="max-h-[85vh] overflow-y-auto px-5 py-5 text-xs text-slate-700 sm:px-7 sm:py-6">
              {isBm ? (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    Terma dan Syarat
                  </h2>
                  <p className="mt-1 text-[0.8rem] font-semibold text-slate-900">
                    Aktiviti Perkhemahan &amp; Berkelah di Deruan Rimba Campsite
                  </p>
                  <p className="mt-2 text-[0.7rem] text-slate-500">
                    Terma dan syarat ini berkuat kuasa mulai <span className="font-semibold">1 Ogos 2025</span> dan tertakluk kepada
                    pindaan dari semasa ke semasa oleh pihak pengurusan.
                  </p>

                  <ol className="mt-4 space-y-3 list-decimal pl-4">
                    <li>
                      <p className="font-semibold text-slate-900">Tempahan dan Bayaran</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          1.1 Tempahan hendaklah dibuat melalui platform tempahan di laman web sekurang-kurangnya 2 hari sebelum
                          tarikh masuk.
                        </li>
                        <li>1.2 Bayaran deposit sebanyak 50% diperlukan untuk mengesahkan tempahan.</li>
                        <li>
                          1.3 Bayaran penuh diperlukan selewat-lewatnya 2 hari sebelum tarikh check-in. Kegagalan membuat bayaran
                          penuh boleh menyebabkan tempahan dibatalkan.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Polisi Pembatalan dan Pemulangan</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          2.1 Semua bayaran tidak akan dipulangkan sekiranya pembatalan dibuat kurang daripada 24 jam sebelum tarikh
                          ketibaan.
                        </li>
                        <li>2.2 Caj pentadbiran sebanyak RM5 akan dikenakan untuk setiap pembatalan.</li>
                        <li>
                          2.3 Penjadualan semula tidak dibenarkan bagi pembatalan saat akhir (dalam tempoh 24 jam sebelum ketibaan)
                          atau ketidakhadiran (no-show).
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Waktu Operasi</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>3.1 Waktu masuk (check-in) berkhemah: 8.00 pagi – 8.00 malam.</li>
                        <li>3.2 Waktu keluar (check-out) berkhemah: 7.00 petang.</li>
                        <li>3.3 Waktu berkelah (picnic): 8.00 pagi – 7.00 petang.</li>
                        <li>3.4 Denda akan dikenakan jika keluar lewat tanpa kebenaran pihak pengurusan.</li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Keselamatan</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          4.1 Pihak pengurusan tidak akan bertanggungjawab atas sebarang kehilangan, kerosakan harta benda,
                          kemalangan, kecederaan atau kematian semasa berada di tapak.
                        </li>
                        <li>4.2 Aktiviti berkhemah dan berkelah adalah atas risiko sendiri.</li>
                        <li>
                          4.3 Pengunjung hendaklah mematuhi semua arahan serta tanda amaran keselamatan yang disediakan oleh pihak
                          pengurusan.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Larangan</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          5.1 Dilarang membawa alkohol, dadah, senjata api atau bahan mudah terbakar ke kawasan Deruan Rimba
                          Campsite.
                        </li>
                        <li>5.2 Dilarang membuat bising berlebihan terutama selepas jam 11.00 malam.</li>
                        <li>
                          5.3 Dilarang menebang pokok, memetik tumbuhan hutan atau mengganggu hidupan liar di kawasan sekitar.
                        </li>
                        <li>5.4 Tidak dibenarkan memasang khemah di luar kawasan yang dibenarkan.</li>
                        <li>5.5 Tidak dibenarkan membawa haiwan peliharaan.</li>
                        <li>5.6 Larangan membakar atau menghidupkan api terus di atas tanah.</li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Kebersihan</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>6.1 Pengunjung wajib menjaga kebersihan kawasan tapak.</li>
                        <li>6.2 Semua sampah mestilah dikutip dan dibuang ke dalam tong yang disediakan.</li>
                        <li>6.3 Dilarang membuang sampah atau sisa makanan ke dalam sungai.</li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Kemudahan</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>7.1 Kemudahan asas seperti tandas, surau dan tempat fire pit disediakan.</li>
                        <li>
                          7.2 Pihak pengurusan tidak menjamin bekalan elektrik atau liputan talian telefon di semua kawasan.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Kerosakan dan Penalti</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          8.1 Sebarang kerosakan kepada kemudahan awam atau peralatan akibat kecuaian pengunjung akan dikenakan cag
                          ganti rugi.
                        </li>
                        <li>
                          8.2 Pengunjung hendaklah melaporkan sebarang kemalangan atau kerosakan kepada pihak pengurusan dengan
                          serta-merta.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Cuaca &amp; Bencana</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          9.1 Pihak pengurusan berhak menangguhkan, meminda atau membatalkan aktiviti sekiranya berlaku cuaca buruk,
                          banjir atau kejadian luar jangka.
                        </li>
                        <li>
                          9.2 Sebarang bayaran balik atau penggantian tarikh adalah tertakluk kepada budi bicara pihak pengurusan.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Melawat atau Penghantaran Barang</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          10.1 Semua jenis penghantaran hendaklah diambil sendiri oleh campers di kaunter / resepsi.
                        </li>
                        <li>
                          10.2 Pelawat yang menziarahi keluarga atau rakan di campsite akan dikenakan caj masuk RM6 seorang (sehingga
                          jam 7.00 malam). Caj RM10 akan dikenakan untuk pelawat yang bermalam.
                        </li>
                      </ul>
                    </li>
                  </ol>

                  <p className="mt-4 text-[0.7rem] text-slate-700">
                    Dengan membuat tempahan, anda dianggap telah membaca, memahami dan bersetuju dengan semua terma dan syarat yang
                    dinyatakan di atas.
                  </p>
                  <p className="mt-1 text-[0.7rem] font-medium text-slate-800">
                    Terma dan syarat ini berkuat kuasa mulai 1 Ogos 2025.
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    Terms and Conditions
                  </h2>
                  <p className="mt-1 text-[0.8rem] font-semibold text-slate-900">
                    Camping &amp; Picnic Activities at Deruan Rimba Campsite
                  </p>
                  <p className="mt-2 text-[0.7rem] text-slate-500">
                    These terms and conditions take effect from <span className="font-semibold">1 August 2025</span> and may be
                    updated by the management from time to time.
                  </p>

                  <ol className="mt-4 space-y-3 list-decimal pl-4">
                    <li>
                      <p className="font-semibold text-slate-900">Booking and Payment</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          1.1 Reservations must be made through the booking platform on the website at least 2 days prior to the
                          check-in date.
                        </li>
                        <li>1.2 A 50% deposit is required to confirm the booking.</li>
                        <li>
                          1.3 Full payment must be made at least 2 days before the check-in date. Failure to do so may result in the
                          booking being cancelled.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Refund and Cancellation Policy</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          2.1 All payments are non-refundable for cancellations made less than 24 hours prior to the scheduled arrival
                          date.
                        </li>
                        <li>An administrative fee of RM5 will be charged for all cancellations.</li>
                        <li>
                          2.3 No rescheduling is allowed for last-minute cancellations (within 24 hours of arrival) or no-shows.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Operating Hours</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>3.1 Camping check-in time: 8:00 AM – 8:00 PM.</li>
                        <li>3.2 Camping check-out time: 7:00 PM.</li>
                        <li>3.3 Picnic hours: 8:00 AM – 7:00 PM.</li>
                        <li>3.4 A penalty will be imposed for late check-out without prior approval from the management.</li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Safety</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          4.1 The management shall not be held liable for any loss, damage to property, accidents, injuries or
                          fatalities occurring on-site.
                        </li>
                        <li>4.2 All camping and picnic activities are carried out at the visitor’s own risk.</li>
                        <li>
                          4.3 Visitors must adhere to all safety instructions and warning signs provided by the management at all
                          times.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Prohibited Activities</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          5.1 The possession of alcohol, drugs, firearms or flammable materials is strictly prohibited within Deruan
                          Rimba Campsite.
                        </li>
                        <li>5.2 Loud noise, especially after 11:00 PM, is not allowed.</li>
                        <li>
                          5.3 Tree felling, picking forest plants or disturbing wildlife is strictly forbidden in and around the
                          campsite.
                        </li>
                        <li>5.4 Tents may only be set up in designated areas.</li>
                        <li>5.5 No pets are allowed.</li>
                        <li>5.6 Starting a fire directly on the ground is strictly prohibited.</li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Cleanliness</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>6.1 Visitors are required to maintain cleanliness within the premises.</li>
                        <li>6.2 All waste must be collected and disposed of in the designated bins.</li>
                        <li>6.3 Littering or disposing of food waste into the river is strictly prohibited.</li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Facilities</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>7.1 Basic facilities such as toilets, prayer room (surau) and fire pit are provided.</li>
                        <li>
                          7.2 The management does not guarantee electricity supply or mobile network coverage in all areas of the
                          campsite.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Damages and Penalties</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          8.1 Any damage to public facilities or equipment due to visitor negligence will incur compensation charges.
                        </li>
                        <li>
                          8.2 Visitors must report any accidents or damages to the management immediately.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Weather &amp; Natural Disasters</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          9.1 The management reserves the right to postpone, amend or cancel activities in the event of bad weather,
                          floods or unforeseen circumstances.
                        </li>
                        <li>
                          9.2 Any refunds or rescheduling will be subject to the sole discretion of the management.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-semibold text-slate-900">Visiting or Delivery</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4">
                        <li>
                          10.1 All deliveries must be collected by campers at the counter / reception.
                        </li>
                        <li>
                          10.2 Visitors coming to see guests staying at the campsite will be charged RM6 per person (until 7:00 PM).
                          A charge of RM10 applies for visitors who stay overnight.
                        </li>
                      </ul>
                    </li>
                  </ol>

                  <p className="mt-4 text-[0.7rem] text-slate-700">
                    By making a booking, you are deemed to have read, understood and agreed to all terms and conditions stated above.
                  </p>
                  <p className="mt-1 text-[0.7rem] font-medium text-slate-800">
                    These terms and conditions are effective from 1 August 2025.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CHAT WIDGET */}
      <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="w-64 rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-lg shadow-sky-100">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 overflow-hidden rounded-full border border-sky-200 bg-sky-50">
                  <img
                    src="https://deruanrimba.my/wp-content/uploads/2022/11/306396207_115879651261376_4303864236368841302_n.png"
                    alt={isBm ? "Ikon Deruan Rimba" : "Deruan Rimba icon"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[0.7rem] font-semibold text-slate-900">
                    {isBm ? "Bantuan Deruan Rimba" : "Deruan Rimba Support"}
                  </p>
                  <p className="text-[0.65rem] text-sky-600">
                    {isBm ? "Online jika tersedia" : "Online when available"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-[0.7rem] text-slate-500 hover:bg-slate-50"
                aria-label={isBm ? "Tutup tetingkap chat" : "Close chat window"}
              >
                ×
              </button>
            </div>
            <p className="text-[0.7rem] leading-relaxed">
              {isBm
                ? "Ada soalan tentang tarikh, pakej atau cara tempah? Anda boleh hantarkan mesej ringkas kepada kami. Untuk respon paling cepat, sila gunakan pautan WhatsApp di bawah."
                : "Questions about dates, packages or how to book? Send us a quick message. For the fastest reply, use the WhatsApp link below."}
            </p>
            <a
              href="https://wa.me/60123767093"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white shadow-sm hover:bg-sky-500"
            >
              <span>WhatsApp</span>
              <span className="text-[0.65rem]">
                {isBm ? "Buka chat" : "Open chat"}
              </span>
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white shadow-lg shadow-sky-300 hover:bg-sky-500"
          aria-expanded={isChatOpen}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-base">
            💬
          </span>
          <span>
            {isBm ? "Chat" : "Chat"}
          </span>
        </button>
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Deruan Rimba Campsite. {" "}
            {isBm ? "Semua hak cipta terpelihara." : "All rights reserved."}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-sky-700"
            >
              {isBm ? "Terma & syarat" : "Terms & conditions"}
            </button>
            <a
              href="mailto:deruanrimbaofficial@gmail.com"
              className="hover:text-sky-700"
            >
              {isBm ? "Emel kami" : "Email us"}
            </a>
            <a href="#top" className="hover:text-sky-700">
              {isBm ? "Kembali ke atas" : "Back to top"}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
