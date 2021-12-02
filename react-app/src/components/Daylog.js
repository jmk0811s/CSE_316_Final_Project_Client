import React, {useState} from 'react'
import Question from "./Question";

function Daylog(props){
    const [daylogs, setDaylogs] = useState(props.daylogs);
    const [currentIndex, setCurrentIndex] = useState(0);

    let selectedDate;
    let sortedLogDaysByDates;
    if(daylogs.length !== 0){
        sortedLogDaysByDates = daylogs.slice().sort((a,b) => b.date - a.date);
        selectedDate = sortedLogDaysByDates[currentIndex].date
    }

    console.log(sortedLogDaysByDates)
    console.log(selectedDate)

    return (selectedDate? (
                <div>
                    <div className="LogSelectionBar" style={{display: "flex", justifyContent: "space-between"}}>
                        <button>
                            <h2>{"<"}</h2>
                        </button>
                        <h2>
                            {selectedDate.getMonth() + '/' + selectedDate.getDay() + '/' + selectedDate.getFullYear()}
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
