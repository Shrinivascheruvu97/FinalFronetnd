import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

export const ComplaintsSuggestionsPage = () => {
  const [complaintsSuggestions, setComplaintsSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComplaintsSuggestionsModal, setShowComplaintsSuggestionsModal] = useState(false);

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

  const renderActionButtons = (item) => {
    if (item.description === 'complaint') {
      if (item.status === 'taken into consideration' || item.status === 'issue resolved' || item.status === 'issue dismissed') {
        return null; // Hide the buttons
      } else {
        return (
          <>
            <button className="btn btn-success" onClick={() => handleStatusUpdate(item.id, 'issue resolved')}>
              <CheckIcon />
            </button>
            <button className="btn btn-danger" onClick={() => handleStatusUpdate(item.id, 'issue dismissed')}>
              <CloseIcon />
            </button>
            <button className="btn btn-light" onClick={() => handleStatusUpdate(item.id, 'in process')}>
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
          <button className="btn btn-success" onClick={() => handleStatusUpdate(item.id, 'taken into consideration')}>
            <CheckIcon />
          </button>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div className="complaints-suggestions-page">
      <h1>Complaints/Suggestions</h1>
      <table className="table table-striped table-bordered table-hover">
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

      <Modal show={showComplaintsSuggestionsModal} dialogClassName="custom-modal" onHide={() => setShowComplaintsSuggestionsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Complaints/Suggestions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Additional Modal Content */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowComplaintsSuggestionsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


