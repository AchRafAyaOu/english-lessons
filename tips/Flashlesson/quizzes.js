function shuffle(arr) {
  return arr.map(x=>({x, r:Math.random()})).sort((a,b)=>a.r-b.r).map(o=>o.x);
}

function getDistractors(correct) {
  const pool = lessons.flatMap(l=>l.content.map(c=>c.arabic)).filter(a=>a!==correct);
  return shuffle(pool).slice(0,3);
}

// مراجعة سريعة: توليد اختبار قصير من بيانات الدروس
function setupReview() {
  const container = document.getElementById('lessons-container');
  container.innerHTML = '';
  const quizSet = shuffle(lessons.flatMap(l => l.content.map(x => ({...x, group:l.title})))).slice(0, 10);

  quizSet.forEach((q, i)=>{
    const card = document.createElement('div');
    card.className = 'lesson-card';
    const title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = `<span>سؤال ${i+1}</span><span class="tag">${q.group}</span>`;
    card.appendChild(title);

    const prompt = document.createElement('p');
    prompt.textContent = `ما ترجمة: "${q.english}"؟`;
    card.appendChild(prompt);

    const optsWrap = document.createElement('div');
    optsWrap.className = 'options';

    const allAnswers = shuffle([q.arabic, ...getDistractors(q.arabic)]);
    allAnswers.forEach(ans=>{
      const label = document.createElement('label');
      label.className = 'option-item';
      label.innerHTML = `<input type="radio" name="rev${i}" value="${ans}"> ${ans}`;
      optsWrap.appendChild(label);
    });
    card.appendChild(optsWrap);

    const btn = document.createElement('button');
    btn.className = 'check-btn';
    btn.textContent = 'تحقق';
    const fb = document.createElement('div'); fb.className='feedback'; fb.style.display='none';
    btn.addEventListener('click', ()=>{
      const group = card.querySelectorAll(`input[name="rev${i}"]`);
      let val = null; group.forEach(g=>{ if(g.checked) val=g.value; });
      fb.style.display='block'; fb.classList.remove('correct','incorrect');
      if(val === q.arabic){
        fb.textContent = 'صحيح 👏'; fb.classList.add('correct');
        if(!fb.dataset.scored){ fb.dataset.scored='1'; correctCount++; updateProgress(); }
      }else{
        fb.textContent = `خطأ. الإجابة: ${q.arabic}`; fb.classList.add('incorrect');
      }
    });
    card.appendChild(btn);
    card.appendChild(fb);

    container.appendChild(card);
  });

  totalQuestions = quizSet.length + (document.getElementById('quizFeedback').dataset.scored ? 1 : 0);
  startTimer();
  updateProgress();
}