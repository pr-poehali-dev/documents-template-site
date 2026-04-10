import { useState } from "react";
import Icon from "@/components/ui/icon";
import { plans, faqs } from "./data";

const LOGO = "https://cdn.poehali.dev/projects/f070a388-11df-4350-8450-a0357c2e74f0/bucket/0544d361-9b0d-46d9-90eb-3b71f4961365.png";

interface PricingSectionProps {
  pricingRef: React.RefObject<HTMLDivElement>;
  pricingInView: boolean;
  faqRef: React.RefObject<HTMLDivElement>;
  faqInView: boolean;
}

export default function PricingSection({ pricingRef, pricingInView, faqRef, faqInView }: PricingSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* PRICING */}
      <section id="pricing" className="py-20">
        <div ref={pricingRef} className="container">
          <div className={`text-center mb-12 ${pricingInView ? "animate-fade-in-up" : "opacity-0"}`}>
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
                } ${pricingInView ? "animate-fade-in-up" : "opacity-0"}`}
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

          <div className={`mt-10 text-center ${pricingInView ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
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
        <div ref={faqRef} className="container max-w-3xl">
          <div className={`text-center mb-12 ${faqInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-neon-500 font-semibold text-sm uppercase tracking-widest mb-3">FAQ</div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide">Частые вопросы</h2>
          </div>

          <div className={`space-y-3 ${faqInView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
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
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl px-3 py-1.5 shadow-lg shadow-neon-500/20 ring-2 ring-neon-500/40">
              <img src={LOGO} alt="Логотип" className="h-8 w-auto" />
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">Юруслуги для Бизнеса и не только</span>
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
    </>
  );
}