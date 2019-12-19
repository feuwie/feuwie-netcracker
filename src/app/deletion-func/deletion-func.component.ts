import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EditFuncComponent } from "../edit-func/edit-func.component";

@Component({
    selector: "app-deletion-func",
    templateUrl: "./deletion-func.component.html",
    styleUrls: ["./deletion-func.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletionFuncComponent extends EditFuncComponent implements OnInit {

    @Input() formDelInput: number;
    @Output() cDeleteEvent = new EventEmitter();
    @Output() fDeleteEvent = new EventEmitter();

    confirmDelete: number;

    submit(): void {
        this.cDeleteEvent.emit(
            this.confirmDelete = 1,
        );
        this.cancel();
    }

    cancel(): void {
        this.fDeleteEvent.emit(
            this.formDelInput = 0,
        );
    }

    hideDeletion(): number {
        return this.formDelInput;
    }
}
