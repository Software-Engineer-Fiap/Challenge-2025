import { useNavigate } from 'react-router-dom';
import { Package, TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/RetailerDashboard.scss';
import { SaleItem } from './SalesRegistration';
import { useStats } from '@/hooks/useStats';

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const productsList:Array<SaleItem> = JSON.parse(localStorage.getItem('products')) || [];

  const stats = useStats();

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
            {
              productsList.map((prd)=>{
                return(
                  <div className="activity-item">
                    <div className="activity-date">
                      {new Date(prd.saledDay).toLocaleDateString('pt-BR',{day: '2-digit', month:'short'})}
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">{`${prd.productName} - ${prd.quantity} itens`}</div>
                      <div className="activity-meta">R$ {prd.unitPrice * prd.quantity},00 • Processado com sucesso</div>
                    </div>
                    <div className="activity-status success">✓</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;