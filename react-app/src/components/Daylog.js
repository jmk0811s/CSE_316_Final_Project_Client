import React, {useEffect, useState} from 'react'
import Question from "./Question";
import {getCurrentUserAPIMethod, getDaylogsAPIMethod} from "../api/client";

function Daylog(props){
    const [daylogs, setDaylogs] = useState(props.daylogs);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setDaylogs(props.daylogs);
    }, [props]);

    let selectedDate;
    let sortedLogDaysByDates;

    if(daylogs.length != 0){
        sortedLogDaysByDates = daylogs.slice().sort((a,b) => b.date - a.date);
        selectedDate = sortedLogDaysByDates[currentIndex].date
    }

    let date2String = (d) => {
        console.log(d);
        var dt = new Date(d);
        console.log(dt)

        var dtm = dt.getMonth();
        console.log(dtm)
        var dtD = dt.getDay();
        var dty = dt.getFullYear();

        console.log(dtm +"/"+ dtD+ "/" + dty)

        return dtm +"/"+ dtD+ "/" + dty
    }

    console.log(sortedLogDaysByDates)
    console.log(selectedDate)
    console.log(date2String(selectedDate))

    return (selectedDate? (
                <div>
                    <div className="LogSelectionBar" style={{display: "flex", justifyContent: "space-between"}}>
                        <button>
                            <h2>{"<"}</h2>
                        </button>
                        <h2>
                            {date2String(selectedDate)}
                        </h2>

                        <button>
                            <h2>{">"}</h2>
                        </button>
                    </div>
                    <div>
                        {sortedLogDaysByDates[currentIndex].qSet?(sortedLogDaysByDates[currentIndex].qSet.map((question)=>
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
