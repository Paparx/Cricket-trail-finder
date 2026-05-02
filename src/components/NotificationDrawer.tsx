import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Calendar, Trophy, Info } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'trial' | 'system' | 'award';
  read: boolean;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Trial Matching Your Profile!',
    message: 'T20CCL has just announced new trials in your state. Check eligibility now.',
    time: '2 hours ago',
    type: 'trial',
    read: false,
  },
  {
    id: '2',
    title: 'Profile 100% Complete',
    message: 'Your profile is now complete. You will receive better recommendations.',
    time: '1 day ago',
    type: 'system',
    read: true,
  },
  {
    id: '3',
    title: 'Best Fit Alert',
    message: 'The NCL India Talent Hunt is a 98% match for your bowling style.',
    time: '2 days ago',
    type: 'award',
    read: true,
  }
];

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-[80] flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {mockNotifications.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {mockNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-6 hover:bg-slate-50 transition-colors cursor-pointer relative ${!notification.read ? 'bg-primary-light/30' : ''}`}
                    >
                      {!notification.read && (
                        <div className="absolute top-6 right-6 w-2 h-2 bg-primary rounded-full" />
                      )}
                      <div className="flex gap-4">
                        <div className={`p-2 rounded-xl shrink-0 h-fit ${
                          notification.type === 'trial' ? 'bg-amber-100 text-amber-600' :
                          notification.type === 'award' ? 'bg-emerald-100 text-emerald-600' :
                          'bg-primary-light text-primary'
                        }`}>
                          {notification.type === 'trial' ? <Calendar className="w-5 h-5" /> :
                           notification.type === 'award' ? <Trophy className="w-5 h-5" /> :
                           <Info className="w-5 h-5" />}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-900 text-sm">{notification.title}</h3>
                          <p className="text-slate-600 text-xs leading-relaxed">{notification.message}</p>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                    <Bell className="w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-medium">All caught up! No new notifications.</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100">
              <button 
                onClick={onClose}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors text-sm"
              >
                Mark all as read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDrawer;
