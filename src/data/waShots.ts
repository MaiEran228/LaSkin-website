import type { Lang } from '../i18n/types';
import type { ImageMetadata } from 'astro';

import wa01 from '../assets/img/wa/wa-01.jpeg';
import wa02 from '../assets/img/wa/wa-02.jpeg';
import wa03 from '../assets/img/wa/wa-03.jpeg';
import wa04 from '../assets/img/wa/wa-04.jpeg';
import wa05 from '../assets/img/wa/wa-05.jpeg';
import wa06 from '../assets/img/wa/wa-06.jpeg';
import wa07 from '../assets/img/wa/wa-07.jpeg';
import wa09 from '../assets/img/wa/wa-09.jpeg';
import wa10 from '../assets/img/wa/wa-10.jpeg';
import wa11 from '../assets/img/wa/wa-11.jpeg';
import wa12 from '../assets/img/wa/wa-12.jpeg';
import waCard from '../assets/img/wa/wa-card.jpeg';

/**
 * WhatsApp screenshots shown in the reviews strip. Each image is an image of text, so the
 * alt text carries a transcript of the client's message (translated for the other languages).
 * Chat headers with contact names and photos were cropped out of the source screenshots.
 */
export interface WaShot { src: ImageMetadata; alt: Record<Lang, string> }

const prefix: Record<Lang, string> = {
  he: 'צילום מסך של הודעת וואטסאפ מלקוחה: ',
  en: 'Screenshot of a WhatsApp message from a client: ',
  ar: 'لقطة شاشة لرسالة واتساب من مراجعة: ',
};

const shots: { src: ImageMetadata; he: string; en: string; ar: string }[] = [
  { src: wa01,
    he: '"היי בוקר טוב, חייבת להגיד לך שאני מרוצה בטירוף. לא האמנתי שזה יעבוד על צבע עור כמו שלי, וראיתי תוצאות כל כך מהר! אין כיף כזה."',
    en: '"Hi, good morning, I have to tell you I am incredibly happy. I did not believe it would work on a skin tone like mine, and I saw results so quickly! Such a joy."',
    ar: '"صباح الخير، لا بد أن أقول لك إنني راضية جداً. لم أصدق أن هذا سينجح مع لون بشرة مثل بشرتي، ورأيت نتائج بهذه السرعة! يا لها من فرحة."' },
  { src: wa02,
    he: '"וואי תקשיבי איזה שינוי אחרי טיפול אחד! מלא שיערות נשרו, זה כזה כיף! איך לא עשיתי את זה כל השנים האלה."',
    en: '"Wow, what a change after a single treatment! So much hair fell out, it is such a joy! Why did I not do this all these years."',
    ar: '"يا له من تغيير بعد جلسة واحدة! تساقط الكثير من الشعر، يا له من شعور رائع! لماذا لم أفعل هذا طوال هذه السنوات."' },
  { src: wa03,
    he: '"בוקר טוב, רק רציתי להגיד לך שהתוצאות חבל על הזמן. אין לי מילים לתאר את זה באמת. תודה מכל הלב על עבודה מדהימה."',
    en: '"Good morning, I just wanted to tell you the results are unbelievable. I really have no words to describe it. Thank you from the bottom of my heart for amazing work."',
    ar: '"صباح الخير، أردت فقط أن أقول لك إن النتائج مذهلة. لا أجد كلمات لوصفها. شكراً من كل قلبي على العمل الرائع."' },
  { src: wa04,
    he: '"היי, רציתי רק להגיד שזה מטורף — עשיתי בסך הכל טיפול אחד ואני כבר מרגישה שינוי מטורף. הצמיחה איטית ממש, אין כיף כזה."',
    en: '"Hi, I just wanted to say this is crazy — I have had only one treatment and I already feel a huge change. Regrowth is really slow, such a joy."',
    ar: '"مرحباً، أردت فقط أن أقول إن هذا مذهل — أجريت جلسة واحدة فقط وأشعر بتغيير كبير. النمو بطيء جداً، يا له من شعور رائع."' },
  { src: wa05,
    he: '"בוקר טוב, רוצה להגיד לך ממש תודה! פשוט קסם הלייזר. ממש בקושי גדל, וגם המעט שגדל קל מאוד להוריד. ממש אלופה."',
    en: '"Good morning, I want to say a big thank you! The laser is simply magic. It barely grows back, and the little that does is very easy to remove. You are a champion."',
    ar: '"صباح الخير، أريد أن أشكرك كثيراً! الليزر سحر بكل معنى الكلمة. بالكاد ينمو الشعر، والقليل الذي ينمو سهل جداً إزالته. أنتِ بطلة."' },
  { src: wa06,
    he: '"את האמת שאני מרוצה מהמצב עכשיו, ברוך השם! כשאראה שאני צריכה עוד טיפול אדבר איתך ונקבע. הבאת אותי למקום שאף אחד אחר לא!"',
    en: '"Honestly I am happy with how things are now, thank God! When I see I need another treatment I will talk to you and we will book. You got me to a place no one else did!"',
    ar: '"بصراحة أنا راضية عن الوضع الآن، الحمد لله! عندما أرى أنني بحاجة إلى جلسة أخرى سأتحدث معك ونحدد موعداً. أوصلتِني إلى مكان لم يوصلني إليه أحد!"' },
  { src: wa07,
    he: 'הקליניקה שואלת אם יש צמיחה שלושה חודשים אחרי הטיפול, והלקוחה עונה: "אין לי צמיחה, ממש כלום."',
    en: 'The clinic asks whether there is any regrowth three months after the treatment, and the client replies: "I have no regrowth, nothing at all."',
    ar: 'تسأل العيادة إن كان هناك أي نمو بعد ثلاثة أشهر من الجلسة، فتجيب المراجعة: "لا يوجد نمو، لا شيء إطلاقاً."' },
  { src: wa09,
    he: '"וחייבת להחמיא לך — בחיים לא חשבתי שכאלה תוצאות יכולות להיות בלייזר. זה מטורף כמה שאין לי צמיחה! באמת את אלופה."',
    en: '"And I have to compliment you — I never thought laser could give such results. It is crazy how little regrowth I have! You really are a champion."',
    ar: '"ولا بد أن أثني عليك — لم أتخيل يوماً أن الليزر يعطي مثل هذه النتائج. من المذهل كم قلّ نمو الشعر عندي! أنتِ حقاً بطلة."' },
  { src: wa10,
    he: '"טליה, המכונה שלך מפחידה. מה זה אמיתי שכבר מעל חודש לא צומח לי כלום..? בשום אזור!"',
    en: '"Talia, your machine is scary. Is it real that for over a month nothing has grown back..? In no area!"',
    ar: '"طاليا، جهازك مخيف. هل حقاً لم ينمُ لي أي شعر منذ أكثر من شهر..؟ في أي منطقة!"' },
  { src: wa11,
    he: '"לא הייתה שום תגובה בעור באזורים שבוצע בהם לייזר. אציין שזאת החוויה הכי טובה שהייתה לי מאשת מקצוע. כבר אחותי רוצה לקבוע לכל הגוף, ואמשיך להפיץ את העסק שלך לכל המכרים שלי. טליה, תודה!"',
    en: '"There was no skin reaction at all in the areas treated with laser. I must say this was the best experience I have had with a professional. My sister already wants to book a full body, and I will keep recommending your business to everyone I know. Talia, thank you!"',
    ar: '"لم يكن هناك أي رد فعل في الجلد في المناطق التي عولجت بالليزر. أود أن أذكر أن هذه أفضل تجربة مررت بها مع مختصة. أختي تريد الآن حجز جلسة للجسم كله، وسأواصل التوصية بعملك لكل معارفي. طاليا، شكراً!"' },
  { src: wa12,
    he: '"טליה, תקשיבי, המכשיר החדש שלך משהו מפחיד. את לא מבינה — לא יצאה לי עד עכשיו שערה אחת. משהו משוגע."',
    en: '"Talia, listen, your new device is something scary. You do not understand — not a single hair has grown back so far. Something crazy."',
    ar: '"طاليا، اسمعي، جهازك الجديد شيء مخيف. لا تتصورين — لم تنمُ لي شعرة واحدة حتى الآن. شيء لا يصدق."' },
  { src: waCard,
    he: 'כרטיס ביקורת עם חמישה כוכבים: "מקום מעולה! רואים תוצאות כבר על ההתחלה, שירות טוב ויחס אישי מדהים! רואים את המקצועיות, חד משמעית ממליצה לכולם." — נ.ד',
    en: 'A five-star review card: "An excellent place! You see results right from the start, good service and amazing personal attention! The professionalism shows, I definitely recommend it to everyone." — N.D.',
    ar: 'بطاقة تقييم بخمس نجوم: "مكان ممتاز! ترى النتائج منذ البداية، خدمة جيدة واهتمام شخصي رائع! الاحترافية واضحة، أنصح به الجميع بلا تردد." — ن.د' },
];

export const WA_SHOTS: WaShot[] = shots.map((s) => ({
  src: s.src,
  alt: { he: prefix.he + s.he, en: prefix.en + s.en, ar: prefix.ar + s.ar },
}));
