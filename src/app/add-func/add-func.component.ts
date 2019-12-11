import { Component, DoCheck } from "@angular/core";
import { FormControl, FormGroup, Validators, Form } from "@angular/forms";
import { Add } from "../add";

@Component({
    selector: "app-add-func",
    templateUrl: "./add-func.component.html",
    styleUrls: ["./add-func.component.less"]
})
export class AddFuncComponent implements DoCheck {
    studentForm: FormGroup;
    isWrite = 0;

    ngDoCheck(): number {
        if (Add.formAdd && !this.isWrite) {
            this.isWrite = 1;
            this.studentForm = new FormGroup({
                fullName: new FormGroup({
                    sname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                    fname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/), this.nameValidator]),
                    mname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                }),
                dob: new FormControl("", [Validators.required, this.dateValidator, this.dateType]),
                score: new FormControl("", [Validators.required, Validators.pattern("(5|([1-4]+(.[1-9])?))")])
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

    studentValidator(control: string): boolean {
        const formIn = (<FormGroup>this.studentForm.controls.fullName).controls[control];
        const formM = this.studentForm.controls[control];
        return formM === undefined ? formIn.invalid && formIn.touched : formM.invalid && formM.touched;
    }

    hideAddition(): number {
        return Add.formAdd;
    }

    onSubmit(): boolean {
        if (this.studentForm.valid) {
            Add.addedStudent.sname = this.studentForm.value.fullName.sname;
            Add.addedStudent.fname = this.studentForm.value.fullName.fname;
            Add.addedStudent.mname = this.studentForm.value.fullName.mname;
            Add.addedStudent.dob = new Date(this.studentForm.value.dob);
            Add.addedStudent.score = this.studentForm.value.score;
            Add.confirmAdd = 1;
            Add.formAdd = 0;
            this.isWrite = 0;
        } else {
            return null;
        }
    }
    cancel(): void {
        this.isWrite = 0;
        Add.formAdd = 0;
    }
}
