import { Button, Paper, Typography } from "@material-ui/core"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCreator } from "../services/creator"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { AuthContext } from "../context/AuthContext"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "80vh",
    padding: theme.spacing(2),
  },
  creatorImage: {
    height: 350,
    width: 350,
    borderRadius: "50%",
    margin: theme.spacing(4),
  },
  name: {
    margin: theme.spacing(2),
  },
  bio: {
    margin: theme.spacing(4),
  },
  addContentButton: {
    margin: theme.spacing(4),
  },
}))

export default function Creator() {
  const classes = useStyles()
  const params = useParams()
  const [creator, setCreator] = useState()
  const [fileInput, setFileInput] = useState()
  const [canEdit, setEdit] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState()
  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (params) {
      getCreator(params.creatorId).then(setCreator)
    }
  }, [params])

  useEffect(() => {
    if (user && creator) {
      if (user.uid === creator.firebaseId) {
        setEdit(true)
      }
    }
  }, [creator, user])

  useEffect(() => {
    const storage = getStorage()
    const reference = ref(storage, `profile/${params.creatorId}`)
    getDownloadURL(reference).then(setProfileImageUrl)
  }, [])

  const fileOnChange = (e) => {
    if (e.target.files && e.target.files.length) {
      const storage = getStorage()
      const reference = ref(storage, `profile/${params.creatorId}`)
      uploadBytes(reference, e.target.files[0]).then((res) => {
        console.log(res.ref)
        getDownloadURL(res.ref).then(setProfileImageUrl)
      })
    }
  }

  return (
    <Paper className={classes.paper}>
      {profileImageUrl && (
        <img
          src={profileImageUrl}
          onClick={() => canEdit && fileInput.click()}
          className={classes.creatorImage}
          style={{
            cursor: canEdit ? "pointer" : "",
          }}
        />
      )}
      {!profileImageUrl && canEdit && (
        <Button onClick={() => fileInput.click()}>Upload Profile</Button>
      )}
      <input
        style={{ display: "none" }}
        type="file"
        ref={setFileInput}
        onChange={fileOnChange}
      />
      <Typography classname={classes.name} variant="h4" component="h2">
        {creator?.name}
      </Typography>
      <Typography className={classes.bio} variant="body1">
        {creator?.bio}
      </Typography>

      <Button className={classes.addContentButton} variant="contained" color="primary" size="large">
        Add Content
      </Button>
    </Paper>
  )
}
