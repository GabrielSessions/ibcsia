//This class is meant to store all of the College objects together

class CollegeList {

    constructor() {
        this.myColleges = [];
    }

    addCollege(college) {
        this.myColleges.push(college);
    }

    removeCollege(index) {
        myColleges.splice(index);
    }

    //lists all colleges stored in the list
    listColleges() {
        var returnValue = "";
        for (let i = 0; i < this.myColleges.length; i++) {
            returnValue = returnValue + this.myColleges[i].name + "\n";
        }
        return (returnValue);
    }
}