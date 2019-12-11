import { Component } from "@angular/core";
import { Add } from "./add";
import { Student } from "./student";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"]
})

export class AppComponent {
    check: boolean;
    sname: string;
    fname: string;
    avg: string;
    yearbd: string;
    afilter: string;
    dobfilter: string;
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

    deletionStudent(stud: Student): number {
        for (const [i, stude] of this.students.entries()) {
            let check = 0;
            if (stud.sname === stude.sname && stud.fname === stude.fname && stud.mname === stude.mname && stud.dob === stude.dob && stud.score === stude.score) {
                check = 1;
            }
            if (check === 1) {
                check = 0;
                this.students.splice(i, 1);
                return 1;
            }
        }
        return 0;
    }

    editionStudent(stud: Student, stud2: Student): number {
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
                return 1;
            }
        }
        return 0;
    }

    additionStudent(stud: Student): number {
        this.students[this.students.length] = new Student(stud.sname, stud.fname, stud.mname, stud.dob, stud.score);
        return 1;
    }

    deletionPopup(stud: Student): number {
        Add.deletedStudent = new Student(stud.sname, stud.fname, stud.mname, stud.dob, stud.score);
        Add.formDelete = 1;
        return 1;
    }

    editionPopup(stud: Student): number {
        Add.initialEditedStudent = new Student(stud.sname, stud.fname, stud.mname, stud.dob, stud.score);
        Add.formEdit = 1;
        return 1;
    }

    additionPopup(): number {
        Add.formAdd = 1;
        return 1;
    }

    checkAll(): number {
        if (Add.confirmDelete === 1) {
            Add.confirmDelete = 0;
            this.deletionStudent(Add.deletedStudent);
        }
        if (Add.confirmEdit === 1) {
            Add.confirmEdit = 0;
            this.editionStudent(Add.initialEditedStudent, Add.editedStudent);
        }
        if (Add.confirmAdd === 1) {
            Add.confirmAdd = 0;
            this.additionStudent(Add.addedStudent);
        }
        return 1;
    }

    backHide(): number {
        return Add.formDelete || Add.formEdit || Add.formAdd;
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
        return this.dobfilter !== undefined ? ndate === this.dobfilter : ndate >= "";
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