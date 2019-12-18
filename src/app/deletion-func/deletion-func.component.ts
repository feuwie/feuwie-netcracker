import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { AppComponent } from "../app.component";
import { EditFuncComponent } from "../edit-func/edit-func.component";
import { Student } from "../student";

@Component({
    selector: "app-deletion-func",
    templateUrl: "./deletion-func.component.html",
    styleUrls: ["./deletion-func.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletionFuncComponent extends EditFuncComponent implements OnInit {
    @Input() stud: Student;

    submit(): void {
        AppComponent.confirmDelete = 1;
        this.cancel();
    }

    cancel(): void {
        AppComponent.formDelete = 0;
    }

    hideDeletion(): number {
        return AppComponent.formDelete;
    }
}
