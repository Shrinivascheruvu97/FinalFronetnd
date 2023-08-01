import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

export const MembersAccountsPage = () => {
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:9001/committee/allaccounts');
      setAccounts(response.data);
    } catch (error) {
      console.error(error);
      // Handle error scenario
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="members-accounts-page">
      <h1>Members Accounts</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Member ID</th>
            <th>Month</th>
            <th>Maintenance</th>
            <th>Water Bill</th>
            <th>Total</th>
            
            <th>Paid On</th>
            <th>Status</th>
            
            
            
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.userId}</td>
              <td>{account.month}</td>
              <td>{account.maintenanceBill}</td>
              <td>{account.waterBill}</td>
              <td>{account.total}</td>
              <td>{account.paidOn}</td>
              <td>{account.status}</td>
              
             
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};


