import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate(-1)
        }, 1000)
    })

    return <h1>Page Not Found! Redirecting to previous page...</h1>
}