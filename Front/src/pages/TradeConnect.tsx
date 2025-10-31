import { useState } from 'react';
import { Store, MapPin, TrendingUp, Send, Star, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import pdvsData from '../data/mock-monetizacao-pdvs.json';
import '../styles/TradeConnect.scss';

const TradeConnect = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('all');

  const filteredPDVs = selectedSegment === 'all' 
    ? pdvsData.potentialPDVs 
    : pdvsData.potentialPDVs.filter(pdv => pdv.segment === selectedSegment);

  const segments = ['Pet Shop', 'Farmácia', 'Construção', 'Mercado'];

  const getProfileColor = (match: string) => {
    switch (match) {
      case 'Estratégico': return 'success';
      case 'Premium': return 'info';
      case 'Alto Volume': return 'warning';
      default: return 'default';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'invited': return { text: 'Convidado', color: 'warning' };
      case 'connected': return { text: 'Conectado', color: 'success' };
      default: return { text: 'Não Conectado', color: 'default' };
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="trade-connect-page">
      <Navbar userType="industry" />
      
      <div className="container-custom">
        <div className="page-header fade-in">
          <div>
            <h1>Trade Connect</h1>
            <p>Expanda sua rede de PDVs com inteligência de dados</p>
          </div>
        </div>

        <div className="summary-cards fade-in">
          <div className="summary-card">
            <div className="summary-icon">
              <Store size={32} />
            </div>
            <div className="summary-content">
              <div className="summary-value">{pdvsData.summary.totalProspects}</div>
              <div className="summary-label">PDVs Potenciais</div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Star size={32} />
            </div>
            <div className="summary-content">
              <div className="summary-value">{pdvsData.summary.highPriorityCount}</div>
              <div className="summary-label">Alta Prioridade</div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <TrendingUp size={32} />
            </div>
            <div className="summary-content">
              <div className="summary-value">{formatCurrency(pdvsData.summary.estimatedTotalRevenue)}</div>
              <div className="summary-label">Potencial Estimado</div>
            </div>
          </div>
        </div>

        <div className="filters-bar fade-in">
          <div className="filter-label">Filtrar por segmento:</div>
          <div className="segment-filters">
            <button 
              className={selectedSegment === 'all' ? 'active' : ''}
              onClick={() => setSelectedSegment('all')}
            >
              Todos
            </button>
            {segments.map(segment => (
              <button
                key={segment}
                className={selectedSegment === segment ? 'active' : ''}
                onClick={() => setSelectedSegment(segment)}
              >
                {segment}
              </button>
            ))}
          </div>
        </div>

        <div className="pdvs-grid">
          {filteredPDVs.map((pdv) => {
            const statusBadge = getStatusBadge(pdv.connectionStatus);
            
            return (
              <div key={pdv.id} className="pdv-card fade-in">
                <div className="pdv-header">
                  <div className="pdv-title">
                    <Store size={24} />
                    <h3>{pdv.name}</h3>
                  </div>
                  <span className={`status-badge ${statusBadge.color}`}>
                    {statusBadge.text}
                  </span>
                </div>

                <div className="pdv-info">
                  <div className="info-row">
                    <MapPin size={16} />
                    <span>{pdv.city}, {pdv.state}</span>
                  </div>
                  <div className="info-row">
                    <Store size={16} />
                    <span>{pdv.segment}</span>
                  </div>
                </div>

                <div className="pdv-metrics">
                  <div className="metric">
                    <div className="metric-label">Volume Estimado/Mês</div>
                    <div className="metric-value">{formatCurrency(pdv.estimatedMonthlyVolume)}</div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Score de Perfil</div>
                    <div className="metric-value score">
                      {pdv.profileScore}
                      <span className={`profile-badge ${getProfileColor(pdv.profileMatch)}`}>
                        {pdv.profileMatch}
                      </span>
                    </div>
                  </div>
                </div>

                {pdv.potentialProducts.length > 0 && (
                  <div className="pdv-products">
                    <div className="products-label">Produtos Potenciais:</div>
                    <div className="products-tags">
                      {pdv.potentialProducts.map((product, index) => (
                        <span key={index} className="product-tag">{product}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pdv-footer">
                  {pdv.competitorPresence && (
                    <span className="competitor-badge">
                      ⚠️ Concorrente presente
                    </span>
                  )}
                  {pdv.connectionStatus === 'not_connected' ? (
                    <button className="btn-invite">
                      <Send size={18} />
                      Enviar Proposta
                    </button>
                  ) : pdv.connectionStatus === 'invited' ? (
                    <button className="btn-invited" disabled>
                      <CheckCircle size={18} />
                      Aguardando resposta
                    </button>
                  ) : (
                    <button className="btn-connected" disabled>
                      <CheckCircle size={18} />
                      Conectado
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPDVs.length === 0 && (
          <div className="empty-state">
            <Store size={64} />
            <h3>Nenhum PDV encontrado</h3>
            <p>Tente ajustar os filtros para ver mais resultados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeConnect;
