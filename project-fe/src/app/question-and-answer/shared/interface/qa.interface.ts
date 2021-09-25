export interface QAModel {
    _id: string,
    studentID: string,
    studentName: string,
    professorID: string,
    professorName: string,
    question: string,
    answer: string,
    isAnswered: boolean
}

export interface Answer {
    questionID: string,
    professorID: string,
    professorName: string,
    answer: string,
    isAnswered: boolean
}

