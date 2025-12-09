import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Avatar, Dropdown } from 'antd';
import { Grid3x3, Plus, Star, User, Menu, X, Wallet, LogOut, Settings } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { formatAddress } from '../utils/format';

const ConnectMenu = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const disconnectWallet = () => {
    disconnect()
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>My Profile</span>
        </div>
      ),
    },
    {
      key: 'reviews',
      label: (
        <div className="flex items-center gap-2">
          <Star size={16} />
          <span>My Reviews</span>
        </div>
      ),
    },
    {
      key: 'settings',
      label: (
        <div className="flex items-center gap-2">
          <Settings size={16} />
          <span>Settings</span>
        </div>
      ),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'disconnect',
      label: (
        <div className="flex items-center gap-2 text-red-600">
          <LogOut size={16} />
          <span>Disconnect</span>
        </div>
      ),
      onClick: disconnectWallet,
    },
  ];

  const navLinks = [
    { label: 'Gallery', href: '/', icon: <Grid3x3 size={18} /> },
    { label: 'Register App', href: '/register', icon: <Plus size={18} /> },
  ];

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-lg">
                <Grid3x3 size={24} className="text-white" />
              </div>
              <div className="sm:block">
                <h1 className="text-xl font-bold text-gray-900 m-0">Mini Apps Review</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side - Wallet & Menu */}
            <div className="flex items-center gap-3">
              {/* Connect Wallet Button */}
              {!isConnected ? (
                <Button
                  type="primary"
                  icon={<Wallet size={16} />}
                  onClick={() => connect({ connector: connectors[0] })}
                  className="hidden sm:flex items-center gap-2"
                >
                  Connect Wallet
                </Button>
              ) : (
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <div className="hidden sm:flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors">
                    <Avatar size="small" icon={<User size={16} />} className="bg-purple-500" />
                    <span className="font-mono text-sm font-medium">{formatAddress(address)}</span>
                  </div>
                </Dropdown>
              )}

              {/* Mobile Connect Wallet */}
              {!isConnected && (
                <Button
                  type="primary"
                  icon={<Wallet size={16} />}
                  onClick={() => connect({ connector: connectors[0] })}
                  className="flex sm:hidden"
                  size="small"
                />
              )}

              {/* Mobile Menu Button */}
              <Button
                type="text"
                icon={mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {isConnected && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar size="small" icon={<User size={16} />} className="bg-purple-500" />
                      <span className="font-mono text-sm font-medium">{formatAddress(address)}</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors"
                  >
                    <User size={18} />
                    <span>My Profile</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors"
                  >
                    <Star size={18} />
                    <span>My Reviews</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors"
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </a>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button
                    onClick={disconnectWallet}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-medium transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Disconnect</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default ConnectMenu;
