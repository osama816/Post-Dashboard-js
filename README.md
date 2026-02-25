# Post Dashboard

لوحة تحكم صغيرة تقوم بجلب البيانات من JSONPlaceholder API باستخدام الوعود (Promises)، وتعرضها باستخدام Bootstrap 5، مع تنظيم الكود باستخدام ES6 modules.

link : https://osama816.github.io/Post-Dashboard-js
## المميزات
- **اختيار المستخدم**: جلب وعرض قائمة المستخدمين في قائمة منسدلة.
- **عرض المنشورات**: جلب وعرض منشورات المستخدم المختار ديناميكياً.
- **فلترة من طرف العميل**: فلترة المنشورات حسب العنوان باستخدام `Array.prototype.filter`.
- **حالات الواجهة**: عرض مؤشرات التحميل (Loading)، تنبيهات الأخطاء، ومعالجة النتائج الفارغة.
- **كود منظم**: كود مقسم إلى وحدات (`api.js`, `ui.js`, `state.js`, `main.js`).
- **واجهة متجاوبة**: مصممة باستخدام بطاقات وشبكة Bootstrap 5.

## هيكل المشروع
```text
project/
  index.html
  app/
    api.js      // وظائف الربط بالشبكة (fetch)
    ui.js       // عرض العناصر في الـ DOM: البطاقات، التنبيهات، التحميل
    state.js    // الحالة: معرف المستخدم، المنشورات، نص البحث + تطبيق الفلترة
    main.js     // ربط الأحداث وتدفق التطبيق
```

## كيفية التشغيل
**باستخدام  url**:
 https://osama816.github.io/Post-Dashboard-js

## التقنيات المستخدمة
- Vanilla JavaScript
- Fetch API (Promises)
- Bootstrap 5
- JSONPlaceholder API
