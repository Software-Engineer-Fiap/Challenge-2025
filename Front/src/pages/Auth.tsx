import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, User, Store } from 'lucide-react';
import '../styles/Auth.scss';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'retailer' | 'industry'>('retailer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    storeName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userType', userType);
    
    if (userType === 'retailer') {
      navigate('/retailer-dashboard');
    } else {
      navigate('/industry-dashboard');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card glass-effect">
          <div className="auth-header">
            <div className="brand-logo">
              <Building2 size={48} />
            </div>
            <h1 className="brand-title">
              Bridge<span className="text-gradient">One</span>
            </h1>
            <p className="brand-subtitle">
              Inteligência em Sell-Out para Varejo e Indústria
            </p>
          </div>

          <div className="user-type-selector">
            <button
              className={`type-btn ${userType === 'retailer' ? 'active' : ''}`}
              onClick={() => setUserType('retailer')}
            >
              <Store size={24} />
              <span>Sou Varejista</span>
            </button>
            <button
              className={`type-btn ${userType === 'industry' ? 'active' : ''}`}
              onClick={() => setUserType('industry')}
            >
              <Building2 size={24} />
              <span>Sou Indústria</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>
                    <User size={18} />
                    <span>Nome Completo</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                {userType === 'retailer' && (
                  <div className="form-group">
                    <label>
                      <Store size={18} />
                      <span>Nome da Loja</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Digite o nome da sua loja"
                      value={formData.storeName}
                      onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                      required
                    />
                  </div>
                )}
              </>
            )}

            <div className="form-group">
              <label>
                <Mail size={18} />
                <span>E-mail</span>
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Lock size={18} />
                <span>Senha</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          <div className="auth-footer">
            <button
              className="btn-switch"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
