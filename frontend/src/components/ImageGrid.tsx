// import {GridList, GridTile} from "material-ui";

import './ImageGrid.css'
import React, {ComponentProps, CSSProperties, useState} from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import PlayerIcon from '@material-ui/icons/PlayCircleOutline';
import FormControl from '@material-ui/core/FormControl'
import {describeImage, getImageUrl} from "../utils/image";
import {ClassConfig, ImageConfig, ImageData} from '../utils/interface'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ExpanderIcon from '@material-ui/icons/ExpandMore';
import CloseExpanderIcon from '@material-ui/icons/ExpandLess';
import InfoIcon from "@material-ui/icons/Info";
interface ImageGridProps {
    onClickPlay: (config: ImageConfig) => void,
    imageConfigs: Array<ImageConfig>,
    setFocusImage: (image: ImageConfig) => void
}

enum SortingWay {
    NoSorting, High2Low, Low2High,
}

function ImageGrid({onClickPlay, imageConfigs, setFocusImage}: ImageGridProps) {
    let possibleViews = ['A', 'B', 'C', 'D'];
    const [showingClass, setShowingClass] = useState<string>();
    let height = 680;
    let width = 960;
    let columnNumber = 3;
    let spacing = 80;
    let gridImageWidth = (width - (columnNumber - 1) * spacing) / columnNumber;
    let gridImageHeight = gridImageWidth * 54 / 96;

    let expanderWidth = Math.round(width - spacing*(columnNumber-2) )
    const [expandingImage, setExpandingImage] = useState<ImageConfig>();
    const [useDemoData, setUseDemoData] = useState<boolean>(false);
    let validClasses : Array<string> = [];
    for (let image of imageConfigs){
        if (validClasses.includes(image.class)){

        }else{
            validClasses.push(image.class)
        }
    }
    if(showingClass){
        imageConfigs = imageConfigs.filter(c=>c.class===showingClass)
    }
    imageConfigs = imageConfigs.slice(0, 100)
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
                // paddingTop: "10px",
                paddingBottom: "20px",
                // paddingLeft: "1px",
                // paddingRight: "1px",
                marginLeft: "30px",
                marginTop: "10px",
                marginRight: "30px",
                marginBottom: "10px",
                height: "900px"
                // overflowY: "scroll"
            },
            gridList: {
                width: "100%",
                height: "100%",
                overflow: "scroll",
                marginTop: "20px",
                marginLeft: "20px"

            },
            icon: {
                color: 'rgba(255, 255, 255, 0.54)',
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
            header: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                background: "#F1F1F1",
                paddingLeft: "28px",
                paddingBottom: "4px",
                alignItems: "flex-end",
                flexGrowth: 0,
                height: "100px"
            },
            headerItem: {
                marginLeft: "5px",
                marginBottom: "3px"
            },
            gridContainer: {
                width: "100%",
                flexGrowth: 2,
                overflowY: "scroll",
                height: height + "px",
                paddingTop: "20px"
            },
            gridRow: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: "15px"
            },
            gridExpander: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                // justifyContent: "space-evenly",
                marginRight: "10px",
                marginLeft: "10px",
                paddingTop: "13px",
                paddingBottom: "14px",
                marginBottom: "4px",
                background: "#F1F1F1",
                width: expanderWidth + "px",

            },
            gridImageContainer: {
                // background: "black",
                // opacity: 0.4,
                // background: "#2877cc",
                borderRadius: "10px",
                paddingTop: "5px",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingBottom: "5px",
            },
            gridImageItem: {
                // marginRight: spacing + "px",
                width: gridImageWidth + "px",

                position: "relative",
                left: 0,
                top: 0
            },
            gridImageExpander: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: "4px",
                background: "steelblue"
            },
            gridImageBar: {
                background: "black",
                opacity: 0.4,
                width: "100%",
                height: Math.round(gridImageHeight * 0.4) + "px",
                position: "absolute",
                left: 0,
                bottom: 0,
                // top : Math.round(gridImageHeight * 0.4 + 3 - 20) + "px" ,
                // marginBottom: Math.round(gridImageHeight * 0.4 + 3) + "px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            },
            gridImageText: {
                opacity: 1,
                color: "white",

            },
            gridImageTitle: {},
            gridImageInfo: {
                fontSize: 10
            },
            gridExpanderContainer : {
                position: "relative",
                left: 0,
                top: 0,
                height: Math.round(gridImageHeight * 1.4) + "px"

            }

        }),
    );
    const classes = useStyles();

    const [metricShowing, setMetricShowing] = useState<string>();
    const [sorting, setSorting] = useState<SortingWay>()
    const handleMetricChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setMetricShowing(event.target.value as string);
    };

    const handleShowingClassChange = (event: React.ChangeEvent<{value: unknown}>) => {
        console.log(event.target.value as string)
        setShowingClass(event.target.value as string)
    }


    let defaultColumn = "Clock";

    let realShowingMetric = metricShowing ? metricShowing : defaultColumn;
    if (realShowingMetric) {

    }

    let sortedImages = imageConfigs;


    let handleSwitchChange = (sortingWay: SortingWay) => {
        if (sortingWay === sorting) {
            setSorting(SortingWay.NoSorting);
        } else {
            setSorting(sortingWay);
        }
        // setSorting(SortingWay.High2Low);
    }

    let renderImage = (tile: ImageConfig, i: number) => {
        let {title} = describeImage(tile);
        let fileId = tile.id;
        let realValue = 0

        let subtitle = ""


        let imageUrl = getImageUrl(tile);

        return (
            <div className={classes.gridImageContainer}>
            <div className={classes.gridImageItem}>
                <img width={gridImageWidth + "px"} height={gridImageHeight+"px"} src={imageUrl} alt={""}/>
                <div className={classes.gridImageBar}>
                    <div></div>
                    <div className={classes.gridImageText}>
                        <span className={classes.gridImageTitle}> {title} </span>
                        <br/>
                        <span className={classes.gridImageInfo}> {subtitle} </span>
                    </div>
                    <div>

                        <IconButton aria-label={`info about ${describeImage(tile).title}`}
                                    className={classes.icon}>
                            <PlayerIcon onClick={() => onClickPlay(tile)}/>
                        </IconButton>
                        <IconButton aria-label={`info about ${describeImage(tile).title}`}
                                    className={classes.icon}>
                        </IconButton>
                    </div>

                </div>
           </div>
            </div>
        )
    }
    let renderRow = (images: Array<ImageConfig>, rowId: number) => {
        return (
            <div className={classes.gridRow}>
                {images.map((tile, i) => renderImage(tile, i))}
            </div>
        )
    }

    let renderClassSelect = (classname: string) => {
        return (<MenuItem value={classname}>{classname}</MenuItem>)
    }
    let renderImages = () => {
        return (
            <GridList cellHeight={160} className={classes.gridList} cols={6}>
                {imageConfigs.map((image) => (
                    <GridListTile key={image.url} cols={ 1}>
                        <img src={getImageUrl(image)} alt={image.class} />
                        <GridListTileBar
                            title={image.class}
                            subtitle={<span>super: {image.class}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${image.id}`} className={classes.icon}
                                    onClick={
                                        ()=>{
                                            setFocusImage(image)
                                        }
                                    }
                                >

                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>

        )

    }
    return (
        <Card className={classes.root}>
            <div className={classes.header}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={showingClass ? showingClass : defaultColumn}
                        onChange={handleShowingClassChange}
                    >
                        {
                            validClasses.map(renderClassSelect)
                        }
                   </Select>
                </FormControl>
                {/*<FormControlLabel className={classes.headerItem}*/}
                {/*                  control={*/}
                {/*                      <Switch*/}
                {/*                          checked={sorting === SortingWay.High2Low}*/}
                {/*                          onChange={() => handleSwitchChange(SortingWay.High2Low)}*/}
                {/*                          name="high2low"*/}
                {/*                          color="primary"*/}
                {/*                      />*/}
                {/*                  }*/}
                {/*                  label="High"*/}
                {/*/>*/}
                {/*<FormControlLabel className={classes.headerItem}*/}
                {/*                  control={*/}
                {/*                      <Switch*/}
                {/*                          checked={sorting === SortingWay.Low2High}*/}
                {/*                          onChange={() => handleSwitchChange(SortingWay.Low2High)}*/}
                {/*                          name="low2high"*/}
                {/*                          color="primary"*/}
                {/*                      />*/}
                {/*                  }*/}
                {/*                  label="Low"*/}
                {/*/>*/}
                {/*<FormControlLabel className={classes.headerItem}*/}
                {/*                  control={*/}
                {/*                      <Switch*/}
                {/*                          checked={useDemoData}*/}
                {/*                          onChange={() => {setUseDemoData(!useDemoData)}}*/}
                {/*                          name="demoData"*/}
                {/*                          color="primary"*/}
                {/*                      />*/}
                {/*                  }*/}
                {/*                  label="Demo Data"*/}
                {/*/>*/}
            </div>
            {/*<div className={classes.gridContainer}>*/}
                {
                    renderImages()
                }


            {/*</div>*/}

        </Card>
    )

}

export default ImageGrid;