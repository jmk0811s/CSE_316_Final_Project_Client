import React, {useEffect, useState} from 'react'


function Profile(){

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [addr1, setAddr1] = useState();
    const [addr2, setAddr2] = useState();

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
    }

    return (
        <div>
            <h3>Edit Profile</h3>
            <form className="form">

                <div>
                    <h3>Profile photo</h3>
                    <div style={{display: "flex"}}>
                        <button>profile img</button>
                        <button>Choose new image</button>
                        <button>Remove image</button>
                    </div>
                </div>

                <div>
                    <h3>Name</h3>
                    <input type="text"
                           id="iName"
                           name="Name"
                           value = {name}
                           onChange={handleChange("name")}></input>
                </div>

                <div>
                    <h3>Email</h3>
                    <input type="text"
                           id="iEmail"
                           name="Email"
                           value = {email}
                           onChange={handleChange("email")}></input>
                </div>

                <div>
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

                <div style={{display: "flex", justifyContent: 'space-between'}}>
                    <button>Save</button>
                    <button>Logout</button>
                </div>

            </form>
        </div>
    );
}
export default Profile