import {
  Input,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core"
import { Button, CircularProgress } from "@material-ui/core"
import { pink } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/styles"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import React, { useContext, useState } from "react"
import { useHistory } from "react-router"
import { AuthContext } from "../context/AuthContext"
import { createContent } from "../services/content"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "70ch",
    minHeight: "200px",
  },
  videoUpload: {
    maxHeight: "30vh",
  },
}))

export const CreateContent = () => {
  const classes = useStyles()
  const [fileInput, setFileInput] = useState()
  const { user } = useContext(AuthContext)
  const [fileUrl, setFileUrl] = useState()
  const [progress, setProgress] = useState()
  const [summary, setSummary] = useState()
  const history = useHistory()
  const fileOnChange = (e) => {
    if (e.target.files && e.target.files.length) {
      const storage = getStorage()
      const reference = ref(
        storage,
        `profile/${user.uid}/${new Date().toISOString()}`
      )
      const task = uploadBytesResumable(reference, e.target.files[0])
      task.then((t) => {
        getDownloadURL(t.ref).then(setFileUrl)
        setProgress(undefined)
      })
      task.on("state_changed", (t) => {
        if (t.state === "running") {
          setProgress(Math.floor((t.bytesTransferred / t.totalBytes) * 100))
        }
      })
    }
  }

  const onSubmit = () => {
    createContent(summary, fileUrl).then(() => {
      history.push(`/creator/${user.uid}`)
    })
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">Upload Content</Typography>
      <TextField
        className={classes.textInput}
        label="Summary"
        multiline
        rows={8}
        onChange={(e) => setSummary(e.target.value)}
        variant="outlined"
      />
      {!fileUrl &&
      <Button
        onClick={() => fileInput.click()}
        variant="contained"
        color="primary"
        size="large"
      >
        Upload Video
      </Button>
}
      {progress && <Button disabled>{progress}%</Button>}
      <CircularProgress variant="determinate" value={progress} />
      {fileUrl && (
        <video width="640" height="480" controls>
          <source src={fileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <input
        style={{ display: "none" }}
        type="file"
        ref={setFileInput}
        onChange={fileOnChange}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => onSubmit()}
        disabled={!fileInput}
      >
        Submit
      </Button>
    </div>
  )
}
