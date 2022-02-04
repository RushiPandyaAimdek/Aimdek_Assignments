let i = 0;
let correct_answer = 0;
let mark = 0;
let data = [
    {
        "Question": "1) Which city is called 'Rangilu' from below options ?",
        "Option1": "Ahmedabad",
        "Option2": "Rajkot",
        "Option3": "Surat",
        "Option4": "Baroda",
        "Answer": "Rajkot"
    },
    {
        "Question": "2) Which country has largest democracy in the world ?",
        "Option1": "US",
        "Option2": "UK",
        "Option3": "India",
        "Option4": "Pakistan",
        "Answer": "India"
    },
    {
        "Question": "3) What is height of The Mount Everest ?",
        "Option1": "8848m",
        "Option2": "8538m",
        "Option3": "8748m",
        "Option4": "8938m",
        "Answer": "8848m"
    },
    {
        "Question": "4) Who invented arthashastra ?",
        "Option1": "Brahmbhatt",
        "Option2": "Nagarjuna",
        "Option3": "Chanakya",
        "Option4": "Amatya rakshas",
        "Answer": "Chanakya"
    },
    {
        "Question": "5) Who is father of Indian Navy ?",
        "Option1": "Maharana pratap",
        "Option2": "Chhatrapati Shivaji Maharaj",
        "Option3": "Pulkeshi second",
        "Option4": "Porus",
        "Answer": "Chhatrapati Shivaji Maharaj"
    }
]

$(document).ready(function () {
    $('#btnFinish').hide();
    $('#result').hide();
    $('#quizContent').hide();
    checkForSelect();
    checkForFinish();
});

$(btnStart).click(function () {
    $('#btnFinish').hide();
    $('#quizContent').show();
    $('.start_page').hide();
    adding_questions(data, i);
});

$(next).click(function () {

    const checkval = $('input:radio[name=option]:checked').val();
    makeResult(checkval, i);
    i++;
    if (i == 4) {
        $('#btnFinish').attr('disabled', 'true');
        $('#btnFinish').show();
        $('#next').hide();
        adding_questions(data, i);
        checkForSelect();
    }
    else {
        $('#btnFinish').hide();
        $('#quizContent').show();
        $('.start_page').hide();
        adding_questions(data, i);
        checkForSelect();
    }
});

$(btnFinish).click(function () {
    const checkval = $('input:radio[name=option]:checked').val();
    makeResult(checkval, i);
    i++;
    $('#finish').hide();
    $('#quizContent').hide();
    $('.start_page').hide();
    $('#result').show();
    displayResult();
});

$(start_again).click(function () {
    i = 0;
    correct_answer = 0;
    mark = 0;
    $('#number').text(i);
    $('#btnFinish').hide();
    $('#result').hide();
    $('#quizContent').hide();
    $('#home_page').show();
    $('.start_page').show();
    $('#next').show();
    $('input:radio[name=option]').prop('checked', false);
    $('#next').attr('disabled', 'true');
});

function adding_questions(data, i) {
    $('#questions').text(data[i].Question);
    $('#option1').text(data[i].Option1);
    $('#option2').text(data[i].Option2);
    $('#option3').text(data[i].Option3);
    $('#option4').text(data[i].Option4);
    $('#number').text(i + 1);
}

function checkForFinish() {
    $('input:radio[name=option]').click(function () {
        const checkval = $('input:radio[name=option]:checked').val();
        $('#btnFinish').removeAttr('disabled');
    });
}

function displayResult() {
    $('#marks').text(mark);
    $('#correct_answer').text(correct_answer);
    $('#percentage').text((correct_answer*100)/5);
}

function checkForSelect() {
    $('input:radio[name=option]').prop('checked', false);
    $('#next').attr('disabled', 'true');
    $('input:radio[name=option]').click(function () {
        $('#next').removeAttr('disabled');
    })
}

function makeResult(checkval, i) {
    if (checkval == "radio1") {
        if ($('#option1').text() == data[i].Answer) {
            mark += 5; 
            correct_answer += 1;
        }
    }
    else if (checkval == "radio2") {
        if ($('#option2').text() == data[i].Answer) {
            mark += 5; 
            correct_answer += 1;
        }
    }
    else if (checkval == "radio3") {
        if ($('#option3').text() == data[i].Answer) {
            mark += 5; 
            correct_answer += 1;
        }
    }
    else if (checkval == "radio4") {
        if ($('#option4').text() == data[i].Answer) {
            mark += 5;
            correct_answer += 1;
        }
    }
}