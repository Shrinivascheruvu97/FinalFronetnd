

import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Dropdown, Form, Modal, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
// import { Pie } from 'react-chartjs-2';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import PaymentsIcon from '@mui/icons-material/Payments';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import EventIcon from '@mui/icons-material/Event';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PollIcon from '@mui/icons-material/Poll';
import Fab from '@mui/material/Fab';
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import DraftsIcon from '@mui/icons-material/Drafts';
import PeopleIcon from '@mui/icons-material/People';

import {
  MDBCol,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cell, Pie, PieChart } from 'recharts';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import NoteIcon from '@mui/icons-material/Note';


export const CommitteeMemberHomePage   = () => {
  const [memberDetails, setMemberDetails] = useState({});
  const [isLoggedIn1, setIsLoggedIn1] = useState(false);
  const [contestantaDetails, setContestantaDetails] = useState([]);

  const [presidentRecords, setPresidentRecords] = useState([]);
  const [secretaryRecords, setSecretaryRecords] = useState([]);
  const [treasurerRecords, setTreasurerRecords] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [complaintsSuggestions, setComplaintsSuggestions] = useState([]);
  const [showComplaintsSuggestionsModal, setShowComplaintsSuggestionsModal] = useState(false);
  const [showAccountsModal1, setShowAccountsModal1] = useState(false);

  useEffect(() => {
    const filterRecordsByRole = () => {
      const presidentRecords = contestantaDetails.filter(item => item.role === 'president');
      const secretaryRecords = contestantaDetails.filter(item => item.role === 'secretary');
      const treasurerRecords = contestantaDetails.filter(item => item.role === 'treasurer');
  
      setPresidentRecords(presidentRecords);
      setSecretaryRecords(secretaryRecords);
      setTreasurerRecords(treasurerRecords);
    };
  
    filterRecordsByRole();
  }, [contestantaDetails]);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMemberDetails, setModalMemberDetails] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal1, setShowModal1] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    eventName: '',
    fromDate: null,
    toDate: null,
  });
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaintData, setComplaintData] = useState({
    description: '',
    message: '',
  });
  const [accounts, setAccounts] = useState([]);
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [notices, setNotices] = useState([]);


  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.get(`http://localhost:9001/committee/accounts/user/${userId}`,
      { headers: { 'Content-Type': 'application/json' } }
      );
      const accountsData = response.data;
      setAccounts(accountsData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAccounts1 = async () => {
    try {
      const response = await axios.get('http://localhost:9001/committee/allaccounts');
      setAccounts(response.data);
      setShowAccountsModal1(true);
    } catch (error) {
      console.error(error);
      // Handle error scenario
    }
  };

  const handlePay = async (accountId) => {
    try {
         const userId = parseInt(localStorage.getItem('userId'));
      await axios.put(`http://localhost:9001/accounts/update/${userId}`);
      toast.success('Payment successful.');
      fetchAccounts();
    } catch (error) {
      console.error(error);
      toast.error('Failed to process payment. Please try again.');
    }
  };

  
  const navigateToMembersPage = () => {
    navigate('/memberspage');
  };
  
  const navigateToComplaintsAndSuggestionsPage = () => {
    navigate('/complaintsandsuggestions');
  };

  const navigateToMembersAccountsPage = () => {
    navigate('/membersaccountspage');
  };

  const navigateToNoticePage = () => {
    navigate('/noticepage');
  };

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus1 = () => {
      const isLoggedInUser1 = localStorage.getItem('isLoggedIn1') === 'true';
      setIsLoggedIn1(isLoggedInUser1);
    };
    checkLoginStatus1();
  }, []);

  const logout = () => {
    localStorage.removeItem('isLoggedIn1');
    setIsLoggedIn1(false);
    toast.success('Successfully Logged out!');
    //navigate('/');
  };

  useEffect(() => {
    const checkPollsStatus = () => {
      const isPolling = localStorage.getItem('EnablePolls') === 'true';
      setIsPollsActive(isPolling);
    };
    checkPollsStatus();
  }, []);

  useEffect(() => {
    const checkResultsStatus = () => {
      const isResults = localStorage.getItem('EnableResults') === 'true';
      setIsResultsActive(isResults);
    };
    checkResultsStatus();
  }, []);


  const handleComplaintModalOpen = () => {
    setShowComplaintModal(true);
  };

  const handleComplaintModalClose = () => {
    setShowComplaintModal(false);
    setComplaintData({
      description: '',
      message: '',
    });
  };

  const handleComplaintFormChange = (e) => {
    setComplaintData({
      ...complaintData,
      [e.target.name]: e.target.value,
    });
  };


  const handleAddEvent = () => {
    setShowAddModal(!showAddModal);
  };

  const handleEventFormChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleFromDateChange = (date) => {
    setNewEvent({
      ...newEvent,
      fromDate: date,
    });
  };

  const fetchEvents = async () => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.get(`http://localhost:9001/members/events/user/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const eventsData = response.data;
      setEvents(eventsData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleToDateChange = (date) => {
    setNewEvent({
      ...newEvent,
      toDate: date,
    });
  };
  const handleComplaintFormSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!complaintData.description || !complaintData.message) {
      toast.error('Please fill out all fields.');
      return;
    }

    // Make a POST request to add the complaint/suggestion
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.post('http://localhost:9001/sugg/addsugg', {
        ...complaintData,
        userId: userId,
      });
      if(complaintData.description="suggestion")
      {toast.success("suggestion sent ")}
      else{toast.success("complaint sent")}
      console.log(response.data); // Handle success response

      // Close the complaint modal and reset the form
      handleComplaintModalClose();
    } catch (error) {
      console.error(error); // Handle error response
      toast.error('Failed to add complaint/suggestion. Please try again.');
    }
  };

  
  
  const fetchComplaintsSuggestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:9001/sugg/allsugg');
      setComplaintsSuggestions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaintsSuggestions();
  }, []);





const renderActionButtons = (item) => {
    if (item.description === 'complaint') {
      if (item.status === 'taken into consideration' || item.status === 'issue resolved' || item.status === 'issue dismissed') {
        return null; // Hide the buttons
      } else {
        return (
          <>
            <button className='btn btn-success' onClick={() => handleStatusUpdate(item.id, 'issue resolved')}>
              <CheckIcon />
            </button>
            <button className='btn btn-danger' onClick={() => handleStatusUpdate(item.id, 'issue dismissed')}>
              <CloseIcon />
            </button>
            <button className='btn btn-primary' onClick={() => handleStatusUpdate(item.id, 'in process')}>
              <CircularProgress />
            </button>
          </>
        );
      }
    } else if (item.description === 'suggestion') {
      if (item.status === 'taken into consideration') {
        return null; // Hide the button
      } else {
        return (
          <button className='btn btn-success' onClick={() => handleStatusUpdate(item.id, 'taken into consideration')}>
            <CheckIcon />
          </button>
        );
      }
    } else {
      return null;
    }
  };
  

  

  const handleStatusUpdate = async (itemId, newStatus) => {
    try {
      await axios.put(`http://localhost:9001/sugg/updatesugg/${itemId}`, { status: newStatus });
      toast.success('Status updated successfully.');
      fetchComplaintsSuggestions(); // Refresh the data
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status. Please try again.');
    }
  };
  





const handleEventFormSubmit = async (e) => {
  e.preventDefault();

  // Perform form validation
  if (!newEvent.eventName || !newEvent.fromDate || !newEvent.toDate) {
    toast.error('Please fill out all fields.');
    return;
  }

  const fromDate = moment(newEvent.fromDate).tz('Asia/Kolkata').toDate();
  const toDate = moment(newEvent.toDate).tz('Asia/Kolkata').toDate();

  // Check if the dates and times are valid
  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    toast.error('Invalid date or time.');
    return;
  }

  // Check if the fromDate is before toDate
  if (fromDate >= toDate) {
    toast.error('The start time should be before the end time.');
    return;
  }

  // Check if the dates and times are in the past
  const currentDate = new Date();
  if (fromDate < currentDate || toDate < currentDate) {
    toast.error('Please select valid dates.');
    return;
  }

  // Check if the dates and times are already booked
  for (const event of events) {
    const eventFromDateTime = moment(event.fromDate).tz('Asia/Kolkata').toDate();
    const eventToDateTime = moment(event.toDate).tz('Asia/Kolkata').toDate();

    if (
      eventFromDateTime.toDateString() === fromDate.toDateString() &&
      (
        (fromDate >= eventFromDateTime && fromDate < eventToDateTime) ||
        (toDate > eventFromDateTime && toDate <= eventToDateTime) ||
        (fromDate <= eventFromDateTime && toDate >= eventToDateTime)
      )
    ) {
      toast.error('The selected dates and times conflict with an existing event.');
      return;
    }
  }

  // Set the userId to the current logged-in user's userId
  const userId = parseInt(localStorage.getItem('userId'));
  if (!userId || isNaN(userId)) {
    toast.error('User ID not found. Please log in again.');
    return;
  }

  // Make a POST request to the backend API to add the new event
  try {
    const response = await axios.post('http://localhost:9001/members/events/add', {
      ...newEvent,
      userId,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
    });

    toast.success('Event Added Successfully');
    console.log(response.data); // Handle success response

    // Close the add event modal and reset the form
    setShowAddModal(false);
    setNewEvent({
      eventName: '',
      fromDate: null,
      toDate: null,
      userId: '', // Reset userId field
    });
  } catch (error) {
    console.error(error); // Handle error response
    toast.error('Error adding the event. Please try again.');
  }
};

  const handleClick2 = () => {

    navigate('/selfupdate', { state: { role: 'resident' } });

  };

  const handleClick3 = () => {
    navigate('/memberloginpage');
  };

  const handleClick4 = () => {
    navigate('/');
  };

  const handleEvents = async () => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const response = await axios.get(`http://localhost:9001/members/events/user/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const eventsData = response.data;
      setEvents(eventsData);
      setShowModal1(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9001/members/delete/events/${eventId}`);
      toast.success('Event deleted successfully.');

      // Refresh the events list
      const userId = parseInt(localStorage.getItem('userId'));
      fetchEvents(userId);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete event. Please try again.');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9001/members/${memberDetails.userId}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      const memberdetails = response.data;
      setModalMemberDetails(memberdetails);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const userId = parseInt(localStorage.getItem('userId'));
        const response = await axios.get(`http://localhost:9001/members/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        const memberdetails = response.data;
        setMemberDetails(memberdetails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemberDetails();
  }, []);

  useEffect(() => {
    const eleid = parseInt(localStorage.getItem('election_id'));
    const fetchContestantsDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/ballotbox/oneballot/${eleid}`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        const memberdetails = response.data;
        setContestantaDetails(memberdetails);
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    };
    fetchContestantsDetails();
  }, []);




  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = parseInt(localStorage.getItem('userId'));
        const response = await axios.get(`http://localhost:9001/members/events/user/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        const eventsData = response.data;
        setEvents(eventsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const renderTable = () => {
    if (!showTable) {
      return null;
    }
  };

  //------------------------------------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState();
  const [isNominationsActive, setIsNominationsActive] = useState(false);
  const [showTable1, setShowTable1] = useState(false);
  const [pollsData, setPollsData] = useState({
    election_id: localStorage.getItem('election_id'),
    contestant_id: memberDetails.userId,
    contestant_name: memberDetails.firstName + memberDetails.lastName,
    role: selectedTab
  });
  
  useEffect(() => {
    const updatePollsData = () => {
      setPollsData({
        election_id: localStorage.getItem('election_id'),
        contestant_id: memberDetails.userId,
        contestant_name: memberDetails.firstName + memberDetails.lastName,
        role: selectedTab
      });
    };
  
    updatePollsData();
  }, [memberDetails, selectedTab]);
  

  useEffect(() => {
    const checkNominationStatus = () => {
      const isNomination = localStorage.getItem('OpenNomination') === 'true';
      setIsNominationsActive(isNomination);
    };
    checkNominationStatus();
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleCloseTab = () => {
    setSelectedTab(null);
  };

  const handleClick5 = () => {
    setShowTable1((prevShowTable) => !prevShowTable);
  };

  async function handleClick6(event) {
    event.preventDefault();
    console.log('Selected Role:',selectedTab);
    
      try{
        const response = await axios.post('http://localhost:9001/ballotbox/addballot',JSON.stringify(pollsData),
        {headers: {'Content-Type': 'application/json'}})
          const member = response.data;
          setIsNominationsActive(false);
          toast.success("Success!");
      } catch(error){
        toast.error(error);
      }
  };    

  const renderTable1 = () => {
    if (!showTable1) {
      return null;
    }
    return (
      <div className="container">
        <div className="background-template">
          <h1 className="text-center mb-4 mt-4">Contest as:</h1>
          <div className="close-button-wrapper">
            {selectedTab && (
              <button
                className="close-button btn btn-light"
                onClick={handleCloseTab}
              >
                &times;
              </button>
            )}
          </div>
          <form onSubmit={handleClick6}>
            <div className="row">
              <div className="col-lg-4">
                <div
                  className={`card ${selectedTab === 'president' ? 'bg-white' : ''}`}
                  onClick={() => handleTabChange('president')}
                >
                  <div className="card-header d-flex"><b>President</b></div>
                  <div className="card-body">
                    <input
                      type="radio"
                      name="tab"
                      checked={selectedTab === 'president'}
                      onChange={() => handleTabChange('president')}
                    />
                    <span>Select</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className={`card ${selectedTab === 'secretary' ? 'bg-white' : ''}`}
                  onClick={() => handleTabChange('secretary')}
                >
                  <div className="card-header d-flex"><b>Secretary</b></div>
                  <div className="card-body">
                    <input
                      type="radio"
                      name="tab"
                      checked={selectedTab === 'secretary'}
                      onChange={() => handleTabChange('secretary')}
                    />
                    <span>Select</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className={`card ${selectedTab === 'treasurer' ? 'bg-white' : ''}`}
                  onClick={() => handleTabChange('treasurer')}
                >
                  <div className="card-header d-flex"><b>Treasurer</b></div>
                  <div className="card-body">
                    <input
                      type="radio"
                      name="tab"
                      checked={selectedTab === 'treasurer'}
                      onChange={() => handleTabChange('treasurer')}
                    />
                    <span>Select</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <h6>Election ID : {localStorage.getItem('election_id')}</h6>
            <button  class="btn btn-primary"  type="submit"><h6>Nominate</h6></button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  //-------------------------------------------------------------------------------------------------------------------------

const [isPollsActive, setIsPollsActive] = useState(false);
const [showTable2, setShowTable2] = useState(false);
const [votingData, setVotingData] = useState([]);

const handleClick7 = () => {
  setShowTable2((prevShowTable) => !prevShowTable);
};

async function handleClick8(event) {
  event.preventDefault();
  
    try{
      const response = await axios.post('http://localhost:9001/polls/addpoll',JSON.stringify(mergedRecord),
      {headers: {'Content-Type': 'application/json'}})
        const member = response.data;
        setIsPollsActive(false);
        toast.success("Your vote is recorded Successfully!");
    } catch(error){
      toast.error(error);
    }
};    

const [selectedOptions, setSelectedOptions] = useState({
  president: '',
  secretary: '',
  treasurer: ''
});

const handleSelectChange = (event, role) => {
  const { value, options } = event.target;
  const selectedOption = options[options.selectedIndex];

  setSelectedOptions((prevOptions) => ({
    ...prevOptions,
    [role]: value
  }));

  setVotingData((prevData) => [
    ...prevData,
    {
    [`${role}_id`]: selectedOption.value,
    [`${role}_name`]: selectedOption.text,
    election_id: localStorage.getItem('election_id'),
    voter_id: memberDetails.userId,
    voter_name: memberDetails.firstName + memberDetails.lastName

  }]);
};

const mergedRecord = votingData.reduce((result, record) => {
  Object.entries(record).forEach(([key, value]) => {
    if (value !== '') {
      result[key] = value;
    }
  });
  return result;
}, {});

console.log(mergedRecord);


const renderTable2 = () => {
  if (!showTable2) {
    return null;
  }
  
return (
  <div className='container'>
    <form onSubmit={handleClick8}>
    <table className='table table-striped table-bordered table-hover'>
      <thead>
        <tr style={{ background: 'orange' }}>
          <th>President List</th>
          <th>Secretary List</th>
          <th>Treasurer List</th>
        </tr>
      </thead>
      <tbody>
        <tr>

          <td>
            <select
              value={selectedOptions.president}
              onChange={(event) => handleSelectChange(event, 'president')}>

              <option value="" disabled selected> Select President </option>
              
              {presidentRecords.map((contestant, sno) => (<option key={sno} value={contestant.contestant_id}> {contestant.contestant_name}
              
              </option>))}

            </select>
            <p>Member ID: {selectedOptions.president}</p>
          </td>

          <td>
            <select
              value={selectedOptions.secretary}
              onChange={(event) => handleSelectChange(event, 'secretary')}>

              <option value="" disabled selected> Select Secretary </option>

              {secretaryRecords.map((contestant, sno) => (<option key={sno} value={contestant.contestant_id}> {contestant.contestant_name}
              
              </option>))}

            </select>
            <p>Member ID: {selectedOptions.secretary}</p>
          </td>

          <td>
            <select
              value={selectedOptions.treasurer}
              onChange={(event) => handleSelectChange(event, 'treasurer')}>

              <option value="" disabled selected> Select Treasurer </option>

              {treasurerRecords.map((contestant, sno) => (<option key={sno} value={contestant.contestant_id}> {contestant.contestant_name}

              </option>))}

            </select>
            <p>Member ID: {selectedOptions.treasurer}</p>
          </td>

        </tr>
      </tbody>
      </table>
  

    <button class="btn btn-primary" type='submit'><h6>Cast Your Vote</h6></button>
    </form>
  </div>
  );
  }


  //---------------------------------------------------------------------------------------------------------------------------

const [isResultsActive, setIsResultsActive] = useState(false);
const [showTable3, setShowTable3] = useState(false);
const [resultsData, setResultsData] = useState([]);

const handleClick9 = () => {
  setShowTable3((prevShowTable) => !prevShowTable);
};

async function handleClick10(event) {
  event.preventDefault();
  const eleid = parseInt(localStorage.getItem('election_id'));
  
    try{
      const response = await axios.get(`http://localhost:9001/results/oneresult/${eleid}`,
      { headers: { 'Content-Type': 'application/json' } });
        const results = response.data;
        setResultsData(results);
        toast.success("Results Fetched Successfully!");
    } catch(error){
      toast.error(error);
    }
};    


const renderTable3 = () => {
  if (!showTable3) {
    return null;
  }
  
return (
  <div className='container'>
    <form onSubmit={handleClick10}>
    <table className='table table-striped table-bordered table-hover'>
      <thead>
        <tr style={{ background: 'orange' }}>
          <th>Election ID</th>
          <th>Election Date</th>
          <th>Result ID</th>
          <th>Member ID</th>
          <th>Member Name</th>
          <th>Role</th>
          <th>Candidate Votes</th>
          <th>Total Votes</th>
        </tr>
      </thead>
      <tbody>

          {resultsData.map((data) =>(
            <tr key={data.election_id}>
                <th>{data.election_id}</th>
                <th>{data.election_date}</th>
                <th>{data.result_id}</th>
                <th>{data.member_id}</th>
                <th>{data.member_name}</th>
                <th>{data.role}</th>
                <th>{data.votes}</th>
                <th>{data.total_votes}</th>
              </tr>
                        ))} 

      </tbody>
      </table>
      <button type='submit'><h6> Results</h6></button>
    </form>
  </div>
  );
  }


  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:9001/notice/all');
        const noticesData = response.data;
        // Sort the notices by date in descending order
        const sortedNotices = noticesData.sort((a, b) => {
          const dateA = new Date(a.dateIssued);
          const dateB = new Date(b.dateIssued);
          return dateB - dateA;
        });
        setNotices(sortedNotices);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchNotices();
  }, []);
  
//----------------------------------------------------------------------------------------------------------------------------


const [showTable4, setShowTable4] = useState(false);
const [contestantsData, setContestantsData] = useState([]);

const hancleDecision = () => {
  setShowTable4((prevShowTable) => !prevShowTable);
  setContestantsData([]);
};

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

return (<div className='sk-5'>
{isLoggedIn1 ? (

<>
<div style={{ display: 'flex', alignItems: 'center' }}>
<img src="/Logos/allgreen.png" alt="Logo" style={{ marginTop: '10px', marginLeft: '0px', width: '10%', height: '10%' }} />
<h3 style={{ color: 'purple', marginTop: '40px', marginLeft: '10px'}}>Sri Venkateswara Communities <br/> <h6>Transforming your lives with joy... </h6></h3><br/>
<h5 style={{ color: 'purple', marginTop: 'auto', marginBottom: '15px', marginLeft: 'auto', marginRight: '15px', textAlign: 'left'}}>Welcome<br/> <b> {memberDetails.firstName} {memberDetails.lastName} </b> </h5>
</div>
{/* -------------------------------------------------------------------------------------------------------------------------------- */}
<div class="navbar" style={{ display: 'flex', justifyContent: 'left'}}>
        
        <div style={{ marginLeft: '15px' }}>
                <Dropdown>
                    <Dropdown.Toggle variant='light'>
                        <AccountBoxIcon /><span>  </span>
                        My Profile
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleClick2}> <CameraFrontIcon /><span>  </span>Update Profile</Dropdown.Item><hr/>
                        <Dropdown.Item onClick={navigateToMembersPage} > <PeopleIcon/><span>  </span>Members</Dropdown.Item> <hr/>
                        <Dropdown.Item onClick={logout}> <LogoutIcon /> LogOut</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        </div>

        <div style={{ marginLeft: '5px' }}>
                <Dropdown>
                    <Dropdown.Toggle variant='light'>
                        <AppRegistrationIcon /><span>  </span>
                        Operations
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={navigateToComplaintsAndSuggestionsPage}><ContentPasteSearchIcon /><span>  </span>Complaints/Suggestions</Dropdown.Item><hr/>
                        <Dropdown.Item onClick={handleEvents}><EventIcon /><span>  </span>Events</Dropdown.Item><hr/>
                        <Dropdown.Item onClick={navigateToNoticePage}><NoteIcon /><span>  </span>Notice</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        </div>

        <div style={{ marginLeft: '5px' }}>
                <Dropdown>
                    <Dropdown.Toggle variant='light'>
                        <PaymentsIcon /><span>  </span>
                        Payments
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setShowAccountsModal(true)}>
                            <AccountBalanceIcon /> Accounts</Dropdown.Item><hr/>
                            <Dropdown.Item onClick={navigateToMembersAccountsPage} >Members Accounts</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        </div>

        <div style={{ marginLeft: '5px' }}>
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
<hr/>

{renderTable4()}
{/* --------------------------------------------------------------------------------------------------------------------------- */}
  <br/>
  <div style={{textAlign: 'center'}}>
  <Fab color="secondary" variant="extended">
  <DraftsIcon style={{marginLeft: '75px', marginRight: '10px'}}/> <b style={{marginRight: '75px'}}>Notices</b>
  </Fab>
  </div><br/>

  {notices.length > 0 ? (
  <div style={{textAlign: 'center'}} className="carousel-container">
  <Carousel>
    {notices.map((notice) => (
      <Carousel.Item key={notice.id}>
        <div className="notice-card">
          <h5 className="notice-heading">{notice.heading.toUpperCase()}</h5>
          <p className="notice-content">{notice.notice} </p>
          <div className="notice-date">Date Issued: {notice.dateIssued}</div>
        </div>
      </Carousel.Item>
    ))}
  </Carousel>
  </div>
  ) : (
  <p style={{textAlign: 'center'}}> No notices available </p>
  )}
<br/>
{/* ------------------------------------------------------------------------------------------------------------------------- */}
          {isNominationsActive ? (
          <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
          <>
          {renderTable1()}
          <div style={{ marginTop: '10px' }}>
          <button className='btn btn-info' onClick={handleClick5}><h6>{showTable1 ? 'Close' : 'Contest in Elections'}</h6></button>
          </div> 
          </>
          </td>
          </tr>
          </tbody>
          </table>   
          ) : (
          <>
          </>
          ) 
        }

{isPollsActive ? (
          <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
          <>
          {renderTable2()}
          <div style={{ marginTop: '10px' }}>
          <button  class="btn btn-primary" onClick={handleClick7}><h6>{showTable2 ? 'Hide' : 'Cast your Vote'}</h6></button>
          </div>
          </>
          </td>
          </tr>
          </tbody>
          </table>   
          ) : (
          <>
          </>
          ) 
        }

        {isResultsActive ? (
          <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
          <>
          {renderTable3()}
          <div style={{ marginTop: '10px' }}>
          <button className='btn btn-primary' onClick={handleClick9}><h6>{showTable3 ? 'Close' : 'View Results'}</h6><VisibilityIcon/></button>
          </div>
          </>
          </td>
          </tr>
          </tbody>
          </table>   
          ) : (
          <>
          </>
          ) 
        }
{/* ---------------------------------------------------------------------------------------------------------------------------------- */}
     
{/* event Details Modal */}
<Modal show={showModal1} dialogClassName='custom-modal' onHide={() => setShowModal1(false)}>
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

{/* Add Event Modal */}
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
            {/* <DatePicker selected={newEvent.fromDate} onChange={handleFromDateChange} /> */}
            {/* <TimePicker value={newEvent.dateTimeStart} onChange={handleDateTimeStartChange} /> */}
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
            {/* <DatePicker selected={newEvent.toDate} onChange={handleToDateChange} /> */}
            {/* <TimePicker value={newEvent.dateTimeEnd} onChange={handleDateTimeEndChange} /> */}
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
    </Modal>
{/* ---------------------------------------------------------------------------------------------------------------------------------- */}
    {/* Complaint/Suggestion Modal */}
    <Modal show={showComplaintModal} onHide={handleComplaintModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Complaints/Suggestions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleComplaintFormSubmit}>
          <Form.Group controlId="complaintDescription">
            <Form.Label>Description</Form.Label>
            <Form.Select
              name="description"
              value={complaintData.description}
              onChange={handleComplaintFormChange}
            >
              <option value="">Select an option</option>
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="complaintMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={complaintData.message}
              onChange={handleComplaintFormChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

    <Modal show={showComplaintsSuggestionsModal}  dialogClassName='custom-modal' onHide={() => setShowComplaintsSuggestionsModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Complaints/Suggestions</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Message</th>
          <th>UserId</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {complaintsSuggestions.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.description}</td>
            <td>{item.message}</td>
            <td>{item.userId}</td>
            <td>{item.status}</td>
            <td>{renderActionButtons(item)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='secondary' onClick={() => setShowComplaintsSuggestionsModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


    <Modal show={showAccountsModal} dialogClassName="custom-modal" onHide={() => setShowAccountsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Maintenance</th>
                <th>Month</th>
                <th>Paid On</th>
                <th>Status</th>
                <th>Total</th>
                <th>Water Bill</th>
                <th>User ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.maintenanceBill}</td>
                  <td>{account.month}</td>
                  <td>{account.paidOn}</td>
                  <td>{account.status}</td>
                  <td>{account.total}</td>
                  <td>{account.waterBill}</td>
                  <td>{account.userId}</td>
                  <td>
                    {account.status !== 'Paid' && (
                      <Button variant='success' onClick={() => handlePay(account.id)}>
                        Pay
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowAccountsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
<Modal show={showAccountsModal1} dialogClassName="custom-modal" onHide={() => setShowAccountsModal1(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Accounts</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Maintenance</th>
          <th>Month</th>
          <th>Paid On</th>
          <th>Status</th>
          <th>Total</th>
          <th>Water Bill</th>
          <th>User ID</th>
          
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.id}>
            <td>{account.id}</td>
            <td>{account.maintenanceBill}</td>
            <td>{account.month}</td>
            <td>{account.paidOn}</td>
            <td>{account.status}</td>
            <td>{account.total}</td>
            <td>{account.waterBill}</td>
            <td>{account.userId}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='secondary' onClick={() => setShowAccountsModal1(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

        </>
        
      ) : (
        <div>
          <h1>You are Logged out!</h1>
          <button onClick={handleClick3} className='btn btn-primary btn-block'>
            <h3>Login as Member</h3>
          </button>
          <hr></hr><br></br>
          <button className='btn btn-primary' onClick={handleClick4}>
          <HomeIcon/>
          </button>
        </div>
      )}
    </div>
    
);
};

