// نافذة البطاقات التعليمية
let flatVocab = [];
let cardIndex = 0;
let flipped = false;

function openFlashcards() {
  flatVocab = lessons.flatMap(lsn => lsn.content.map(c => ({...c, group: lsn.title})));
  cardIndex = 0; flipped = false;
  renderCard();
  renderTable();
  modal.style.display = 'flex';
}

function closeFlashcards() { modal.style.display = 'none'; }

function renderCard() {
  if (flatVocab.length === 0) {
    flashContent.innerHTML = '<div class="hint">لا توجد بطاقات لعرضها.</div>';
    return;
  }
  const item = flatVocab[cardIndex];
  flashContent.innerHTML = `
    <div class="lesson-card" style="min-width:auto;box-shadow:none">
      <div class="title">${item.group}<span class="tag">بطاقة ${cardIndex+1} / ${flatVocab.length}</span></div>
      <div class="pair" style="justify-content:center; font-size:clamp(20px, 5vw, 32px); padding:24px">
        ${flipped ? `<span class="ar" style="color:#d1fae5">${item.arabic}</span>` : `<span class="en" style="color:#93c5fd">${item.english}</span>`}
      </div>
    </div>
  `;
}

function renderTable() {
  vocabTable.innerHTML = flatVocab.map(v=>`
    <tr>
      <td>${v.english}</td>
      <td>${v.arabic}</td>
      <td>${v.group}</td>
    </tr>
  `).join('');
}