import { ArrowLeft, Hotel, Plane, Ticket } from "lucide-react";

import { buttonVariants } from "@repo/ui/button";
import { LandingForm } from "@/components/landing-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const stats = [
  { value: "+500", label: "אירועי ספורט בשנה" },
  { value: "+50", label: "מדינות ויעדים" },
  { value: "+1,500", label: "אוהדים מרוצים" },
];

const rightLogos = [
  { src: "/logos/uefa-champions-league-1.svg", alt: "ליגת האלופות" },
  { src: "/logos/england_english-premier-league.football-logos.cc.svg", alt: "פרימייר ליג" },
  { src: "/logos/germany_bundesliga.football-logos.cc.svg", alt: "בונדסליגה" },
];

const leftLogos = [
  { src: "/logos/formula-1-svgrepo-com.svg", alt: "פורמולה 1" },
  { src: "/logos/olympic-games-svgrepo-com.svg", alt: "האולימפיאדה" },
  { src: "/logos/logo-wimbledon.svg", alt: "וימבלדון" },
];

const testimonials = [
  {
    stamp: "✓ נכנס לאצטדיון",
    quote:
      "טסתי לגמר ליגת האלופות בלי לדאוג מכלום — כרטיסים, מלון וטיסה סודרו מראש. חוויה שלא אשכח.",
    name: "רון אברהם",
    role: "אוהד כדורגל",
  },
  {
    stamp: "✓ נכנס למגרש המרכזי",
    quote:
      "הזמנתי כרטיסים לגמר וימבלדון כמתנת יום הולדת, וקיבלנו גם מלון במרחק הליכה מהמגרשים. שירות ברמה אחרת.",
    name: "מאיה לוי",
    role: "אוהדת טניס",
  },
  {
    stamp: "✓ נכנס למסלול",
    quote:
      "קניתי כרטיסים לגרנד פרי מונקו ברגע האחרון, וכל החבילה — טיסה, מלון וכרטיס — הייתה מוכנה תוך יום.",
    name: "עידן שגיא",
    role: "אוהד מוטורספורט",
  },
];

const leagues = [
  "פרימייר ליג",
  "לה ליגה",
  "ליגת האלופות",
  "סרי א",
  "בונדסליגה",
  "ליג 1 הצרפתית",
  "גביע העולם",
  "האולימפיאדה",
  "פורמולה 1",
  "וימבלדון",
];

const features = [
  {
    icon: Ticket,
    field: "TIX · 01",
    title: "כרטיסים לכל משחק",
    description: "מושבים מעולים למשחקי הליגות הגדולות בעולם — מכל מקום, ולכל תקציב.",
  },
  {
    icon: Hotel,
    field: "HTL · 02",
    title: "מלונות קרובים לאצטדיון",
    description: "לינה נוחה במרחק הליכה מהאצטדיון, מותאמת אישית לתקציב ולתאריכים שלכם.",
  },
  {
    icon: Plane,
    field: "FLT · 03",
    title: "טיסות מתואמות מראש",
    description: "טיסות ישירות ותיאום מלא של כל הפרטים, כדי שתתמקדו רק במשחק עצמו.",
  },
];

const steps = [
  {
    number: "1",
    title: "ספרו לנו איזה משחק אתם רוצים",
    description: "כל ליגה, כל קבוצה, בכל מקום בעולם — פשוט תגידו לנו מה מעניין אתכם.",
  },
  {
    number: "2",
    title: "נבנה לכם הצעה מותאמת אישית",
    description: "כרטיסים, מלון וטיסה — הצעה מלאה שמתאימה לתקציב ולתאריכים שלכם.",
  },
  {
    number: "3",
    title: "מאשרים, ואנחנו דואגים לכל השאר",
    description: "אתם מגיעים למשחק, כל הפרטים כבר מסודרים מראש.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-start">
            <p className="text-sm font-semibold text-primary">כרטיסים לספורט העולמי</p>
            <h1 className="font-heading text-5xl leading-[1.05] text-foreground sm:text-6xl">
              כל משחק שתדמיינו —
              <br />
              יש לנו כרטיס אליו
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              כרטיסים למשחקי פרימייר ליג, לה ליגה, ליגת האלופות ואירועי הספורט
              הגדולים בעולם — כולל מלונות וטיסות, הכל במקום אחד.
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <a href="#contact" className={buttonVariants({ size: "lg", className: "h-11 px-6" })}>
                קבלו הצעת מחיר
                <ArrowLeft aria-hidden />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-11 items-center justify-center px-6 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                איך זה עובד
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start">
            <div className="ticket w-full max-w-sm -rotate-2 p-6">
              <div className="flex items-center justify-between text-xs font-semibold text-card-foreground/60">
                <span>כרטיס כניסה</span>
                <span className="font-data">ANY EVENT</span>
              </div>
              <p className="mt-4 font-heading text-3xl leading-tight text-card-foreground">
                כל משחק. כל אצטדיון.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4 font-data text-sm">
                <div>
                  <dt className="text-card-foreground/60">שער</dt>
                  <dd className="font-semibold text-card-foreground">בכל אצטדיון</dd>
                </div>
                <div>
                  <dt className="text-card-foreground/60">מושב</dt>
                  <dd className="font-semibold text-card-foreground">מובטח</dd>
                </div>
                <div>
                  <dt className="text-card-foreground/60">טיסה</dt>
                  <dd className="font-semibold text-card-foreground">כלולה</dd>
                </div>
                <div>
                  <dt className="text-card-foreground/60">מלון</dt>
                  <dd className="font-semibold text-card-foreground">כלול</dd>
                </div>
              </dl>
              <div className="ticket-tear my-6" />
              <div className="ticket-barcode text-card-foreground/60" />
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[var(--background-deep)]">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-x-10 gap-y-6 px-6 py-10 sm:justify-between sm:px-10">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span
                  className="flap px-4 py-3 text-3xl font-semibold text-foreground sm:text-4xl"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {stat.value}
                </span>
                <span className="max-w-32 text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="leagues" className="py-20">
          <div className="mx-auto flex w-full max-w-[100rem] flex-col items-center gap-10 px-8 sm:px-14 lg:flex-row lg:justify-between lg:gap-10 xl:px-20">
            <div className="hidden shrink-0 items-center gap-6 lg:flex">
              {rightLogos.map((logo) => (
                <span
                  key={logo.src}
                  className="flex h-28 w-36 items-center justify-center rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                </span>
              ))}
            </div>

            <div className="max-w-xl text-center">
              <p className="text-sm font-semibold text-primary">בשידור חי, כל השערים</p>
              <h2 className="mt-2 font-heading text-4xl text-foreground">
                כל ליגה שתדמיינו, כבר על הלוח
              </h2>
            </div>

            <div className="hidden shrink-0 items-center gap-6 lg:flex">
              {leftLogos.map((logo) => (
                <span
                  key={logo.src}
                  className="flex h-28 w-36 items-center justify-center rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                </span>
              ))}
            </div>
          </div>
          <div
            dir="ltr"
            className="ticker-viewport relative mt-10 overflow-hidden border-y border-border py-5"
          >
            <div className="ticker-track gap-10" aria-hidden="true">
              {[...leagues, ...leagues, ...leagues].map((league, index) => (
                <span
                  key={index}
                  className="flex items-center gap-10 whitespace-nowrap font-heading text-2xl text-foreground/90"
                >
                  {league}
                  <span className="text-primary">•</span>
                </span>
              ))}
            </div>
          </div>
          <p dir="rtl" className="sr-only">
            אנחנו מוכרים כרטיסים ל: {leagues.join(", ")}, ואירועי ספורט נוספים.
          </p>
        </section>

        <section className="border-t border-border bg-[var(--background-deep)]">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-primary">מה כלול בחבילה</p>
              <h2 className="mt-2 font-heading text-4xl text-foreground">
                משחק, מלון וטיסה — כרטיס אחד
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {features.map(({ icon: Icon, field, title, description }) => (
                <div key={title} className="ticket ticket--on-deep flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="size-6 text-primary" aria-hidden />
                    <span className="font-data text-xs text-card-foreground/60">{field}</span>
                  </div>
                  <h3 className="font-heading text-3xl text-card-foreground">{title}</h3>
                  <p className="text-base leading-relaxed text-card-foreground/80">{description}</p>
                  <div className="ticket-tear mt-2" />
                  <div className="ticket-barcode text-card-foreground/50" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">איך זה עובד</p>
            <h2 className="mt-2 font-heading text-4xl text-foreground">
              שלושה שלבים, ואתם באצטדיון
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-2">
                <span className="font-data text-sm text-primary">{step.number}.</span>
                <h3 className="font-heading text-3xl text-foreground">{step.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonial" className="border-t border-border bg-[var(--background-deep)]">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-primary">לקוחות מספרים</p>
              <h2 className="mt-2 font-heading text-4xl text-foreground">
                כרטיסים שכבר נוצלו, אוהדים שכבר חזרו
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="ticket ticket--on-deep flex flex-col p-8">
                  <div className="flex items-center justify-between font-data text-xs text-card-foreground/60">
                    <span>USED · נוצל</span>
                    <span className="rounded-full border border-card-foreground/30 px-3 py-1">
                      {testimonial.stamp}
                    </span>
                  </div>
                  <p className="mt-6 font-heading text-xl leading-relaxed text-card-foreground">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="ticket-tear my-6" />
                  <p className="text-sm text-card-foreground/70">
                    {testimonial.name} · {testimonial.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-1 flex-col gap-6">
              <p className="text-sm font-semibold text-primary">דברו איתנו</p>
              <h2 className="font-heading text-4xl leading-tight text-foreground">
                מוכנים למשחק הבא?
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                ספרו לנו איזה משחק מעניין אתכם ונחזור אליכם עם הצעה מותאמת
                אישית תוך יום עסקים.
              </p>
              <ul className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-foreground/80">
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                  בלי עלויות נסתרות
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                  מותאם אישית לתקציב ולתאריכים שלכם
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                  מענה אנושי אמיתי, לא בוט
                </li>
              </ul>
            </div>

            <div className="flex-1 lg:max-w-md">
              <LandingForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
