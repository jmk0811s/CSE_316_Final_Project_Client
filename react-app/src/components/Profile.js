import React, {useEffect, useState} from 'react'
import {
    getCurrentUserAPIMethod,
    logoutUserAPIMethod,
    updateUserAPIMethod,
    uploadImageToCloudinaryAPIMethod
} from "../api/client";


function Profile(props) {

    const [name, setName] = useState(props.currUser.name);
    const [email, setEmail] = useState(props.currUser.email);
    const [addr1, setAddr1] = useState(props.currUser.address1);
    const [addr2, setAddr2] = useState(props.currUser.address2);
    const [profileUrl, setProfileUrl] = useState(props.currUser.profile_url)

    useEffect(() => {
        let currUser = props.currUser;
        setName(currUser.name);
        setEmail(currUser.email);

        setAddr1(currUser.address1);
        setAddr2(currUser.address2);
        setProfileUrl(currUser.profile_url)
    }, [props.currUser])




    let handleChange = (prop) => (event) => {
        if (prop === "name"){
            setName(event.target.value);
        }
        else if (prop === "email"){
            setEmail(event.target.value);
        }
        else if (prop === "addr1"){
            setAddr1(event.target.value);
        }
        else if (prop === "addr2"){
            setAddr2(event.target.value);
        }
        else if (prop === "chooseImg"){
            event.preventDefault();
            if (event.target.files && event.target.files[0]) {
                const selectedFile = event.target.files[0];
                const formData = new FormData();
                const unsignedUploadPreset = 'e9uuow7f'
                formData.append('file', selectedFile);
                formData.append('upload_preset', unsignedUploadPreset);
                console.log("Cloudinary upload");
                uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                    setProfileUrl(response.url);
                });
            }
        }
        else if  (prop === "removeImg"){
            event.preventDefault();
            setProfileUrl("");
        }
        else if (prop === "logout"){
            logoutUserAPIMethod().then(()=>{
                props.setLogin(false);
            });
        }
        else if (prop === "save"){
            event.preventDefault();
            let currUser = props.currUser;
            let newUser = {
                'name': name,
                "email": email,
                'password': currUser.password,
                'address1': addr1,
                'address2': addr2,
                'profile_url': profileUrl
            }
            console.log(newUser)
            updateUserAPIMethod(currUser, newUser).then(()=>{
                getCurrentUserAPIMethod().then(nUser =>{
                    console.log(nUser)
                    props.setCurrUser(nUser)
                })
            });
        }
    }

    return (
        <div className={"Profile"}>
            <h3>Edit Profile</h3>
            <form className="form">

                <div className={"ProfileTabs"}>
                    <h3>Profile photo</h3>
                    <div className={"ProfileTab1"} style={{display: "flex"}}>

                            {/*default img for now*/}
                        <img src= {profileUrl? profileUrl:'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} style={{width: '40px', borderRadius: '50%'}}/>

                        <label className={"ChooseImg"}>
                            <input
                                style={{display: 'none'}}
                                id="file-upload"
                                // className="ChooseImg"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange("chooseImg")}/>
                            Choose new Image
                        </label>


                        <button className={"RemoveAndLogOut"} onClick={handleChange("removeImg")}>Remove image</button>
                    </div>
                </div>

                <div className={"ProfileTabs"}>
                    <h3>Name</h3>
                    <input type="text"
                           id="iName"
                           name="Name"
                           value = {name}
                           onChange={handleChange("name")}></input>
                </div>

                <div className={"ProfileTabs"}>
                    <h3>Email</h3>
                    <input type="text"
                           id="iEmail"
                           name="Email"
                           value = {email}
                           onChange={handleChange("email")}></input>
                </div>

                <div className={"ProfileTabs"}>
                    <h3>Address</h3>
                    <input type="text"
                           id="iAddr1"
                           name="Addr1"
                           value = {addr1}
                           onChange={handleChange("addr1")}></input>
                    <input type="text"
                           id="iAddr2"
                           name="Addr2"
                           value = {addr2}
                           onChange={handleChange("addr2")}></input>
                </div>

                <div style={{display: "flex", justifyContent: 'space-between', background: 'transparent'}}>
                    <button className={"Save"} onClick={handleChange("save")}>Save</button>
                    <button className={"RemoveAndLogOut"} onClick={handleChange("logout")}>Logout</button>
                </div>

            </form>
        </div>
    );
}
export default Profile