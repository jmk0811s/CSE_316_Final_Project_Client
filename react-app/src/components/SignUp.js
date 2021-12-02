import react, {useEffect, useState} from "react";
import React from "react";
import {registerUserAPIMethod, uploadImageToCloudinaryAPIMethod} from "../api/client";

function SignUp(props) {
    const [name, setName] = useState();
    const [email,setEmail] = useState();
    const [pw,setPw] = useState();
    const [addr1,setAddr1] = useState();
    const [addr2,setAddr2] = useState();
    const [profileUrl, setProfileUrl] = useState("");

    const [signT, setSignT] = useState(props.signT);
    const [error, setError] = useState();

    useEffect(() => {
        setError(error);
    },[error])

    useEffect(() => {
        setSignT(signT);
    },[signT])

    useEffect(()=>{
        setSignT(props.signT)
    },[props])

    const testRegister = (e) => {
        e.preventDefault();
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) { // email validation
            const user1 = {
                "name" : name,
                "email" : email,
                "password" : pw,
                "address1" : addr1,
                "address2" : addr2,
                "profile_url" : profileUrl
            }
            registerUserAPIMethod(user1).then(ret => {
                console.log(ret);
                if(ret){
                    setSignT(false);
                    props.setSignT(false);
                    props.setLogin(true);
                }
                else{
                    setError("Invalid information. Properly fill out the information");
                }
            });
        }
        else {
            setError("Invalid email format");
        }
    }


    let handleChange = (prop) => (event) => {
        if (prop === "name"){
            setName(event.target.value);
        }
        else if (prop === "email"){
            setEmail(event.target.value);
        }
        else if (prop === "pw"){
            setPw(event.target.value);
        }
        else if (prop === "addr1"){
            setAddr1(event.target.value);
        }
        else if (prop === "addr2"){
            setAddr2(event.target.value);
        }
        else if (prop === "profileUrl"){
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
        else if (prop =='x'){
            event.preventDefault();
            setSignT(props.setSignT(false));
            setError("");
        }
    }

    return(
        <div className="signUp" style={{display: signT ? 'block': 'none'}}>
            <div className="signUp-content" >
                <form>
                    <li>
                        <div style={{display: 'flex' ,justifyContent: 'space-between'}}>
                            <h2>Sign Up</h2>
                            <button id="x" style={{border: 'none', background: 'transparent', justifyContent: 'space-between'}} onClick={handleChange("x")}>X</button>
                        </div>
                    </li>
                    <li id="name">
                        <p style={{margin: 0}}>Name</p>
                        <input type="text"
                               id="iName"
                               name="Name"
                               value = {name}
                               style={{width: '100%', alignItems: 'center'}}
                               onChange={handleChange("name")}></input>
                    </li>
                    <li id="email">
                        <p style={{margin: 0}}>Email</p>
                        <input type="text"
                               id="iEmail"
                               name="Email"
                               value = {email}
                               style={{width: '100%', alignItems: 'center'}}
                               onChange={handleChange("email")}></input>
                    </li>
                    <li id="password">
                        <p style={{margin: 0}}>Password</p>
                        <input type="text"
                               id="iPw"
                               name="pw"
                               value = {pw}
                               style={{width: '100%', alignItems: 'center'}}
                               onChange={handleChange("pw")}></input>
                    </li>

                    <li id="addr1">
                        <p style={{margin: 0}}>Address 1</p>
                        <input type="text"
                               id="iAddr1"
                               name="addr1"
                               value = {addr1}
                               style={{width: '100%', alignItems: 'center'}}
                               onChange={handleChange("addr1")}></input>
                    </li>

                    <li id="addr2">
                        <p style={{margin: 0}}>Address 2</p>
                        <input type="text"
                               id="iAddr2"
                               name="addr2"
                               value = {addr2}
                               style={{width: '100%', alignItems: 'center'}}
                               onChange={handleChange("addr2")}></input>
                    </li>

                    <li id="profileUrl">
                        <p style={{margin: 0}}>Profile Url</p>
                        <div>
                            <img className="avatar"
                                 src = {profileUrl}
                                 style={{width: '40px', borderRadius: '50%'}}
                            />
                            <input id="file-upload" className="custom-file-upload" placeholder="Choose New Image" type="file" name="image" accept="image/*" id="cloudinary" onChange={handleChange("profileUrl")}/>
                        </div>
                    </li>

                    <li>
                        {error?<label style = {{color: 'red'}}>{error}</label>:<></>}
                    </li>
                    <li>
                        <button onClick={testRegister} type="submit" style={{width: '30%', height: '35px',border: 'none', borderRadius: '10px' ,backgroundColor: 'green',color: '#ffffff'}}>Save</button>
                    </li>
                </form>
            </div>
        </div>
    )
};
export default SignUp;
