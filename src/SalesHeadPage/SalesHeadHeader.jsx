import React, { useState, useEffect } from 'react';
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../Components/ui/avatar";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { useAuth } from '../AuthContext';

const SalesHeadHeader = ({ onMenuClick }) => {
  const { agentData } = useAuth();
  const [userName, setUserName] = useState('Sales Head');

  useEffect(() => {
    // Get user name from JWT token
    try {
      const tokenRaw = localStorage.getItem('myToken') || '';
      if (tokenRaw) {
        const token = tokenRaw.replace(/^"|"$/g, '').replace(/^Bearer\s+/i, '');
        // Decode JWT (split by '.' and decode the payload)
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (payload.name) {
            setUserName(payload.name);
          } else if (payload.email) {
            setUserName(payload.email.split('@')[0]);
          }
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-4 lg:p-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
       
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="     Search sales data..."
              className="pl-10 bg-secondary/50"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Language selector */}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-lg">🇺🇸</span>
            <span>Eng (US)</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-chart-orange rounded-full" />
          </Button>

          {/* User profile */}
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
              <AvatarFallback>{userName?.slice(0, 2).toUpperCase() || 'SH'}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">Sales Head</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SalesHeadHeader;
