export default function CreatorPhoto(props) {
    const {photoUrl, creatorName } = props
  return (
    <>
      <img src={photoUrl} alt={creatorName} width="250" />
    </>
  )
}
