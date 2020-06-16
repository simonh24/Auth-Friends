import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
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

const LoginForm = () => {
    const initialUserValues = {
        username: "",
        password: "",
    }

    const [userValues, setUserValues] = useState(initialUserValues);
    const history = useHistory();
    const { push } = history;

    const handleChanges = evt => {
        const { name, value } = evt.target;
        setUserValues({ ...userValues, [name]: value });
    }

    const onSubmit = evt => {
        evt.preventDefault();
        axiosWithAuth()
            .post("/api/login", userValues)
            .then(res => {
                // console.log(res)
                window.localStorage.setItem("token", res.data.payload);
                push("/friends")
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={onSubmit}>
            <StyledCard>
                <TextField variant="outlined" type="text" value={userValues.username} name="username" onChange={handleChanges} label="Username"></TextField>
                <br></br>
                <TextField variant="outlined" type="password" value={userValues.password} name="password" onChange={handleChanges} label="Password"></TextField>
                <br></br>
                <Button variant="contained" color="primary" onClick={onSubmit}>Sign In</Button>
            </StyledCard>
        </form>
    )
}

export default LoginForm;