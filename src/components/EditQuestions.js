import React, {useState, useEffect} from 'react'
import Question from "./Question";
import {nanoid} from 'nanoid'
import {sortByDate} from "../utils/HelperFunctions";
import {
    createQuestionAPIMethod,
    deleteQuestionByIdAPIMethod,
    getQuestionsAPIMethod,
    updateQuestionAPIMethod,
    deleteResponseByIdAPIMethod, getResponsesAPIMethod
} from "../api/client";

function EditQuestions(props){
    const [dbQuestions, setDBQuestions] = useState([]);
    const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);

    useEffect(() => {
        getQuestionsAPIMethod().then((questions) => {
            setDBQuestions(sortByDate(questions));
            setQuestions(sortByDate(questions));
        });
        getResponsesAPIMethod().then((responses) => {
            setResponses(responses);
        });
    }, []);

    const handleSubmit = () => {
        console.log("DB questions: ");
        console.log(dbQuestions);
        console.log("local questions: ");
        console.log(questions);

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].status === 'ADDED') {
                console.log("ADDED");
                questions[i].status = '';
                createQuestionAPIMethod(questions[i]);
            }
            for (let j = 0; j < dbQuestions.length; j++) {
                if (dbQuestions[j].nanoid === questions[i].nanoid) {
                    if (questions[i].status === 'DELETED' && dbQuestions[j]._id !== undefined) {
                        console.log("DELETED");
                        deleteQuestionByIdAPIMethod(dbQuestions[j]._id);
                        for (let k = 0; k < responses.length; k++) {
                            if (responses[k].question === dbQuestions[j]._id) {
                                console.log("res deleted@@@@@");
                                deleteResponseByIdAPIMethod(responses[k]._id);
                            }
                        }
                    }
                    else {
                        console.log("UPDATED");
                        let newQuestion = {
                            _id: questions[i]._id,
                            type: questions[i].type,
                            header: questions[i].header,
                            choices: questions[i].choices,
                            mdate: questions[i].mdate,
                            nanoid: questions[i].nanoid,
                            creator: questions[i].creator
                        }
                        updateQuestionAPIMethod(newQuestion);
                    }
                }
            }
        }
        let newQuestions = questions.filter((question) => question.status !== 'DELETED');
        props.setQuestions(sortByDate(newQuestions));
        console.log("submit completed");
        console.log(newQuestions);
    }

    const addQuestion = () => {
        let id = nanoid();
        let newQuestion = {
            type: 'Text',
            header: '',
            choices: [],
            mdate: new Date(),
            nanoid: id,
            status: 'ADDED'
        }
        let newQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            newQuestions.push(questions[i]);
        }
        newQuestions.push(newQuestion);
        setQuestions(sortByDate(newQuestions));
        console.log("question added - edit questions page");
        console.log(newQuestions);
    }

    const deleteQuestion = (nanoid) => {
        let newQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            newQuestions.push(questions[i]);
            if (questions[i].nanoid === nanoid) {
                questions[i].status = 'DELETED';
                newQuestions.push(questions[i]);
            }
        }
        setQuestions(newQuestions);
        console.log("question deleted - edit questions page");
        console.log(newQuestions);
    }

    const updateQuestion = (newValue, field, index) => {
        let newQuestions = [];
        console.log(questions);
        for (let i = 0; i < questions.length; i++) {
            newQuestions.push(questions[i]);
        }
        if (field === 'type') {
            newQuestions[index].type = newValue;
        }
        else if (field === 'header') {
            newQuestions[index].header = newValue;
        }
        else if (field === 'multiple_choice') {
            console.log(newValue);
            console.log(index);
            newQuestions[index].choices = newValue;
        }
        setQuestions(newQuestions);
        console.log(newQuestions);
    }

    return (
        <div className="EditQuestions">
            <div style={{width: "80%",margin: "auto",display: "flex", justifyContent: "space-between"}}>
                <h3>Edit Questions</h3>
                <button onClick={addQuestion} style={{background: "transparent", border: "none"}}>
                    <span  className="material-icons">add_circle_outline</span>
                </button>
            </div>
            {
                questions ?
                    questions.filter((question) => question.status !== 'DELETED').map((question, i) =>
                        <li className="question-wrapper" style={{listStyle: "none", padding: "5px"}}>
                            <Question
                                editMode={true}
                                readOnly={false}
                                type={question.type}
                                header={question.header}
                                choices={question.choices}
                                mdate={question.mdate}
                                nanoid={question.nanoid}
                                questions={questions}
                                setQuestions={setQuestions}
                                responses={props.responses.filter((res) => res.question === question._id)}
                                deleteQuestion={deleteQuestion}
                                updateQuestion={updateQuestion}
                                index={i}
                            />
                        </li>
                    )
                    : <></>
            }
            <div className="SubmitButton" style={{marginBottom:"50px", marginTop:"10px"}}>
                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}
export default EditQuestions