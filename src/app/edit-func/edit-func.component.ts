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
    errorSubmit = false;

    ngDoCheck(): number {
        if (Add.formEdit && !this.isWrite) {
            this.isWrite = 1;
            this.studentForm = new FormGroup({
                fullName: new FormGroup({
                    sname: new FormControl(Add.initialEditedStudent.sname, [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                    fname: new FormControl(Add.initialEditedStudent.fname, [Validators.required, Validators.pattern(/^[А-Я].*$/), this.nameValidator]),
                    mname: new FormControl(Add.initialEditedStudent.mname, [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                }),
                dob: new FormControl(this.formatDate(), [Validators.required, this.dateValidator]),
                score: new FormControl(Add.initialEditedStudent.score, [Validators.required, Validators.pattern("(5|([1-4]+(.[1-9])?))")])
            });
            return 1;
        }
    }

    public nameValidator = (control: FormControl) => {
        if (this.studentForm) {
            if (control.value === this.studentForm.value.fullName.sname ||
                control.value === this.studentForm.value.fullName.mname) {
                return { "nameInvalid": true };
            } return null;
        }
    };

    dateValidator(control: FormControl): { [key: string]: boolean } {
        const dateInput = new Date(control.value);
        const validDate = new Date(new Date().getFullYear() - 10, new Date().getMonth(), new Date().getDate());
        if (dateInput > validDate) {
            return { "dateInvalid": true };
        } return null;
    }

    formatDate(): string {
        const day = String(Add.initialEditedStudent.dob.getDate() + 1);
        const month = String(Add.initialEditedStudent.dob.getMonth() + 1);
        const year = Add.initialEditedStudent.dob.getFullYear();
        const fullYear = month + "-" + day + "-" + year;
        return new Date(fullYear).toISOString().split("T")[0];
    }

    studentValidator(control: string): boolean {
        const formIn = (<FormGroup>this.studentForm.controls.fullName).controls[control];
        const formM = this.studentForm.controls[control];
        return formM === undefined ? formIn.invalid && formIn.touched : formM.invalid && formM.touched;
    }

    onSubmit(control: FormControl): void {
        if (control.valid) {
            Add.editedStudent.sname = control.value.fullName.sname;
            Add.editedStudent.fname = control.value.fullName.fname;
            Add.editedStudent.mname = control.value.fullName.mname;
            Add.editedStudent.dob = new Date(control.value.dob);
            Add.editedStudent.score = control.value.score;
            Add.confirmEdit = 1;
            Add.formEdit = 0;
            this.errorSubmit = false;
            this.isWrite = 0;
            return null;
        }
        this.errorSubmit = true;
        return null;
    }
    hideEdition(): number {
        return Add.formEdit;
    }
    cancel(): void {
        this.errorSubmit = false;
        this.isWrite = 0;
        Add.formEdit = 0;
    }
}
