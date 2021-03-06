import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Student } from "./student";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit, DoCheck {
    confirmEdit: number;
    formEdit: number;
    confirmAdd: number;
    formAdd: number;
    formDelete: number;
    confirmDelete: number;
    check: boolean;
    sname: string;
    fname: string;
    avg: string;
    yearbd: string;
    afilter: string;
    dobfilter: string;
    info: Student;
    deletedStudent: Student;
    addedStudent: Student;
    initialEditedStudent: Student;
    editedStudent: Student;
    comeForm: FormGroup;
    errorSubmit: boolean = false;
    log: number = 0;
    reg: number = 0;
    date = new Date();

    constructor(public authS: AuthService, public router: Router) {
    }

    students: Student[] = [
        {
            sname: "Иванова",
            fname: "Анна",
            mname: "Дмитриевна",
            dob: new Date("01/20/2000"),
            score: 1
        },
        {
            sname: "Еремина",
            fname: "Кристина",
            mname: "Владимировна",
            dob: new Date("10/11/2004"),
            score: 5
        },
        {
            sname: "Чистяков",
            fname: "Артем",
            mname: "Вячеславович",
            dob: new Date("05/14/2000"),
            score: 2.2
        },
        {
            sname: "Ильичев",
            fname: "Максим",
            mname: "Данилович",
            dob: new Date("05/03/2000"),
            score: 3.1
        },
        {
            sname: "Белов",
            fname: "Илья",
            mname: "Сергеевич",
            dob: new Date("03/15/2000"),
            score: 2.4
        },
        {
            sname: "Чехов",
            fname: "Павел",
            mname: "Львович",
            dob: new Date("11/02/2000"),
            score: 1.7
        },
    ];

    ngOnInit(): void {
        this.comeForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-z].*$/)]),
            passConf: new FormControl("", [Validators.required, this.passValidator])
        });
    }


    public passValidator = (control: FormControl) => {
        if (this.comeForm) {
            if (control.value !== this.comeForm.value.password) {
                return { passInvalid: true };
            }
            return null;
        }
    };

    valide(control: string): boolean {
        const contr = this.comeForm.controls[control];
        const result = contr.invalid && contr.touched;
        return result;
    }

    ngDoCheck(): void {
        if (this.router.url === "/add") {
            this.formAdd = 1;
        }
    }

    blockReg(): void {
        document.getElementById("log").style.display = "none";
        document.getElementById("reg").style.display = "none";
        this.errorSubmit = false;
        this.log = 1;
    }

    blockAuth(): void {
        document.getElementById("log").style.display = "none";
        document.getElementById("reg").style.display = "none";
        this.errorSubmit = false;
        this.reg = 1;
    }

    auth(): number {
        return this.log;
    }

    end(): number {
        return this.reg;
    }

    checku(control: FormControl): void {
        this.errorSubmit = false;
        if (control.valid) {
            this.authS.registerUser(control.value)
                .subscribe(
                    res => {
                        localStorage.setItem("token", res["token"]);
                    },
                    err => console.log(err),
                );
            this.reg = 0;
            this.errorSubmit = false;
            this.comeForm.reset();
        }
        if (!control.valid) {
            this.errorSubmit = true;
        }
    }

    checke(control: FormControl): void {
        this.comeForm.controls.passConf.setErrors(null);
        if (control.valid) {
            this.authS.loginUser(control.value)
                .subscribe(
                    res => {
                        localStorage.setItem("token", res["token"]);
                    },
                    err => {
                        this.backClicked();
                        console.log("Пользователя не существует!");
                    },
                );
            this.log = 0;
            this.errorSubmit = false;
            this.comeForm.reset();
        }
        if (!control.valid) {
            this.errorSubmit = true;
        }
    }

    cDelete(event: number): void {
        this.confirmDelete = event;
    }

    fDelete(event: number): void {
        this.formDelete = event;
    }

    cEdit(event: number): void {
        this.confirmEdit = event;
    }

    fEdit(event: number): void {
        this.formEdit = event;
    }

    fAdd(event: number): void {
        this.formAdd = event;
    }

    cAdd(event: number): void {
        this.confirmAdd = event;
    }

    addOut(event: Student): void {
        this.addedStudent = event;
    }

    editOut(event: Student): void {
        this.editedStudent = event;
    }

    backClicked(): void {
        document.getElementById("log").style.display = "inline-block";
        document.getElementById("reg").style.display = "inline-block";
        this.log = 0;
        this.reg = 0;
        this.comeForm.reset();
    }

    formatDate(date: Date): string {
        const monthNames = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
        ];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return day + " " + monthNames[monthIndex] + " " + year + " года";
    }

    deletionStudent(stud: Student): void {
        for (const [i, stude] of this.students.entries()) {
            let check = 0;
            if (stud.sname === stude.sname && stud.fname === stude.fname && stud.mname === stude.mname && stud.dob === stude.dob && stud.score === stude.score) {
                check = 1;
            }
            if (check === 1) {
                check = 0;
                this.students.splice(i, 1);
            }
        }
    }

    editionStudent(stud: Student, stud2: Student): void {
        for (const stude of this.students) {
            let check = 0;
            if (stud.sname === stude.sname && stud.fname === stude.fname && stud.mname === stude.mname && stud.dob === stude.dob && stud.score === stude.score) {
                check = 1;
            }
            if (check === 1) {
                check = 0;
                stude.sname = stud2.sname;
                stude.fname = stud2.fname;
                stude.mname = stud2.mname;
                stude.dob = stud2.dob;
                stude.score = stud2.score;
            }
        }
    }

    additionStudent(stud: Student): void {
        this.students[this.students.length] = new Student(stud.sname, stud.fname, stud.mname, stud.dob, stud.score);
    }

    deletionPopup(stud: Student): void {
        if (localStorage.token === undefined) {
            this.router.navigate(["/permission"]);
        } else {
            this.deletedStudent = new Student(stud.sname, stud.fname, stud.mname, stud.dob, stud.score);
            this.formDelete = 1;
        }
    }

    editionPopup(stud: Student): void {
        if (localStorage.token === undefined) {
            this.router.navigate(["/permission"]);
        } else {
            this.initialEditedStudent = new Student(stud.sname, stud.fname, stud.mname, stud.dob, stud.score);
            this.formEdit = 1;
            this.info = this.initialEditedStudent;
        }
    }

    additionPopup(): void {
        if (localStorage.token === undefined) {
            this.router.navigate(["/permission"]);
        } else {
            this.router.navigate(["/add"]);
            this.formAdd = 1;
        }
    }

    checkAll(): number {
        if (this.confirmDelete === 1) {
            this.confirmDelete = 0;
            this.deletionStudent(this.deletedStudent);
        }
        if (this.confirmEdit === 1) {
            this.confirmEdit = 0;
            this.editionStudent(this.initialEditedStudent, this.editedStudent);
        }
        if (this.confirmAdd === 1) {
            this.confirmAdd = 0;
            this.additionStudent(this.addedStudent);
        }
        return 1;
    }

    backHide(): number {
        return this.formDelete || this.formEdit || this.formAdd;
    }

    searchSt(snamee?: string, fnamee?: string): boolean {
        if (this.sname === snamee) {
            return true;
        }
        if (this.fname === fnamee) {
            return true;
        }
    }

    searchSc(mark?: number): boolean {
        if (mark < 3 && this.check === true) {
            return true;
        }
    }

    filterScore(): void {
        this.afilter = this.avg;
    }

    filterDOB(): void {
        this.dobfilter = this.yearbd;
    }

    filterScoreF(score: number): boolean {
        return score >= (this.afilter || 1);
    }

    filterDOBF(date: Date, score: number): boolean {
        const ndate = this.formatDate(date);
        return (this.dobfilter === undefined || this.dobfilter === "") ? ndate >= "" : ndate === this.dobfilter;
    }

    sort(n: number): void {
        const enum Study {
            SurnameDesc = 1,
            SurnameAsc,
            NameDesc,
            NameAsc,
            PatronymicDesc,
            PatronymicAsc,
            DateOfBirthDayDesc,
            DateOfBirthDayAsc,
            MarksDesc,
            MarksAsc
        }
        const len: number = this.students.length;
        let max: number;
        let temp: Student = new Student("", "", "", new Date(), 0);
        for (const [i, stud] of this.students.entries()) {
            max = 0;
            temp = stud;
            for (let j = i; j < len; j++) {
                switch (n) {
                    case Study.SurnameDesc:
                        if (temp.sname > this.students[j].sname) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                    case Study.SurnameAsc:
                        if (temp.sname < this.students[j].sname) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                    case Study.NameDesc:
                        if (temp.fname > this.students[j].fname) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                    case Study.NameAsc:
                        if (temp.fname < this.students[j].fname) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                    case Study.PatronymicDesc:
                        if (temp.mname > this.students[j].mname) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                    case Study.PatronymicAsc:
                        if (temp.mname < this.students[j].mname) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                    case Study.DateOfBirthDayDesc:
                        if (temp.dob < this.students[j].dob) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                    case Study.DateOfBirthDayAsc:
                        if (temp.dob > this.students[j].dob) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                    case Study.MarksDesc:
                        if (temp.score < this.students[j].score) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                    case Study.MarksAsc:
                        if (temp.score > this.students[j].score) {
                            temp = this.students[j];
                            max = j;
                        }
                        break;
                }
            }
            if (max !== 0) {
                this.students[max] = this.students[i];
                this.students[i] = temp;
            }
        }
    }
}
