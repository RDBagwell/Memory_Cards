const cardsContainer = document.getElementById('cards-container');
const current = document.getElementById('current');
const addContainer = document.getElementById('add-container');
const questionBox = document.getElementById('question');
const answerBox = document.getElementById('answer');
const showBtn = document.getElementById('show');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const hideBtn = document.getElementById('hide');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');

let currentActiveCard = 0;

let cardsEl = [];

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];
const cardsData = getCardsData()


function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if(index === 0){
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    `;
    card.addEventListener('click', ()=> card.classList.toggle('show-answer'));
    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrenttext()
}

function updateCurrenttext(){
    if(cardsEl){
        current.textContent = `${currentActiveCard + 1}/${cardsEl.length}`;
    } else {
        current.textContent = `${currentActiveCard}/${cardsEl.length}`;
    }
    
}


function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function setCardsData(cardsData){
    localStorage.setItem('cards', JSON.stringify(cardsData))
    window.location.reload();
}

nextBtn.addEventListener('click', ()=>{
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard = currentActiveCard + 1;
    if(currentActiveCard > cardsEl.length -1){
        currentActiveCard = cardsEl.length -1;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrenttext();
});

prevBtn.addEventListener('click', ()=>{
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard = currentActiveCard - 1;
    if(currentActiveCard < 0){
        currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrenttext();
});




showBtn.addEventListener('click', ()=> addContainer.classList.add('show'));
hideBtn.addEventListener('click', ()=> addContainer.classList.remove('show'));
addCardBtn.addEventListener('click', ()=>{
    const question = questionBox.value;
    const answer = answerBox.value;
    
    if(question.trim() && answer.trim()){
        const newCard = {question, answer}
        createCard(newCard);
        questionBox.value = '';
        answerBox.value = '';

        addContainer.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }

    
});

clearBtn.addEventListener('click', ()=>{
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})

createCards();