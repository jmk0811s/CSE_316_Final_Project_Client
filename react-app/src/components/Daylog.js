import React, {useEffect, useState} from 'react'
import Question from "./Question";
import {getCurrentUserAPIMethod, getDaylogsAPIMethod, getQuestionsByDaylogIdAPIMethod} from "../api/client";

function Daylog(props){
    const [daylogs, setDaylogs] = useState({});
    const [currDaylog, setCurrDaylog] = useState({});
    const [currQuestions, setCurrQuestions] = useState([]);
    const [selectedDate, setSelectedDate] = useState();

    useEffect(() => {
        getDaylogsAPIMethod().then((daylogs) => {
            setDaylogs(daylogs);
            setCurrDaylog(daylogs[0]);
            setCurrQuestions(getQuestionsByDaylogIdAPIMethod(daylogs[0]));
            setSelectedDate(dateToString(new Date(daylogs[0].date)));
        })
    }, [props.daylogs]);

    const dateToString = (date) => {
        return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
    }

    return (
        selectedDate? (
                <div>
                    <div className="LogSelectionBar" style={{display: "flex", justifyContent: "space-between"}}>
                        <button>
                            <h2>{"<"}</h2>
                        </button>
                        <h2>
                            {selectedDate}
                        </h2>

                        <button>
                            <h2>{">"}</h2>
                        </button>
                    </div>
                    <div>
                        {currDaylog.qSet ? (currDaylog.qSet.map((question)=>
                            <li style={{listStyle: "none",padding: "5px"}}>
                                <Question qText = {question.qText}
                                          qType = {question.qType}
                                          qDate = {question.qDate}
                                          qChoices = {question.qChoices}
                                          editMode = {false}
                                />
                            </li>
                        )):<></>}
                    </div>
                    <div className="SubmitButton" >
                        <button>Submit</button>
                    </div>


                </div>):
                <></>
    );
}
export default Daylog
