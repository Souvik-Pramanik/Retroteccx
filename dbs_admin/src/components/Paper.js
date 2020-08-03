import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StarRatings from 'react-star-ratings';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
        justifyContent: 'center',
    },
}));

export default function PaperUser({data}) {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Paper elevation={ 9 } style={ {height: 500, width: window.innerWidth * 0.5, } }>
                <div class="pa3">
                    <div class="flex justify-center bb">
                        <p class="pa1 fw3 f3 lh-copy">
                            Report ID: { data.status_id }
                        </p>
                    </div>
                    <div>
                        <p class="fw3">
                            User Rating:
                        </p>
                        <StarRatings
                            starRatedColor="rgba(22,87,210,1)"
                            rating={ data.user_rating }
                            starDimension="40px"
                            starSpacing="15px"
                        />
                    </div>
                    <div>
                        <p class="fw3">
                            User Feedback:       
                        </p>
                        <p class="fw5 f4 lh-copy">
                            { data.user_feedback }
                        </p>
                    </div>
                </div>
            </Paper>
        </div>
    );
}