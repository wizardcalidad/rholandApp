import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import  {Search} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";

import ProTip from "./components/ProTip";
import Copyright from "./components/Copyright";

import {baseUrl} from "./utils/constants";
import useStyles from "./style/style";
import {ModelParametersContext} from "./contexts/ModelParametersContext";

function App() {
    const classes = useStyles();
    const [bgColor, setBgColor] = useState(classes.neutral);
    const [predictedText, setPredictedText] = useState("...");
    const [modelParameters, setModelParameters] = useContext(ModelParametersContext)
    const [serverStatus, setServerStatus] = useState(false)

    const bgColors = {
        "positive": classes.positive,
        "negative": classes.negative,
        "neutral": classes.neutral
    }

    const handlePrediction = (responseData) => {
        setPredictedText(modelParameters["text"])
        setBgColor(bgColors[responseData["output"]]);
    }

    const predict = async () => {
        console.log(JSON.stringify(modelParameters));
        const response = await axios({
            method: 'post',
            url: `${baseUrl}/predict`,
            data: modelParameters
        });

        const responseData = await response.data;
        return responseData;
    }

    const handleSubmit = event => {
        event.preventDefault();
        setPredictedText("... Loading ...");
        setBgColor(classes.neutral);

        predict().then(responseData => {
            handlePrediction(responseData);
        });
    };

    const handleChange = event => {
        setModelParameters({
            ...modelParameters,
            "text": event.target.value
        })

    };

    // on component mount
    useEffect(() => {
        setPredictedText("... Testing server with a ping ...");
        setBgColor(classes.neutral);

        // ping server
        axios({
            method: 'get',
            url: `${baseUrl}/ping`,
        }).then(r => {
            console.log(r);
            if(r.status === 200) {
                setPredictedText("... Server Ready to Go! ...");
                setBgColor(classes.positive);
                setServerStatus(true);

            }else{
                setPredictedText("... Server unavailable! Refresh page to Try again! ...");
                setBgColor(classes.negative);
                setServerStatus(false);
            }
        }).catch(e => {
            setPredictedText("... Server unavailable! Refresh page to Try again! ...");
            setBgColor(classes.negative);
            setServerStatus(false);
        });
    }, [classes.neutral, classes.negative, classes.positive]);

    return (
        <Box className={classes.root}>
            <Box className={classes.box}>
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                  Sentiment Analyser
                </Typography>

                <form noValidate autoComplete="off">
                    <Box className={classes.form}>
                      <TextField
                          id="outlined-search"
                          InputProps={(serverStatus)? {
                              endAdornment: <InputAdornment position="start" onClick={handleSubmit}>
                                  <Search className={classes.btn} fontSize="default"  />
                              </InputAdornment>,
                          } : {}}
                          defaultValue={modelParameters["text"]}
                          className={classes.input}
                          label="Search field"
                          type="search"
                          disabled={!serverStatus}
                          required={true}
                          onChange={handleChange}
                          variant="outlined" />
                    </Box>
                    <Box className={`${classes.predicted} ${bgColor}`}>
                        {predictedText}
                    </Box>
              </form>
          <ProTip />
          <Copyright />
          </Box>
        </Box>
        );
}

export default App;
