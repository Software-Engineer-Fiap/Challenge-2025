import { useNavigate } from 'react-router-dom';
import { Package, TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/RetailerDashboard.scss';

const RetailerDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Registros este mês', value: '12', icon: CheckCircle, trend: '+3' },
    { label: 'Dias sem registro', value: '0', icon: Calendar, trend: '🎉' },
    { label: 'Pontuação', value: '850', icon: TrendingUp, trend: '+50' },
  ];

  return (
    <div className="retailer-page">
      <Navbar userType="retailer" />
      
      <div className="container-custom">
        <div className="page-header fade-in">
          <div>
            <h1>Bem-vindo de volta! 👋</h1>
            <p>Seu painel de controle simplificado</p>
          </div>
        </div>

        <div className="stats-grid fade-in">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <stat.icon size={28} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-trend">{stat.trend}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="main-action-card fade-in glass-effect">
          <div className="action-icon">
            <Package size={64} />
          </div>
          <h2>Registrar Vendas do Dia</h2>
          <p>
            Envie suas vendas de forma rápida e simples. Você pode fazer upload de 
            uma nota fiscal ou preencher manualmente.
          </p>
          <button 
            className="btn-action-primary"
            onClick={() => navigate('/sales-registration')}
          >
            <Package size={20} />
            Iniciar Registro
          </button>
        </div>

        <div className="recent-activity fade-in">
          <h3>Últimos Registros</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-date">15 Fev</div>
              <div className="activity-content">
                <div className="activity-title">Registro de Vendas - 8 itens</div>
                <div className="activity-meta">R$ 2.340,00 • Processado com sucesso</div>
              </div>
              <div className="activity-status success">✓</div>
            </div>
            <div className="activity-item">
              <div className="activity-date">14 Fev</div>
              <div className="activity-content">
                <div className="activity-title">Registro de Vendas - 12 itens</div>
                <div className="activity-meta">R$ 3.120,00 • Processado com sucesso</div>
              </div>
              <div className="activity-status success">✓</div>
            </div>
            <div className="activity-item">
              <div className="activity-date">13 Fev</div>
              <div className="activity-content">
                <div className="activity-title">Registro de Vendas - 6 itens</div>
                <div className="activity-meta">R$ 1.890,00 • Processado com sucesso</div>
              </div>
              <div className="activity-status success">✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
