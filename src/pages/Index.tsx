import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/f070a388-11df-4350-8450-a0357c2e74f0/files/f7b11d7f-2937-4437-b9b5-a56d29c64ff2.jpg";

const situations = [
  { id: "all", label: "Все ситуации", icon: "LayoutGrid" },
  { id: "goods", label: "Товары и услуги", icon: "ShoppingBag" },
  { id: "debt", label: "Долги", icon: "Wallet" },
  { id: "work", label: "Работодатель", icon: "Briefcase" },
  { id: "online", label: "Онлайн-курсы", icon: "Monitor" },
  { id: "bank", label: "Банки и МФО", icon: "Building2" },
];

const templates = [
  {
    id: 1,
    category: "goods",
    title: "Претензия за некачественный товар",
    desc: "Потребовать возврат денег или замену товара по Закону о защите прав потребителей",
    time: "10 мин",
    success: "89%",
    tag: "Популярное",
    tagColor: "bg-neon-500",
    docs: ["Претензия", "Чек-лист", "Инструкция"],
  },
  {
    id: 2,
    category: "debt",
    title: "Требование возврата долга",
    desc: "Официальная претензия должнику с указанием сроков и последствий",
    time: "7 мин",
    success: "76%",
    tag: "Без суда",
    tagColor: "bg-emerald-600",
    docs: ["Претензия", "Чек-лист", "Исковое"],
  },
  {
    id: 3,
    category: "work",
    title: "Жалоба на задержку зарплаты",
    desc: "В трудовую инспекцию и прокуратуру. Работодатель обязан заплатить с процентами",
    time: "12 мин",
    success: "82%",
    tag: "Гарантия",
    tagColor: "bg-blue-600",
    docs: ["Жалоба в ГИТ", "В прокуратуру", "Инструкция"],
  },
  {
    id: 4,
    category: "online",
    title: "Возврат денег за онлайн-курс",
    desc: "Претензия школе + жалоба в Роспотребнадзор. Работает даже при «договоре»",
    time: "8 мин",
    success: "71%",
    tag: "Горячее",
    tagColor: "bg-rose-600",
    docs: ["Претензия", "В Роспотребнадзор", "Чек-лист"],
  },
  {
    id: 5,
    category: "goods",
    title: "Возврат товара в магазин",
    desc: "Принудить магазин принять товар обратно. Даже если они отказывают",
    time: "5 мин",
    success: "94%",
    tag: "Быстро",
    tagColor: "bg-neon-500",
    docs: ["Заявление", "Чек-лист"],
  },
  {
    id: 6,
    category: "bank",
    title: "Жалоба на банк в ЦБ РФ",
    desc: "Незаконные комиссии, навязанные страховки, неправомерные списания",
    time: "15 мин",
    success: "68%",
    tag: "Эффективно",
    tagColor: "bg-violet-600",
    docs: ["Жалоба в ЦБ", "В суд", "Инструкция"],
  },
];

const cases = [
  {
    amount: "85 000 ₽",
    title: "Вернули за онлайн-курс",
    story: "Андрей купил курс по инвестициям за 85 000 ₽. Контент оказался пустым. Отправил претензию по нашему шаблону — деньги вернули через 10 дней.",
    days: "10 дней",
    city: "Москва",
  },
  {
    amount: "120 000 ₽",
    title: "Выбил долг без суда",
    story: "Коллега задолжала Марине 120 000 ₽ и игнорировала. После официальной претензии с упоминанием суда — вернула всё за 2 недели.",
    days: "14 дней",
    city: "СПб",
  },
  {
    amount: "43 500 ₽",
    title: "Зарплата + компенсация",
    story: "Работодатель задержал зарплату на 2 месяца. После жалобы в ГИТ получил не только зарплату, но и проценты за просрочку.",
    days: "21 день",
    city: "Краснодар",
  },
];

const faqs = [
  {
    q: "Подойдёт ли под мою ситуацию?",
    a: "Да, если ваша ситуация связана с долгом, возвратом товара или услуги, проблемами с работодателем или онлайн-школой — у нас есть подходящий пакет. Если не уверены, выберите ситуацию и посмотрите состав документов перед покупкой.",
  },
  {
    q: "Нужно ли идти в суд?",
    a: "В большинстве случаев — нет. Грамотная официальная претензия решает вопрос без суда в 70-90% случаев. Но если оппонент продолжает уклоняться — в пакете есть исковое заявление, готовое к подаче.",
  },
  {
    q: "Сколько времени это займёт?",
    a: "Составить документы — 5–15 минут. Закон даёт оппоненту 10–30 дней на ответ (зависит от ситуации). Большинство дел решаются за 2–4 недели.",
  },
  {
    q: "Я не юрист — справлюсь?",
    a: "Именно для вас это и сделано. Внутри — пошаговая инструкция с примерами. Вы просто заполняете шаблон своими данными и отправляете. Никаких юридических знаний не нужно.",
  },
];

const plans = [
  {
    name: "Базовый",
    price: "990 ₽",
    desc: "Шаблон + инструкция",
    features: ["Готовый шаблон претензии", "Пошаговая инструкция", "Чек-лист действий", "Пример заполнения"],
    cta: "Получить пакет",
    highlight: false,
  },
  {
    name: "С проверкой",
    price: "1 990 ₽",
    desc: "Шаблон + юрист проверит",
    features: ["Всё из Базового", "Юрист проверит ваш документ", "Ответы на 3 вопроса", "Готов в течение 24 часов"],
    cta: "Выбрать тариф",
    highlight: true,
  },
  {
    name: "Сопровождение",
    price: "4 990 ₽",
    desc: "Полное ведение до результата",
    features: ["Всё из «С проверкой»", "Юрист ведёт переговоры", "Помощь до получения денег", "Неограниченные консультации"],
    cta: "Начать сейчас",
    highlight: false,
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = activeFilter === "all"
    ? templates
    : templates.filter((t) => t.category === activeFilter);

  const heroSection = useInView(0.1);
  const painSection = useInView();
  const solutionSection = useInView();
  const librarySection = useInView();
  const howSection = useInView();
  const casesSection = useInView();
  const pricingSection = useInView();
  const faqSection = useInView();

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neon-500 flex items-center justify-center">
            <Icon name="FileText" size={16} className="text-background" />
          </div>
          <span className="font-display text-lg font-semibold tracking-wide">ДОКУМЕНТПРО</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#library" className="hover:text-foreground transition-colors">Шаблоны</a>
          <a href="#how" className="hover:text-foreground transition-colors">Как работает</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Цены</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </div>
        <button className="bg-neon-500 hover:bg-neon-600 text-background font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:scale-105 neon-glow">
          Получить документы
        </button>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 stripe-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] opacity-20 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,140,0,0.4) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,140,0,0.5) 0%, transparent 70%)" }} />

        <div ref={heroSection.ref} className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className={`space-y-8 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 bg-neon-500/10 border border-neon-500/30 rounded-full px-4 py-1.5">
              <div className="w-2 h-2 rounded-full bg-neon-500 animate-pulse" />
              <span className="text-neon-400 text-sm font-medium">Уже помогли вернуть более 12 млн ₽</span>
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight uppercase tracking-wide">
              ЖКХ-долг или бизнес-договор?
              <br />
              <span className="gradient-text neon-text">Реши проблему</span>
              <br />
              сам в пару кликов!
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Готовые документы + пошаговая инструкция.<br />
              <strong className="text-foreground">Без юриста справитесь сами</strong> — за 5–15 минут.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group flex items-center gap-3 bg-neon-500 hover:bg-neon-600 text-background font-bold text-base px-8 py-4 rounded-xl transition-all hover:scale-105 animate-pulse-glow">
                Получить решение за 5 минут
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 border border-border hover:border-neon-500/50 text-foreground px-6 py-4 rounded-xl transition-all hover:bg-secondary text-sm font-medium">
                <Icon name="Play" size={16} className="text-neon-500" />
                Как это работает
              </button>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { value: "12+ млн ₽", label: "возвращено клиентам" },
                { value: "3 200+", label: "успешных дел" },
                { value: "83%", label: "без суда" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-neon-500">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative ${heroSection.inView ? "animate-float" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-2xl overflow-hidden border border-neon-500/20 shadow-2xl">
              <img src={HERO_IMAGE} alt="Юридические документы" className="w-full h-[460px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle" size={20} className="text-background" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Претензия отправлена</div>
                    <div className="text-xs text-muted-foreground">Должник получил документ • 2 минуты назад</div>
                  </div>
                  <div className="ml-auto text-neon-500 font-display text-lg font-bold">+85 000 ₽</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="py-20 bg-secondary/30">
        <div ref={painSection.ref} className="container">
          <div className={`text-center mb-12 ${painSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide mb-4">Узнаёте себя?</h2>
            <p className="text-muted-foreground text-lg">Если да — решение уже есть</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "ShoppingCart", text: "Не возвращают деньги за товар или услугу", color: "text-rose-400" },
              { icon: "UserX", text: "Должник игнорирует ваши сообщения", color: "text-orange-400" },
              { icon: "Briefcase", text: "Работодатель задержал или не выплатил зарплату", color: "text-yellow-400" },
              { icon: "Monitor", text: "Онлайн-курс оказался пустышкой", color: "text-neon-500" },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-card border border-border rounded-xl p-6 card-hover ${painSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <Icon name={item.icon as AnyIcon} size={24} className={item.color} />
                </div>
                <p className="text-foreground font-medium leading-snug">{item.text}</p>
              </div>
            ))}
          </div>

          <div className={`mt-8 text-center ${painSection.inView ? "animate-fade-in-up delay-500" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-3 bg-neon-500/10 border border-neon-500/30 rounded-xl px-6 py-4">
              <Icon name="Zap" size={20} className="text-neon-500" />
              <span className="text-foreground font-medium">Если узнали себя хотя бы в одном пункте — решение уже есть</span>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-20">
        <div ref={solutionSection.ref} className="container">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${solutionSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div>
              <div className="text-neon-500 font-semibold text-sm uppercase tracking-widest mb-3">Решение</div>
              <h2 className="font-display text-4xl font-bold uppercase tracking-wide mb-6">
                Действуйте как юрист.<br />
                <span className="gradient-text">Не тратьте время, все в Ваших руках.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Мы продаём не просто документ — а алгоритм, который работает. Оппоненты знают: за этим шаблоном стоит закон.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "FileText", title: "Готовые шаблоны документов", desc: "Юридически выверенные, под вашу ситуацию" },
                  { icon: "MapPin", title: "Пошаговая инструкция", desc: "Куда идти, что говорить, в какие сроки" },
                  { icon: "Swords", title: "Сценарий давления", desc: "Как заставить вторую сторону заплатить" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-secondary/40 border border-border hover:border-neon-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-neon-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as AnyIcon} size={18} className="text-neon-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{item.title}</div>
                      <div className="text-muted-foreground text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
              <div className="font-display text-xl font-bold uppercase tracking-wide mb-6">Что внутри пакета</div>
              {[
                { icon: "FileSignature", label: "Претензия под вашу ситуацию", note: "Уже с правильными ссылками на законы" },
                { icon: "Scale", label: "Исковое заявление", note: "Готово к подаче, если не ответят" },
                { icon: "ListChecks", label: "Чек-лист действий", note: "Шаг за шагом, без пропусков" },
                { icon: "BookOpen", label: "Примеры заполнения", note: "Реальные образцы с пояснениями" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/40 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-neon-500 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as AnyIcon} size={16} className="text-background" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{item.label}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{item.note}</div>
                  </div>
                  <Icon name="Check" size={18} className="text-neon-500 ml-auto mt-0.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIBRARY */}
      <section id="library" className="py-20 bg-secondary/20">
        <div ref={librarySection.ref} className="container">
          <div className={`text-center mb-10 ${librarySection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-neon-500 font-semibold text-sm uppercase tracking-widest mb-3">Библиотека шаблонов</div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide mb-4">Решение Вашей проблемы здесь!</h2>
            <p className="text-muted-foreground text-lg">Более 20 готовых пакетов документов</p>
          </div>

          <div className={`flex flex-wrap gap-3 justify-center mb-10 ${librarySection.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {situations.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveFilter(s.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === s.id
                    ? "bg-neon-500 text-background neon-glow"
                    : "bg-card border border-border text-muted-foreground hover:border-neon-500/40 hover:text-foreground"
                }`}
              >
                <Icon name={s.icon as AnyIcon} size={15} />
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t, i) => (
              <div
                key={t.id}
                className={`bg-card border border-border rounded-2xl p-6 card-hover flex flex-col ${librarySection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`${t.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                    {t.tag}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Icon name="Clock" size={12} />
                    {t.time}
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-2">{t.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">{t.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {t.docs.map((doc) => (
                    <span key={doc} className="text-xs bg-secondary border border-border px-2.5 py-1 rounded-lg text-muted-foreground">
                      {doc}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Icon name="TrendingUp" size={14} className="text-neon-500" />
                    <span className="text-neon-500 font-bold">{t.success}</span>
                    <span className="text-muted-foreground">успеха</span>
                  </div>
                  <button className="flex items-center gap-1.5 bg-neon-500 hover:bg-neon-600 text-background text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105">
                    Получить
                    <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20">
        <div ref={howSection.ref} className="container">
          <div className={`text-center mb-14 ${howSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-neon-500 font-semibold text-sm uppercase tracking-widest mb-3">Процесс</div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide">Как это работает</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-neon-500/20 via-neon-500 to-neon-500/20" />

            {[
              { step: "01", icon: "Search", title: "Выберите ситуацию", desc: "Найдите свой случай в библиотеке шаблонов" },
              { step: "02", icon: "Download", title: "Получите пакет", desc: "Документы и инструкция на вашу почту за 5 минут" },
              { step: "03", icon: "Send", title: "Отправьте претензию", desc: "По нашей инструкции — правильно и официально" },
              { step: "04", icon: "BadgeCheck", title: "Получите деньги", desc: "Или усилите давление — следующий шаг уже в пакете" },
            ].map((step, i) => (
              <div
                key={i}
                className={`text-center relative ${howSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-20 h-20 rounded-2xl bg-neon-500 flex items-center justify-center mx-auto mb-5 relative z-10 shadow-lg neon-glow">
                  <Icon name={step.icon as AnyIcon} size={32} className="text-background" />
                </div>
                <div className="font-display text-4xl font-bold text-neon-500/20 mb-2">{step.step}</div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="py-20 bg-secondary/20">
        <div ref={casesSection.ref} className="container">
          <div className={`text-center mb-12 ${casesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-neon-500 font-semibold text-sm uppercase tracking-widest mb-3">Результаты</div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide">Реальные истории</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <div
                key={i}
                className={`bg-card border border-border rounded-2xl p-6 card-hover ${casesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="font-display text-4xl font-bold gradient-text mb-2">{c.amount}</div>
                <div className="font-semibold text-foreground mb-4">{c.title}</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">«{c.story}»</p>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    {c.days}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} />
                    {c.city}
                  </div>
                  <div className="ml-auto flex">
                    {[1,2,3,4,5].map((s) => (
                      <Icon key={s} name="Star" size={12} className="text-neon-500" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20">
        <div ref={pricingSection.ref} className="container">
          <div className={`text-center mb-12 ${pricingSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-neon-500 font-semibold text-sm uppercase tracking-widest mb-3">Тарифы</div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide mb-3">Дешевле одной консультации</h2>
            <p className="text-muted-foreground text-lg">Выберите подходящий уровень поддержки</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-7 border transition-all ${
                  plan.highlight
                    ? "bg-neon-500/10 border-neon-500 relative shadow-xl"
                    : "bg-card border-border card-hover"
                } ${pricingSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-neon-500 text-background text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Популярный
                  </div>
                )}
                <div className="mb-6">
                  <div className="font-display text-lg font-bold uppercase tracking-wide mb-1">{plan.name}</div>
                  <div className="text-muted-foreground text-sm mb-4">{plan.desc}</div>
                  <div className="font-display text-4xl font-bold text-foreground">{plan.price}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Icon name="Check" size={16} className="text-neon-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                  plan.highlight
                    ? "bg-neon-500 text-background neon-glow hover:bg-neon-600"
                    : "bg-secondary border border-border text-foreground hover:border-neon-500/40"
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className={`mt-10 text-center ${pricingSection.inView ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-3 bg-card border border-neon-500/30 rounded-2xl px-8 py-5">
              <Icon name="ShieldCheck" size={28} className="text-neon-500" />
              <div className="text-left">
                <div className="font-semibold text-foreground">Гарантия возврата</div>
                <div className="text-muted-foreground text-sm">Если не разберётесь — вернём деньги без вопросов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-secondary/20">
        <div ref={faqSection.ref} className="container max-w-3xl">
          <div className={`text-center mb-12 ${faqSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-neon-500 font-semibold text-sm uppercase tracking-widest mb-3">FAQ</div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide">Частые вопросы</h2>
          </div>

          <div className={`space-y-3 ${faqSection.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/40 transition-colors"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className={`text-neon-500 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 stripe-bg" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,140,0,0.12) 0%, transparent 70%)" }} />

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-neon-500/10 border border-neon-500/30 rounded-full px-4 py-1.5 mb-6">
            <Icon name="Zap" size={14} className="text-neon-500" />
            <span className="text-neon-400 text-sm font-medium">Начните прямо сейчас</span>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-bold uppercase tracking-wide mb-6">
            Пора вернуть
            <br />
            <span className="gradient-text neon-text">то, что вам должны</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            Готовые документы + инструкция. Без юриста. За 5 минут.
          </p>
          <button className="group inline-flex items-center gap-3 bg-neon-500 hover:bg-neon-600 text-background font-bold text-lg px-10 py-5 rounded-2xl transition-all hover:scale-105 animate-pulse-glow">
            Начать сейчас
            <Icon name="ArrowRight" size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="mt-6 text-muted-foreground text-sm flex items-center justify-center gap-2">
            <Icon name="ShieldCheck" size={14} className="text-neon-500" />
            Гарантия возврата денег, если не разберётесь
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neon-500 flex items-center justify-center">
              <Icon name="FileText" size={14} className="text-background" />
            </div>
            <span className="font-display text-base font-semibold tracking-wide">ДОКУМЕНТПРО</span>
          </div>
          <p className="text-muted-foreground text-xs text-center">
            © 2024 ДокументПро. Шаблоны носят информационный характер и не являются юридической консультацией.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Политика</a>
            <a href="#" className="hover:text-foreground transition-colors">Оферта</a>
          </div>
        </div>
      </footer>

    </div>
  );
}