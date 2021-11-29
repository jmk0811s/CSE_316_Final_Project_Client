import React from 'react'
import Profile from "./Profile";
import EditQuestions from "./EditQuestions";

function Main(){

    const testQSet = [
        {qText: "q1", qType: "boolean", qDate: new Date()},
        {qText: "q2", qType: "boolean", qDate: new Date()}
    ];

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
            <EditQuestions questions = {testQSet}></EditQuestions>

        </div>

    );
}

export default Main