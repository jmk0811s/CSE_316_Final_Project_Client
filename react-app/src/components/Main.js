import React, {useState, useEffect} from 'react'
import Profile from "./Profile";
import EditQuestions from "./EditQuestions";
import LogDay from "./LogDay";
import ViewData from "./ViewData";
import {sortByDate} from "../utils/HelperFunctions";

//import API methods
import {
    logoutUserAPIMethod,
    getQuestionsAPIMethod,
    getResponsesAPIMethod
} from "../api/client.js";

function Main(props) {
    const [serverCall, setServerCall] = useState(false);
    const [currUser, setCurrUser] = useState(props.currUser);
    const [imgURL, setImgURL] = useState();
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [currentPage, setCurrentPage] = useState('LogDay');

    //user data initialization
    useEffect(() => {
        if (currUser !== null && currUser !== undefined) {
            //get questions of current user
            getQuestionsAPIMethod().then((questions) => {
                setQuestions(sortByDate(questions));
            });

            //get responses of current user
            getResponsesAPIMethod().then((responses) => {
                setResponses(responses);
            });

            //console.log(currUser)
            //get profile image url of current user
            if (currUser.hasOwnProperty('profile_url') && currUser.profile_url !== '') {
                setImgURL(currUser.profile_url);
                console.log('success')

            } else {
                setImgURL('');
                console.log('fail')
            }
        }
    }, [currUser, serverCall]);

    useEffect(()=>{
        setCurrUser(props.currUser)
    }, [props])

    return (
        <div className="Main">
            <div className= "MenuBar" >

                <h2 className="Header">Day Logger</h2>

                <div className= "Menus" style={{display: 'flex'}}>
                    <button onClick={() => setCurrentPage("LogDay")}>Log Day</button>
                    <button onClick={() => setCurrentPage("EditQuestions")}>Edit Questions</button>
                    <button onClick={() => setCurrentPage("ViewData")}>View Data</button>
                </div>

                <button className={"ProfileImg"} onClick={() => setCurrentPage("Profile")} >
                    <img src= {imgURL? imgURL:'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} style={{width: '40px', borderRadius: '50%'}}/>
                </button>

            </div>
            {
                currentPage == 'LogDay' ?
                    <LogDay
                        questions={questions}
                        setQuestions={setQuestions}
                        responses={responses}
                        setResponses={setResponses}
                        serverCall={serverCall}
                        setServerCall={setServerCall}
                    ></LogDay> :
                    currentPage == 'EditQuestions'?
                        <EditQuestions
                            questions={questions}
                            setQuestions={setQuestions}
                            responses={responses}
                            setResponses={setResponses}
                            serverCall={serverCall}
                            setServerCall={setServerCall}
                        ></EditQuestions> :
                        currentPage == 'Profile'?
                            <Profile
                                login={props.login}
                                setCurrUser = {props.setCurrUser}
                                currUser={props.currUser}
                                setLogin={props.setLogin}
                            ></Profile> :
                            currentPage == 'ViewData' ?
                                <ViewData

                                ></ViewData> :
                                <div></div>
            }




        </div>

    );
}

export default Main