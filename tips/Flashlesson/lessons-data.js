// بيانات الدروس الموسعة
const lessons = [
  {
    title: "الكلمات الأساسية",
    colorClass: "color-yellow",
    type: "Vocabulary",
    content: [
      { english: "Hello", arabic: "مرحبًا" },
      { english: "Goodbye", arabic: "وداعًا" },
      { english: "Please", arabic: "من فضلك" },
      { english: "Thank you", arabic: "شكرًا" },
      { english: "Sorry", arabic: "آسف" },
      { english: "Excuse me", arabic: "عذرًا" },
      { english: "Yes", arabic: "نعم" },
      { english: "No", arabic: "لا" },
      { english: "Help", arabic: "مساعدة" },
      { english: "Welcome", arabic: "أهلاً وسهلاً" },
      { english: "Good morning", arabic: "صباح الخير" },
      { english: "Good night", arabic: "تصبح على خير" },
      { english: "See you", arabic: "أراك لاحقًا" },
      { english: "Take care", arabic: "اعتنِ بنفسك" },
      { english: "Good luck", arabic: "حظًا سعيدًا" }
    ]
  },
  {
    title: "جمل مفيدة",
    colorClass: "color-blue",
    type: "Sentences",
    content: [
      { english: "How are you?", arabic: "كيف حالك؟" },
      { english: "I am fine.", arabic: "أنا بخير." },
      { english: "What is your name?", arabic: "ما اسمك؟" },
      { english: "My name is...", arabic: "اسمي..." },
      { english: "Nice to meet you.", arabic: "تشرفتُ بلقائك." },
      { english: "Where are you from?", arabic: "من أين أنت؟" },
      { english: "I am from...", arabic: "أنا من..." },
      { english: "How old are you?", arabic: "كم عمرك؟" },
      { english: "I am ... years old.", arabic: "عمري ... سنة." },
      { english: "Could you help me?", arabic: "هل يمكنك مساعدتي؟" },
      { english: "I don’t understand.", arabic: "لا أفهم." },
      { english: "Can you repeat, please?", arabic: "هل تعيد من فضلك؟" },
      { english: "I agree.", arabic: "أنا أوافق." },
      { english: "I disagree.", arabic: "لا أوافق." },
      { english: "That’s a good idea.", arabic: "إنها فكرة جيدة." }
    ]
  },
  {
    title: "في المطعم",
    colorClass: "color-orange",
    type: "Situations",
    content: [
      { english: "I would like a coffee.", arabic: "أود قهوة." },
      { english: "Can I see the menu?", arabic: "هل يمكنني رؤية القائمة؟" },
      { english: "The bill, please.", arabic: "الحساب من فضلك." },
      { english: "What do you recommend?", arabic: "ما الذي توصي به؟" },
      { english: "I am allergic to nuts.", arabic: "أنا حساس تجاه المكسرات." },
      { english: "Water, please.", arabic: "ماء، من فضلك." },
      { english: "This is delicious.", arabic: "هذا لذيذ." },
      { english: "A table for two, please.", arabic: "طاولة لشخصين، من فضلك." },
      { english: "Is service included?", arabic: "هل الخدمة مشمولة؟" },
      { english: "I’m vegetarian.", arabic: "أنا نباتي." },
      { english: "No spicy, please.", arabic: "بدون توابل حارة، من فضلك." },
      { english: "To go, please.", arabic: "سفري، من فضلك." }
    ]
  },
  {
    title: "في السفر",
    colorClass: "color-purple",
    type: "Situations",
    content: [
      { english: "Where is the station?", arabic: "أين المحطة؟" },
      { english: "How much is the ticket?", arabic: "كم سعر التذكرة؟" },
      { english: "I have a reservation.", arabic: "لدي حجز." },
      { english: "Where is the airport?", arabic: "أين المطار؟" },
      { english: "I need a taxi.", arabic: "أحتاج سيارة أجرة." },
      { english: "Can you help me with directions?", arabic: "هل يمكنك مساعدتي في الاتجاهات؟" },
      { english: "What time is the flight?", arabic: "ما وقت الرحلة؟" },
      { english: "Where is the hotel?", arabic: "أين الفندق؟" },
      { english: "I lost my luggage.", arabic: "أضعت أمتعتي." },
      { english: "One-way or return?", arabic: "ذهاب فقط أم ذهاب وعودة؟" },
      { english: "Is Wi‑Fi available?", arabic: "هل تتوفر شبكة واي فاي؟" }
    ]
  },
  {
    title: "أفعال أساسية",
    colorClass: "color-pink",
    type: "Verbs",
    content: [
      { english: "go", arabic: "يذهب" },
      { english: "come", arabic: "يأتي" },
      { english: "eat", arabic: "يأكل" },
      { english: "drink", arabic: "يشرب" },
      { english: "need", arabic: "يحتاج" },
      { english: "see", arabic: "يرى" },
      { english: "buy", arabic: "يشتري" },
      { english: "speak", arabic: "يتكلم" },
      { english: "understand", arabic: "يفهم" },
      { english: "want", arabic: "يريد" },
      { english: "like", arabic: "يحب" },
      { english: "work", arabic: "يعمل" },
      { english: "study", arabic: "يدرس" },
      { english: "live", arabic: "يعيش" },
      { english: "call", arabic: "يتصل/ينادي" }
    ]
  },
  {
    title: "الأرقام",
    colorClass: "color-green",
    type: "Numbers",
    content: [
      { english: "Zero", arabic: "صفر" },
      { english: "One", arabic: "واحد" },
      { english: "Two", arabic: "اثنان" },
      { english: "Three", arabic: "ثلاثة" },
      { english: "Four", arabic: "أربعة" },
      { english: "Five", arabic: "خمسة" },
      { english: "Six", arabic: "ستة" },
      { english: "Seven", arabic: "سبعة" },
      { english: "Eight", arabic: "ثمانية" },
      { english: "Nine", arabic: "تسعة" },
      { english: "Ten", arabic: "عشرة" },
      { english: "Eleven", arabic: "أحد عشر" },
      { english: "Twelve", arabic: "اثنا عشر" },
      { english: "Thirteen", arabic: "ثلاثة عشر" },
      { english: "Twenty", arabic: "عشرون" }
    ]
  },
  {
    title: "الألوان",
    colorClass: "color-red",
    type: "Colors",
    content: [
      { english: "Red", arabic: "أحمر" },
      { english: "Blue", arabic: "أزرق" },
      { english: "Green", arabic: "أخضر" },
      { english: "Yellow", arabic: "أصفر" },
      { english: "Black", arabic: "أسود" },
      { english: "White", arabic: "أبيض" },
      { english: "Orange", arabic: "برتقالي" },
      { english: "Purple", arabic: "بنفسجي" },
      { english: "Pink", arabic: "وردي" },
      { english: "Brown", arabic: "بني" },
      { english: "Gray", arabic: "رمادي" },
      { english: "Gold", arabic: "ذهبي" }
    ]
  },
  {
    title: "العائلة",
    colorClass: "color-indigo",
    type: "Family",
    content: [
      { english: "Mother", arabic: "أم" },
      { english: "Father", arabic: "أب" },
      { english: "Brother", arabic: "أخ" },
      { english: "Sister", arabic: "أخت" },
      { english: "Grandmother", arabic: "جدة" },
      { english: "Grandfather", arabic: "جد" },
      { english: "Son", arabic: "ابن" },
      { english: "Daughter", arabic: "ابنة" },
      { english: "Uncle", arabic: "عم/خال" },
      { english: "Aunt", arabic: "عمة/خالة" },
      { english: "Cousin", arabic: "ابن/ابنة العم/الخال" }
    ]
  },
  {
    title: "الوقت والتوقيت",
    colorClass: "color-blue",
    type: "Time",
    content: [
      { english: "Today", arabic: "اليوم" },
      { english: "Tomorrow", arabic: "غدًا" },
      { english: "Yesterday", arabic: "أمس" },
      { english: "Morning", arabic: "صباح" },
      { english: "Afternoon", arabic: "بعد الظهر" },
      { english: "Evening", arabic: "مساء" },
      { english: "Night", arabic: "ليل" },
      { english: "Week", arabic: "أسبوع" },
      { english: "Month", arabic: "شهر" },
      { english: "Year", arabic: "سنة" }
    ]
  },
  {
    title: "أيام الأسبوع",
    colorClass: "color-purple",
    type: "Days",
    content: [
      { english: "Monday", arabic: "الاثنين" },
      { english: "Tuesday", arabic: "الثلاثاء" },
      { english: "Wednesday", arabic: "الأربعاء" },
      { english: "Thursday", arabic: "الخميس" },
      { english: "Friday", arabic: "الجمعة" },
      { english: "Saturday", arabic: "السبت" },
      { english: "Sunday", arabic: "الأحد" }
    ]
  },
  {
    title: "الاتجاهات والأماكن",
    colorClass: "color-green",
    type: "Places",
    content: [
      { english: "Left", arabic: "يسار" },
      { english: "Right", arabic: "يمين" },
      { english: "Straight", arabic: "على طول" },
      { english: "Near", arabic: "قريب" },
      { english: "Far", arabic: "بعيد" },
      { english: "Hospital", arabic: "مستشفى" },
      { english: "Pharmacy", arabic: "صيدلية" },
      { english: "Market", arabic: "سوق" },
      { english: "School", arabic: "مدرسة" },
      { english: "Bank", arabic: "بنك" }
    ]
  },
  {
    title: "المنزل والأدوات",
    colorClass: "color-orange",
    type: "Home",
    content: [
      { english: "Door", arabic: "باب" },
      { english: "Window", arabic: "نافذة" },
      { english: "Chair", arabic: "كرسي" },
      { english: "Table", arabic: "طاولة" },
      { english: "Bed", arabic: "سرير" },
      { english: "Kitchen", arabic: "مطبخ" },
      { english: "Bathroom", arabic: "حمّام" },
      { english: "Mirror", arabic: "مرآة" },
      { english: "Key", arabic: "مفتاح" },
      { english: "Lamp", arabic: "مصباح" }
    ]
  },
  {
    title: "المدرسة والتعلّم",
    colorClass: "color-yellow",
    type: "School",
    content: [
      { english: "Teacher", arabic: "معلم" },
      { english: "Student", arabic: "طالب" },
      { english: "Classroom", arabic: "فصل" },
      { english: "Book", arabic: "كتاب" },
      { english: "Pen", arabic: "قلم" },
      { english: "Notebook", arabic: "دفتر" },
      { english: "Homework", arabic: "واجب منزلي" },
      { english: "Exam", arabic: "امتحان" },
      { english: "Lesson", arabic: "درس" },
      { english: "Library", arabic: "مكتبة" }
    ]
  },
  {
    title: "الطقس",
    colorClass: "color-cyan",
    type: "Weather",
    content: [
      { english: "Sunny", arabic: "مشمس" },
      { english: "Cloudy", arabic: "غائم" },
      { english: "Rainy", arabic: "ممطر" },
      { english: "Windy", arabic: "عاصف" },
      { english: "Snowy", arabic: "مثلج" },
      { english: "Hot", arabic: "حار" },
      { english: "Cold", arabic: "بارد" },
      { english: "Warm", arabic: "دافئ" },
      { english: "Cool", arabic: "لطيف" },
      { english: "Storm", arabic: "عاصفة" }
    ]
  },
  {
    title: "الصحة والطوارئ",
    colorClass: "color-red",
    type: "Health",
    content: [
      { english: "Doctor", arabic: "طبيب" },
      { english: "Nurse", arabic: "ممرضة" },
      { english: "Medicine", arabic: "دواء" },
      { english: "Clinic", arabic: "عيادة" },
      { english: "Emergency", arabic: "طوارئ" },
      { english: "Headache", arabic: "صداع" },
      { english: "Fever", arabic: "حمّى" },
      { english: "Allergy", arabic: "حساسية" },
      { english: "Pain", arabic: "ألم" },
      { english: "Ambulance", arabic: "إسعاف" }
    ]
  },
  {
    title: "التسوّق",
    colorClass: "color-pink",
    type: "Shopping",
    content: [
      { english: "Price", arabic: "سعر" },
      { english: "Discount", arabic: "خصم" },
      { english: "Receipt", arabic: "إيصال" },
      { english: "Cash", arabic: "نقدًا" },
      { english: "Card", arabic: "بطاقة" },
      { english: "Size", arabic: "مقاس" },
      { english: "Color", arabic: "لون" },
      { english: "Try on", arabic: "يجرّب" },
      { english: "Exchange", arabic: "استبدال" },
      { english: "Refund", arabic: "استرجاع" }
    ]
  },
  {
    title: "السفر والفندق",
    colorClass: "color-indigo",
    type: "Travel+Hotel",
    content: [
      { english: "Reservation", arabic: "حجز" },
      { english: "Reception", arabic: "استقبال" },
      { english: "Room", arabic: "غرفة" },
      { english: "Single room", arabic: "غرفة مفردة" },
      { english: "Double room", arabic: "غرفة مزدوجة" },
      { english: "Breakfast", arabic: "إفطار" },
      { english: "Check-in", arabic: "تسجيل الدخول" },
      { english: "Check-out", arabic: "تسجيل الخروج" },
      { english: "Key card", arabic: "بطاقة مفتاح" },
      { english: "Elevator", arabic: "مصعد" }
    ]
  },
  {
    title: "عبارات الطوارئ",
    colorClass: "color-red",
    type: "Emergency",
    content: [
      { english: "Call the police!", arabic: "اتصل بالشرطة!" },
      { english: "I need help!", arabic: "أحتاج مساعدة!" },
      { english: "Call an ambulance!", arabic: "اتصل بالإسعاف!" }
    ]
  }
];