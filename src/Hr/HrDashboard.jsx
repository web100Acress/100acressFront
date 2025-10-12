import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaMoneyBillWave, FaClock, FaUserPlus, FaChartBar } from 'react-icons/fa';
import HrSidebar from './HrSidebar';
import api from "../config/apiClient";

const HrDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 0,
    monthlyPayroll: 0,
    attendanceRate: 0,
    openPositions: 0,
    leaveRequests: 0,
    performanceReviews: 0,
    newHires: 0,
    trainingPrograms: 0,
    loading: true
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setDashboardData(prev => ({ ...prev, loading: true }));

      // Fetch open positions count from job postings
      const jobResponse = await api.get("/career/opening/ViewAll");
      const openPositions = jobResponse?.data?.data?.length || 0;

      // For demo purposes, using static data for other metrics
      // In a real application, these would come from respective APIs
      const mockData = {
        totalEmployees: 500,
        monthlyPayroll: 120050000,
        attendanceRate: 94,
        leaveRequests: 3,
        performanceReviews: 5,
        newHires: 2,
        trainingPrograms: 3
      };

      setDashboardData({
        ...mockData,
        openPositions,
        loading: false
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setDashboardData(prev => ({ ...prev, loading: false }));
    }
  };

  const dashboardCards = [
    {
      title: 'Total Employees',
      value: dashboardData.loading ? '...' : dashboardData.totalEmployees.toString(),
      icon: <FaUsers className="text-3xl text-blue-600" />,
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-800 dark:text-blue-200',
      link: '/hr/employees'
    },
    {
      title: 'Monthly Payroll',
      value: dashboardData.loading ? '...' : `₹${(dashboardData.monthlyPayroll / 100000).toFixed(1)}L`,
      icon: <FaMoneyBillWave className="text-3xl text-green-600" />,
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-800 dark:text-green-200',
      link: '/hr/payroll'
    },
    {
      title: 'Attendance Rate',
      value: dashboardData.loading ? '...' : `${dashboardData.attendanceRate}%`,
      icon: <FaClock className="text-3xl text-orange-600" />,
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      textColor: 'text-orange-800 dark:text-orange-200',
      link: '/hr/attendance'
    },
    {
      title: 'Open Positions',
      value: dashboardData.loading ? '...' : dashboardData.openPositions.toString(),
      icon: <FaUserPlus className="text-3xl text-purple-600" />,
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      textColor: 'text-purple-800 dark:text-purple-200',
      link: '/hr/recruitment'
    },
    {
      title: 'Leave Requests',
      value: dashboardData.loading ? '...' : dashboardData.leaveRequests.toString(),
      icon: <FaClock className="text-3xl text-red-600" />,
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      textColor: 'text-red-800 dark:text-red-200',
      link: '/hr/leave'
    },
    {
      title: 'Performance Reviews',
      value: dashboardData.loading ? '...' : `${dashboardData.performanceReviews} Due`,
      icon: <FaChartBar className="text-3xl text-indigo-600" />,
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
      textColor: 'text-indigo-800 dark:text-indigo-200',
      link: '/hr/performance'
    },
    {
      title: 'New Hires',
      value: dashboardData.loading ? '...' : dashboardData.newHires.toString(),
      icon: <FaUsers className="text-3xl text-teal-600" />,
      bgColor: 'bg-teal-100 dark:bg-teal-900/20',
      textColor: 'text-teal-800 dark:text-teal-200',
      link: '/hr/onboarding'
    },
    {
      title: 'Training Programs',
      value: dashboardData.loading ? '...' : `${dashboardData.trainingPrograms} Active`,
      icon: <FaChartBar className="text-3xl text-yellow-600" />,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      link: '/hr/training'
    }
  ];

  if (dashboardData.loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex">
        <HrSidebar />
        <div className="flex-1 lg:ml-50 flex items-center justify-center">
          <div className="text-xl text-gray-600 dark:text-gray-300">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex">
      <HrSidebar />
      <div className="flex-1 lg:ml-50">
        <div className="p-6">
          {/* HR Department Header - Centered */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-2 tracking-tight">
              HR Department
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Dashboard Cards - 4 cards per row, 2 rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardCards.map((card, index) => (
              <Link key={index} to={card.link} className="block group">
                <div className={`${card.bgColor} rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group-hover:scale-105`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${card.textColor}`}>{card.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{card.value}</p>
                    </div>
                    <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-shadow">
                      {card.icon}
                    </div>
                  </div>
                  <div className="mt-4 h-1 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${card.textColor.replace('text-', 'bg-').replace('-800', '-500').replace('-200', '-400')} rounded-full transition-all duration-500 group-hover:w-full`} style={{width: '60%'}}></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
