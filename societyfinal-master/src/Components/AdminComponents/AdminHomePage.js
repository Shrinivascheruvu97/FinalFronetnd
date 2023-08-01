import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel'; // Import the Carousel component
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminHomePage = () => {
  const [isLoggedIn2, setIsLoggedIn2] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus2 = () => {
      const isLoggedInUser2 = localStorage.getItem('isLoggedIn2') === 'true';
      setIsLoggedIn2(isLoggedInUser2);
    };
    checkLoginStatus2();
  }, []);

  const logout = () => {
    localStorage.removeItem('isLoggedIn2');
    setIsLoggedIn2(false);
    toast.success('Successfully Logged out!');
  };

  const navigatePage1 = () => {
    navigate('/adminloginpage');
  };

  const navigatePage2 = () => {
    navigate('/');
  };

  const navigateToMembersPage = () => {
    navigate('/memberspage');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick6 = () => {
    navigate('/election',{ state: { role: 'admin' } });
};

  return (
    <div className="admin-home-page">
      <div>
        {isLoggedIn2 ? (
           
           <>
<div style={{ display: 'flex', alignItems: 'center' }}>
    <img src="/Logos/allgreen.png" alt="Logo" style={{ marginTop: '10px', marginLeft: '0px', width: '10%', height: '10%' }} />
    <h3 style={{ color: 'purple', marginTop: '40px', marginLeft: '10px' }}>Sri Venkateswara Communities <br /> <h6>Transforming your lives with joy... </h6></h3><br />
    <h5 style={{ color: 'purple', marginTop: 'auto', marginBottom: '15px', marginLeft: 'auto', marginRight: '15px', textAlign: 'left' }}>Welcome<br /> <b> Admin </b> </h5>
</div>
{/* -------------------------------------------------------------------------------------------------------------------------------- */}
<div class="navbar" style={{ display: 'flex', justifyContent: 'left' }}>
    <div style={{ marginLeft: '15px' }}>
        <button onClick={navigateToMembersPage}>Members</button>
    </div>

    <div style={{ marginLeft: '5px' }}>
        <button onClick={handleClick6}>Elections</button>
    </div>

    <div style={{ marginLeft: '5px' }}>
        <button onClick={logout}>Logout</button>
    </div>
</div>
<hr />

{/* 
<Carousel showThumbs={false}>
            
              <div>
                <img src='https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="Image 1" />
              </div>
              <div>
                <img src="/path/to/image2.jpg" alt="Image 2" />
              </div>
              
            </Carousel> */}











          {/* <>
            <nav>
              <a  onClick={navigateToMembersPage}>
                Members
              </a>
              <a onClick={handleClick6}>Elections</a>
              
              <a onClick={logout}>
                <LogoutIcon />
              </a>

              {isMenuOpen && (
                <ul className="menu-list">
                  <li>
                    <a href="#">Voting</a>
                  </li>
                  <li>
                    <a href="#">AssignCommittee</a>
                  </li>
                </ul>
              )}

              <div className="animation start-home"></div>
            </nav> */}

            {/* <h1>Hey Admin Welcome!!</h1> */}
          </>
        ) : (
          <div>
            <h1>Bye Admin!!</h1>
            <br />
            <h5>Have A Great Day !!!</h5>
            <br />
            <button onClick={navigatePage1} className="btn btn-primary">
              <LoginIcon />
            </button>
            <hr />
            <br />
            <button className="btn btn-primary" onClick={navigatePage2}>
              <HomeIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
