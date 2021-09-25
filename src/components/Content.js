import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

export const Content = (props) => {
  const classes = useStyles();
  const { summary, file } = props

  return (
    <Card className={classes.card} sx={{ maxWidth: 345 }}>
      <video width="320" height="240" controls>
          <source src={props.file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <CardMedia
        component="video"
        height="140"
        src={props.file}
        alt="video"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.summary}
        </Typography>
      </CardContent>
    </Card>
  )
};
