import React, {useState, useEffect} from 'react'
import Question from "./Question";
import {nanoid} from 'nanoid'
import {sortByDate} from "../utils/HelperFunctions";
import {
    createQuestionAPIMethod,
    deleteQuestionByIdAPIMethod,
    getQuestionsAPIMethod,
    updateQuestionAPIMethod,
    deleteResponseByIdAPIMethod
} from "../api/client";

function EditQuestions(props){
    const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);

    useEffect(() => {
        setQuestions(props.questions);
        setResponses(props.responses);
    }, [props.questions, props.responses]);

    const handleSubmit = () => {
        getQuestionsAPIMethod().then((dbQuestions) => {
            console.log(questions);
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].status === 'ADDED') {
                    console.log("question added");
                    questions[i].status = '';
                    createQuestionAPIMethod(questions[i]);
                }
                for (let j = 0; j < dbQuestions.length; j++) {
                    let id = dbQuestions[j]._id;
                    if (dbQuestions[j].nanoid === questions[i].nanoid) {
                        if (questions[i].status === 'DELETED' && dbQuestions[j]._id !== undefined) {
                            console.log("question deleted");
                            deleteQuestionByIdAPIMethod(id);
                            for (let k = 0; k < responses.length; k++) {
                                if (responses[k].question === id) {
                                    console.log("res deleted@@@@@");
                                    deleteResponseByIdAPIMethod(responses[k]._id);
                                }
                            }
                        }
                        else {
                            console.log("question updated");
                            let newQuestion = {
                                _id: dbQuestions[j]._id,
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
        });
        let newQuestions = questions.filter((question) => question.status !== 'DELETED');
        props.setQuestions(sortByDate(newQuestions));
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
        let newQuestions = [...questions];
        newQuestions.push(newQuestion);
        setQuestions(newQuestions);
        //console.log("added: " + id);
    }

    const deleteQuestion = (nanoid) => {
        let newQuestions = [...questions];
        for (let i = 0; i < newQuestions.length; i++) {
            if (newQuestions[i].nanoid === nanoid) {
                newQuestions[i].status = 'DELETED';
                //console.log("deleted: " + nanoid);
            }
        }
        setQuestions(newQuestions);
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
                    questions.filter((question) => question.status !== 'DELETED').map((question) =>
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
                            />
                        </li>
                    )
                    : <></>
            }
            <div className="SubmitButton">
                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}
export default EditQuestions