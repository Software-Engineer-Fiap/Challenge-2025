import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Plus, Trash2, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import productsData from '../data/mock-registro-produtos.json';
import '../styles/SalesRegistration.scss';

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  saledDay: Date;
}

const SalesRegistration = () => {
  const navigate = useNavigate();
  const productsList:Array<SaleItem> = JSON.parse(localStorage.getItem('products')) || [];
  const [registrationMethod, setRegistrationMethod] = useState<'upload' | 'manual'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [step, setStep] = useState<number>(1);
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [currentItem, setCurrentItem] = useState({
    productId: '',
    quantity: 1
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep( prev => {
          return ++prev
        })
        fillReviewStep();
        console.log(step)
      }, 3000);
    }
  };

  function fillReviewStep(){
    setIsProcessing(true);
    const productIndex:number = Math.floor(Math.random() * productsData.products.length);
    const productId = productsData.products[productIndex].id;
    const quantity = Math.floor(Math.random() * 50);
    
    setCurrentItem({ productId, quantity})
    setIsProcessing(false);
    
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        alert('✅ Arquivo processado com sucesso! Dados extraídos e prontos para revisão.');
      }, 3000);
    }
  };

  const handleAddItem = () => {
    if (!currentItem.productId) {
      alert('Selecione um produto');
      return;
    }

    const product = productsData.products.find(p => p.id === currentItem.productId);
    const date = new Date();
    if (product) {
      setSaleItems([...saleItems, {
        productId: product.id,
        productName: product.name,
        quantity: currentItem.quantity,
        unitPrice: product.unitPrice,
        saledDay: date
      }]);
      setCurrentItem({ productId: '', quantity: 1 });
      setStep(1);
    }
  };

  const handleRemoveItem = (index: number) => {
    setSaleItems(saleItems.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (saleItems.length === 0 && !uploadedFile) {
      alert('Adicione pelo menos um item ou faça upload de um arquivo');
      return;
    }

    const updatedLS = [...productsList, ...saleItems]
    localStorage.setItem('products',JSON.stringify(updatedLS));
    alert('✅ Registro de vendas enviado com sucesso!');
    navigate('/retailer-dashboard');
  };

  const totalValue = saleItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  return (
    <div className="sales-registration-page">
      <Navbar userType="retailer" />
      
      <div className="container-custom">
        <div className="page-header">
          <button className="btn-back" onClick={() => navigate('/retailer-dashboard')}>
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <h1>Registrar Vendas do Dia</h1>
          <p>Escolha o método mais conveniente para você</p>
        </div>

        <div className="method-selector">
          <button
            className={`method-btn ${registrationMethod === 'upload' ? 'active' : ''}`}
            onClick={() => setRegistrationMethod('upload')}
          >
            <Upload size={24} />
            <span>Upload de Arquivo</span>
            <small>Foto de nota fiscal ou planilha</small>
          </button>
          <button
            className={`method-btn ${registrationMethod === 'manual' ? 'active' : ''}`}
            onClick={() => setRegistrationMethod('manual')}
          >
            <FileText size={24} />
            <span>Digitação Manual</span>
            <small>Preencha item por item</small>
          </button>
        </div>

        {registrationMethod === 'upload' && step == 1 ? (
          <div className="upload-section fade-in">
            <div
              className={`upload-zone ${isProcessing ? 'processing' : ''}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {isProcessing? (
                <div className="processing-state">
                  <Loader2 size={64} className="spinner" />
                  <h3>Processando via OCR/IA...</h3>
                  <p>Extraindo dados do documento. Aguarde alguns segundos.</p>
                </div>
              ) : (
                <div className="empty-state">
                  <Upload size={64} />
                  <h3>Arraste seu arquivo aqui</h3>
                  <p>ou clique para selecionar</p>
                  <small>Formatos: JPG, PNG, PDF, XLSX</small>
                  <input
                    type="file"
                    accept="image/*,.pdf,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="manual-section fade-in">
            <div className="form-card">
              <h3>{step==1?'Adicionar Item':'Revisar Item' }</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Produto</label>
                  <select
                    value={currentItem.productId}
                    onChange={(e) => setCurrentItem({ ...currentItem, productId: e.target.value })}
                  >
                    <option value="">Selecione um produto</option>
                    {productsData.products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - R$ {product.unitPrice.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantidade</label>
                  <input
                    type="number"
                    min="1"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem({ ...currentItem, quantity: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
              <button className="btn-add-item" onClick={handleAddItem}>
                <Plus size={20} />
                Adicionar Item
              </button>
            </div>
          </div>
        )}

        {saleItems.length > 0 && (
          <div className="manual-section fade-in">
            <div className="items-list">
              <h3>Itens Adicionados ({saleItems.length})</h3>
              <div className="items-table">
                {saleItems.map((item, index) => (
                  <div key={index} className="item-row">
                    <div className="item-info">
                      <div className="item-name">{item.productName}</div>
                      <div className="item-details">
                        Qtd: {item.quantity} × R$ {item.unitPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="item-total">
                      R$ {(item.quantity * item.unitPrice).toFixed(2)}
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="total-summary">
                <span>Total:</span>
                <strong>R$ {totalValue.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        )}

        <div className="action-buttons">
          <button className="btn-cancel" onClick={() => navigate('/retailer-dashboard')}>
            Cancelar
          </button>
          <button 
            className="btn-save"
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            <Save size={20} />
            Finalizar Registro
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesRegistration;
