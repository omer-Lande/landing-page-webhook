import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "מדיניות פרטיות · ספורטיקט",
  description: "מדיניות הפרטיות של אתר ספורטיקט.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-10">
        <p className="text-sm font-semibold text-primary">מסמך משפטי</p>
        <h1 className="mt-2 font-heading text-4xl text-foreground">מדיניות פרטיות</h1>
        <p className="mt-2 text-sm text-muted-foreground">עדכון אחרון: אוגוסט 2026</p>

        <div className="prose-legal mt-10 flex flex-col gap-8 text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-heading text-2xl text-foreground">1. כללי</h2>
            <p className="mt-3">
              מסמך זה מסביר אילו נתונים אנו אוספים דרך אתר ספורטיקט
              (&quot;האתר&quot;), לשם מה, וכיצד הם נשמרים ומטופלים. שליחת
              הטופס באתר מהווה הסכמה למדיניות זו.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">2. אילו נתונים נאספים</h2>
            <p className="mt-3">
              בעת מילוי טופס &quot;קבלו הצעת מחיר&quot; אנו אוספים את הפרטים
              שאתם מוסרים באופן יזום: שם מלא, כתובת אימייל, מספר טלפון
              (אופציונלי), תוכן הפנייה, והעדפה לקבלת שיחת טלפון. האתר אינו
              משתמש בעוגיות מעקב או כלי אנליטיקה שיווקיים, ואינו אוסף מידע
              נוסף מעבר לנתונים שאתם מוסרים בטופס.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">3. למה משמש המידע</h2>
            <p className="mt-3">
              המידע משמש אך ורק כדי ליצור עמכם קשר ולבנות עבורכם הצעת מחיר
              מותאמת אישית לכרטיסים, מלונות וטיסות. אנו לא מוכרים, משכירים,
              או משתפים את המידע שלכם עם צדדים שלישיים לצורכי שיווק.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">4. היכן נשמר המידע</h2>
            <p className="mt-3">
              נתוני הפניות נשמרים ב-Airtable, המשמש כמעבד נתונים מטעמנו.
              הגישה למידע מוגבלת לצוות הטיפול בפניות בלבד, דרך מסך ניהול
              מוגן בהתחברות. מפתחות הגישה למערכת האחסון נשמרים בצד השרת
              בלבד ואינם נחשפים בדפדפן בשום שלב.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">5. זכויותיכם</h2>
            <p className="mt-3">
              בהתאם לחוק הגנת הפרטיות, תשמ&quot;א-1981, זכותכם לעיין במידע
              שנשמר עליכם, לבקש את תיקונו, או לבקש את מחיקתו. לשם כך, צרו
              איתנו קשר דרך טופס יצירת הקשר באתר ונטפל בבקשתכם בהקדם.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">6. תקופת השמירה</h2>
            <p className="mt-3">
              אנו שומרים את פרטי הפנייה למשך הזמן הדרוש לצורך הטיפול בה
              ולמעקב עסקי סביר, ומוחקים או מאנונמים אותה לבקשתכם כאמור לעיל.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">7. שינויים במדיניות</h2>
            <p className="mt-3">
              אנו רשאים לעדכן מדיניות זו מעת לעת. גרסה מעודכנת תפורסם בעמוד
              זה, עם תאריך העדכון האחרון.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">8. יצירת קשר</h2>
            <p className="mt-3">
              לשאלות או בקשות בנוגע לפרטיותכם, ניתן ליצור קשר דרך טופס
              יצירת הקשר בעמוד הבית.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
