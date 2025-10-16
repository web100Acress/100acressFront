import React, { useState, useEffect } from "react";
import { Table, Tag, Button, message, Input, Select, Card, Space, Badge, Statistic, Row, Col } from 'antd';
import { SearchOutlined, UserOutlined, CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";

const { Search } = Input;
const { Option } = Select;

const ItDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchText, statusFilter, roleFilter]);

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

  const filterUsers = () => {
    let filtered = [...users];

    // Search filter
    if (searchText) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleAuthorize = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('myToken') || localStorage.getItem('token');
      if (!token) {
        message.error('You are not logged in');
        return;
      }

      const newStatus = currentStatus === 'authorized' ? 'unauthorized' : 'authorized';

      await api.post(`/api/hr/user/${userId}/status`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success(`User ${newStatus} successfully`);
      fetchAllUsers();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update user status');
    }
  };

  const getStats = () => {
    const total = users.length;
    const authorized = users.filter(u => u.status === 'authorized').length;
    const unauthorized = users.filter(u => u.status === 'unauthorized' || !u.status).length;
    return { total, authorized, unauthorized };
  };

  const stats = getStats();
  const uniqueRoles = [...new Set(users.map(u => u.role).filter(Boolean))];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
      render: (text) => <span className="font-medium text-gray-800">{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => (a.role || '').localeCompare(b.role || ''),
      render: (role) => (
        <Tag color="blue">{role || 'N/A'}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => (a.status || '').localeCompare(b.status || ''),
      render: (status) => {
        const isAuthorized = status === 'authorized';
        return (
          <Badge 
            status={isAuthorized ? "success" : "error"} 
            text={
              <span className={isAuthorized ? "text-green-600" : "text-red-600"}>
                {status?.toUpperCase() || 'UNAUTHORIZED'}
              </span>
            }
          />
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => {
        const isAuthorized = record.status === 'authorized';
        return (
          <Button
            type={isAuthorized ? 'default' : 'primary'}
            danger={isAuthorized}
            size="small"
            icon={isAuthorized ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
            onClick={() => handleAuthorize(record._id, record.status)}
          >
            {isAuthorized ? 'Revoke' : 'Authorize'}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-6 md:p-8 lg:p-10 ml-0 md:ml-6">
        <div className="max-w-7xl mx-auto">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={8}>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="Total Users"
                  value={stats.total}
                  prefix={<UserOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="Authorized"
                  value={stats.authorized}
                  prefix={<CheckCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="Unauthorized"
                  value={stats.unauthorized}
                  prefix={<CloseCircleOutlined className="text-red-500" />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Main Content Card */}
          <Card 
            className="shadow-lg border-0"
            title={
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* <h2 className="text-2xl font-semibold text-gray-800 m-0">User Management</h2> */}
                {/* <Button 
                  icon={<ReloadOutlined />} 
                  onClick={fetchAllUsers}
                  loading={loading}
                >
                  Refresh
                </Button> */}
              </div>
            }
          >
            {/* Filters */}
            <Space direction="vertical" size="middle" className="w-full mb-6">
              <div className="flex flex-wrap gap-4">
                <Search
                  placeholder="Search by name or email"
                  allowClear
                  prefix={<SearchOutlined />}
                  style={{ width: 300 }}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
                <Select
                  placeholder="Filter by status"
                  style={{ width: 200 }}
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <Option value="all">All Status</Option>
                  <Option value="authorized">Authorized</Option>
                  <Option value="unauthorized">Unauthorized</Option>
                </Select>
                <Select
                  placeholder="Filter by role"
                  style={{ width: 200 }}
                  value={roleFilter}
                  onChange={setRoleFilter}
                >
                  <Option value="all">All Roles</Option>
                  {uniqueRoles.map(role => (
                    <Option key={role} value={role}>{role}</Option>
                  ))}
                </Select>
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </Space>

            {/* Table */}
            <Table
              columns={columns}
              dataSource={filteredUsers}
              loading={loading}
              rowKey="_id"
              pagination={{ 
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
              }}
              className="custom-table"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItDashboard;
