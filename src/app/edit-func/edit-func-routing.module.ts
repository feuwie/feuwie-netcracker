import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditFuncComponent } from "./edit-func.component";

const routes: Routes = [
    {
        path: "",
        component: EditFuncComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})

export class EditFuncRoutingModule { }
