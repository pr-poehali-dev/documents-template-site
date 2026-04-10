import Icon from "@/components/ui/icon";
import { situations, templates } from "./data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

interface LibrarySectionProps {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  libraryRef: React.RefObject<HTMLDivElement>;
  libraryInView: boolean;
  howRef: React.RefObject<HTMLDivElement>;
  howInView: boolean;
  casesRef: React.RefObject<HTMLDivElement>;
  casesInView: boolean;
}

export default function LibrarySection({
  activeFilter, setActiveFilter,
  libraryRef, libraryInView,
  howRef, howInView,
  casesRef, casesInView,
}: LibrarySectionProps) {
  const filtered = activeFilter === "all"
    ? templates
    : templates.filter((t) => t.category === activeFilter);

  return (
    <>
      {/* LIBRARY */}
      <section id="library" className="py-20 bg-secondary/20">
        <div ref={libraryRef} className="container">
          <div className={`text-center mb-10 ${libraryInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-neon-500 font-semibold text-sm uppercase tracking-widest mb-3">Библиотека шаблонов</div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide mb-4">Решение Вашей проблемы здесь!</h2>
            <p className="text-muted-foreground text-lg">Более 20 готовых пакетов документов</p>
          </div>

          <div className={`flex flex-wrap gap-3 justify-center mb-10 ${libraryInView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
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
                className={`bg-card border border-border rounded-2xl p-6 card-hover flex flex-col ${libraryInView ? "animate-fade-in-up" : "opacity-0"}`}
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

                <div className="flex items-center justify-end pt-4 border-t border-border">
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
        <div ref={howRef} className="container">
          <div className={`text-center mb-14 ${howInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-neon-500 font-semibold text-sm uppercase tracking-widest mb-3">Процесс</div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide">Как это работает</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-neon-500/20 via-neon-500 to-neon-500/20" />

            {[
              { step: "01", icon: "Search", title: "Выберите ситуацию", desc: "Найдите свой случай в библиотеке шаблонов" },
              { step: "02", icon: "Download", title: "Получите пакет", desc: "Документы и инструкция на вашу почту за 5 минут" },
              { step: "03", icon: "Send", title: "Отправьте документ", desc: "По нашей инструкции — правильно и официально" },
            ].map((step, i) => (
              <div
                key={i}
                className={`text-center relative ${howInView ? "animate-fade-in-up" : "opacity-0"}`}
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
        <div ref={casesRef} className="container">
          <div className="grid md:grid-cols-3 gap-6">

            {/* Интересное */}
            <div className={`bg-card border border-border rounded-2xl p-6 card-hover ${casesInView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0s" }}>
              <div className="flex items-center gap-2 mb-5">
                <Icon name="Lightbulb" size={18} className="text-neon-500" />
                <span className="font-display text-lg font-bold uppercase tracking-wide">Интересное</span>
              </div>
              <div className="space-y-4">
                {[
                  { icon: "FileText", text: "Как работает закон о защите прав потребителей: 5 фактов, которые вы не знали", date: "8 апр" },
                  { icon: "Scale", text: "Почему большинство долговых споров решается без суда", date: "5 апр" },
                  { icon: "AlertCircle", text: "ЖКХ завысило счёт: что делать и куда жаловаться", date: "1 апр" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-secondary/40 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-neon-500/15 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as AnyIcon} size={14} className="text-neon-500" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground leading-snug">{item.text}</p>
                      <span className="text-xs text-muted-foreground mt-1 block">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Видеосоветы */}
            <div className={`bg-card border border-border rounded-2xl p-6 card-hover ${casesInView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-2 mb-5">
                <Icon name="PlayCircle" size={18} className="text-neon-500" />
                <span className="font-display text-lg font-bold uppercase tracking-wide">Видеосоветы</span>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Как правильно написать претензию: пошагово", duration: "4:32" },
                  { title: "Долг не возвращают — алгоритм действий", duration: "6:15" },
                  { title: "Судебный приказ по ЖКХ: отменяем за 10 минут", duration: "5:48" },
                ].map((video, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-secondary/40 transition-colors cursor-pointer group">
                    <div className="w-16 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 relative overflow-hidden border border-border">
                      <Icon name="Play" size={18} className="text-neon-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug line-clamp-2">{video.title}</p>
                      <span className="text-xs text-neon-500 mt-1 block">{video.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Новости */}
            <div className={`bg-card border border-border rounded-2xl p-6 card-hover ${casesInView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2 mb-5">
                <Icon name="Newspaper" size={18} className="text-neon-500" />
                <span className="font-display text-lg font-bold uppercase tracking-wide">Новости</span>
              </div>
              <div className="space-y-4">
                {[
                  { tag: "ЖКХ", text: "С мая 2024 года изменился порядок начисления пеней за долги по коммунальным услугам", date: "9 апр" },
                  { tag: "Труд", text: "Роструд усилил контроль за выплатой зарплат: работодателей ждут внеплановые проверки", date: "6 апр" },
                  { tag: "Алименты", text: "Упрощён порядок взыскания алиментов через судебный приказ: новые сроки рассмотрения", date: "2 апр" },
                ].map((news, i) => (
                  <div key={i} className="p-3 rounded-xl hover:bg-secondary/40 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs bg-neon-500/15 text-neon-500 font-semibold px-2 py-0.5 rounded-full">{news.tag}</span>
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                    </div>
                    <p className="text-sm text-foreground leading-snug">{news.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
