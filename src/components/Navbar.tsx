import { Link, useNavigate } from 'react-router-dom';
import { Building2, LayoutDashboard, TrendingUp, Users, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import '../styles/Navbar.scss';

interface NavbarProps {
  userType?: 'retailer' | 'industry';
}

const Navbar = ({ userType }: NavbarProps) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/');
  };

  const navItems = userType === 'retailer' ? [
  ] : [
    { icon: LayoutDashboard, label: 'Dashboard BI', path: '/industry-dashboard' },
    { icon: TrendingUp, label: 'Insights', path: '/insights' },
    { icon: Users, label: 'Trade Connect', path: '/trade-connect' },
  ];

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        <Link to={userType === 'retailer' ? '/retailer-dashboard' : '/industry-dashboard'} className="navbar-brand">
          <Building2 size={32} />
          <span className="brand-text">
            ASTÉRIA <span className="brand-accent">Connect</span>
          </span>
        </Link>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
