import * as THREE from "three";
import React, { useRef, useState } from 'react';
import { Dropdown, ButtonToolbar } from 'rsuite';
import ObjectIcon from '../assets/objects-icon.svg'
import ShapeIcon from '../assets/Shape-Icon.png'
import AddIcon from '../assets/AddIcon.png'
import Cube from '../assets/cube.png'
import Sphere from '../assets/sphere.png'
import Cylinder from '../assets/cylinder.png'
import Cone from '../assets/cone.svg'


function Buttons({addShape}) {
    return (
        <>
            <ButtonToolbar className="Btntoolbar">

                <Dropdown title= {(<><img src={AddIcon} alt="Objects Icon" width="20" height="20" />{' Add Objects'}</>)} >

                    <Dropdown.Menu title={(<><img className="icons" src={ShapeIcon} alt="Objects Icon" width="20" height="20" />{'Basic Shapes'}</>)}>
                        <Dropdown.Item onClick={() => addShape("Cube")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />Cube</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("Sphere")}><img className="icons" src={Sphere} alt="Objects Icon" width="20" height="20" />Sphere</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("Cylinder")}><img className="icons" src={Cylinder} alt="Objects Icon" width="20" height="20" />Cylinder</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("Cone")}><img className="icons" src={Cone} alt="Objects Icon" width="20" height="20" />Cone</Dropdown.Item>
                    </Dropdown.Menu>

                    <Dropdown.Menu title={(<><img className="icons" src={ShapeIcon} alt="Objects Icon" width="20" height="20" />{'Walls'}</>)}>
                        <Dropdown.Item onClick={() => addShape("wallOne")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />One window Wall</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("wallTwo")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />Two window Wall</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("wallThree")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />Wall with Door Hole</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("wallFour")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />One window Wall with Door Hole</Dropdown.Item>
                    </Dropdown.Menu>

                    <Dropdown.Menu title={(<><img className="icons" src={ShapeIcon} alt="Objects Icon" width="20" height="20" />{'Doors'}</>)}>
                        <Dropdown.Item onClick={() => addShape("Door")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />Door 1</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("Door2")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />Door 2</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("Door3")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />Door 3</Dropdown.Item>
                    </Dropdown.Menu>

                    <Dropdown.Menu title={(<><img className="icons" src={ShapeIcon} alt="Objects Icon" width="20" height="20" />{'Windows'}</>)}>
                        <Dropdown.Item onClick={() => addShape("Window")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />Window 1</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("Window2")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />Window 2</Dropdown.Item>
                        <Dropdown.Item onClick={() => addShape("Window3")}><img className="icons" src={Cube} alt="Objects Icon" width="20" height="20" />Window 3</Dropdown.Item>
                    </Dropdown.Menu>

                    {/* <Dropdown.Menu title={(<><img className="icons" src={ShapeIcon} alt="Objects Icon" width="20" height="20" />{'Holes'}</>)}>
                        <Dropdown.Item eventKey="e-1">Item E-1</Dropdown.Item>
                        <Dropdown.Item eventKey="e-2">Active Item</Dropdown.Item>
                    </Dropdown.Menu> */}
                </Dropdown>
            </ButtonToolbar>
        </>
    );
  };


export default Buttons;
