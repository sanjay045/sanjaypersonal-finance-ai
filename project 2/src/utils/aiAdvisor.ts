import { User, Expense } from '../types';

export function generateFinancialAdvice(user: User, expenses: Expense[]): string {
  if (!user || expenses.length === 0) {
    return "Welcome to your AI Financial Advisor! Start by adding some expenses to get personalized advice.";
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const savingsRate = ((user.income - totalExpenses) / user.income) * 100;

  if (savingsRate < 10) {
    return `Your savings rate is ${savingsRate.toFixed(1)}%, which is below the recommended 20%. Consider reviewing your expenses, especially in categories where you're overspending. Start with the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Focus on building an emergency fund of ₹${(user.income * 3).toLocaleString('en-IN')}-₹${(user.income * 6).toLocaleString('en-IN')} first.`;
  } else if (savingsRate >= 10 && savingsRate < 20) {
    return `Great job! You're saving ${savingsRate.toFixed(1)}% of your income. To reach the ideal 20% savings rate, try reducing discretionary spending. Consider automating your savings to make it easier. Aim to save at least ₹${(user.income * 0.2).toLocaleString('en-IN')} per month.`;
  } else {
    return `Excellent! You're saving ${savingsRate.toFixed(1)}% of your income. With your ${user.riskProfile} risk profile, consider diversifying into investments. Focus on building an emergency fund of ₹${(totalExpenses * 3).toLocaleString('en-IN')}-₹${(totalExpenses * 6).toLocaleString('en-IN')} first.`;
  }
}

export function generateInvestmentRecommendation(user: User): string {
  const recommendations = {
    low: "For your conservative profile, consider starting with government bonds, PPF, and high-yield savings accounts. Once comfortable, add some low-risk mutual funds like debt funds or hybrid funds.",
    medium: "With a balanced approach, consider 60% equity mutual funds and 40% debt instruments. Nifty 50 index funds and SIP investments are great starting points for long-term growth in India.",
    high: "For aggressive growth, consider 80% equity mutual funds and 20% debt instruments. Look into large-cap and mid-cap funds, but remember to diversify across sectors and maintain an emergency fund."
  };

  return recommendations[user.riskProfile];
}

export function getBudgetRecommendation(income: number, category: string): number {
  const budgetPercentages: Record<string, number> = {
    Food: 0.15,
    Bills: 0.35,
    Transportation: 0.15,
    Entertainment: 0.05,
    Shopping: 0.10,
    Healthcare: 0.05,
    Others: 0.15,
  };

  return income * (budgetPercentages[category] || 0.10);
}