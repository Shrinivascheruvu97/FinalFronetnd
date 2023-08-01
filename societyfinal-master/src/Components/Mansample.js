import LogoutIcon from '@mui/icons-material/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { Dropdown } from 'react-bootstrap';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentsIcon from '@mui/icons-material/Payments';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import EventIcon from '@mui/icons-material/Event';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PollIcon from '@mui/icons-material/Poll';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Mansample = () => {

  const navigate = useNavigate();

  const handleClick2 = () => {
    navigate('/selfupdate', { state: { role: 'resident' } });
  };

  const handleClick3 = () => {
    // Add logic for handleClick3
  };

  const [isLoggedIn1, setIsLoggedIn1] = useState(false);

  const logout = () => {
    localStorage.removeItem('isLoggedIn1');
    setIsLoggedIn1(false);
    toast.success('Successfully Logged out!');
    //navigate('/');
  };

  {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
     
{/* event Details Modal */}
{/* <Modal show={showModal1} dialogClassName='custom-modal' onHide={() => setShowModal1(false)}>
<Modal.Header closeButton>
  <Modal.Title>Events</Modal.Title>
  <div class="col-sm-4">
                      <button type="button" onClick={handleAddEvent} class="btn btn-info add-new"><i class="fa fa-plus"></i> Add New</button>
                  </div>
</Modal.Header>
<Modal.Body>
  <table className='table table-bordered'>
    <thead>
      <tr>
        <th>Event Id</th>
        <th>Event Name</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>Status</th>
        <th>Actions</th>

      </tr>
    </thead>
    <tbody>
      {events.map((event) => (
        <tr key={event.eventId}>
          <td>{event.eventId}</td>
          <td>{event.eventName}</td>
          <td>{event.fromDate}</td>
          <td>{event.toDate}</td>
          <td>{event.status}</td>
          
          <td>
            
            <Button variant='danger' onClick={() => handleDeleteEvent(event.eventId)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</Modal.Body>
<Modal.Footer>
  <Button variant='secondary' onClick={() => setShowModal1(false)}>
    Close
  </Button>
</Modal.Footer>
</Modal>


<Modal show={showAddModal} onHide={handleAddEvent}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEventFormSubmit}>
          <Form.Group controlId='eventName'>
            <Form.Label>Event Name</Form.Label>
            <Form.Control type='text' name='eventName' value={newEvent.eventName} onChange={handleEventFormChange} />
          </Form.Group>
          <Form.Group controlId='fromDate'>
            <Form.Label>From Date</Form.Label>
            <br />
            
            <DatePicker
      selected={newEvent.fromDate}
      onChange={(date) => handleFromDateChange(date)}
      showTimeSelect
      dateFormat='Pp'
    />
          </Form.Group>
          <Form.Group controlId='toDate'>
            <Form.Label>To Date</Form.Label>
            <br />
            
            <DatePicker
      selected={newEvent.toDate}
      onChange={(date) => handleToDateChange(date)}
      showTimeSelect
      dateFormat='Pp'
    />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal> */}
    

    const handleDeleteEvent = async (eventId) => {
      try {
        await axios.delete(`http://localhost:9001/members/delete/events/${eventId}`);
        toast.success('Event deleted successfully.');
  
        // Refresh the events list
        // const userId = parseInt(localStorage.getItem('userId'));
        // handlefetchData90(userId);
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete event. Please try again.');
      }
    };

const renderAccounts = () => {

  if (!showTable91) {
    return null;
  }

  return (
    <div style={{marginLeft: '10px', marginRight: '10px'}}>
    <table className='table table-bordered' style={{ border: '2px solid #ccc'}}>
    <thead>
      <tr>
        <th>Event Id</th>
        <th>Event Name</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>Status</th>
        <th>Actions</th>

      </tr>
    </thead>
    <tbody>
      {eventsData.map((event) => (
        <tr key={event.eventId}>
          <td>{event.eventId}</td>
          <td>{event.eventName}</td>
          <td>{event.fromDate}</td>
          <td>{event.toDate}</td>
          <td>{event.status}</td>
          
          <td>
            
            <button className='btn btn-primary' onClick={() => handleDeleteEvent(event.eventId)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
}

const [showTable90, setShowTable90] = useState(false);
const [showTable91, setShowTable91] = useState(false);
const [eventsData, setEventsData] = useState([]);

const hancleDecision90 = () => {
  setShowTable90((prevShowTable) => !prevShowTable);
  setEventsData([]);
};

const hancleDecision91 = () => {
  setShowTable91((prevShowTable) => !prevShowTable);
  setEventsData([]);
};

const renderTable90 = () => {
  if (!showTable90) {
    return null;
  }

  const handlefetchData90 = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:9001/members/events/user/6`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const results = response.data;
      setEventsData(results);
      console.log(eventsData);
      // alert('Results Fetched Successfully!');
    }catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Invalid Member ID!");
      } else {
          toast.error("Unknown Error!");
      }
    }
  };

  return (
    
    <div>
    <form onSubmit={handlefetchData90}><br/>
    <table className="table" style={{ border: '2px solid #ccc', backgroundColor: 'wheat' }}>
    
          <div style={{ marginLeft: '10px', marginTop: '10px'}}>
          {renderAccounts()}
          {/* <button type='submit'> <b>Fetch Events</b></button> <span>  </span> */}
          <button className='btn ' style={{marginLeft: '5px', color: 'teal', fontSize: '25px' }} onClick={hancleDecision91}> {showTable91 ? 'Close' : 'Fetch_Bookings'} </button>          
          </div>
          <br/>
          <button className='btn btn-primary' style={{ marginBottom: '20px', marginLeft: '26px', fontSize: '20px' }} onClick={handleClick3}> Create_Event </button>
          
          <button className='btn btn-primary' onClick={hancleDecision90} style={{ marginBottom: '20px', marginLeft: '26px', fontSize: '19px' }}> Close</button>
          
      </table>
      </form>
      </div>
    
  );
// }
};


//---------------------------------------------------------------------------------------------------------------------------

const renderPieChart = (role) => {
  const filteredData = contestantsData.filter((data) => data.role === role);
  const data = filteredData.map((data) => ({
    name: data.contestant_name,
    value: data.candidate_votes,
  }));

  if (filteredData.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <p style={{ fontWeight: 'bold', margin: 0 }}>No data available</p>
    </div>
    );
  }

  const colors = ['#FF6384', '#36A2EB', '#FFCE56'];

  return (
    <div>
        <PieChart width={440} height={360}>
          <Pie
            dataKey="value"
            data={data}
            fill="#8884d8"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="bottom"
                  
                  style={{ fontWeight: 'bold', fill: ["black"] }}
                >
                  <tspan>{data[index].name}</tspan>
              <tspan x={x} dy={15}>
                votes: {value}
              </tspan>
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
    </div>
  );
};

const [showTable4, setShowTable4] = useState(false);
const [contestantsData, setContestantsData] = useState([]);

const hancleDecision = () => {
  setShowTable4((prevShowTable) => !prevShowTable);
  setContestantsData([]);
};

const [electionId, setElectionId] = useState({

  election_id: ''
});

const [isButtonDisabled, setIsButtonDisabled] = useState(true);

const renderTable4 = () => {
  if (!showTable4) {
    return null;
  }

const handleElectionId = (event) => {

  const { name, value } = event.target;
    setElectionId({ ...electionId, [name]: value });

    // Enable or disable the button based on the input value
    setIsButtonDisabled(value.trim() === '');
}
  

  const handlefetchData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:9001/ballotbox/oneballot/${electionId.election_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const results = response.data;
      setContestantsData(results);
      console.log(contestantsData);
      // alert('Results Fetched Successfully!');
    }catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Invalid Election ID!");
      } else {
          toast.error("Unknown Eroor!");
      }
    }
  };

  return (
    
    <div>
    <form onSubmit={handlefetchData}><br/>
    <table className="table table-bordered" style={{ border: '2px solid #ccc', padding: '8px' }}>
    {/* <p>No Data Available</p> */}
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
        {/* <form style={{  marginRight: '5px', marginLeft: '5px'}}> */}
          <h4>
            <u style={{ color: 'mediumseagreen' }}>President</u>
          </h4><br/><br/><br/>
          {renderPieChart('president')}
        {/* </form> */}
      </div><br/>
      <div>
        {/* <form> */}
          <h4>
            <u style={{ color: 'orange' }}>Secretary</u>
          </h4><br/><br/><br/>
          {renderPieChart('secretary')}
        {/* </form> */}
      </div><br/>
      <div>
        {/* <form > */}
          <h4>
            <u style={{ color: 'darkviolet' }}>Treasurer</u>
          </h4><br/><br/><br/>
          {renderPieChart('treasurer')}
        {/* </form> */}
        </div>
      </div><br/><br/>
      </table>

      <input onChange={handleElectionId} type='number' placeholder='Election ID' id='election_id' name='election_id' 
        style={{ border: '2px solid #ccc', padding: '8px' }} required />

      <button type='submit' disabled={isButtonDisabled} className={isButtonDisabled ? 'disabled' : ''}> <b>Fetch Results</b></button>
      <br/>
      <button onClick={hancleDecision}> <b>Close</b> </button>
      </form>
      </div>
    
  );
// }
};


//-----------------------------------------------------------------------------------------------------------------------


  return (
    <div className='container mt-4'>
    
    <div class="navbar" style={{ display: 'flex', justifyContent: 'left'}}>
        
            <div style={{ marginLeft: '20px' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant='light'>
                            <AccountBoxIcon /><span>  </span>
                            My Profile
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleClick2}> <CameraFrontIcon /><span>  </span>Update Profile</Dropdown.Item><hr/>
                            <Dropdown.Item onClick={logout}> <LogoutIcon /> LogOut</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            </div>

            <div style={{ marginLeft: '20px' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant='light'>
                            <AppRegistrationIcon /><span>  </span>
                            Operations
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleClick3}><ContentPasteSearchIcon /><span>  </span>Complaints/Suggestions</Dropdown.Item><hr/>
                            <Dropdown.Item onClick={hancleDecision90}><EventIcon /><span>  </span>Events</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            </div>

            <div style={{ marginLeft: '20px' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant='light'>
                            <PaymentsIcon /><span>  </span>
                            Payments
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleClick3(true)}>
                                <AccountBalanceIcon /> Accounts</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            </div>

            <div style={{ marginLeft: '20px' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant='light'>
                            <HowToVoteIcon /><span>  </span>
                            Elections
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        
                            <Dropdown.Item onClick={hancleDecision}>
                                <PollIcon /> Results</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            </div>
        
        </div>
        {renderTable4()}
        {renderTable90()}
        </div>
  );
}
