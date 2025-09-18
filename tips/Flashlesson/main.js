// حالة عامة
let selectedTab = "lessons";
let correctCount = 0;
let answeredCount = 0;
let totalQuestions = 0;

// مؤقت بسيط
let seconds = 0, timerId = null;
const timerEl = document.getElementById('timer');
function tick(){ seconds++; timerEl.textContent = '⏱ ' + formatTime(seconds); }
function startTimer(){ if(timerId) return; timerId = setInterval(tick, 1000); }
function stopTimer(){ clearInterval(timerId); timerId = null; }
function resetTimer(){ stopTimer(); seconds = 0; timerEl.textContent = '⏱ 00:00'; }
function formatTime(s){ const m=String(Math.floor(s/60)).padStart(2,'0'); const ss=String(s%60).padStart(2,'0'); return `${m}:${ss}`; }

// عناصر DOM
const lessonsContainer = document.getElementById('lessons-container');
const progressFill = document.getElementById('progressFill');
const scoreBadge = document.getElementById('scoreBadge');
const translateBtn = document.getElementById('translateBtn');
const startBtn = document.getElementById('startBtn');
const flashBtn = document.getElementById('flashBtn');
const reviewBtn = document.getElementById('reviewBtn');
const quizFeedback = document.getElementById('quizFeedback');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const flashContent = document.getElementById('flashContent');
const vocabTable = document.getElementById('vocabTable');
const prevCard = document.getElementById('prevCard');
const nextCard = document.getElementById('nextCard');
const flipCard = document.getElementById('flipCard');

// تبويب علوي
document.querySelectorAll('.nav-item').forEach(el=>{
  el.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    el.classList.add('active');
    selectedTab = el.dataset.tab;
    // يمكن لاحقًا تبديل عرض أقسام مختلفة
  });
});

// تحميل الدروس
function renderLessons(showTranslation = false){
  lessonsContainer.innerHTML = '';
  let pairsCount = 0;
  lessons.forEach(lesson=>{
    const card = document.createElement('div');
    card.className = 'lesson-card';

    const title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = `<span>${lesson.title}</span><span class="tag">${lesson.type}</span>`;
    card.appendChild(title);

    lesson.content.forEach(item=>{
      const row = document.createElement('div');
      row.className = 'pair';
      row.innerHTML = `
        <span class="en">${item.english}</span>
        <span class="ar" style="${showTranslation ? '' : 'filter: blur(4px)'}">${item.arabic}</span>
      `;
      card.appendChild(row);
      pairsCount++;
    });

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `
      <span class="tag">عدد العناصر: ${lesson.content.length}</span>
      <span class="tag">${lesson.type}</span>
    `;
    card.appendChild(meta);

    lessonsContainer.appendChild(card);
  });

  totalQuestions = pairsCount; // نستخدمه كمقياس للتقدم العام
  updateProgress();
}

function updateProgress(){
  const pct = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;
  progressFill.style.width = pct + '%';
  scoreBadge.textContent = `${correctCount} / ${totalQuestions}`;
}

// أحداث الأزرار
startBtn.addEventListener('click', ()=>{ renderLessons(false); resetTimer(); startTimer(); });
translateBtn.addEventListener('click', ()=>{
  // إعادة العرض مع قلب حالة الترجمة حسب أول عنصر
  const firstAr = lessonsContainer.querySelector('.ar');
  const show = !firstAr || firstAr.style.filter;
  renderLessons(show);
});

// سؤال Apple
document.getElementById('checkBtn').addEventListener('click', ()=>{
  const options = document.getElementsByName('q1');
  let value = null;
  options.forEach(o=>{ if(o.checked) value = o.value; });
  quizFeedback.style.display = 'block';
  quizFeedback.classList.remove('correct','incorrect');
  if(value === '1'){
    quizFeedback.textContent = 'إجابة صحيحة! 👏';
    quizFeedback.classList.add('correct');
    if(!quizFeedback.dataset.scored){
      correctCount++; quizFeedback.dataset.scored = '1'; updateProgress();
    }
  }else{
    quizFeedback.textContent = 'إجابة خاطئة. جرّب مرة أخرى.';
    quizFeedback.classList.add('incorrect');
  }
});

flashBtn.addEventListener('click', openFlashcards);
closeModal.addEventListener('click', closeFlashcards);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeFlashcards(); });
prevCard.addEventListener('click', ()=>{ if(cardIndex>0){ cardIndex--; flipped=false; renderCard(); } });
nextCard.addEventListener('click', ()=>{ if(cardIndex<flatVocab.length-1){ cardIndex++; flipped=false; renderCard(); } });
flipCard.addEventListener('click', ()=>{ flipped = !flipped; renderCard(); });

reviewBtn.addEventListener('click', setupReview);

// تبديل ثيم بسيط عبر data-theme لعنصر html (تجريبي)
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', ()=>{
  const isDark = document.documentElement.dataset.theme !== 'light';
  document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
  themeBtn.setAttribute('aria-pressed', String(!isDark));
});

// تشغيل أولي
renderLessons(false);
resetTimer();
// تحديث عداد الإجمالي الابتدائي
totalQuestions = lessons.flatMap(l=>l.content).length;
updateProgress();