export class Student {
    fname: string;
    sname: string;
    mname: string;
    dob: Date;
    score: number;
    constructor(sname: string, fname: string, mname: string, dob: Date, score: number) {
        this.sname = sname;
        this.fname = fname;
        this.mname = mname;
        this.dob = dob;
        this.score = score;
    }
}
