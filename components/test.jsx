import React, { useState } from 'react'
import {
    Box,
    FormControl,
    FormLabel,
    Slider,
    Stack,
} from "@mui/material";


function Interface() {

    const [roughnessValue, setRoughnessValue] = useState();

  const handleRoughnessChange = (event, newValue) => {
    setRoughnessValue(newValue);
    // onRoughnessChange(newValue);
    console.log(roughnessValue.target.value)
  };


    return (
        <Box
            sx={{
            position: "absolute",
            top: 100,
            right: 0,
            }}
            p={3}
        >
        <Stack spacing={3}>
            {/* <Typography variant="caption">Table Configurator</Typography> */}
            <Box className="glass" p={3}>
                <FormControl>
                <FormLabel>Roughness</FormLabel>
                <Slider
                    sx={{
                    width: "200px",
                    }}
                    min={0}
                    max={100}   
                    onChange={handleRoughnessChange}
                    valueLabelDisplay="auto"
                />
                </FormControl>
            </Box>
        </Stack>
      </Box>
    );
  };

  export default Interface;