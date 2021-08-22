class EmployeePayrollData {

    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
        if (nameRegex.test(name))
            this._name = name;
        else
            throw "Incorrect Name";
    }

    get profile() { return this._profile; }
    set profile(profile) { this._profile = profile; }

    get salary() { return this._salary; }
    set salary(salary) { this._salary = salary; }

    get gender() { return this._gender; }
    set gender(gender) { this._gender = gender; }

    get department() { return this._department; }
    set department(department) { this._department = department; }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
        let now = new Date();
        if (startDate != null) {
            if (startDate > now)
                throw "Start date is a future date";
            var diff = Math.abs(now.getTime() - startDate.getTime());
            if (diff / (1000 * 60 * 60 * 24) > 30)
                throw "Start date is beyond 30 days";
            this._startDate = startDate;
        }
        else
            throw `date Value is null`;
    }
    get note() { return this._note; }
    set note(note) { this._note = note; }

    toString() {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const empDate = this.startDate === undefined ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "Name = " + this.name + " ProfilePic= " + this.profile + " gender = " + this.gender + " department = " + this.department + " salary = " + this.salary + " startDate= " + this.empDate + " note= " + this.note;
    }
}