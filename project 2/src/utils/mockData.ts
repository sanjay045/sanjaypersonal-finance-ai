import { User, Expense, Budget, Investment } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Steve',
  email: 'steve@example.com',
  income: 375000,
  goals: ['Emergency Fund', 'Vacation', 'Investment Portfolio'],
  riskProfile: 'medium',
  createdAt: new Date('2024-01-01'),
};

export const mockExpenses: Expense[] = [
  {
    id: '1',
    userId: '1',
    amount: 9000,
    category: 'Food',
    description: 'Groceries',
    date: new Date('2024-12-01'),
    isRecurring: false,
  },
  {
    id: '2',
    userId: '1',
    amount: 63750,
    category: 'Bills',
    description: 'Rent',
    date: new Date('2024-12-01'),
    isRecurring: true,
  },
  {
    id: '3',
    userId: '1',
    amount: 3375,
    category: 'Entertainment',
    description: 'Movie tickets',
    date: new Date('2024-12-10'),
    isRecurring: false,
  },
  {
    id: '4',
    userId: '1',
    amount: 15000,
    category: 'Shopping',
    description: 'Clothing',
    date: new Date('2024-12-12'),
    isRecurring: false,
  },
];

export const mockBudgets: Budget[] = [
  {
    id: '1',
    userId: '1',
    category: 'Food',
    budgetAmount: 37500,
    spentAmount: 24000,
    period: 'monthly',
    startDate: new Date('2024-12-01'),
  },
  {
    id: '2',
    userId: '1',
    category: 'Entertainment',
    budgetAmount: 15000,
    spentAmount: 10875,
    period: 'monthly',
    startDate: new Date('2024-12-01'),
  },
];

export const mockInvestments: Investment[] = [
  {
    id: '1',
    name: 'S&P 500 Index Fund',
    type: 'etf',
    riskLevel: 'medium',
    expectedReturn: 8.5,
    minInvestment: 100,
  },
  {
    id: '2',
    name: 'Treasury Bonds',
    type: 'bond',
    riskLevel: 'low',
    expectedReturn: 3.2,
    minInvestment: 3750,
  },
  {
    id: '3',
    name: 'Technology Growth Fund',
    type: 'mutual_fund',
    riskLevel: 'high',
    expectedReturn: 12.1,
    minInvestment: 37500,
  },
];