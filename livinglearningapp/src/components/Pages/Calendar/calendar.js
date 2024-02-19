import React from "react";
import { Navbar, Nav, Container,NavDropdown,Row,Col,Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';




function EventsCalendar(){


  const navigate = useNavigate();
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");


  const session = useSession(); // tokens
  const supabase = useSupabaseClient(); //talk to supabase
  const {isLoading} = useSessionContext();



  useEffect(() => {
    // Function to get the current date and time
    const getCurrentDateTime = () => {
      const currentDate = new Date();
      return currentDate;
    };

    // Set start and end states to current date and time
    setStart(getCurrentDateTime());
    setEnd(getCurrentDateTime());
  }, []);


  if(isLoading){
    return<></>
  }


  async function googleSignIn(){
    const {error} = await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        redirectTo: 'http://localhost:3000/calendar',
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error){
      alert("Error logging in to Google provider with Supabase")
      console.log(error);
    }
  }
  async function signOut(){
    await supabase.auth.signOut();
  }

  async function createCalendarEvent(){
    console.log("creating calendar event");
    const event ={
      'summary': eventName,
      'start': {
        'dateTime': start.toISOString(), //Date to ISO string
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone //time zone
        
      },
      'end': {
        'dateTime': end.toISOString(), //Date to ISO string
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone //time zone
        
      }
    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events",{
      method: 'POST',
      headers:{
        'Authorization': 'Bearer ' + session.provider_token //Access token for google
      },
      body: JSON.stringify(event)
    }).then(data=>{
      return data.json();
    }).then((data)=>{
      console.log(data);
    })
  }

  console.log(session);
  console.log(start);
  console.log(end);
  console.log(eventName);

  return(
    <div className="Parent">
      <div className="Navbar">
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Container>
                        <Navbar.Brand href="/customer-home">
                            Living and Learning
                        </Navbar.Brand>
                    </Container>
                </Navbar>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            {session?
            <>
              <h2>Hey there {session.user.email}</h2>
      
              <iframe
                src="https://calendar.google.com/calendar/embed?src=oll.user741%40gmail.com&ctz=America%2FToronto"
                style={{ border: 0, margin: '0 auto', display: 'block' }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
              ></iframe>
              <p>Start Time</p>
              <DateTimePicker onChange={setStart} value={start} disableClock={true}/>
              <p></p>
              <p>Start Time</p>
              <DateTimePicker onChange={setEnd} value={end} disableClock={true}/>
              <p></p>
              <input type="text" onChange={(e)=>setEventName(e.target.value)}/>
              <hr/>
              <button onClick={()=>createCalendarEvent()}>Create Event</button>
              <hr/>
              <button onClick={()=>signOut()}>Sign Out</button>
            </>
            :
            <>
              <button onClick={()=>googleSignIn()}>Sign In With Google</button>
            </>
          }
        </div>
    </div>
  );
}

export default EventsCalendar