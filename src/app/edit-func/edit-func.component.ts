import { Component, DoCheck, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppComponent } from "../app.component";

@Component({
    selector: "app-edit-func",
    templateUrl: "./edit-func.component.html",
    styleUrls: ["./edit-func.component.less"]
})
export class EditFuncComponent extends AppComponent implements OnInit, DoCheck {
    studentForm: FormGroup;
    isWrite = 0;
    errorSubmit = false;

    ngOnInit(): void {
        this.studentForm = new FormGroup({
            fullName: new FormGroup({
                sname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                fname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/), this.nameValidator]),
                mname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
            }),
            dob: new FormControl("", [Validators.required, this.dateValidator]),
            score: new FormControl("", [Validators.required, Validators.pattern("(5|([1-4]+(.[1-9])?))")])
        });
    }

    ngDoCheck(): void {
        console.log('hui');
        if (AppComponent.formEdit && !this.isWrite) {
            this.isWrite = 1;
            this.studentForm.setValue({
                fullName: {
                    sname: AppComponent.initialEditedStudent.sname,
                    fname: AppComponent.initialEditedStudent.fname,
                    mname: AppComponent.initialEditedStudent.mname
                },
                dob: this.formatDate(),
                score: AppComponent.initialEditedStudent.score
            });
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
        const day = String(AppComponent.initialEditedStudent.dob.getDate() + 1);
        const month = String(AppComponent.initialEditedStudent.dob.getMonth() + 1);
        const year = AppComponent.initialEditedStudent.dob.getFullYear();
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
            AppComponent.editedStudent.sname = control.value.fullName.sname;
            AppComponent.editedStudent.fname = control.value.fullName.fname;
            AppComponent.editedStudent.mname = control.value.fullName.mname;
            AppComponent.editedStudent.dob = new Date(control.value.dob);
            AppComponent.editedStudent.score = control.value.score;
            AppComponent.confirmEdit = 1;
            AppComponent.formEdit = 0;
            this.errorSubmit = false;
            this.isWrite = 0;
            return null;
        }
        this.errorSubmit = true;
        return null;
    }
    hideEdition(): number {
        return AppComponent.formEdit;
    }
    cancel(): void {
        this.errorSubmit = false;
        this.isWrite = 0;
        AppComponent.formEdit = 0;
    }
}
