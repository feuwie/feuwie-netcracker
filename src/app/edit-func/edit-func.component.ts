import { Component, DoCheck } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Add } from "../add";

@Component({
    selector: "app-edit-func",
    templateUrl: "./edit-func.component.html",
    styleUrls: ["./edit-func.component.less"]
})
export class EditFuncComponent implements DoCheck {
    studentForm: FormGroup;
    isWrite = 0;

    ngDoCheck(): number {
        if (Add.formEdit && !this.isWrite) {
            this.isWrite = 1;
            this.studentForm = new FormGroup({
                fullName: new FormGroup({
                    sname: new FormControl(Add.initialEditedStudent.sname, [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                    fname: new FormControl(Add.initialEditedStudent.fname, [Validators.required, Validators.pattern(/^[А-Я].*$/), this.nameValidator]),
                    mname: new FormControl(Add.initialEditedStudent.mname, [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                }),
                dob: new FormControl(this.formatDate(), [Validators.required, this.dateValidator, this.dateType]),
                score: new FormControl(Add.initialEditedStudent.score, [Validators.required, Validators.pattern("(5|([1-4]+(.[1-9])?))")])
            });
            return 1;
        }
    }

    private nameValidator = (control: FormControl) => {
        if (this.studentForm) {
            if (control.value === this.studentForm.value.fullName.sname ||
                control.value === this.studentForm.value.fullName.mname) {
                return { "nameInvalid": true };
            } return null;
        }
    };

    dateType(control: FormControl): { [key: string]: boolean } {
        const value = control.value;
        if (value && typeof value === "string") {
            const match = value.match(/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/);
            if (!match) {
                return { "dateInvalid": true };
            }
            const date = new Date(`${match[3]}-${match[1]}-${match[2]}`);
            if (isNaN(date.getTime())) {
                return { "dateInvalid": true };
            }
        }
        return null;
    }

    dateValidator(control: FormControl): { [key: string]: boolean } {
        const dateInput = new Date(control.value);
        const validDate = new Date(new Date().getFullYear() - 10, new Date().getMonth(), new Date().getDate());
        if (dateInput > validDate) {
            return { "invalidName": true };
        } else {
            return null;
        }
    }

    formatDate(): string {
        let day = String(Add.initialEditedStudent.dob.getDate());
        let month = String(Add.initialEditedStudent.dob.getMonth());
        if (+day < 10) {
            day = "0" + Add.initialEditedStudent.dob.getDate();
        }
        if (+month < 9) {
            month = "0" + (Add.initialEditedStudent.dob.getMonth() + 1);
        }
        const year = Add.initialEditedStudent.dob.getFullYear();
        return month + "/" + day + "/" + year;
    }

    studentValidator(control: string): boolean {
        const formIn = (<FormGroup>this.studentForm.controls.fullName).controls[control];
        const formM = this.studentForm.controls[control];
        return formM === undefined ? formIn.invalid && formIn.touched : formM.invalid && formM.touched;
    }

    onSubmit(): void {
        if (this.studentForm.valid) {
            Add.editedStudent.sname = this.studentForm.value.fullName.sname;
            Add.editedStudent.fname = this.studentForm.value.fullName.fname;
            Add.editedStudent.mname = this.studentForm.value.fullName.mname;
            Add.editedStudent.dob = new Date(this.studentForm.value.dob);
            Add.editedStudent.score = this.studentForm.value.score;
            Add.confirmEdit = 1;
            Add.formEdit = 0;
            this.isWrite = 0;
        } else {
            return null;
        }
    }
    hideEdition(): number {
        return Add.formEdit;
    }
    cancel(): void {
        this.isWrite = 0;
        Add.formEdit = 0;
    }
}
