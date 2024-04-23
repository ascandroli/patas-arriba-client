import { useEffect, useRef, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";

function EventLeaveButton({handleLeaveEvent, event}) {

  const [ showAreYouSureButtons, setShowAreYouSureButtons ] = useState(false)

  const cardRef = useRef(null)

  const handleShowLeaveCard = () => {
    setShowAreYouSureButtons(!showAreYouSureButtons)
  }

  useEffect(() => {
    if (showAreYouSureButtons && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAreYouSureButtons]);

  return (
    <>
      <hr />

      <Button
        variant="outlined"
        color="error"
        onClick={handleShowLeaveCard}
        disabled={event.status !== "open"}
      >Salir del evento</Button>

      <br />

      {event.status === "closed" && (
        <Alert severity="warning">
          Este evento ya ha sido cerrado. Si no puedes ir por cualquier razón, comunicate con el organizador o agrega un mensaje al evento
        </Alert>
      )}

      {showAreYouSureButtons && (
        <Card ref={cardRef} raised sx={{width: "100%"}}>

          <Alert severity="warning">
            Estas seguro que deseas salir? Si tienes un grupo de coche creado,
            esto eliminará el grupo.
          </Alert>

          <Button color="error" onClick={handleLeaveEvent}>
            Si
          </Button>

          <Button color="primary" onClick={() => setShowAreYouSureButtons(false)}>
            No
          </Button>

        </Card>
      )}

    </>
  );
}

export default EventLeaveButton;