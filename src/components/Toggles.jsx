import React, { useState } from 'react'
import { Dropdown, Toggle, Button, ButtonToolbar } from 'rsuite';


function Toggles(props) {

    const [isOrthoView, setIsOrthoView] = useState(false);
    
    const [enableGrid, setenableGrid] = useState(true);
    const [enableAxes, setenableAxes] = useState(true);

    const [axesApperance, setAxesAppearance] = useState("primary");
    const [gridApperance, setgridApperance] = useState("primary");
    const [changeControl, setchangeControl] = useState("default");


    const handleGridToggle = () => {
        setenableGrid(!enableGrid); 
        props.updateFunctions.updateGridView(!enableGrid)

        if(!enableGrid){
        setgridApperance("primary")
        } else {
        setgridApperance("default")
        }
    };
    
    const handleAxesToggle = () => {
        setenableAxes(!enableAxes);
        props.updateFunctions.updateAxesView(!enableAxes)
        
        if (!enableAxes) {
        setAxesAppearance("primary");
        } else {
        setAxesAppearance("default");
        }
    };

    const handleViewToggle = () => {
        setIsOrthoView(!isOrthoView);
        props.updateFunctions.updateCamView(!isOrthoView)
    };
    const handleAngleToggle = (angle) => {
        props.updateFunctions.updateCamPosition(angle)
    };


    const handleChangeControl = (newcontrol) => {
        setchangeControl(newcontrol);
        props.updateFunctions.updateMode(newcontrol)
    };



    return (
        <div>
            <ButtonToolbar className='toggle'>
            {isOrthoView ?<Dropdown title="Select View">
                    <Dropdown.Item onClick={() => handleAngleToggle([0, 0, 10])}>Front View</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAngleToggle([0, 0, -10])}>Back View</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAngleToggle([-10, 0, 0])}>Left View</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAngleToggle([10, 0, 0])}>Right View</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAngleToggle([0, 10, 0])}>Top View</Dropdown.Item>
                </Dropdown>: null}
                
                <Toggle size="lg" onClick={handleViewToggle} checkedChildren="Orthographic" unCheckedChildren="Perspective" />

                <Button appearance={gridApperance} className='btntoggle' onClick={handleGridToggle}>Grid</Button>
                <Button appearance={axesApperance} className='btntoggle' onClick={handleAxesToggle}>Axes Helper</Button>
                
            </ButtonToolbar>
            <ButtonToolbar className='TControls'>
                <Button appearance={changeControl === "translate" ? "primary" : "default"} onClick={() => handleChangeControl("translate")}>Translate</Button>
                <Button appearance={changeControl === "rotate" ? "primary" : "default"} onClick={() => handleChangeControl("rotate")}>Rotate</Button>
                <Button appearance={changeControl === "scale" ? "primary" : "default"} onClick={() => handleChangeControl("scale")}>Scale</Button>
            </ButtonToolbar>
        </div>
    )
}

export default Toggles;
