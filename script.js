// reverse string
function reverseStr(str) {
    // var listOfChars = str.split(''); // convert into array
    // var reverseListOfChars = listOfChars.reverse(); //reverse array
    // var reversedStr = reverseListOfChars.join(''); // convert to string and join
    // return reversedStr;
    return str.split('').reverse().join('');
}


// check palindrome
function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}

// convertDate into string 
function convertDateIntoString(date) {
    var dateStr = { day: "", month: "", year: "" }
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

// get all formate date
function getAllDateFormateDate(date) {
    var dateStr = convertDateIntoString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// check all the palindrome formate
function checkPalindromeForAllDateFormate(date) {
    var listOfPalindromes = getAllDateFormateDate(date);
    // console.log(listOfPalindromes)
    var flag = false;
    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            // console.log(listOfPalindromes[i])
            flag = true;
            break;
        }
    }

    return flag;
}

// get leap year 
function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

// get next date 
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2) { // check for february
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else {
        // check if the day exceeds the max days in month
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    }
}
function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    // var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        }
        else {
            if (day < 1) {
                day = 28;
                month--;
            }
        }
    }
    else if (month === 2 || month === 4 || month === 6 || month === 8 || month === 9 || month === 11) {
        if (day < 1) {
            day = 31;
            month--;
        }
    }
    else if (month === 1) {
        if (day < 1) {
            day = 31;
            month = 12;
            year--;
        }
    }
    else {
        if (day < 1) {
            day = 30;
            month--;
        }
    }

    return {
        day: day,
        month: month,
        year: year,
    }
}

// get next palindrome date
function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);
    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormate(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);

    }

    return [ctr, nextDate];
}

// get previous palindrome date 
function getpreviousPalindromeDate(date) {
    var ctr = 0;
    var previousDate = getPreviousDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormate(previousDate);
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);

    }

    return [ctr, previousDate];
}


// console.log(getpreviousPalindromeDate(date))
// console.log(getNextPalindromeDate(date))



var dateInput = document.querySelector("#bday-input")
var showBtnRef = document.querySelector("#show-btn");
var nextResultRef = document.querySelector("#next-result");
var previousResultRef = document.querySelector("#previous-result")
var div = document.querySelector(".div");
function clickHandler() {
    var bdaystr = dateInput.value;
    if (bdaystr != '') {
        var listOfDate = bdaystr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        var isPalindrome = checkPalindromeForAllDateFormate(date);
        if (isPalindrome) {
            nextResultRef.innerText = "Yay! Your birthday is a palindrome";
        }
        else {
            var [ctr1, nextDate] = getNextPalindromeDate(date);
            var [ctr2, previousDate] = getpreviousPalindromeDate(date);
            nextResultRef.innerText = `The Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, year missed it by ${ctr1} days!`
            previousResultRef.innerText = `The previous palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, year missed it by ${ctr2} days!`
        }
        div.classList.add("result-p");
    }

}
showBtnRef.addEventListener("click", clickHandler)

