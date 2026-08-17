# ספורטיקט — דף נחיתה עם טופס יצירת קשר

דף נחיתה בעברית (RTL) לעסק שמוכר כרטיסים לאירועי ספורט גדולים בעולם — פרימייר
ליג, לה ליגה, ליגת האלופות ועוד — כולל חבילות מלונות וטיסות. בתחתית הדף נמצא
טופס "קבלו הצעת מחיר" שמעביר את הפנייה, דרך Route Handler בצד השרת, לטבלה
ב-Airtable — כך שמפתח ה-API של Airtable לעולם לא נחשף בדפדפן.

## טכנולוגיות

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (מבוסס על `@base-ui/react`)
- **react-hook-form** + **zod** לוולידציית הטופס
- **Airtable REST API** לשמירת הפניות

## התקנה והרצה מקומית

### דרישות מקדימות

- Node.js גרסה 20 ומעלה
- חשבון Airtable עם בסיס (Base) וטבלה מוכנים (ראו מבנה הטבלה למטה)

### שלבים

1. התקנת תלויות:

   ```bash
   npm install
   ```

2. יצירת קובץ `.env.local` בשורש הפרויקט (הקובץ לא נכלל ב-git) לפי הדוגמה
   ב-`.env.local.example`:

   ```bash
   AIRTABLE_API_KEY=
   AIRTABLE_BASE_ID=
   AIRTABLE_TABLE_NAME=
   ```

   - **AIRTABLE_API_KEY** — Personal Access Token מ-
     [airtable.com/create/tokens](https://airtable.com/create/tokens), עם
     ה-scopes `data.records:read` ו-`data.records:write`, ועם הבסיס (Base)
     הרלוונטי מסומן תחת **Access**.
   - **AIRTABLE_BASE_ID** — מתוך כתובת ה-URL של הבסיס באירטייבל, המקטע
     שמתחיל ב-`app...` (למשל `appXXXXXXXXXXXXXX`).
   - **AIRTABLE_TABLE_NAME** — שם הטבלה בבסיס, **רגיש לאותיות גדולות/קטנות**
     (case-sensitive), חייב להתאים בדיוק לשם בפועל.

3. הרצת שרת הפיתוח:

   ```bash
   npm run dev
   ```

   האתר יעלה בכתובת [http://localhost:3000](http://localhost:3000).

### פקודות נוספות

```bash
npm run build   # build לפרודקשן
npm run start   # הרצת ה-build בפרודקשן
npm run lint    # בדיקת ESLint
```

## מבנה הטבלה הנדרש ב-Airtable

הטבלה חייבת להכיל את השדות הבאים, בדיוק בשמות האלה (רגיש לאותיות
גדולות/קטנות):

| שם השדה        | סוג השדה ב-Airtable | הערות                                                       |
| -------------- | -------------------- | ------------------------------------------------------------ |
| `Name`         | Single line text      | שם מלא — שדה חובה בטופס                                      |
| `Email`        | Single line text      | אימייל — שדה חובה בטופס                                      |
| `Phone`        | Single line text      | טלפון — שדה לא חובה, אלא אם מסומן "מעדיף/ה שיחת טלפון"        |
| `Message`      | Long text             | תיאור הפנייה — שדה חובה בטופס                                |
| `Prefer Call`  | Checkbox              | האם המשתמש מעדיף שיחת טלפון להצעת מחיר                       |
| `Status`       | Single select          | `חדש`, `קיבל הצעת מחיר`, `סגר חבילה`, `לא סגר חבילה` (נקבע אוטומטית ל-`חדש` בכל פנייה חדשה) |
| `Created Time` | Created time           | מתמלא אוטומטית על ידי Airtable                                |

## מבנה הפרויקט

```
/app
  /page.tsx              → דף הנחיתה
  /layout.tsx             → RTL, פונטים (Karantina / Assistant / Cascadia Mono)
  /globals.css             → משתני העיצוב (צבעים, פונטים, אלמנט הכרטיס)
  /api/submit/route.ts    → Route Handler: מוודא תקינות ושולח ל-Airtable
/components
  /landing-form.tsx        → קומפוננטת הטופס (client component)
  /ui/...                  → קומפוננטות shadcn (button, input, label, textarea, checkbox)
/lib
  /validation.ts            → סכמת הוולידציה (zod)
/public/logos               → לוגואים של הליגות/האירועים המוצגים בדף
```

## אבטחה

מפתח ה-API של Airtable נשמר אך ורק ב-`.env.local` (לא ב-git) ומשמש רק בצד
השרת בתוך `app/api/submit/route.ts`. הטופס בצד הלקוח שולח בקשה ל-`/api/submit`
בלבד, ולעולם לא ישירות ל-Airtable.
