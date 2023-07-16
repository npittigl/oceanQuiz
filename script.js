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
            question: "Can you name the largest living animal? This marine species is bigger than even the biggest dinosaur!",
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
            question: "Gray whales make one of the longest annual migrations of any mammal. How far do they travel round trip?",
            answers: [
                "12 000 km",
                "16 000 km",
                "18 000km",
                "20 000 km"
            ],
            correctAnswer: "16 000 km"
        }
    ];

    const $questionElement = $('.questionElement');
    const $answerElement = $('.answerChoices');
    const $quizContainer = $('.quiz-container');
    const $quizMessage = $('.quizMessage');
    const $startButton = $('#start');
    const $spanCount = $('.spanCount')

    let count = 0;
    let correct = 0;
    let spanCount = 0;

    // event listener to start quiz
    $startButton.on('click', function () {
        $quizContainer.removeClass('hide');
        $startButton.addClass('hide');
        $('h1').css('font-size', '40px');
        $('h2').addClass('hide');

        showQuestion();
        increaseSpanCount();
    });

    // update DOM with span count
    const increaseSpanCount = () => {
        spanCount++;
        $spanCount.text(`${spanCount}`)
    }

    // function to loop over questions and answers in array and append to html
    const showQuestion = () => {
        // loop over each question and append to 'questionElement' 
        for (let i = 0; i < quizQuestions[count].question[i].length; i++) {
            $questionElement.append(
                `<h3 class="question">
                ${quizQuestions[count].question}</h3>`
            );
        };

        // loop over each question's multiple choice answers and append to 'answer' div
        quizQuestions[count].answers.forEach((answer, index) => {
            $answerElement.append(
                `<div class="button">
                    <input type="radio" class='answer' id='answer${index}' name='answer' value='${answer}' required>
                    <label for='answer${index}'>${answer}</label>
                </div>`
            );
        });
    };

    // function to increase quizQuestions array index in order to set next question
    const  increaseArrayIndexCount = () => {
        count++
    }

    const setNextQuestion = () => {
        $('h3').addClass('hide');
        $('.button').addClass('hide');
        const nextQuestion = increaseArrayIndexCount();
        showQuestion(nextQuestion);
    }
    
    const checkAnswerToRenderFeedback = () => {
        let userInput = $('input[type="radio"]:checked').val();
        let correctAnswer = quizQuestions[count].correctAnswer

        if (userInput == correctAnswer) {
            correct = correct + 1;
            $('#correct').text(`${correct}`)
            $questionElement.addClass('hide');
            $answerElement.addClass('hide');
            $('#submitBtn').addClass('hide');
            $quizMessage.append(`<p>Correct - great job! Swim to the next question.</p>
            <button id="next" class="btn next">Next</button>`);
        } else {
            $questionElement.addClass('hide');
            $answerElement.addClass('hide');
            $('#submitBtn').addClass('hide');
            $quizMessage.append(`<p> Sink! The correct answer is "${correctAnswer}".</p>
            <p>Better luck next question!</p>
            <button id="next" class="btn next">Next</button>`);
        }
    }

    // 
    const nextButton = () => {
        $('#next').on('click', function(e) {
            event.preventDefault();
            increaseSpanCount();
            $quizMessage.addClass('hide');
            $questionElement.removeClass('hide');
            $answerElement.removeClass('hide');
            $('#submitBtn').removeClass('hide');

            // callback function to set next question
            setNextQuestion();
            ifQuizCompleted();
            
        });
    }

    // evaluate if end of quiz
    const ifQuizCompleted = () => {
        if(count === 8) {
            renderScore();
        } else {
            setNextQuestion();
        }
    }

    const renderScoreEvaluation = () => {
        $('.scoreEvaluation').text(`
        <p>Congratulations! You completed the quiz:)</p>`)
    }

    // event listener for submit button to check user's answer
    $('form').on('submit', function () {
        event.preventDefault();
        checkAnswerToRenderFeedback();
        nextButton();
        
    });


    // event listener to reset quiz
    // $('form').on('reset', function () {
    //     $('#submit').removeClass('no-hover');
    //     $('p').hide();
    //     score = score - score;
    //     $('#score').text(score);
    //     $("html, body").animate({ scrollTop: 0 }, "slow");
    //     $(window).scrollTop(0);
    // });
});

// when submit answer - count + 1
// if answer correct - score + 1
// if answer correct - pop-up message saying: Correct! Swim to next question. image of whale or dolphin. Next button
// if answer incorrect - pop-up message saying: Sink! Wrong answser. The correct answer is:______. Picture of Titanic. Next button.
// Next button - moves onto next question
// when all 8 questions answered - final pop up message has message and tallies results: "Nice work - you completed the quiz! You got __ out of 8."
// play again button - start quiz again, set count and score to 0

// capture input value from user, see if true or not
    // if true, count correct answers
        // if true show picture of Dory gif saying "just keep swimming" (maybe) (may call it sink or swim)
        // if false show picture of Titanic (shark?) - better luck next time & corrent answer
    // count number of questions already answered
    // show overall results with message
        // less than 5 =>
        // between 5-9 =>
        // between 10 - 12 =>
        // between 13-15 =>
    // play again button (reset count/score)