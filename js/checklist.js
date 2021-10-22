//Crosses off an item in the checklist when called
function crossOff(item, button) {

    //Confirmation message if submitting application
    if (item.includes("Submit Application")) {
        var finished = confirm("You are marking your application as submitted. Please confirm that your application is complete and has been submitted correctly and wish to have the college deleted from your college list.");
        if (finished == true) {
            button.innerHTML = "<s>" + item + "</s>";
            return true;
        }

    } else {
        button.innerHTML = "<s>" + item + "</s>";
        return false;
    }

}