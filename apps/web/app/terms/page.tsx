import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "תנאי שימוש · ספורטיקט",
  description: "תנאי השימוש באתר ספורטיקט.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-10">
        <p className="text-sm font-semibold text-primary">מסמך משפטי</p>
        <h1 className="mt-2 font-heading text-4xl text-foreground">תנאי שימוש</h1>
        <p className="mt-2 text-sm text-muted-foreground">עדכון אחרון: אוגוסט 2026</p>

        <div className="prose-legal mt-10 flex flex-col gap-8 text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-heading text-2xl text-foreground">1. כללי</h2>
            <p className="mt-3">
              אתר ספורטיקט (&quot;האתר&quot;) מציג מידע על שירותי הזמנת כרטיסים
              לאירועי ספורט, לרבות חבילות מלונות וטיסות נלוות, ומאפשר לכם
              ליצור עמנו קשר לצורך קבלת הצעת מחיר. השימוש באתר כפוף לתנאים
              המפורטים במסמך זה. גלישה או שימוש באתר מהווים הסכמה לתנאים אלו.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">2. אופי השירות</h2>
            <p className="mt-3">
              האתר אינו מהווה מערכת הזמנה או מכירה אוטומטית של כרטיסים,
              מלונות או טיסות. שליחת טופס יצירת הקשר מהווה בקשה לקבלת הצעת
              מחיר בלבד, ואינה מהווה הזמנה, רכישה, או התחייבות מצדנו או
              מצדכם. פרטי הזמינות, המחיר והתנאים הסופיים ייקבעו וייתקשרו
              אליכם באופן ישיר לאחר יצירת הקשר, ולפני כל תשלום או התחייבות.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">3. שימוש הוגן באתר</h2>
            <p className="mt-3">
              אין להשתמש באתר לצורך מסירת מידע כוזב, פגיעה בפעילותו התקינה,
              ניסיון לגשת למידע שאינו מיועד לכם, או כל שימוש המנוגד לדין.
              אנו רשאים לסרב לטפל בפנייה שנראית מטעה, פוגענית, או שאינה
              בתום לב.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">4. קניין רוחני</h2>
            <p className="mt-3">
              כל התכנים באתר — לרבות עיצוב, טקסטים, לוגו, וסימני המסחר של
              הליגות והאירועים המוצגים — שייכים לבעליהם החוקיים ומוצגים
              לצורכי מידע בלבד. אין להעתיק, לשכפל, או להשתמש בתכני האתר
              למטרה מסחרית ללא אישור מראש ובכתב.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">5. הגבלת אחריות</h2>
            <p className="mt-3">
              המידע באתר מוצג כפי שהוא (&quot;AS IS&quot;), לצורכי מידע כללי
              בלבד, ואינו מהווה התחייבות סופית לזמינות, מחיר, או תנאים.
              איננו אחראים לנזק ישיר או עקיף שייגרם כתוצאה משימוש באתר או
              הסתמכות על המידע המוצג בו, ככל שהדבר מותר לפי דין.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">6. שינויים בתנאים</h2>
            <p className="mt-3">
              אנו רשאים לעדכן תנאים אלו מעת לעת. המשך השימוש באתר לאחר
              פרסום שינוי מהווה הסכמה לתנאים המעודכנים.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">7. יצירת קשר</h2>
            <p className="mt-3">
              לשאלות בנוגע לתנאי השימוש, ניתן ליצור קשר דרך טופס יצירת הקשר
              בעמוד הבית.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
