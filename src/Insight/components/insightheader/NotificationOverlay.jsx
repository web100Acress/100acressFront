import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCheck, Clock, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';

const notifications = [
    {
        id: 1,
        message: "New Market Report: Q1 2024 Real Estate analysis is now available.",
        time: "10m",
        type: "report",
        isRead: false
    },
    {
        id: 2,
        message: "Price Alert: Gurgaon Sector 65 prices up by 5% in 24h.",
        time: "2h",
        type: "alert",
        isRead: false
    },
    {
        id: 3,
        message: "New Inquiry: Customer interested in DLF Arbour project.",
        time: "5h",
        type: "message",
        isRead: true
    },
    {
        id: 4,
        message: "System: Search algorithms improved for faster results.",
        time: "1d",
        type: "system",
        isRead: true
    }
];

const getTypeIcon = (type) => {
    switch (type) {
        case 'report': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
        case 'alert': return <AlertCircle className="w-4 h-4 text-amber-500" />;
        case 'message': return <MessageSquare className="w-4 h-4 text-blue-500" />;
        default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
};

const NotificationOverlay = ({ isOpen, onClose, isMobile = false }) => {
    if (isMobile) {
        return (
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed top-0 left-0 w-full h-screen z-[9999] bg-white flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-black text-slate-900 tracking-tight">Intelligence Sync</h2>
                            <button onClick={onClose} className="p-2 bg-slate-50 rounded-full">
                                <X className="w-5 h-5 text-slate-900" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {notifications.map((notif) => (
                                <div key={notif.id} className={`p-3 rounded-xl border ${notif.isRead ? 'bg-white border-slate-100' : 'bg-red-50/50 border-red-100'} transition-colors`}>
                                    <div className="flex gap-2.5">
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${notif.isRead ? 'bg-slate-50' : 'bg-white shadow-sm'}`}>
                                            {getTypeIcon(notif.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center h-full">
                                                <p className="text-[11px] font-bold text-slate-800 truncate pr-2">
                                                    {notif.message}
                                                </p>
                                                <span className="text-[9px] font-medium text-slate-400 shrink-0">{notif.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t">
                            <button className="w-full py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg active:scale-95 transition-all">
                                Mark All As Read
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-[1000]" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-[280px] bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 z-[1001] overflow-hidden"
                    >
                        <div className="p-3.5 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                                    <Bell className="w-3.5 h-3.5" />
                                </div>
                                <h2 className="text-base font-black text-slate-900 tracking-tight">Intelligence Sync</h2>
                            </div>
                            <button className="text-[9px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors flex items-center gap-1.5">
                                <CheckCheck className="w-3 h-3" />
                                Mark All
                            </button>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`p-3.5 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 ${!notif.isRead ? 'bg-red-50/20' : ''}`}
                                >
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${!notif.isRead ? 'bg-white' : 'bg-slate-50'}`}>
                                        {getTypeIcon(notif.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[11px] font-bold text-slate-800 truncate pr-2">
                                                {notif.message}
                                            </p>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <span className="text-[9px] font-medium text-slate-400 whitespace-nowrap">{notif.time}</span>
                                                {!notif.isRead && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-200" />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-4 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors border-t border-slate-100">
                            See All Intelligence
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NotificationOverlay;
