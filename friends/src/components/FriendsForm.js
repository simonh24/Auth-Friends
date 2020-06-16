import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import styled from "styled-components";
import { Card, TextField, Button } from "@material-ui/core";

const StyledCard = styled(Card)`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 25px 35%;
    padding: 25px 0;
`;

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

    const onSubmit = e => {
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
        <form onSubmit={onSubmit}>
            <StyledCard>
                <h1>Add a Friend</h1>
                <TextField variant="outlined" type="text" value={friendsValues.name} name="name" onChange={handleChanges} label="Name"></TextField>
                <br></br>
                <TextField variant="outlined" type="age" value={friendsValues.age} name="age" onChange={handleChanges} label="Age"></TextField>
                <br></br>
                <TextField variant="outlined" type="email" value={friendsValues.email} name="email" onChange={handleChanges} label="Email"></TextField>
                <br></br>
                <Button variant="contained" color="primary" onClick={onSubmit}>Add Friend</Button>
            </StyledCard>
        </form>
    )
}

export default FriendsForm;