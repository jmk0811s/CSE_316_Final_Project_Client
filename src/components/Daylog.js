import React, {useEffect, useState} from 'react'
import Question from "./Question";
import {
    createDaylogAPIMethod,
    createQuestionAPIMethod,
    getCurrentUserAPIMethod,
    getDaylogsAPIMethod,
    getQuestionsByDaylogIdAPIMethod
} from "../api/client";

function Daylog(props) {
    const [editMode, setEditMode] = useState(false);
    const [daylogs, setDaylogs] = useState([]);
    const [currDaylog, setCurrDaylog] = useState({});
    const [currQuestions, setCurrQuestions] = useState([]);
    const [currDate, setCurrDate] = useState();
    const [currDaylogIndex, setCurrDayLogIndex] = useState();

    //Initialize states
    useEffect(() => {
        setDaylogs(props.daylogs);
        setEditMode(props.editMode);
    }, [props]);

    useEffect(() => {
        if (daylogs != undefined && daylogs.length != 0) {
            setDaylogs(daylogs);
            setCurrDaylog(daylogs[0]);
            setCurrDate(dateToString(new Date(daylogs[0].date)));
            setCurrDayLogIndex(0);
            getQuestionsByDaylogIdAPIMethod(daylogs[0]._id).then((questions) => {
                setCurrQuestions(sortQuestionsByDate(questions));
            });
        }
    }, [daylogs]);

    const previous = () =>{
        if(currDaylogIndex+1 < daylogs.length) {
            setCurrDaylog(daylogs[currDaylogIndex + 1]);
            setCurrDate(dateToString(new Date(daylogs[currDaylogIndex + 1].date)));
            getQuestionsByDaylogIdAPIMethod(daylogs[currDaylogIndex + 1]._id).then((questions) => {
                setCurrQuestions(sortQuestionsByDate(questions));
                setCurrDayLogIndex(currDaylogIndex + 1);
            });
        }
    }

    const next = () => {

    }

    const prev = () => {

    }

    const dateToString = (date) => {
        return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
    }

    const sortQuestionsByDate = (list) => {
        return list.sort((a, b) => new Date(a.mdate) - new Date(b.mdate));
    }

    const populateQuestions = () => {
        let questions = [
            {
                type: 'Text',
                header: 'Sample Question 1 (Text type)',
                answer: {
                    text: 'Sample answer 1'
                },
                mdate: new Date("2021-12-01"),
                daylog: currDaylog._id
            },
            {
                type: 'Number',
                header: 'Sample Question 2 (Number type)',
                answer: {
                    number: 2
                },
                mdate: new Date("2021-12-02"),
                daylog: currDaylog._id
            },
            {
                type: 'Boolean',
                header: 'Sample Question 3 (Boolean type)',
                answer: {
                    boolean: true
                },
                mdate: new Date("2021-12-03"),
                daylog: currDaylog._id
            },
            {
                type: 'MultipleChoice',
                header: 'Sample Question 4 (MultipleChoice type)',
                answer: {
                    boolean: true
                },
                mdate: new Date("2021-12-04"),
                daylog: currDaylog._id
            }
        ];

        for (let i = 0; i < 4; i++) {
            createQuestionAPIMethod(questions[i]).then((question) => {
                console.log(question + " " + (i + 1) + " added.");
            });
        }
        setCurrQuestions(questions);
    }

    return (
        currDate? (
                <div>
                    <div className="LogSelectionBar" style={{display: "flex", justifyContent: "space-between"}}>
                        <button onClick={prev}>
                            <h2>{"<"}</h2>
                        </button>
                        <h2>
                            {currDate}
                        </h2>
                        <button onClick={next}>
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
                                            header = {question.header}
                                            answer = {question.answer}
                                            mdate = {question.mdate}
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
