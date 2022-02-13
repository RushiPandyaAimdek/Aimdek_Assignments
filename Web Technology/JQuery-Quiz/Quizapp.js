// variable declaration
let i = 0;
let mark = 0;

// questions list
let data = [
    {
        "Question": "1) Which city is called 'Rangilu' from below options ?",
        "Option": [
            "Ahmedabad",
            "Rajkot",
            "Surat",
            "Baroda"],
        "Answer": "Rajkot"
    },
    {
        "Question": "2) Which country has largest democracy in the world ?",
        "Option": [
            "US",
            "UK",
            "India",
            "Pakistan"],
        "Answer": "India"
    },
    {
        "Question": "3) What is height of The Mount Everest ?",
        "Option": [
            "8848m",
            "8538m",
            "8748m",
            "8938m"],
        "Answer": "8848m"
    },
    {
        "Question": "4) Who invented arthashastra ?",
        "Option": [
            "Brahmbhatt",
            "Nagarjuna",
            "Chanakya",
            "Amatya rakshas"],
        "Answer": "Chanakya"
    },
    {
        "Question": "5) Who is father of Indian Navy ?",
        "Option": [
            "Maharana pratap",
            "Chhatrapati Shivaji Maharaj",
            "Pulkeshi second",
            "Porus"],
        "Answer": "Chhatrapati Shivaji Maharaj"
    }
]

// document load
$(document).ready(function () {
    $('#btnFinish').hide();
    $('#result').hide();
    $('#quizContent').hide();
    $('input:radio[name=option]').click(function () {
        $('#btnnext').removeAttr('disabled');
    })
});

// start button click
$(btnStart).click(function () {
    $('#btnFinish').hide();
    $('#quizContent').show();
    $('.start_page').hide();
    adding_questions(data, i);
});

// next question button click
$(btnnext).click(function () {
    // adding marks
    if (data[i].Answer == data[i].Option[$('input:radio[name=option]:checked').val()]) mark += 5;

    i++;
    if (i == 4) {
        $("#btnnext").html('Finish');
        adding_questions(data, i);
    }
    else if (i == 5) {
        $('#quizContent').hide();
        $('.start_page').hide();
        $('#result').show();
        //making result
        $('#marks').text(mark);
        $('#correct_answer').text(mark / 5);
        $('#percentage').text(((mark / 5) * 100 / 5));
    }
    else {
        $('#quizContent').show();
        $('.start_page').hide();
        adding_questions(data, i);
    }
});

// start-again button click
$(btnstart_again).click(function () {
    location.reload();
});

// for adding question to page
function adding_questions(data, i) {
    // uncheck option and disable next button
    $('input:radio[name=option]').prop('checked', false);
    $('#btnnext').attr('disabled', 'true');

    $('#questions').text(data[i].Question);
    $('#option1').text(data[i].Option[0]);
    $('#option2').text(data[i].Option[1]);
    $('#option3').text(data[i].Option[2]);
    $('#option4').text(data[i].Option[3]);
    $('#number').text(i + 1);
}