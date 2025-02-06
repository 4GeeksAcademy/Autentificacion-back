import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const {actions} = useContext(Context)
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const aceptada = await actions.register(email,password);
        navigate("/")

    }



    return (<div className=""> 
    <h1> Este es mi registro </h1>
    <form onSubmit={handleSubmit}> 
        <input
        type = "email"
        value = {email}
        onChange={(e)=> setEmail(e.target.value)}
        placeholder="escribe aqui nose"
        required
        />

<input
        type = "password"
        value = {password}
        onChange={(e)=> setPassword(e.target.value)}
        placeholder="escribe aqui tu correo"
        required 
        />
    <button type="submit"> enviar la vaina </button> 
    </form>
    </div>)
}
