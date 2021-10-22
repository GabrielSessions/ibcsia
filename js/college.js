//Class for commonapp schools
class CASchool {

    constructor(name, ed, ea, rd, supps, docs, personalEssay, grades) {
        this.name = name;
        this.ed = ed;
        this.ea = ea;
        this.rd = rd; //if null, then rolling admissions
        this.supps = [];
        this.docs = [];

        //Will try to add a supplemental essay with text value and completion status for new college
        //Old college will create error, so no reason to add completion status again.
        try {

            if ((supps[0])[0].length == 1) {
                for (let i = 0; i < supps.length; i++) {
                    this.supps.push([supps[i], false]);
                }

                for (let i = 0; i < docs.length; i++) {
                    this.docs.push([docs[i], false]);
                }
            } else {

                for (let i = 0; i < supps.length; i++) {
                    this.supps.push(supps[i]);
                }

                for (let i = 0; i < docs.length; i++) {
                    this.docs.push(docs[i]);
                }
            }
        } catch {

            for (let i = 0; i < supps.length; i++) {
                this.supps.push(supps[i]);
            }

            for (let i = 0; i < docs.length; i++) {
                this.docs.push(docs[i]);
            }
        }

        //Commonapp specific instance variables
        this.caPersonalEssay = personalEssay;
        this.courseGrades = grades;

    }

    //Some accessor, addition, and removal methods
    getName() {
        return this.name;
    }

    addSuppEssay(newEssay) {
        suppEssays.push([newEssay, false]);
    }

    removeSuppEssay(index) {
        suppEssays.splice(index);
    }

    addDocs(newDoc) {
        docsRequired.push([newDoc, false]);
    }

    removeDocs(index) {
        docsRequired.splice(index);
    }

    //Chcecks if all essays are complete
    essayCompletion() {
        for (let i = 0; i < suppEssays.length; i++) {
            if (!suppEssays[i][1]) {
                return false;
            }
        }
        return true;
    }

    //Checks if a specified essay is complete
    essayCompletion(index) {
        if (suppEssays[index][1]) {
            return true;
        }
        return false;
    }

    //Chcecks if all docs are complete
    documentCompletion() {
        for (let i = 0; i < docsRequired.length; i++) {
            if (!docsRequired[i][1]) {
                return false;
            }
        }
        return true;
    }

    //Checks if a specified doc is complete
    documentCompletion(index) {
        if (docsRequired[index][1]) {
            return true;
        }
        return false;
    }

}

//Same as the previous class, but without the commonapp specific instance variables.
//See notes in the above class for details about the College & Commonapp class
class College {
    constructor(name, ed, ea, rd, supps, docs) {
        this.name = name;
        this.ed = ed;
        this.ea = ea;
        this.rd = rd; //if null, then rolling admissions
        this.supps = [];
        for (let i = 0; i < supps.length; i++) {
            this.supps.push([supps[i], false]);
        }
        this.docs = [];
        for (let i = 0; i < docs.length; i++) {
            this.docs.push([docs[i], false]);
        }
    }

    getName() {
        return this.name;
    }

    addSuppEssay(newEssay) {
        suppEssays.push([newEssay, false]);
    }

    removeSuppEssay(index) {
        suppEssays.splice(index);
    }

    addDocs(newDoc) {
        docsRequired.push([newDoc, false]);
    }

    removeDocs(index) {
        docsRequired.splice(index);
    }

    essayCompletion() {
        for (let i = 0; i < suppEssays.length; i++) {
            if (!suppEssays[i][1]) {
                return false;
            }
        }
        return true;
    }

    essayCompletion(index) {
        if (suppEssays[index][1]) {
            return true;
        }
        return false;
    }

    documentCompletion() {
        for (let i = 0; i < docsRequired.length; i++) {
            if (!docsRequired[i][1]) {
                return false;
            }
        }
        return true;
    }

    documentCompletion(index) {
        if (docsRequired[index][1]) {
            return true;
        }
        return false;
    }

}