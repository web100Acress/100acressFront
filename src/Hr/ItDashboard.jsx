import React, { useState, useEffect } from "react";
import { Table, Tag, Button, message } from 'antd';
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";

const ItDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('myToken') || localStorage.getItem('token');
      if (!token) {
        message.error('You are not logged in');
        return;
      }

      const response = await api.get('/postPerson/view/allusers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.data || []);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorize = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('myToken') || localStorage.getItem('token');
      if (!token) {
        message.error('You are not logged in');
        return;
      }

      const newStatus = currentStatus === 'authorized' ? 'unauthorized' : 'authorized';

      await api.put(`/postPerson/${userId}/authorize`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success(`User ${newStatus} successfully`);
      fetchAllUsers(); // Refresh the list
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update user status');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        if (status === 'authorized') color = 'green';
        else if (status === 'unauthorized') color = 'red';
        return <Tag color={color}>{status?.toUpperCase() || 'UNAUTHORIZED'}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Button
          type={record.status === 'authorized' ? 'danger' : 'primary'}
          size="small"
          onClick={() => handleAuthorize(record._id, record.status)}
        >
          {record.status === 'authorized' ? 'Unauthorize' : 'Authorize'}
        </Button>
      ),
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-8 md:p-10 lg:p-12 ml-0 md:ml-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">IT Dashboard</h1>
          <p className="text-gray-600 mb-6">User authorization management - Control which users can access leave request functionality.</p>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Users</h2>
            <Table
              columns={columns}
              dataSource={users}
              loading={loading}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItDashboard;
