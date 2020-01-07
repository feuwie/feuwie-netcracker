import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AddFuncModule } from "./add-func/add-func.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth.service";
import { DeletionFuncModule } from "./deletion-func/deletion-func.module";
import { EditFuncModule } from "./edit-func/edit-func.module";
import { FilterChooseDirective } from "./filterchoose.directive";
import { HighlightDirective } from "./highlight.directive";
import { NoPermComponent } from "./no-perm/no-perm.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PerformPipe } from "./perform.pipe";
import { SexPipe } from "./sex.pipe";
import { ChangeTextDirective } from "./textcolor.directive";

@NgModule({
    declarations: [
        AppComponent,
        HighlightDirective,
        ChangeTextDirective,
        FilterChooseDirective,
        PerformPipe,
        SexPipe,
        NotFoundComponent,
        NoPermComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        EditFuncModule,
        DeletionFuncModule,
        AddFuncModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
