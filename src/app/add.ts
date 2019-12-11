import { Student } from "./student";

export class Add {
    static formDelete = 0;
    static formEdit = 0;
    static formAdd = 0;
    static confirmDelete = 0;
    static confirmEdit = 0;
    static confirmAdd = 0;
    static deletedStudent = new Student("", "", "", null, 1);
    static editedStudent = new Student("", "", "", null, 1);
    static initialEditedStudent = new Student("1", "1", "1", null, 1);
    static addedStudent = new Student("", "", "", null, 1);
}
