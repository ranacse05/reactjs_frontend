import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import Search from './Search';
import ChangePass from './ChangePass';

function Navigation({ onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const menuRef = useRef(null);
  const avatarRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationIconRef = useRef(null);
  const [sndName,setSndName] = useState('Aagargone');
  const [name,setName] = useState('Rana');

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New ticket #1234 assigned to you", read: false },
    { id: 2, text: "Ticket #5678 status changed to 'Resolved'", read: false },
    { id: 3, text: "Weekly report is ready for review", read: false }
  ]);

  const handleLogout = async () => {
    try {
      console.log('Attempting logout...');
      // Clear local storage
      localStorage.removeItem('parseSession');
      
      // Call the logout callback if provided
      if (onLogout) onLogout();
      
      // Redirect to login page
      navigate('/login');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    // Close notification if open
    if (notificationOpen) setNotificationOpen(false);
  };

  const toggleNotification = () => {
    setNotificationOpen(prev => !prev);
    // Close profile menu if open
    if (menuOpen) setMenuOpen(false);
  };

  const handleNotificationClick = (id) => {
    console.log(`Notification ${id} clicked`);
    // Mark as read
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
    // Close dropdown after click
    setNotificationOpen(false);
  };

  useEffect(() => {
    // Close menus if clicking outside
    const handleClickOutside = (event) => {
      // Close profile menu if clicked outside
      if (menuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) && 
          avatarRef.current && 
          !avatarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      
      // Close notification menu if clicked outside
      if (notificationOpen && 
          notificationRef.current && 
          !notificationRef.current.contains(event.target) && 
          notificationIconRef.current && 
          !notificationIconRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen, notificationOpen]);

  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
      <header className='flex-container shadow-border'>
        <img src='desco-logo.png' height='80px' alt='Company Logo' />
        <div className='header-text'>
          <div className='snd'>S&D Dashboard</div>
          <p>{sndName} S&D Division</p>
        </div>
        <Search />
        <div className='right-side'>
          <div className='account-type'>S&D Head</div>
          
          {/* Notification dropdown */}
          <div className="notification-container">
            <div 
              className='notification-icon'
              ref={notificationIconRef}
              onClick={toggleNotification}
            >
              <span><img className="bell-icon" src='../bell.png'></img></span>
              {unreadCount > 0 && !notificationOpen && (
                <div className='notification-badge'>{unreadCount}</div>
              )}
            </div>
            {notificationOpen && (
              <div className='notification-dropdown' ref={notificationRef}>
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <span className="notification-count">{unreadCount} unread</span>
                </div>
                <div className="notification-list">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      {notification.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Profile dropdown */}
          <div className="profile-container"> 
            <div 
              className='avatar'
              ref={avatarRef}
              onClick={toggleMenu}
            >
              {name[0].toUpperCase()}
            </div>
            {menuOpen && (
              <div className='dropdown-menu' ref={menuRef}>
                <ChangePass />
                <a href='#logout' onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        </div>
      </header>
  );
}

export default Navigation;