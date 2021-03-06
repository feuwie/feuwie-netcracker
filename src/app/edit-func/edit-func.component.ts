import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Student } from "../student";

@Component({
    selector: "app-edit-func",
    templateUrl: "./edit-func.component.html",
    styleUrls: ["./edit-func.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditFuncComponent implements OnInit {
    studentForm: FormGroup;
    isWrite = 0;
    errorSubmit = false;

    constructor(public router: Router) {}

    @Input() stud: Student;
    @Input() formEditInput: number;
    @Output() editEvent = new EventEmitter<Student>();
    @Output() cEditEvent = new EventEmitter<number>();
    @Output() fEditEvent = new EventEmitter<number>();

    confirmEdit: number;

    ngOnInit(): void {
        this.studentForm = new FormGroup({
            fullName: new FormGroup({
                sname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
                fname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/), this.nameValidator]),
                mname: new FormControl("", [Validators.required, Validators.pattern(/^[А-Я].*$/)]),
            }),
            dob: new FormControl(new Date(), [Validators.required, this.dateValidator]),
            score: new FormControl("", [Validators.required, Validators.pattern("(5|([1-4]+(.[1-9])?))")])
        });
    }

    studForm(): void {
        if (this.formEditInput && !this.isWrite) {
            this.isWrite = 1;
            this.studentForm.patchValue({
                fullName: {
                    sname: this.stud.sname,
                    fname: this.stud.fname,
                    mname: this.stud.mname
                },
                dob: this.formatDate(),
                score: this.stud.score
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
        const day = String(this.stud.dob.getDate() + 1);
        const month = String(this.stud.dob.getMonth() + 1);
        const year = this.stud.dob.getFullYear();
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
            this.editEvent.emit({
                sname: control.value.fullName.sname,
                fname: control.value.fullName.fname,
                mname: control.value.fullName.mname,
                dob: new Date(control.value.dob),
                score: control.value.score
            });
            console.log(this.editEvent);
            this.cEditEvent.emit(
                this.confirmEdit = 1,
            );
            this.fEditEvent.emit(
                this.formEditInput = 0,
            );
            this.errorSubmit = false;
            this.isWrite = 0;
            return null;
        }
        this.errorSubmit = true;
        return null;
    }
    hideEdition(): number {
        return this.formEditInput;
    }
    cancel(): void {
        this.errorSubmit = false;
        this.isWrite = 0;
        this.fEditEvent.emit(
            this.formEditInput = 0,
        );
    }
}
