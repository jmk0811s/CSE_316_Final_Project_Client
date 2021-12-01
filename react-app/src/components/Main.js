import React, {useState} from 'react'
import Profile from "./Profile";
import EditQuestions from "./EditQuestions";
import LogDay from "./LogDay";
import ViewData from "./ViewData";

function Main(){

    const [currentPage, setCurrentPage] = useState('LogDay');

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

    // const findQuestionByDate = (qDate) =>{
    //     testLogDaySet.map((q)=> {
    //         if(q.qDate == qDate){
    //
    //         }
    //     })
    // }

    const editQuestion = (qDate,prop, newValue) => {

        testLogDaySet.map((q)=> {
            if(q.qDate == qDate){

                if(prop == 'qText'){

                }
                else if(prop == 'qType'){

                }
                else{

                }
            }
        })
    }

    let handleChange = (prop) => (event) => {
        if (prop === "LogDay"){
            setCurrentPage(prop);
        }
        else if (prop === "EditQ"){
            setCurrentPage(prop);
        }
        else if (prop === "ViewData"){
            setCurrentPage(prop);
        }
        else{
            setCurrentPage(prop);
        }

    }


    return (
        <div className="Main">
            <div className= "MenuBar" >

                <h2 className="Header">Day Logger</h2>

                <div className= "Menus" style={{display: 'flex'}}>
                    <button onClick={handleChange('LogDay')}>Log Day</button>
                    <button onClick={handleChange('EditQ')}>Edit Questions</button>
                    <button onClick={handleChange('ViewData')}>View Data</button>
                </div>

                <button className={"ProfileImg"} onClick={handleChange('Profile')} >
                    <img src= {'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} style={{width: '40px', borderRadius: '50%'}}/>
                </button>
            </div>
            {currentPage == 'LogDay'?
                <LogDay logDays={testLogDaySet}></LogDay>:
                currentPage == 'EditQ'?
                    <EditQuestions questions = {testQSet}></EditQuestions>:
                    currentPage == 'Profile'?
                        <Profile></Profile>:
                        <ViewData></ViewData>
            }




        </div>

    );
}

export default Main