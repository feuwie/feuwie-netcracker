import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddFuncComponent } from "./add-func.component";

const routes: Routes = [
    {
        path: "",
        component: AddFuncComponent
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

export class AddFuncRoutingModule { }
