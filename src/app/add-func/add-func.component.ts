import { Component, DoCheck } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Add } from "../add";
import { EditFuncComponent } from "../edit-func/edit-func.component";

@Component({
    selector: "app-add-func",
    templateUrl: "./add-func.component.html",
    styleUrls: ["./add-func.component.less"]
})
export class AddFuncComponent extends EditFuncComponent implements DoCheck {
    ngDoCheck(): number {
        if (Add.formAdd && !this.isWrite) {
            this.isWrite = 1;
            this.studentForm = new FormGroup({
                fullName: new FormGroup({
                    sname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                    fname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/), this.nameValidator]),
                    mname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                }),
                dob: new FormControl("", [Validators.required, this.dateValidator]),
                score: new FormControl("", [Validators.required, Validators.pattern("(5|([1-4]+(.[1-9])?))")])
            });
            return 1;
        }
    }

    onSubmit(control: FormControl): void {
        if (control.valid) {
            Add.addedStudent.sname = control.value.fullName.sname;
            Add.addedStudent.fname = control.value.fullName.fname;
            Add.addedStudent.mname = control.value.fullName.mname;
            Add.addedStudent.dob = new Date(control.value.dob);
            Add.addedStudent.score = control.value.score;
            Add.confirmAdd = 1;
            Add.formAdd = 0;
            this.errorSubmit = false;
            this.isWrite = 0;
            return null;
        }
        this.errorSubmit = true;
        return null;
    }

    hideAddition(): number {
        return Add.formAdd;
    }

    cancel(): void {
        this.errorSubmit = false;
        this.isWrite = 0;
        Add.formAdd = 0;
    }
}
