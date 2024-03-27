import { useState, useEffect } from "react";

import service from "@service/config";
import Loading from "@components/ui/Loading";
import EventCard from "@components/event/EventCard";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from "react-router-dom";

function UpcomingEventsList() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  useEffect(() => {
    getUpcomingEvents();
  }, []);

  const getUpcomingEvents = async () => {

    if (!isLoading) setIsLoading(true)

    try {
      const response = await service.get("/event/upcoming");
      console.log(response.data)
      setUpcomingEvents(response.data)
      setTimeout(() => setIsLoading(false), 700)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Container>
      <Typography variant="h4"gutterBottom>Próximos eventos</Typography>
      <Box sx={{display:"flex", justifyContent: "space-between"}}>
        <Button onClick={() => navigate(-1)}><ArrowBackIcon/></Button>
        <Button onClick={() => getUpcomingEvents()} disabled={isLoading}><RefreshIcon/></Button>
      </Box>
      <Box>
        {isLoading ? <Loading /> : upcomingEvents.map((event) => <EventCard key={event._id} event={event}/>)}
        {!isLoading && upcomingEvents.length === 0 && <Typography>No hay próximos eventos</Typography>}
        {/* //! test if it works */}
        {!isLoading && <Link to="/event"><Button>Ver más eventos antiguos</Button></Link> }
      </Box>
    </Container>
  );
}

export default UpcomingEventsList;
