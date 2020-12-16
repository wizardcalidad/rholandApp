import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '0px',
        padding: '0px'
    },
    neutral: {
        backgroundColor: "grey"
    },
    negative: {
        backgroundColor: "red"
    },
    positive: {
        backgroundColor: "green"
    },
    predicted: {
        width: '100%',
        margin: '0%',
        color: "white",
        textAlign: "center",
        padding: "3px",
        borderRadius: "3px"
    },
    box: {
        width: '75%',
        margin: '15% auto auto auto',
    },
    btn: {
      cursor: 'pointer',
        color: 'blue'
    },
    form: {
        display: 'flex',
        margin: 'auto',
        width: '100%'
    },
    input: {
        margin: '0%',
        width: '100%',
        border: 'none',
        height: '100px'
    },
}))

export default  useStyles;