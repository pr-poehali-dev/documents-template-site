import Icon from "@/components/ui/icon";

const LOGO = "https://cdn.poehali.dev/projects/f070a388-11df-4350-8450-a0357c2e74f0/bucket/0544d361-9b0d-46d9-90eb-3b71f4961365.png";
const NEW_HERO_IMAGE = "https://cdn.poehali.dev/projects/f070a388-11df-4350-8450-a0357c2e74f0/files/16bc4ddd-fd28-4838-b64c-b97bda384029.jpg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>;
  heroInView: boolean;
  painRef: React.RefObject<HTMLDivElement>;
  painInView: boolean;
  solutionRef: React.RefObject<HTMLDivElement>;
  solutionInView: boolean;
}

export default function HeroSection({ heroRef, heroInView, painRef, painInView, solutionRef, solutionInView }: HeroSectionProps) {
  return (
    <>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-lg shadow-neon-500/20 ring-2 ring-neon-500/40">
            <img src={LOGO} alt="Логотип" className="h-9 w-auto" />
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">Юруслуги для Бизнеса и не только</span>
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

        <div ref={heroRef} className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className={`space-y-8 ${heroInView ? "animate-fade-in-up" : "opacity-0"}`}>
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

          <div className={`relative ${heroInView ? "animate-float" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
            {/* Glow behind image */}
            <div className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl" style={{ background: "radial-gradient(circle, rgba(255,140,0,0.5) 0%, transparent 70%)" }} />
            <div className="relative rounded-2xl overflow-hidden border-2 border-neon-500/40 shadow-2xl neon-glow">
              <img src={NEW_HERO_IMAGE} alt="Юридические документы" className="w-full h-[460px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
              {/* Логотип поверх картинки */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl ring-4 ring-neon-500/50">
                  <img src={LOGO} alt="Логотип АОЕ" className="h-24 w-auto" />
                </div>
                <div className="bg-background/85 backdrop-blur-sm rounded-xl px-5 py-2 border border-neon-500/50 neon-glow">
                  <span className="text-sm font-semibold text-foreground">Юруслуги для Бизнеса и не только</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="py-20 bg-secondary/30">
        <div ref={painRef} className="container">
          <div className={`text-center mb-12 ${painInView ? "animate-fade-in-up" : "opacity-0"}`}>
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
                className={`bg-card border border-border rounded-xl p-6 card-hover ${painInView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <Icon name={item.icon as AnyIcon} size={24} className={item.color} />
                </div>
                <p className="text-foreground font-medium leading-snug">{item.text}</p>
              </div>
            ))}
          </div>

          <div className={`mt-8 text-center ${painInView ? "animate-fade-in-up delay-500" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-3 bg-neon-500/10 border border-neon-500/30 rounded-xl px-6 py-4">
              <Icon name="Zap" size={20} className="text-neon-500" />
              <span className="text-foreground font-medium">Если узнали себя хотя бы в одном пункте — решение уже есть</span>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-20">
        <div ref={solutionRef} className="container">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${solutionInView ? "animate-fade-in-up" : "opacity-0"}`}>
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
                  { icon: "MapPin", title: "Пошаговая инструкция (чек-лист)", desc: "Куда идти, что говорить, в какие сроки" },
                  { icon: "Swords", title: "Интересные факты и примеры", desc: "Реальные случаи и примеры из практики, которые помогут разобраться в ситуации" },
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
                { icon: "FileSignature", label: "Документ, под Вашу ситуацию", note: "Уже с правильными ссылками на законы" },
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
    </>
  );
}