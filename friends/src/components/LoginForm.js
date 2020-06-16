import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

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
            <label>Username:
                <input type="text" value={userValues.username} name="username" onChange={handleChanges}></input>
            </label>
            <label>Password:
                <input type="password" value={userValues.password} name="password" onChange={handleChanges}></input>
            </label>
            <button>Sign In</button>
        </form>
    )
}

export default LoginForm;