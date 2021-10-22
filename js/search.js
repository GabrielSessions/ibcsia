//Searches the array of VA Colleges at the bottom of the file for matches
function findResults(input) {
    for (let i = 0; i < vaColleges.length; i++) {
        if ((vaColleges[i].name.toLowerCase()).includes(input.toLowerCase())) {
            displayResult(vaColleges[i].name);
        }
    }
}

//Displays the matches to the findResults function above
//The name of the college is displayed along with a link to add the college to the list on the home page
function displayResult(input) {

    //Displays the college name
    var searchResults = document.createElement("h5");
    var text = document.createTextNode(input);
    searchResults.appendChild(text);
    var element = document.getElementById("search-results");
    element.appendChild(searchResults);

    //Displays the submit button
    var addCollegeButton = document.createElement("form");
    addCollegeButton.action = "index.html";
    var addSubmit = document.createElement("input");
    addSubmit.type = "submit";
    addSubmit.id = input;
    addSubmit.name = input;
    addSubmit.value = "Add College";
    var moreText = document.createTextNode("Add College");
    addSubmit.appendChild(moreText);
    addCollegeButton.appendChild(addSubmit);
    element.appendChild(addCollegeButton);


}

//When ths search button is pressed, this function will attempt to complete a search
function collegeSearch() {
    let url = window.location.search;
    let formSubmit = new URLSearchParams(url);
    let searchValue = formSubmit.get('name');
    if (searchValue != '' && searchValue != null) {
        findResults(searchValue);
    }
}

function addVaCollege(vaCollegeInput) {

    console.log(vaCollegeInput);
    for (let i = 0; i < vaColleges.length; i++) {
        if (vaColleges[i].name == vaCollegeInput) {
            setCookie('cookieCollegeList', vaColleges[i], 1);
        }
    }

}

//Objects for a selection of Virginia Colleges
var vaColleges = [new CASchool('University of Virginia', new Date(2020, 11, 01, 11, 59, 0, 0),
        new Date(2020, 11, 01, 11, 59, 0, 0), new Date(2021, 00, 01, 11, 59, 0, 0), ["Favorite Word and Why", "Engineering Feat"], ["Counselor Reccomendation", "Teacher Reccomendation"],
        true, false),

    new CASchool("Virginia Tech", new Date(2020, 11, 01, 11, 59, 0, 0),
        new Date(2020, 12, 01, 11, 59, 0, 0), new Date(2021, 00, 15, 11, 59, 0, 0), ["Briefly describe a group that you have been involved with", "Describe a situation where you were involved or witness to an act of discrimination", "Describe an example of a situation where you have significantly influenced others, took on a leadership role, helped resolve a dispute, or contributed to a group goal", "Briefly describe a personal goal you have set for yourself"], [],
        false, false),

    new CASchool("Bridgewater College", null,
        new Date(2020, 11, 15, 11, 59, 0, 0), null, [], [],
        false, false),

    new CASchool("Christopher Newport University", new Date(2020, 11, 15, 11, 59, 0, 0),
        new Date(2020, 12, 1, 11, 59, 0, 0), new Date(2021, 1, 1, 11, 59, 0, 0), ["We want to hear how leadership has played a role in your life."], [],
        true, false),

    new CASchool("George Mason University", null,
        new Date(2020, 11, 15, 11, 59, 0, 0), new Date(2021, 01, 01, 11, 59, 0, 0), ["Why do YOU want to go to college?"], [],
        false, false),

    new CASchool("Longwood University", new Date(2020, 11, 02, 11, 59, 0, 0),
        new Date(2020, 12, 01, 11, 59, 0, 0), new Date(2021, 02, 01, 11, 59, 0, 0), [], [],
        true, false),

    new CASchool("Marymount University", null,
        new Date(2020, 11, 16, 11, 59, 0, 0), null, ["Optional Essay"], ["Counselor Reccomendation", "Teacher Reccomendation"],
        true, false),

    new CASchool("Old Dominion University", null,
        new Date(2020, 12, 01, 11, 59, 0, 0), new Date(2021, 01, 15, 11, 59, 0, 0), [], [],
        false, false),

    new CASchool("Virginia Commonwealth University", null,
        null, null, [], [],
        true, false),

    new CASchool("William & Mary", new Date(2020, 11, 00, 11, 59, 0, 0),
        null, new Date(2021, 01, 01, 11, 59, 0, 0), ["Beyond your impressive academic credentials and extracurricular accomplishments, what else makes you unique and colorful?"], ["Counselor Reccomendation"],
        true, false),

    new CASchool("Washington and Lee University", new Date(2020, 11, 01, 11, 59, 0, 0),
        null, new Date(2021, 00, 01, 11, 59, 0, 0), ["Optional Questions"], ["Counselor Recommendation, Teacher Reccomendation 1, Teacher Reccomendation 2"],
        true, false),

    new CASchool("University of Richmond", new Date(2020, 10, 01, 11, 59, 0, 0),
        new Date(2020, 10, 01, 11, 59, 0, 0), new Date(2021, 00, 01, 11, 59, 0, 0), ["What is an urgent global challenge, social justice topic, or racial injustice issue about which you are passionate?"], ["Counselor Recommendation"],
        false, false),

    new CASchool("James Madison University", null,
        new Date(2020, 10, 15, 11, 59, 0, 0), new Date(2021, 01, 01, 11, 59, 0, 0), [], [],
        false, false),

    new CASchool("Liberty University", null,
        new Date(2020, 11, 31, 11, 59, 0, 0), null, ["Describe how your personal faith and beliefs contribute to your college search process.", "Liberty’s mission is to develop Christ-centered leaders. Describe how you will contribute to this mission as a Liberty student."], [],
        false, false),
    new CASchool("Radford University", null,
        new Date(2020, 11, 01, 11, 59, 0, 0), new Date(2021, 01, 01, 11, 59, 0, 0), [], [],
        false, false),

];

//Runs whatever functions are necessary to display search results, if any, to the user.
collegeSearch();