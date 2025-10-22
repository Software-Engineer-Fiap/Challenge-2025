import { TrendingUp, TrendingDown, Package, Users, AlertTriangle } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Navbar from '../components/Navbar';
import kpisData from '../data/mock-dashboard-kpis.json';
import trendData from '../data/mock-dashboard-grafico-tendencia.json';
import segmentData from '../data/mock-dashboard-grafico-segmento.json';
import '../styles/IndustryDashboard.scss';

const IndustryDashboard = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const trendChartData = trendData.data.map(item => ({
    name: item.monthShort,
    volume: item.volume / 1000
  }));

  return (
    <div className="industry-dashboard-page">
      <Navbar userType="industry" />
      
      <div className="container-custom">
        <div className="page-header fade-in">
          <div>
            <h1>Dashboard Business Intelligence</h1>
            <p>Visão completa do seu Sell-Out</p>
          </div>
          <div className="header-date">
            <span className="date-badge">Fevereiro 2025</span>
          </div>
        </div>

        <div className="kpi-grid fade-in">
          <div className="kpi-card">
            <div className="kpi-header">
              <Package size={24} />
              <span className="kpi-label">Sell-Out Total</span>
            </div>
            <div className="kpi-value">{formatCurrency(kpisData.sellOutTotal.currentMonth)}</div>
            <div className={`kpi-trend ${kpisData.sellOutTotal.variation > 0 ? 'positive' : 'negative'}`}>
              <TrendingUp size={16} />
              <span>+{kpisData.sellOutTotal.variation.toFixed(1)}% vs mês anterior</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <TrendingUp size={24} />
              <span className="kpi-label">Market Share</span>
            </div>
            <div className="kpi-value">{kpisData.marketShare.percentage.toFixed(1)}%</div>
            <div className={`kpi-trend ${kpisData.marketShare.variation > 0 ? 'positive' : 'negative'}`}>
              <TrendingUp size={16} />
              <span>+{kpisData.marketShare.variation.toFixed(1)}pp este mês</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <AlertTriangle size={24} />
              <span className="kpi-label">Ruptura Média</span>
            </div>
            <div className="kpi-value">{kpisData.averageRupture.percentage.toFixed(1)}%</div>
            <div className={`kpi-trend ${kpisData.averageRupture.variation < 0 ? 'positive' : 'negative'}`}>
              <TrendingDown size={16} />
              <span>{kpisData.averageRupture.variation.toFixed(1)}pp (melhorou)</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <Users size={24} />
              <span className="kpi-label">Novos PDVs</span>
            </div>
            <div className="kpi-value">{kpisData.newPDVs.count}</div>
            <div className={`kpi-trend positive`}>
              <TrendingUp size={16} />
              <span>+{kpisData.newPDVs.variation} este mês</span>
            </div>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-card fade-in">
            <div className="chart-header">
              <h3>Tendência de Sell-Out (6 meses)</h3>
              <p>Volume de vendas em milhares de R$</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                <XAxis 
                  dataKey="name" 
                  stroke="#8B949E"
                  style={{ fontSize: '14px' }}
                />
                <YAxis 
                  stroke="#8B949E"
                  style={{ fontSize: '14px' }}
                  tickFormatter={(value) => `${value}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1C2128',
                    border: '1px solid #30363D',
                    borderRadius: '8px',
                    color: '#F0F6FC'
                  }}
                  formatter={(value: number) => [`R$ ${value.toFixed(0)}k`, 'Volume']}
                />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#00D4FF" 
                  strokeWidth={3}
                  dot={{ fill: '#00D4FF', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card fade-in">
            <div className="chart-header">
              <h3>Distribuição por Segmento</h3>
              <p>Participação no volume total</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentData.segments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {segmentData.segments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1C2128',
                    border: '1px solid #30363D',
                    borderRadius: '8px',
                    color: '#F0F6FC'
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    `${value.toFixed(1)}% (${formatCurrency(props.payload.value)})`,
                    'Participação'
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="top-products-section fade-in">
          <h3>Top 5 Produtos em Sell-Out</h3>
          <div className="products-table">
            <div className="table-header">
              <div>Produto</div>
              <div>Volume</div>
              <div>Variação</div>
            </div>
            <div className="table-row">
              <div className="product-name">Produto Premium X</div>
              <div className="product-volume">3.450 un</div>
              <div className="product-trend positive">
                <TrendingUp size={16} />
                +15%
              </div>
            </div>
            <div className="table-row">
              <div className="product-name">Ração Premium Z</div>
              <div className="product-volume">2.890 un</div>
              <div className="product-trend positive">
                <TrendingUp size={16} />
                +22%
              </div>
            </div>
            <div className="table-row">
              <div className="product-name">Kit Construção Pro</div>
              <div className="product-volume">1.780 un</div>
              <div className="product-trend positive">
                <TrendingUp size={16} />
                +8%
              </div>
            </div>
            <div className="table-row">
              <div className="product-name">Suplemento Vital</div>
              <div className="product-volume">1.560 un</div>
              <div className="product-trend negative">
                <TrendingDown size={16} />
                -3%
              </div>
            </div>
            <div className="table-row">
              <div className="product-name">Produto Essencial Y</div>
              <div className="product-volume">1.420 un</div>
              <div className="product-trend positive">
                <TrendingUp size={16} />
                +5%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryDashboard;
