import React from 'react'
import Profile from "./Profile";
import EditQuestions from "./EditQuestions";
import LogDay from "./LogDay";

function Main(){

    const testQSet = [
        {qText: "2019 q1: bool", qType: "boolean", qDate: new Date('2019-06-28')},
        {qText: "2019 q2: bool", qType: "boolean", qDate: new Date('2019-06-28')},
        {qText: "2019 q3: Text", qType: "text", qDate: new Date('2019-06-28')},
        {qText: "2019 q4: Number", qType: "number", qDate: new Date('2019-06-28')},
        {qText: "2019 q5: multiple", qType: "multiple", qDate: new Date('2019-06-28'), qChoices: ["Ok day", "Great Day", "Bad day"]},
    ];
    const testLogDaySet =[
        {qDate: new Date('2019-06-28'), qSet: testQSet},
        {
            qDate: new Date('2020-07-28'),
            qSet:
                [
                    {qText: "2020 q1: bool", qType: "boolean", qDate: new Date('2020-07-28')},
                    {qText: "2020 q2: bool", qType: "boolean", qDate: new Date('2020-07-28')},
                    {qText: "2020 q3: Text", qType: "text", qDate: new Date('2020-07-28')}
                ]
        },
        {
            qDate: new Date(),
            qSet: [
                {qText: "2021 q1: bool", qType: "boolean", qDate: new Date()},
                {qText: "2021 q2: bool", qType: "boolean", qDate: new Date()},
                {qText: "2021 q3: Text", qType: "text", qDate: new Date()}
            ]
        },
    ]

    return (
        <div className="Main">
            <div className= "MenuBar" >

                <h2 className="Header">Day Logger</h2>

                <div className= "Menus" style={{display: 'flex'}}>
                    <button>Log Day</button>
                    <button>Edit Questions</button>
                    <button>View Data</button>
                </div>

                <button>profile img</button>
            </div>
            {/*<Profile></Profile>*/}
            {/*<EditQuestions questions = {testQSet}></EditQuestions>*/}
            {/*<LogDay logDays={testLogDaySet}></LogDay>*/}

        </div>

    );
}

export default Main