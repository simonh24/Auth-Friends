import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const FriendsForm = () => {

    const initialFriendsValues = {
        name: "",
        age: "",
        email: "",
    }

    const [friendsValues, setFriendsValues] = useState(initialFriendsValues);

    const postFriend = newFriend => {
        axiosWithAuth()
            .post("/api/friends", newFriend)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    const handleChanges = evt => {
        const { name, value } = evt.target;
        setFriendsValues({ ...friendsValues, [name]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newFriend = {
            name: friendsValues.name.trim(),
            age: friendsValues.age.trim(),
            email: friendsValues.email.trim(),
        }
        console.log(newFriend)
        postFriend(newFriend);
        setFriendsValues(initialFriendsValues);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:
            <input type="text" value={friendsValues.name} name="name" onChange={handleChanges}></input>
            </label>
            <label>Age:
                <input type="text" value={friendsValues.age} name="age" onChange={handleChanges}></input>
            </label>
            <label>Email:
                <input type="email" value={friendsValues.email} name="email" onChange={handleChanges}></input>
            </label>
            <button>Add Friend</button>
        </form>
    )
}

export default FriendsForm;