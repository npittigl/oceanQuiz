$(document).ready(() => {
    // array of quiz questions & answers:
    const quizQuestions = [
        {
            question: "Which ocean is considered the largest ocean on earth?",
            answers: [
                "Indian",
                "Pacific",
                "Atlantic",
                "Arctic"
            ],
            correctAnswer: "Pacific"
        },
        {
            question: "Which is the largest living animal?",
            answers: [
                "Whale Shark",
                "Fin Whale",
                "Blue Whale",
                "Megalodon"
            ],
            correctAnswer: "Blue Whale"
        },
        {
            question: "How much of the Earth's surface is covered by oceans?",
            answers: [
                "15 per cent",
                "45 per cent",
                "70 per cent",
                "75 per cent"
            ],
            correctAnswer: "70 per cent"
        },
        {
            question: "How many known marine life forms are there in the ocean?",
            answers: [
                "Hundreds",
                "Thousands",
                "Millions",
                "Billions",
            ],
            correctAnswer: "Millions"
        },
        {
            question: "How much of the oxygen we breathe is produced by oceans?",
            answers: [
                "55 per cent",
                "65 per cent",
                "70 per percent",
                "80 per cent",
            ],
            correctAnswer: "80 per cent"
        },
        {
            question: "How much garbage is dumped into the ocean every year?",
            answers: [
                "2 billion kg",
                "4 billion kg",
                "6 billion kg",
                "10 billion kg"
            ],
            correctAnswer: "6 billion kg"
        },
        {
            question: "What is the closest living relative to whales?",
            answers: [
                "Hippopotamus",
                "Pig",
                "Camel",
                "Giraffe"
            ],
            correctAnswer: "Hippopotamus"
        },
        {
            question: "Gray whales make annual migrations. How far do they travel round trip?",
            answers: [
                "12 000 km",
                "16 000 km",
                "18 000km",
                "20 000 km"
            ],
            correctAnswer: "16 000 km"
        },
        {
            question: "The longest mountain range is underwater. What is it called?",
            answers: [
                "Mid-Ocean Ridge",
                "Oceanic Himalayas",
                "Mariana Trench",
                "Mid-Atlantic Ridge"
            ],
            correctAnswer: "Mid-Ocean Ridge"
        },
        {
            question: "How many shipwrecks are in the ocean?",
            answers: [
                "650 thousand",
                "10 million",
                "2 million",
                "3 million"
            ],
            correctAnswer: "3 million"
        },
        {
            question: "Humans have only explored about __ of the world's oceans.",
            answers: [
                "1%",
                "5%",
                "10%",
                "15%"
            ],
            correctAnswer: "5%"
        },
        {
            question: "How long can Greenland sharks live up to?",
            answers: [
                "80 years",
                "400 years",
                "120 years",
                "50 years"
            ],
            correctAnswer: "400 years"
        },
        {
            question: "The picturesque white sand on tropical beaches is created by: ",
            answers: [
                "Waves eroding corals",
                "Dead diatoms",
                "Parrotfish poop",
                "Algae"
            ],
            correctAnswer: "Parrotfish poop"
        },
        {
            question: "Less than 20 people are killed by sharks per year. However, people kill over ___ sharks per hour!",
            answers: [
                "11,500",
                "1,000",
                "8,500",
                "4,500"
            ],
            correctAnswer: "11,500"
        },
        {
            question: "A group of Jellyfish are called a: ",
            answers: [
                "Fluther",
                "Bloom",
                "Smack",
                "All of the Above"
            ],
            correctAnswer: "All of the Above"
        }
    ];

    // caching selectors
    const $questionForm = $('.questionForm');
    const $questionElement = $('.questionElement');
    const $answerElement = $('.answerChoices');
    // const $quizContainer = $('.quizContainer');
    const $main = $('main');
    const $quizMessage = $('.quizMessage');
    const $startButton = $('#start');
    const $submitButton = $('#submitBtn');
    const $spanCount = $('.spanCount');
    const $score = $('#score')
    const $scoreEvaluation = $('.scoreEvaluation');
    const $result = $('.result');
    

    // global variables
    let count = 0;
    let score = 0;
    let spanCount = 0;

    // event listener to start quiz
    $startButton.on('click', function () {
        // $quizContainer.removeClass('hide');
        $main.removeClass('hide');
        $startButton.addClass('hide');
        $('h2').addClass('hide');
        $('.whale').addClass('hide');
        showQuestion();
        increaseSpanCount();
        setNextQuestion();
    });

    // function to render start button to re-play quiz
    const showStartOfQuiz = () => {
        // $quizContainer.addClass('hide');
        $main.addClass('hide');
        $('h2').removeClass('hide');
        $('.whale').removeClass('hide');
        $startButton.removeClass('hide');
    };

    // update DOM with span count
    const increaseSpanCount = () => {
        if(spanCount === quizQuestions.length) {
            $spanCount.text(`${spanCount}`);
        } else {
            spanCount++;
            $spanCount.text(`${spanCount}`);
        }
    };

    // function to loop over questions & answers array and append to html
    const showQuestion = () => {
        // loop over each question & append to 'questionElement' legend
        for (let i = 0; i < quizQuestions[count].question[i].length; i++) {
            $questionElement.append(
                `<h3 class="question">
                ${quizQuestions[count].question}</h3>`
            );
        };
        // loop over each question's multiple choice options & append to 'answerChoices' div
        quizQuestions[count].answers.forEach((answer, index) => {
            $answerElement.append(
                `<div class="answerButtons">
                    <input type="radio" id='answer${index}' name='answer' value='${answer}' required>
                    <label for='answer${index}'>${answer}</label>
                </div>`
            );
        });
    };

    // function to set next question to html
    const setNextQuestion = () => {
        $('h3').remove();
        $('.answerButtons').remove();
        showQuestion();
    };

    // function to increase quizQuestion array index
    const increaseQuestionCount = () => {
        count = count + 1;
    };

    // function to fetch user's checked radio value
    const fetchRadioValue = () => {
            let checkedRadioValue = $('input[name="answer"]:checked').val();
            return checkedRadioValue;
    };

    // function to compare user's answer against correct answer; increase score if correct & append feedback to html
    const checkUserAnswer = (userChoice, correctChoice) => {
        if (userChoice === correctChoice) {
            score = score + 1;
            $score.text(`${score}`)
            $submitButton.addClass('hide');
            $quizMessage.text('').append(`
            <p class="feedback">RIGHT ON! You are correct, swim to the next question.</p>
            <div style="width:100%;height:0;padding-bottom:40%;position:relative;">
                <p class="sr-only">Gif image from the Pixar movie Finding Nemo; Marlin the orange and white clown fish is riding on the back of the sea turtle named Crush.</p>
                <iframe tabindex="-1" src="https://giphy.com/embed/PQid6TEa9iIgM" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <button id="next" class="btn next">Next</button>
            `);    
        } else {
            $submitButton.addClass('hide');
            $quizMessage.text('').append(`
            <p class="feedback"> Sink! The correct answer is <span class="correctChoice">"${correctChoice}"</span></p>
            <div style="width:70%;height:0;padding-bottom:40%;position:relative;">
                <p class="sr-only">Gif image from the Pixar movie Finding Nemo; Nemo, the little orange and white clown fish, is seen going round and round down into a drain.</p>
                <iframe tabindex="-1" src="https://giphy.com/embed/Lyk87u79SS9zi" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <button id="next" class="btn next">Next</button>
            `);    
        }
    };

    // event listener for submit button to check user's answer & render feedback 
    $questionForm.on('submit', function (e) {
        e.preventDefault();
        let userInput = fetchRadioValue();
        correctAnswer = quizQuestions[count].correctAnswer;
        checkUserAnswer(userInput, correctAnswer);
        $quizMessage.removeClass('hide');
        $questionForm.addClass('hide');
    });

    // event listener to show next question after feedback page
    $quizMessage.on('click', '.next', function () {
        increaseSpanCount();
        $quizMessage.addClass('hide');
        $submitButton.removeClass('hide');
        $questionForm.removeClass('hide');
        increaseQuestionCount();
        ifQuizCompleted();
    });

    // function to evaluate if end of quiz
    const ifQuizCompleted = () => {
        if (count === quizQuestions.length) {
            renderScoreEvaluation();
        } else {
            setNextQuestion();
        }
    };

    // function to render score evaluation after quiz completed
    const renderScoreEvaluation = () => {
        $result.addClass('hide');
        $questionForm.addClass('hide');
        $quizMessage.addClass('hide');
        if (score <= 8) {
            $scoreEvaluation.append(`
            <p class="evaluation">Your final score is <span class="totalScore"> ${score} </span> out of 15! You risk being shark bait. Better luck next time!</p>
            <div style="width:70%;height:0;padding-bottom:40%;position:relative;">
                <p class="sr-only">Gif image from the Pixar movie Finding Nemo; Bruce the Great White Shark grins at a surprised and scared clown fish, named Marlin, and shows his many rows of very sharp teeth.</p>
                <iframe src="https://giphy.com/embed/107gPMgIBBleA8" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <button id="reset" class="btn">Play Again</button>
            `)
        } else if (score === 9 || score === 10 || score === 11) {
            $scoreEvaluation.append(`
            <p class="evaluation">Your final score is <span class="totalScore"> ${score} </span> out of 15! Not bad - just keep swimming and you'll be on your way.</p>
            <div style="width:70%;height:0;padding-bottom:40%;position:relative;">
                <p class="sr-only">Gif image from the Pixar movie Finding Nemo; Dory the Blue Tang fish encourages Marlin to not give up and to keep going by telling him to just keep swimming.</p>
                <iframe src="https://giphy.com/embed/14cpLJ4enIIXJK" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <button id="reset" class="btn">Play Again</button>
            `)
        } else {
            $scoreEvaluation.append(`
            <p class="evaluation">Your final score is <span class="totalScore"> ${score} </span> out of 15! You're an ocean mas-STAR!</p>
            <div style="width:70%;height:0;padding-bottom:40%;position:relative;">
                <p class="sr-only">Gif image from the Pixar movie Finding Nemo of Peach, the pink starfish, seen smiling and happily singing and moving side to side while suctioned to the glass of the fish tank she lives inside of.</p>
                <iframe src="https://giphy.com/embed/ulSIu5DqlV51C" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <button id="reset" class="btn">Play Again</button>
            `)
        }   
    };

    // event listener to reset quiz
    $scoreEvaluation.on('click', function () {
        count = 0;
        spanCount = 0;
        score = 0;
        $spanCount.text('0');
        $score.text('0');
        $result.removeClass('hide');
        $questionForm.removeClass('hide');
        $scoreEvaluation.text('').addClass('hide');
        showStartOfQuiz();
    });
    
});

