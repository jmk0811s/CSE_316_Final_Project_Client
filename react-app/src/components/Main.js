import React, {useState, useEffect} from 'react'
import Profile from "./Profile";
import EditQuestions from "./EditQuestions";
import Daylog from "./Daylog";
import ViewData from "./ViewData";

//import API methods
import {
    getCurrentUserAPIMethod,
    getDaylogsAPIMethod
} from "../api/client.js";

function Main() {
    const [curUser, setCurUser] = useState({});
    const [defaultImg, setDefaultImg] = useState(true);
    const [imgURL, setImgURL] = useState('');
    const [daylogs, setDaylogs] = useState([]);
    const [currentPage, setCurrentPage] = useState('Daylog');

    //get daylogs from the server
    useEffect(() => {
        getCurrentUserAPIMethod().then((user) => {
            if (user !== null && Object.keys(user).length !== 0) {
                if (user.hasOwnProperty('profile_url') && user.profile_url !== '') {
                    setDefaultImg(true);
                    setImgURL('');
                } else {
                    setDefaultImg(false);
                    setImgURL(user.profile_url);
                }
                setCurUser(user);
            }
        });
        getDaylogsAPIMethod().then((daylogs) => {
            setDaylogs(sortByDate(daylogs));
            console.log(daylogs);
        });
    }, []);

    const sortByDate = (list) => {
        return list.sort((a, b) => b.date - a.date);
    }

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
        if (prop === "Daylog"){
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
                    <button onClick={handleChange('Daylog')}>Log Day</button>
                    <button onClick={handleChange('EditQ')}>Edit Questions</button>
                    <button onClick={handleChange('ViewData')}>View Data</button>
                </div>

                <button className={"ProfileImg"} onClick={handleChange('Profile')} >
                    <img src= {'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} style={{width: '40px', borderRadius: '50%'}}/>
                </button>
            </div>
            {currentPage == 'Daylog'?
                <Daylog logDays={testLogDaySet}></Daylog>:
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