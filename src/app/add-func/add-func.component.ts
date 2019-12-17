import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppComponent } from "../app.component";
import { EditFuncComponent } from "../edit-func/edit-func.component";

@Component({
    selector: "app-add-func",
    templateUrl: "./add-func.component.html",
    styleUrls: ["./add-func.component.less"]
})
export class AddFuncComponent extends EditFuncComponent implements OnInit {

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

    onSubmit(control: FormControl): void {
        if (control.valid) {
            AppComponent.addedStudent.sname = control.value.fullName.sname;
            AppComponent.addedStudent.fname = control.value.fullName.fname;
            AppComponent.addedStudent.mname = control.value.fullName.mname;
            AppComponent.addedStudent.dob = new Date(control.value.dob);
            AppComponent.addedStudent.score = control.value.score;
            AppComponent.confirmAdd = 1;
            AppComponent.formAdd = 0;
            this.errorSubmit = false;
            this.isWrite = 0;
            return null;
        }
        this.errorSubmit = true;
        return null;
    }

    hideAddition(): number {
        return AppComponent.formAdd;
    }

    cancel(): void {
        this.errorSubmit = false;
        this.isWrite = 0;
        AppComponent.formAdd = 0;
    }
}
