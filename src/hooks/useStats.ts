import { SaleItem } from "@/pages/SalesRegistration";
import { Calendar, CheckCircle, TrendingUp } from "lucide-react";

export function useStats() {    
    const productsList:Array<SaleItem> = JSON.parse(localStorage.getItem('products')) || [];
    const monthRegisters = productsList.filter((prd)=> 
        new Date(prd.saledDay).getMonth() == new Date().getMonth());
    const escala = 700;
    const pontos = (productsList.length / escala) * 1000;
    const score = Math.min(pontos, 1000);
    const scoreFixed = score.toFixed(2);
    const stats = [
    { label: 'Registros este mês', value: monthRegisters.length, icon: CheckCircle, 
        trend:monthRegisters.length > 0? `+${monthRegisters.length}`: 0},
    { label: 'Dias sem registro', value: '0', icon: Calendar, trend: '🎉' },
    { label: 'Pontuação', value: scoreFixed, icon: TrendingUp, 
        trend:score > 0? `+${scoreFixed}`: 0}
  ];

  return stats;
}