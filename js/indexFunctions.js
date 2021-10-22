//This file contains functions that will be run in the index.js file


//A function to set up the site the first time the website is visited.
function firstTime() {

    var welcomeTag = document.createElement("h3");
    var welcomeText = document.createTextNode("Welcome! To get started, please add a college to your list.");
    welcomeTag.appendChild(welcomeText);
    var element = document.getElementById("welcome");
    element.appendChild(welcomeTag);

}

//Adds a notification at the top of the home screen when a college deadline approaches
function upcomingDeadline(college) {
    var deadline = new Date(college.rd);
    deadline.setHours(deadline.getHours() + 5);


    let daysUntilDeadline = Math.ceil((-Date.now() + Math.abs(deadline)) / (1000 * 3600 * 24));

    //If there is less than a week until the deadline, a notification will be shown
    if (daysUntilDeadline > 0 && daysUntilDeadline < 8) {
        return true;
    }

}

//If there is a new OOS college to be added to the list, the function will add the form info to a College object
function createCollegeNew(collegeInfo) {

    //Creates a an array out of the essay inputs from the search bar
    let essays = [
        [collegeInfo.get('essay1'), false],
        [collegeInfo.get('essay2'), false],
        [collegeInfo.get('essay3'), false],
        [collegeInfo.get('essay4'), false]
    ];


    //Add in necessary recommendations
    var documents = [];

    for (let i = 0; i < essays.length; i++) {

        if ((essays[i])[0] == '' || (essays[i])[0] == "") {
            essays.pop(i);
            i--;
        }
    }


    if (collegeInfo.get('cr') == 'yes') {
        documents.push(["Counselor Recommendation", false]);
    }

    var numTR = 0;
    if (collegeInfo.get('tr') == "one") {
        numTR = 1;
    } else if (collegeInfo.get('tr') == "two") {
        numTR = 2;
    }
    if (collegeInfo.get('tr') == "three") {
        numTR = 3;
    }


    console.log(numTR);
    for (let i = 0; i < numTR; i++) {
        documents.push(["Teacher Recommendation " + (i + 1), false]);
    }


    //If commonapp, then the switch sets each variable to an appropriate value.
    commonapp = collegeInfo.get('commonapp');
    if (commonapp != null) {
        var courseGrades = false;
        var personalEssay = false;
        switch (commonapp) {
            case "pe":
                personalEssay = true;
                break;
            case "cg":
                courseGrades = true;
                break;
            case "both":
                personalEssay = true;
                courseGrades = true;
                break;
        }
        return new CASchool(collegeInfo.get('cname'), collegeInfo.get('eddate'), collegeInfo.get('eadate'), collegeInfo.get('rddate'), essays, documents, personalEssay, courseGrades);
    }
    return (new College(collegeInfo.get('cname'), collegeInfo.get('eddate'), collegeInfo.get('eadate'), collegeInfo.get('rddate'), essays, documents));
}

//Based on the cookie, the function will generate a new college object
function createCollegeCookies(object) {
    return (new CASchool(object.name, object.ed, object.ea, object.rd, object.supps, object.docs, object.caPersonalEssay, object.courseGrades));
}



//Adds a new college to the table
function insertCollege(college) {



    //Creates a new row for the college
    let table = document.getElementById("table");
    let row = table.insertRow(1);
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    col2.id = 'placeListHere'
    var col3 = row.insertCell(2);

    //Adds college name to the table and creates a todo list based on college variables
    col1.innerHTML = college.name;
    var toDo = [];
    if (college.supps.length > 0) {
        for (let i = 0; i < college.supps.length; i++) {
            toDo.push(["Essay " + (i + 1) + ": " + ((college.supps[i])[0]), ((college.supps[i])[1])]);
        }

    }

    if (college.docs.length != 0) {

        for (let i = 0; i < college.docs.length; i++) {

            toDo.push((college.docs[i]));
        }

    }


    toDo.push(["Submit Application", false])



    //Add CommonApp requirements (essay, course/grades section)
    if (college.caPersonalEssay == true) {
        var space = document.createElement('br');
        let button = document.createElement('button');
        button.type = "button";
        button.classList.add("toDoButton");
        button.id = college.name + " CommonApp Essay";
        button.innerHTML = "CommonApp Essay";

        button.onclick = function() {
            crossOff("CommonApp Essay", button);

        }

        document.getElementById('placeListHere').appendChild(button);
        document.getElementById('placeListHere').appendChild(space);
    }
    if (college.courseGrades == true) {
        var space = document.createElement('br');
        let button = document.createElement('button');
        button.type = "button";
        button.classList.add("toDoButton");
        button.id = college.name + " CommonApp Courses and Grades";
        button.innerHTML = "CommonApp Courses and Grades";

        button.onclick = function() {
            crossOff("CommonApp Courses and Grades", button);

        }

        document.getElementById('placeListHere').appendChild(button);
        document.getElementById('placeListHere').appendChild(space);
    }

    //Creates a to do list in the second column
    //var ul = document.createElement('ul');
    for (let i = 0; i < toDo.length; i++) {

        var space = document.createElement('br');
        let button = document.createElement('button');
        button.type = "button";
        button.classList.add("toDoButton");
        button.id = college.name + " " + (toDo[i])[0];
        button.innerHTML = (toDo[i])[0];

        //When button is clicked it will be either crossed out or uncrossed out
        //If application is submitted, the college will be deleted from the college list
        button.onclick = function() {
            crossOff((toDo[i])[0], button)


        }

        document.getElementById('placeListHere').appendChild(button);
        document.getElementById('placeListHere').appendChild(space);


    }


    //Calculating and displaying time until due date
    var deadline = new Date(college.rd);

    deadline.setHours(deadline.getHours() + 5);

    //Checks if the due date has passed
    if (college.rd == null) {
        col3.innerHTML = "Rolling Admissions";
    } else if (Date.now() > Math.abs(deadline)) {

        col3.innerHTML = "The deadline has passed on: " + deadline.toDateString();

    } else {
        col3.innerHTML = "Due in " + Math.ceil((-Date.now() + Math.abs(deadline)) / (1000 * 3600 * 24)) + " days on " + (deadline).toDateString();
    }


}

//Splits up the JSON cookie into more manageable chunks for parsing
function sliceJSON(fullJSON) {
    var splits = [];
    var objects = [];
    var index = fullJSON.length;


    //Finds the commas separating the JSON and stores the indicies into an array
    var key = fullJSON.length;
    while (key > 0) {

        splits.push(fullJSON.substring(0, key).lastIndexOf("},{"));
        key = fullJSON.substring(0, key).lastIndexOf("},{") - 3;

    }
    splits.pop();

    //Adding the substrings corresponding to the splits in the loop above into an array which will be returned
    if (splits.length == 0) {
        return [fullJSON];
    } else if (splits.length == 1) {
        objects.push(fullJSON.substring(0, splits[0] + 1));
        objects.push(fullJSON.substring(splits[0] + 2, fullJSON.length));
    } else {
        objects.push(fullJSON.substring(0, splits[splits.length - 1] + 1));
        for (let i = 0; i < splits.length - 1; i++) {
            objects.push(fullJSON.substring(splits[i] + 1, splits[i + 1] + 2));

        }
        objects.push(fullJSON.substring(splits[0] + 2, fullJSON.length));
    }


    return objects;
}