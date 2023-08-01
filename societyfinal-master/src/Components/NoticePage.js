import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form } from 'react-bootstrap';

export  const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [noticeHeading, setNoticeHeading] = useState('');
  const [noticeNotice, setNoticeNotice] = useState('');

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:9001/notice/all');
      setNotices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAddNotice = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9001/notice/add', {
        heading: noticeHeading,
        notice: noticeNotice,
      });
      fetchNotices(); // Refresh the notices after adding a new one
      setShowAddNoticeModal(false); // Close the modal after submission
      setNoticeHeading('');
      setNoticeNotice('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="notice-page">
      <h1>Notices</h1>
      <div className="notice-cards">
        {notices.map((notice) => (
          <Card key={notice.id} className="mb-4">
            <Card.Body>
              <Card.Title>{notice.heading}</Card.Title>
              <Card.Text>{notice.notice}</Card.Text>
              <Card.Text >{notice.dateIssued}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Button variant="primary" onClick={() => setShowAddNoticeModal(true)}>
        Add Notice
      </Button>

      {/* Add Notice Modal */}
      <Modal show={showAddNoticeModal} onHide={() => setShowAddNoticeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddNotice}>
            <Form.Group controlId="formNoticeHeading">
              <Form.Label>Notice Heading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter notice heading"
                value={noticeHeading}
                onChange={(e) => setNoticeHeading(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formNoticeNotice">
              <Form.Label>Notice Notice</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter notice notice"
                value={noticeNotice}
                onChange={(e) => setNoticeNotice(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};


