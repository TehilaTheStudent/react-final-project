// import { Grid, GridColumn } from "semantic-ui-react"
import FilterSlider from "./filterSlider"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function FilterPanel({arrProducts ,setFilterParameters, filteredProducts, filterParameters, showFiltered, beEnabled, handleFilter, handleUnfilter }) {
    return (<>
        <div style={{
            // border: '2px solid orange',
            position: "sticky",
            background: "#d4d4d5d4",
            top: "15px",
            zIndex: 1,
            paddingTop:'15px',
            paddingRight:'10px',
            paddingBottom:'10px'
            // width: "100vw",
        }}>


            <Stack direction="row-reverse" spacing={2} justifyContent="flex-start" alignItems="center">


                <TextField fullWidth  dir='rtl'
                    sx={{ width: 120, backgroundColor: 'white' }} size="small" id="outlined-search" label="שם מוצר" type="search" variant="filled" onChange={(e) => { setFilterParameters({ ...filterParameters, name: e.target.value }) }} name="name" value={filterParameters.name} />

                <FilterSlider setFilterParameters={setFilterParameters} filterParameters={filterParameters} ></FilterSlider>

                <Button variant="contained" endIcon={<FilterAltIcon />} onClick={handleFilter} size={'large'} color="success">
                    סנן
                </Button>
                <Button variant="contained" startIcon={<FilterAltOffIcon />} onClick={handleUnfilter} size={'large'} color="error">
                    ללא סינון
                </Button>
                {showFiltered ? <span>{filteredProducts.length} :תוצאות</span> : <span> {arrProducts.length}  :כל המוצרים</span>}

            </Stack>

        </div>
    </>)
}