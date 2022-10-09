//All answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

//All our options
const optionElements = document.querySelectorAll('.option');
//console.log (optionElements);

const question = document.getElementById ('question'); // сам вопрос
const numberOfQuestion = document.getElementById('number-of-question'), //номер текущего вопроса
      numberOfAllQuestion = document.getElementById('number-of-all-questions');//все вопросы

let indexOfQuestion, //индекс текущего вопроса
    indexOfPage=0; //индекс страницы

const answersTracker = document.getElementById ('answers-tracker'); //обертка для трекера

const btnNext = document.getElementById ('btn-next'); //кнопка далее

let score = 0; //итоговый результат векторины
const correctAnswer = document.getElementById ('correct-answer'), //количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //количество всех вопросов (в модальном окне)
      btnTryAgain = document.getElementById ('btn-try-again'); //кнопка 'начать векторину заново'

 const questions = [

    {
        question: 'Что должен сделать человек чтобы стать мусульманином?',
        options: [
            'Иметь мусульманскую национальность',
            'Быть добрым',
            'Произнести свидетельство единобожия ("Нет Бога достойного поклонения кроме Аллаха и Мухаммад Его раб и посланник")',
            'Совершать молитву',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сколько раз в день должен молиться мусульманин',
        options: [
            '50',
            '1',
            '10',
            '5',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кому было ниспослано Евангелие (Инджиль)?',
        options: [
            'Пророку Исе',
            'Пророку Мусе',
            'Пророку Ибрахиму',
            'Пророку Мухаммаду',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какова была участь фараона во время погони за Мусой?',
        options: [
            'Убит стрелой',
            'Отравился',
            'Был заколдован',
            'Утонул',
        ],
        rightAnswer: 0
    }
]

numberOfAllQuestion.innerHTML=questions.length; // выводим количество вопросов

const load = () => {
    question.innerHTML=questions[indexOfQuestion].question; //сам вопрос
    //мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
    indexOfPage++; //увеличение индекса страницы
};

let completedAnswers = []; //массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов
    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate==true) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load ();
            }
        }
        if (completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load ();
        }
    }
    completedAnswers.push (indexOfQuestion);
}

const checkAnswer = el => {
    if  (el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add ('correct');
        updateAnswerTracker('correct');
        score++;
    } else{
        el.target.classList.add ('wrong');
        updateAnswerTracker ('wrong');
    }
    disabledOptions ();
}

for (option of optionElements) {
    option.addEventListener('click' , e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add ('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}

//удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item =>{
        item.classList.remove ('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage-1].classList.add(`${status}`)
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert ('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener ('click', () => {
    validate();
})

window.addEventListener ('load', () => {
    randomQuestion();
    answerTracker();
});