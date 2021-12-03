import React, {useState, useEffect} from 'react'
import Profile from "./Profile";
import EditQuestions from "./EditQuestions";
import Daylog from "./Daylog";
import ViewData from "./ViewData";

//import API methods
import {
    createDaylogAPIMethod,
    getCurrentUserAPIMethod,
    getDaylogsAPIMethod,
    getQuestionsByDaylogIdAPIMethod,
    createQuestionAPIMethod,
    loginUserAPIMethod,
    logoutUserAPIMethod
} from "../api/client.js";

function Main(props) {
    const [currUser, setCurrUser] = useState({});
    const [defaultImg, setDefaultImg] = useState(true);
    const [imgURL, setImgURL] = useState('');
    const [daylogs, setDaylogs] = useState([]);
    const [currentPage, setCurrentPage] = useState('LogData');

    //get current user
    useEffect(() => {
        setCurrUser(props.currUser);
    }, [props.currUser]);

    useEffect(() => {
        console.log(currUser);
        if (currUser !== null && currUser !== undefined) {
            //get daylogs of current user
            getDaylogsAPIMethod().then((daylogs) => {
                setDaylogs(sortByDate(daylogs));
                //console.log(daylogs);
            });

            //get profile image url of current user
            if (currUser.hasOwnProperty('profile_url') && currUser.profile_url !== '') {
                setDefaultImg(true);
                setImgURL('');
            } else {
                setDefaultImg(false);
                setImgURL(currUser.profile_url);
            }
        }
    }, [currUser]);


    const sortByDate = (list) => {
        return list.sort((a, b) => b.date - a.date);
    }

    const logout = () => {
        logoutUserAPIMethod().then(() => {
            props.setCurrUser({});
            props.setLogin(false);
        });
    }

    return (
        <div className="Main">
            <div className= "MenuBar" >

                <h2 className="Header">Day Logger</h2>

                <div className= "Menus" style={{display: 'flex'}}>
                    <button onClick={() => setCurrentPage("LogData")}>Log Data</button>
                    <button onClick={() => setCurrentPage("EditQuestions")}>Edit Questions</button>
                    <button onClick={() => setCurrentPage("ViewData")}>View Data</button>
                </div>

                <button onClick={logout}>
                    testLogout
                </button>

                <button className={"ProfileImg"} onClick={() => setCurrentPage("Profile")} >
                    <img src= {'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} style={{width: '40px', borderRadius: '50%'}}/>
                </button>

            </div>
            {
                currentPage == 'LogData' ?
                    <Daylog
                        daylogs={daylogs}
                    ></Daylog> :
                    currentPage == 'EditQuestions'?
                        <EditQuestions

                        ></EditQuestions> :
                        currentPage == 'Profile'?
                            <Profile
                                currUser={props.currUser}
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