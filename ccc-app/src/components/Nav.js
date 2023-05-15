import React from "react";
import { NavLink } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography
  } from "@mui/material";


export default function Nav() {
    return (
        <>
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h4">
                    CCC A2
                </Typography>
                <div>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/Scenario1'>Scenario 1</NavLink>
                    <NavLink to='/Scenario2'>Scenario 2</NavLink>
                    <NavLink to='/Scenario3'>Scenario 3</NavLink>
                </div>
            </Toolbar>
        </AppBar>
{/*
        <AppBar position='relative'>
            <nav>
            <ul>
                <li><NavLink to='/Scenario1'>Scenario 1</NavLink></li>
            </ul>
            <ul>
                <li><NavLink to='/Scenario2'>Scenario 2</NavLink></li>
            </ul>
            <ul>
                <li><NavLink to='/Scenario3'>Scenario 3</NavLink></li>
            </ul>
            </nav>
        </AppBar>
    */}
        </>
    )
}