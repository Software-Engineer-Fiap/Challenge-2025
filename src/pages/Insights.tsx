import { useState } from 'react';
import { Lightbulb, AlertTriangle, TrendingUp, Target, Filter, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import insightsData from '../data/mock-insights.json';
import '../styles/Insights.scss';

type InsightType = 'all' | 'opportunity' | 'alert' | 'expansion' | 'competitive' | 'performance';

const Insights = () => {
  const [filterType, setFilterType] = useState<InsightType>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp size={24} />;
      case 'alert': return <AlertTriangle size={24} />;
      case 'expansion': return <Target size={24} />;
      default: return <Lightbulb size={24} />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'success';
      case 'alert': return 'error';
      case 'expansion': return 'info';
      case 'competitive': return 'warning';
      default: return 'default';
    }
  };

  const getSeverityBadge = (severity: string) => {
    const colorMap: Record<string, string> = {
      critical: 'error',
      high: 'warning',
      medium: 'info',
      low: 'default'
    };
    return colorMap[severity] || 'default';
  };

  const filteredInsights = insightsData.insights.filter(insight => {
    if (filterType !== 'all' && insight.type !== filterType) return false;
    if (filterRegion !== 'all' && insight.region !== filterRegion) return false;
    return true;
  });

  const regions = ['Nacional', 'Nordeste', 'Sul', 'Sudeste', 'Centro-Oeste'];

  return (
    <div className="insights-page">
      <Navbar userType="industry" />
      
      <div className="container-custom">
        <div className="page-header fade-in">
          <div>
            <h1>Insights e Ações Estratégicas</h1>
            <p>Recomendações inteligentes geradas por IA</p>
          </div>
          <div className="insights-count">
            <span className="count-badge">{filteredInsights.length}</span>
            <span className="count-label">insights ativos</span>
          </div>
        </div>

        <div className="filters-section fade-in">
          <div className="filter-group">
            <Filter size={20} />
            <span className="filter-label">Tipo:</span>
            <div className="filter-buttons">
              <button 
                className={filterType === 'all' ? 'active' : ''}
                onClick={() => setFilterType('all')}
              >
                Todos
              </button>
              <button 
                className={filterType === 'opportunity' ? 'active' : ''}
                onClick={() => setFilterType('opportunity')}
              >
                Oportunidades
              </button>
              <button 
                className={filterType === 'alert' ? 'active' : ''}
                onClick={() => setFilterType('alert')}
              >
                Alertas
              </button>
              <button 
                className={filterType === 'expansion' ? 'active' : ''}
                onClick={() => setFilterType('expansion')}
              >
                Expansão
              </button>
            </div>
          </div>

          <div className="filter-group">
            <Calendar size={20} />
            <span className="filter-label">Região:</span>
            <select 
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todas as regiões</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="insights-list">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className={`insight-card fade-in ${getInsightColor(insight.type)}`}>
              <div className="insight-header">
                <div className={`insight-icon ${getInsightColor(insight.type)}`}>
                  {getInsightIcon(insight.type)}
                </div>
                <div className="insight-meta">
                  <div className="meta-badges">
                    <span className={`badge badge-${getSeverityBadge(insight.severity)}`}>
                      {insight.severity.toUpperCase()}
                    </span>
                    <span className="badge badge-region">
                      {insight.region}
                    </span>
                  </div>
                  <h3>{insight.title}</h3>
                </div>
              </div>

              <div className="insight-content">
                <div className="insight-section">
                  <strong>Análise:</strong>
                  <p>{insight.description}</p>
                </div>
                
                <div className="insight-section suggestion">
                  <strong>💡 Sugestão de Ação:</strong>
                  <p>{insight.suggestion}</p>
                </div>

                <div className="insight-footer">
                  <div className="insight-tags">
                    {insight.tags.map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div>
                  <div className="insight-date">
                    {new Date(insight.dateGenerated).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInsights.length === 0 && (
          <div className="empty-state">
            <Lightbulb size={64} />
            <h3>Nenhum insight encontrado</h3>
            <p>Tente ajustar os filtros para ver mais resultados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
