//This file houses the function calls needed to set up the table of colleges
//Functions referenced in this file can be found in the indexFunctions.js file

//Create a CollegeList object to house all of the colleges
var collegeList = new CollegeList();

//The Code below attempts to parse and add colleges from cookies stored in the browser, if there are any.
try {
    //Slice JSON function is at the bottom of the indexFunctions.js file
    var cookieCollegeNew = sliceJSON(getCookie('cookieCollegeList'));

    var cookieCollegeArray = [];

    for (let i = 0; i < cookieCollegeNew.length; i++) {
        var temp = (JSON.parse(cookieCollegeNew[i]));

        collegeList.addCollege(createCollegeCookies(temp));
    }
} catch {
    console.log("No Cookies Stored");
}




//Add college based on information from the add a college form
let url = window.location.search;
let formSubmit = new URLSearchParams(url);
let searchValue = formSubmit.get('cname');

var isVACollege = false;

//These conditional and iterative statements check if the browser info contains a VA College
for (let i = 0; i < vaColleges.length; i++) {

    if (formSubmit.has(vaColleges[i].name)) {

        for (let j = 0; j < collegeList.myColleges.length; j++) {

            //If the VA college is already in the list, it won't add it again.
            if (vaColleges[i].name == collegeList.myColleges[j].name) {
                isVACollege = true;
                break;
            }
        }

        //If the isVACollege variable not changed from the repeated data if statement, it's added to the list
        if (!isVACollege) {
            collegeList.addCollege(vaColleges[i]);
            isVACollege = true;
            console.log("Success!");
        }
        break;

    }
}

//If browser contains a college not found in the VA college object array, it creates a new college.
if (searchValue != '' && searchValue != null && !isVACollege) {
    var newAddedCollege = (createCollegeNew(formSubmit));



    //There's some errors when there are no previous colleges, so I added a conditional to cover the case.
    if (collegeList.myColleges.length == 0) {
        collegeList.addCollege(newAddedCollege);
    }

    //Prevents colleges with duplicate names from being added
    else {
        for (let i = 0; i < collegeList.myColleges.length; i++) {
            if (newAddedCollege.name == collegeList.myColleges[i].name) {

                break;
            } else if (i == collegeList.myColleges.length - 1) {
                collegeList.addCollege(newAddedCollege);
            }
        }
    }


}

console.log(collegeList);
//The for loop adds all of the colleges in the college list to the table.
//The loop then checks if a notification needs to be sent.
//insertCollege function found in the indexFunctions.js file 
for (let i = 0; i < collegeList.myColleges.length; i++) {
    insertCollege(collegeList.myColleges[i]);
    if (upcomingDeadline(collegeList.myColleges[i])) {
        var newNotification = document.createElement("h3");
        newNotification.innerHTML = "Upcoming Deadline for: " + collegeList.myColleges[i].name;
        document.getElementById("welcome").appendChild(newNotification);
    }
}


console.log(collegeList.myColleges);

//The last section of this code adds all of the colleges in the college list to a new cookie in JSON
var saveCollegeList = []

for (let i = 0; i < collegeList.myColleges.length; i++) {
    saveCollegeList.push(JSON.stringify(collegeList.myColleges[i]));
}




setCookie('cookieCollegeList', saveCollegeList, 30);



//If there is no colleges in the college list, a welcome message appears.
if (collegeList.myColleges.length == 0) {
    firstTime();
}