import { Component } from "@angular/core";
import { Add } from "../add";

@Component({
    selector: "app-deletion-func",
    templateUrl: "./deletion-func.component.html",
    styleUrls: ["./deletion-func.component.less"],
})
export class DeletionFuncComponent {
    hideDeletion(): number {
        return Add.formDelete;
    }
    submit(): void {
        Add.confirmDelete = 1;
        this.cancel();
    }
    cancel(): void {
        Add.formDelete = 0;
    }
}
