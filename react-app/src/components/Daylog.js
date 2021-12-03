import React, {useEffect, useState} from 'react'
import Question from "./Question";
import {
    createQuestionAPIMethod,
    getCurrentUserAPIMethod,
    getDaylogsAPIMethod,
    getQuestionsByDaylogIdAPIMethod
} from "../api/client";

function Daylog(props){
    const [daylogs, setDaylogs] = useState([]);
    const [currDaylog, setCurrDaylog] = useState({});
    const [currQuestions, setCurrQuestions] = useState([]);
    const [currDate, setCurrDate] = useState();

    useEffect(() => {
        setDaylogs(props.daylogs);
    }, [props.daylogs]);

    useEffect(() => {
        if (daylogs != undefined && daylogs.length != 0) {
            setDaylogs(daylogs);
            setCurrDaylog(daylogs[0]);
            setCurrDate(dateToString(new Date(daylogs[0].date)));
            getQuestionsByDaylogIdAPIMethod(daylogs[0]._id).then((questions) => {
                setCurrQuestions(questions);
            });
        }
    }, [daylogs]);

    const dateToString = (date) => {
        return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
    }

    const populateQuestions = () => {
        let questions = [
            {
                type: 'Text',
                header: 'Sample Question 1',
                answer: {
                    text: 'Sample answer 1'
                },
                daylog: currDaylog._id
            },
            {
                type: 'Number',
                header: 'Sample Question 2',
                answer: {
                    number: 2
                },
                daylog: currDaylog._id
            },
            {
                type: 'Boolean',
                header: 'Sample Question 3',
                answer: {
                    boolean: true
                },
                daylog: currDaylog._id
            }
        ];

        for (let i = 0; i < 3; i++) {
            createQuestionAPIMethod(questions[i]).then((question) => {
                console.log(question + " " + (i + 1) + " added.");
            });
        }
    }

    return (
        currDate? (
                <div>
                    <div className="LogSelectionBar" style={{display: "flex", justifyContent: "space-between"}}>
                        <button>
                            <h2>{"<"}</h2>
                        </button>
                        <h2>
                            {currDate}
                        </h2>
                        <button>
                            <h2>{">"}</h2>
                        </button>
                    </div>
                    <div>
                        {
                            currQuestions.length != 0 ?
                                (currQuestions.map((question) =>
                                    <li style={{listStyle: "none",padding: "5px"}}>
                                        <Question
                                            type = {question.type}
                                            header = {question.text}
                                            answer = {question.answer}
                                            date = {currDate}
                                            editMode = {false}
                                        />
                                    </li>
                                ))
                                :
                                <></>
                        }
                    </div>
                    <div className="SubmitButton" >
                        <button>Submit</button>
                    </div>

                    <button onClick={populateQuestions}>
                        test
                    </button>


                </div>):
                <></>
    );
}
export default Daylog
