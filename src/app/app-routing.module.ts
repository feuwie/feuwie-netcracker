import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddGuard } from "./add.guard";
import { NoPermComponent } from "./no-perm/no-perm.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
    {
        path: "add",
        loadChildren: "./add-func/add-func.module#AddFuncModule",
        canActivate: [AddGuard],
    },
    {
        path: "login",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "register",
        redirectTo: "",
        pathMatch: "full"
    },
    { path: "permission", component: NoPermComponent },
    { path: "404", component: NotFoundComponent },
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    { path: "**", redirectTo: "/404" },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [AddGuard],
})

export class AppRoutingModule { }
