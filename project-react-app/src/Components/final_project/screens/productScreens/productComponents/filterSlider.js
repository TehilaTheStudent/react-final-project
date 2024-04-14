import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';



function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 20;





export default function FilterSlider({filterParameters,setFilterParameters}) {



    // const [value2, setValue2] = React.useState([0, 200]);

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 200 - minDistance);
                setFilterParameters({...filterParameters,values:[clamped, clamped + minDistance]})
                // setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setFilterParameters({...filterParameters,values:[clamped - minDistance, clamped]})
                // setValue2([clamped - minDistance, clamped]);

            }
        } else {
            // setValue2(newValue);
            setFilterParameters({...filterParameters,values:newValue})
        }
    };
    //=-


    return (<>
        <Box sx={{ width: 300 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <span>min</span>
                <Slider
                
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={filterParameters.values}
                    onChange={handleChange2}
                    min={0}
                    max={200}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    valueLabelDisplay="on"
                    disableSwap
                />
                <span>max</span>
            </Stack>
        </Box>

    </>
    );
}