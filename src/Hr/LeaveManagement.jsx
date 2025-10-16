import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Button, Table, Tag, Modal, Select } from 'antd';
import { getApiBase } from '../config/apiBase';
import HrSidebar from './HrSidebar';

const { Option } = Select;

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('myToken') || localStorage.getItem('token');
      if (!token) {
        message.error('You are not logged in');
        return;
      }

      const response = await axios.get(`${getApiBase()}/api/hr/leave-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeaveRequests(response.data.data || []);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to fetch leave requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('myToken') || localStorage.getItem('token');
      if (!token) {
        message.error('You are not logged in');
        return;
      }

      await axios.patch(`${getApiBase()}/api/hr/leave/${id}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success(`Leave request ${status}`);
      fetchLeaveRequests(); // Refresh the list
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update leave request');
    }
  };

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        if (status === 'approved') color = 'green';
        else if (status === 'rejected') color = 'red';
        else if (status === 'pending') color = 'orange';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <div>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => handleStatusChange(record._id, 'approved')}
                style={{ marginRight: 8 }}
              >
                Approve
              </Button>
              <Button
                type="danger"
                size="small"
                onClick={() => handleStatusChange(record._id, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex">
      <HrSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Leave Management</h1>
        <Table
          columns={columns}
          dataSource={leaveRequests}
          loading={loading}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default LeaveManagement;
