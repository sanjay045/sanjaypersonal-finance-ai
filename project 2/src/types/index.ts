export interface User {
  id: string;
  name: string;
  email: string;
  income: number;
  goals: string[];
  riskProfile: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
  isRecurring: boolean;
}

export interface Budget {
  id: string;
  userId: string;
  category: ExpenseCategory;
  budgetAmount: number;
  spentAmount: number;
  period: 'weekly' | 'monthly';
  startDate: Date;
}

export interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'bond' | 'mutual_fund' | 'etf' | 'crypto';
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  minInvestment: number;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export type ExpenseCategory = 'Food' | 'Travel' | 'Bills' | 'Shopping' | 'Entertainment' | 'Healthcare' | 'Others';