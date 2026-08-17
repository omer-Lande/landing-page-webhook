# ספורטיקט — דף נחיתה + דשבורד ניהול (Turborepo)

מונורפו (Turborepo) עם שני אפליקציות Next.js נפרדות, לגמרי עצמאיות זו מזו:

- **`apps/web`** — דף הנחיתה הציבורי בעברית (RTL) לעסק שמוכר כרטיסים לאירועי
  ספורט גדולים בעולם — פרימייר ליג, לה ליגה, ליגת האלופות ועוד — כולל חבילות
  מלונות וטיסות. בתחתית הדף טופס "קבלו הצעת מחיר" ששולח את הפנייה, דרך
  Route Handler בצד השרת, לטבלה ב-Airtable.
- **`apps/admin`** — דשבורד ניהול מוגן בהתחברות, לצפייה בפניות שהתקבלו
  ועדכון הסטטוס שלהן.

שתי האפליקציות חולקות עיצוב ורכיבי UI (`packages/ui`) ולוגיקת Airtable
(`packages/core`), אבל רצות, נבנות, ומתעדכנות **לגמרי בנפרד** — שינוי בדשבורד
לא נוגע כלל בדף הנחיתה, ולהפך.

## טכנולוגיות

- **Turborepo** + npm workspaces
- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (מבוסס על `@base-ui/react`)
- **react-hook-form** + **zod** לוולידציית הטופס הציבורי
- **jose** לחתימת עוגיית ההתחברות בדשבורד (JWT)
- **Airtable REST API** לשמירת וקריאת הפניות

## מבנה המונורפו

```
/apps
  /web                     → דף הנחיתה הציבורי — רץ על פורט 3000
    /app/page.tsx
    /app/layout.tsx         → RTL, פונטים (Karantina / Assistant / Cascadia Mono)
    /app/api/submit/route.ts → מוודא תקינות ושולח ל-Airtable
    /components/landing-form.tsx
    /lib/validation.ts       → סכמת הוולידציה (zod) של הטופס
    /public/logos             → לוגואים של הליגות
  /admin                   → דשבורד הניהול — רץ על פורט 3001
    /app/page.tsx            → רשימת הפניות (server component, ממוין ומעודכן)
    /app/login/page.tsx       → מסך התחברות
    /app/api/auth/login/route.ts
    /app/api/auth/logout/route.ts
    /app/api/requests/[id]/status/route.ts → עדכון סטטוס פנייה
    /components/status-select.tsx
    /components/logout-button.tsx
    /lib/session.ts            → חתימה ואימות עוגיית ההתחברות
    /lib/sort-requests.ts       → לוגיקת מיון הפניות
    /lib/format-relative-time.ts
    /proxy.ts                 → חוסם גישה לכל האפליקציה חוץ מ-/login ו-/api/auth/*
/packages
  /ui                      → קומפוננטות shadcn משותפות (button, input, label,
                              textarea, checkbox) + עיצוב המותג (theme.css)
  /core                    → lib/airtable.ts — הפונקציות המשותפות לקריאה/כתיבה
                              מול Airtable, ומשמשות את שתי האפליקציות
```

## התקנה והרצה מקומית

### דרישות מקדימות

- Node.js גרסה 20 ומעלה
- חשבון Airtable עם בסיס (Base) וטבלה מוכנים (ראו מבנה הטבלה למטה)

### שלבים

1. התקנת תלויות (בשורש המונורפו — מתקין את שתי האפליקציות ביחד):

   ```bash
   npm install
   ```

2. יצירת `.env.local` **בכל אפליקציה בנפרד** (הקבצים לא נכללים ב-git), לפי
   הדוגמאות ב-`apps/web/.env.local.example` ו-`apps/admin/.env.local.example`:

   **`apps/web/.env.local`:**

   ```bash
   AIRTABLE_API_KEY=
   AIRTABLE_BASE_ID=
   AIRTABLE_TABLE_NAME=
   ```

   **`apps/admin/.env.local`:** (אותם משתני Airtable + פרטי ההתחברות לדשבורד)

   ```bash
   AIRTABLE_API_KEY=
   AIRTABLE_BASE_ID=
   AIRTABLE_TABLE_NAME=

   ADMIN_USERNAME=
   ADMIN_PASSWORD=
   SESSION_SECRET=
   ```

   - **AIRTABLE_API_KEY** — Personal Access Token מ-
     [airtable.com/create/tokens](https://airtable.com/create/tokens), עם
     ה-scopes `data.records:read` ו-`data.records:write`, ועם הבסיס (Base)
     הרלוונטי מסומן תחת **Access**.
   - **AIRTABLE_BASE_ID** — מתוך כתובת ה-URL של הבסיס באירטייבל, המקטע
     שמתחיל ב-`app...` (למשל `appXXXXXXXXXXXXXX`).
   - **AIRTABLE_TABLE_NAME** — שם הטבלה בבסיס, **רגיש לאותיות גדולות/קטנות**
     (case-sensitive), חייב להתאים בדיוק לשם בפועל.
   - **ADMIN_USERNAME** / **ADMIN_PASSWORD** — פרטי ההתחברות לדשבורד הניהול.
     בחרו ערכים משלכם — אלה לא ערכי ברירת מחדל מובנים בקוד.
   - **SESSION_SECRET** — מחרוזת אקראית וסודית לחתימת עוגיית ההתחברות (JWT).
     אפשר לייצר אחת עם `openssl rand -hex 32`.

3. הרצת שתי האפליקציות במקביל:

   ```bash
   npm run dev
   ```

   `turbo run dev` מריץ את שתי האפליקציות יחד:
   - דף הנחיתה: [http://localhost:3000](http://localhost:3000)
   - דשבורד הניהול: [http://localhost:3001](http://localhost:3001)

   אפשר גם להריץ כל אפליקציה בנפרד: `npm run dev --workspace=web` או
   `npm run dev --workspace=admin`.

### פקודות נוספות

```bash
npm run build   # build לפרודקשן לשתי האפליקציות (turbo run build)
npm run lint    # בדיקת ESLint לשתי האפליקציות (turbo run lint)
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

## דשבורד ניהול

מסך `/login` באפליקציית ה-admin מבקש שם משתמש וסיסמה (מול `ADMIN_USERNAME` /
`ADMIN_PASSWORD`), ובהצלחה קובע עוגיית session חתומה (JWT, `jose`, בתוקף ל-8
שעות). `apps/admin/proxy.ts` חוסם גישה לכל נתיב באפליקציה — כולל נתיבי ה-API —
חוץ מ-`/login` ו-`/api/auth/*`, ומפנה חזרה למסך ההתחברות ללא session תקף.

**סדר התצוגה של הפניות:** פניות בסטטוס `חדש` תמיד למעלה, ואחריהן
`קיבל הצעת מחיר`, ולבסוף `סגר חבילה` / `לא סגר חבילה`. בתוך כל קבוצת סטטוס,
הפנייה הישנה ביותר (שממתינה הכי הרבה זמן) מוצגת ראשונה — כדי שהמנהל תמיד
יראה קודם את מה שהכי דחוף לטפל בו. הלוגיקה נמצאת ב-
`apps/admin/lib/sort-requests.ts`.

## אבטחה

- מפתח ה-API של Airtable נשמר רק ב-`.env.local` של כל אפליקציה (לא ב-git),
  ומשמש אך ורק בצד השרת, דרך `packages/core/src/airtable.ts`.
- הטופס הציבורי שולח בקשה ל-`/api/submit` בלבד, ולעולם לא ישירות ל-Airtable.
- דשבורד הניהול פועל דרך `/api/requests/*` בלבד; עוגיית ההתחברות היא
  `httpOnly`, חתומה, ו-`secure` בפרודקשן.
- בדיקת הסיסמה בהתחברות משתמשת ב-`crypto.timingSafeEqual` כדי למנוע
  timing attacks.
