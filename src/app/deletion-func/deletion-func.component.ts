import { Component } from "@angular/core";
import { AppComponent } from "../app.component";
import { EditFuncComponent } from "../edit-func/edit-func.component";

@Component({
    selector: "app-deletion-func",
    templateUrl: "./deletion-func.component.html",
    styleUrls: ["./deletion-func.component.less"],
})
export class DeletionFuncComponent extends EditFuncComponent {
    hideDeletion(): number {
        return AppComponent.formDelete;
    }
    submit(): void {
        AppComponent.confirmDelete = 1;
        this.cancel();
    }
    cancel(): void {
        AppComponent.formDelete = 0;
    }
}
