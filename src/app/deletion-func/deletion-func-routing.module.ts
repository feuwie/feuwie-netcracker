import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeletionFuncComponent } from "./deletion-func.component";

const routes: Routes = [
    {
        path: "",
        component: DeletionFuncComponent
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

export class DeletionFuncRoutingModule {}
