import React, {useContext} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {ModelParametersContext} from "../contexts/ModelParametersContext";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        width: 150,
        height: 50,

    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

function Dropdown({name, options}) {
    const classes = useStyles();
    const [modelParameters, setModelParameters] = useContext(ModelParametersContext)

    const handleChange = (event) => {
        setModelParameters({
            ...modelParameters,
            [name]: event.target.value
        })
    };

    return (
        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">{name}</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={modelParameters[name]}
                onChange={handleChange}
            >
                {Object.keys(options).map(
                    key => (
                        <MenuItem key={key} value={options[key]}>{key}</MenuItem>
                    )
                )}
            </Select>
        </FormControl>
    )
}

export default Dropdown;