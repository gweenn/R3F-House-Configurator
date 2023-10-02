import React, { useState, useEffect } from 'react'
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Slider,
    Stack,
    Typography,
    TextField,
    Grid,
    Button
} from "@mui/material";
import { SliderPicker } from 'react-color';


function Interface({onRoughnessChange, setRoughness, onMetalnessChange, setMetalness, onColorChange, setColor, onPositionChange, onRotationChange, onScaleChange, positionMove, rotationMove, scaleMove}) {

    const [roughnessValue, setRoughnessValue] = useState(1);
    const [metalnessValue, setMetalnessValue] = useState(0);
    const [selectedColor, setSelectedColor] = useState("#b3e6e6");
    const [position, setPosition] = useState([0, 0.5, 0]);
    const [rotation, setrotation] = useState([0, 0, 0]);
    const [scale, setscale] = useState([1, 1, 1]);

    const handleRoughnessChange = (event, newValue) => {
        setRoughnessValue(newValue);
        onRoughnessChange(newValue);
    };

    const handleMetalnessChange = (event, newValue) => {
        setMetalnessValue(newValue);
        onMetalnessChange(newValue);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
        onColorChange(color.hex);
        // console.log(color.hex)
    };

    const handlePositionChange = (index, newValue) => {
        const regex = /^-?\d*\.?\d*$/;
        const newPosition = [...position];

        if (newValue === '') {
            newPosition[index] = 0;
        } else if (regex.test(newValue) || newValue === '-') {
            newPosition[index] = newValue;
        }
    
        setPosition(newPosition);
        onPositionChange(newPosition);
    };
    const handleRotationChange = (index, newValue) => {
        const regex = /^-?\d*\.?\d*$/;
        const newRotation = [...rotation];

        if (newValue === '') {
            newRotation[index] = 0;
        } else if (regex.test(newValue) || newValue === '-') {
            newRotation[index] = newValue;
        }
    
        setrotation(newRotation);
        onRotationChange(newRotation);
    };
    const handleScaleChange = (index, newValue) => {
        const regex = /^-?\d*\.?\d*$/;
        const newScale = [...scale];

        if (newValue === '') {
            newScale[index] = 0;
        } else if (regex.test(newValue) || newValue === '-') {
            newScale[index] = newValue;
        }
    
        setscale(newScale);
        onScaleChange(newScale);
    };

    useEffect(() => {
        setRoughnessValue(setRoughness)
        setMetalnessValue(setMetalness)
        setSelectedColor(setColor)
        setPosition(positionMove);
        setrotation(rotationMove);
        setscale(scaleMove);
      }, [setColor, positionMove, rotationMove, scaleMove]);
    
    

    return (
        <Box sx={{position: "absolute",top: 100,right: 0,}}p={3}>
            <Stack spacing={3}>
                {/* <Typography variant="caption">Table Configurator</Typography> */}
                <Box className='glass' p={3}>
                    <Grid>
                        {/* Position */}
                        <Grid item xs={12}>
                            <Box mb={1}>
                                <FormLabel>Position</FormLabel>
                            </Box>
                        </Grid>
                        <TextField label="X" value={position[0]} size="small" variant="outlined" style={{ width: '70px' }} onChange={(e) => handlePositionChange(0, e.target.value)}/>
                        <TextField label="Y" value={position[1]} size="small" variant="outlined" style={{ width: '70px' }} onChange={(e) => handlePositionChange(1, e.target.value)}/>
                        <TextField label="Z" value={position[2]} size="small" variant="outlined" style={{ width: '70px' }} onChange={(e) => handlePositionChange(2, e.target.value)}/>

                        {/* Rotation */}
                        <Grid item xs={12}>
                            <Box mb={1}>
                                <FormLabel>Rotation</FormLabel>
                            </Box>
                        </Grid>
                        <TextField label="X" value={rotation[0]} size="small" variant="outlined" style={{ width: '70px' }} onChange={(e) => handleRotationChange(0, e.target.value)}/>
                        <TextField label="Y" value={rotation[1]} size="small" variant="outlined" style={{ width: '70px' }} onChange={(e) => handleRotationChange(1, e.target.value)}/>
                        <TextField label="Z" value={rotation[2]} size="small" variant="outlined" style={{ width: '70px' }} onChange={(e) => handleRotationChange(2, e.target.value)}/>

                        {/* Scale */}
                        <Grid item xs={12}>
                            <Box mb={1}>
                                <FormLabel>Scale</FormLabel>
                            </Box>
                        </Grid>
                        <TextField label="X" value={scale[0]} size="small" variant="outlined" style={{ width: '70px' }} onChange={(e) => handleScaleChange(0, e.target.value)}/>
                        <TextField label="Y" value={scale[1]} size="small" variant="outlined" style={{ width: '70px' }} onChange={(e) => handleScaleChange(1, e.target.value)}/>
                        <TextField label="Z" value={scale[2]} size="small" variant="outlined" style={{ width: '70px' }} onChange={(e) => handleScaleChange(2, e.target.value)}/>
                    </Grid>
                </Box>
                <Box className="glass" p={3}>
                    <FormControl>
                        <FormLabel>Roughness</FormLabel>
                        <Slider
                            sx={{
                            width: "200px",
                            }}
                            min={0}
                            max={1}
                            step={0.01}
                            value={roughnessValue}
                            onChange={handleRoughnessChange}
                            valueLabelDisplay="auto"
                        />
                        <FormLabel>Metalness</FormLabel>
                        <Slider
                            sx={{
                            width: "200px",
                            }}
                            min={0}
                            max={1}
                            step={0.01}
                            value={metalnessValue}
                            onChange={handleMetalnessChange}
                            valueLabelDisplay="auto"
                        />
                        <FormLabel mb={1}>Color</FormLabel>
                        <SliderPicker color={selectedColor} onChange={handleColorChange}/>
                    </FormControl>
                </Box>
            </Stack>
        </Box>
    );
  };

  export default Interface;