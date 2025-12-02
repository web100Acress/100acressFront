import React, { useState, useEffect } from "react";
import axios from "axios";
import { getApiBase } from '../config/apiBase';
import { MdSpaceDashboard, MdPeople, MdTrendingUp, MdAttachMoney, MdPhone, MdAssessment } from "react-icons/md";
import { FaProjectDiagram, FaChartLine, FaUserTie, FaHome } from "react-icons/fa";
import { message } from "antd";

const SalesHeadDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalSalesTeam: 0,
    totalProjects: 0,
    totalEnquiries: 0,
    totalResaleEnquiries: 0,
    totalRevenue: 0,
    monthlySales: [],
    topPerformers: [],
    recentEnquiries: [],
    salesByTeam: []
  });

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const base = getApiBase();
        const tokenRaw = localStorage.getItem("myToken") || "";
        const token = tokenRaw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
        
        const headers = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        // Fetch total enquiries count
        let totalEnquiries = 0;
        try {
          const enquiriesRes = await axios.get(`${base}/userViewAll?limit=1&page=1`, { headers });
          totalEnquiries = enquiriesRes.data?.total || 0;
        } catch (err) {
          console.error("Error fetching enquiries count:", err);
        }

        // Fetch total projects count
        let totalProjects = 0;
        try {
          const projectsRes = await axios.get(`${base}/project/viewAll/data`, { headers });
          totalProjects = projectsRes.data?.data?.length || 0;
        } catch (err) {
          console.error("Error fetching projects count:", err);
        }

        // Fetch sales team count (users with sales_head or similar role)
        let totalSalesTeam = 0;
        try {
            const teamRes = await axios.get(`${base}/postPerson/view/allusers/saleshead`, { headers });
          totalSalesTeam = teamRes.data?.data?.length || 0;
        } catch (err) {
          console.error("Error fetching sales team count:", err);
        }

        // Fetch resale enquiries count
        let totalResaleEnquiries = 0;
        try {
          const resaleRes = await axios.get(`${base}/postEnq_view`, { headers });
          totalResaleEnquiries = Array.isArray(resaleRes.data?.data) ? resaleRes.data.data.length : (Array.isArray(resaleRes.data) ? resaleRes.data.length : 0);
        } catch (err) {
          console.error("Error fetching resale enquiries count:", err);
        }

        const dashboardData = {
          totalSalesTeam: totalSalesTeam,
          totalProjects: totalProjects,
          totalEnquiries: totalEnquiries,
          totalResaleEnquiries: totalResaleEnquiries,
          totalRevenue: 0,
          monthlySales: [],
          topPerformers: [],
          recentEnquiries: [],
          salesByTeam: []
        };

        setDashboardData(dashboardData);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        messageApi.open({
          type: "error",
          content: "Failed to load dashboard data. Please try again.",
          duration: 3,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [messageApi]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 3
    }).format(amount);
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className={`${color} rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
          {trend && (
            <p className="text-white/70 text-xs mt-1">
              {trend > 0 ? `↑ ${trend}%` : `↓ ${Math.abs(trend)}%`} from last month
            </p>
          )}
        </div>
        <Icon className="text-white/80 text-3xl" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {contextHolder}
      
      {/* Header */}
    

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="All User" 
          value={dashboardData.totalSalesTeam} 
          icon={MdPeople} 
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard 
          title="Total Projects" 
          value={dashboardData.totalProjects} 
          icon={FaProjectDiagram} 
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatCard 
          title="Project Enquiries" 
          value={dashboardData.totalEnquiries} 
          icon={MdPhone} 
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard 
          title="Resale Enquiries" 
          value={dashboardData.totalResaleEnquiries} 
          icon={FaHome} 
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
      </div>
    </div>
  );
};

export default SalesHeadDashboard;
