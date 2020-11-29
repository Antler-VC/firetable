import React from 'react'
import {  createStyles,
    makeStyles,Paper,Button,Grid} from '@material-ui/core'
import {usePerformance} from './index'
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)",
    },

    paper: {
      height: 64,
      borderRadius: 32,
      padding: theme.spacing(0, 1),
      [theme.breakpoints.up("lg")]: { paddingRight: theme.spacing(2) },

      zIndex: theme.zIndex.modal,
      width: 470,
      maxWidth: "100vw",
      overflowX: "auto",
    },

    grid: {
      height: "100%",
      marginTop: 0,
      marginBottom: 0,
    },
    spacer: { width: theme.spacing(2) },

    selectedContainer: {
      flexBasis: 206,
      flexShrink: 0,
    },
    selected: {
      color: theme.palette.text.disabled,
      fontFeatureSettings: '"tnum"',
      userSelect: "none",

      display: "inline-block",
      marginRight: theme.spacing(1),
      minWidth: 150,
    },

    dropdown: {
      minWidth: 120,
      margin: 0,
    },
    dropdownLabel: {
      left: theme.spacing(1.5),
      top: "50%",
      transform: "translateY(-50%) !important",

      ...theme.typography.body1,
    },
    dropdownLabelFocused: {
      "$dropdownLabel&": { color: theme.palette.text.primary },
    },
    select: {
      paddingTop: "6px !important",
      paddingBottom: "7px !important",
    },
    dropdownMenu: { marginTop: theme.spacing(-3) },
  })
);


const PerformanceDock = ()=>{
    const classes = useStyles();
    const performanceContext = usePerformance()
   

    return (
        <div className={classes.root}>

            <Paper elevation={8} className={classes.paper}>
              <Grid
                container
                alignItems="center"
                wrap="nowrap"
                className={classes.grid}
              >
                <Button>Clear</Button>
                <Button onClick={performanceContext.exportPerformance}>Export</Button>
              </Grid>
            </Paper>

        </div>)
}

export default PerformanceDock