import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { EditFuncComponent } from "../edit-func/edit-func.component";
import { Student } from "../student";

@Component({
    selector: "app-add-func",
    templateUrl: "./add-func.component.html",
    styleUrls: ["./add-func.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFuncComponent extends EditFuncComponent implements OnInit {

    @Input() formAddInput: number;
    @Output() addEvent = new EventEmitter<Student>();
    @Output() fAddEvent = new EventEmitter<number>();
    @Output() cAddEvent = new EventEmitter<number>();

    confirmAdd: number;

    onSubmit(control: FormControl): void {
        if (control.valid) {
            this.addEvent.emit({
                sname: control.value.fullName.sname,
                fname: control.value.fullName.fname,
                mname: control.value.fullName.mname,
                dob: new Date(control.value.dob),
                score: control.value.score
            });
            this.studentForm.reset();
            this.cAddEvent.emit(
                this.confirmAdd = 1,
            );
            this.fAddEvent.emit(
                this.formAddInput = 0,
            );
            this.errorSubmit = false;
            this.isWrite = 0;
            this.router.navigate([""]);
            return null;
        }
        this.errorSubmit = true;
        return null;
    }

    hideAddition(): number {
        return this.formAddInput;

    }

    cancel(): void {
        this.errorSubmit = false;
        this.isWrite = 0;
        this.fAddEvent.emit(
            this.formAddInput = 0,
        );
    }
}
