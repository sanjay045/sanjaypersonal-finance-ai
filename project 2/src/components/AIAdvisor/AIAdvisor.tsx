import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, TrendingUp, IndianRupee, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from './ChatMessage';
import { generateFinancialAdvice, generateInvestmentRecommendation } from '../../utils/aiAdvisor';

export function AIAdvisor() {
  const { state, dispatch } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('saving') || lowerMessage.includes('save')) {
      return generateFinancialAdvice(state.user!, state.expenses);
    }
    
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
      return generateInvestmentRecommendation(state.user!);
    }
    
    if (lowerMessage.includes('budget')) {
      const totalExpenses = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const savingsRate = state.user ? ((state.user.income - totalExpenses) / state.user.income) * 100 : 0;
      return `Based on your current spending of $${totalExpenses.toLocaleString()}, you're saving ${savingsRate.toFixed(1)}% of your income. I recommend the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.`;
    }
    
    if (lowerMessage.includes('expense') || lowerMessage.includes('spending')) {
      const topCategory = state.expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>);
      
      const highestCategory = Object.entries(topCategory).sort(([,a], [,b]) => b - a)[0];
      if (highestCategory) {
        return `Your highest spending category is ${highestCategory[0]} at ₹${highestCategory[1].toLocaleString('en-IN')}. Consider reviewing this category for potential savings opportunities.`;
      }
    }
    
    if (lowerMessage.includes('goal') || lowerMessage.includes('target')) {
      return `Based on your risk profile (${state.user?.riskProfile}), I recommend setting SMART financial goals. Start with an emergency fund of 3-6 months expenses, then focus on retirement savings and specific goals like ${state.user?.goals.join(', ')}.`;
    }
      return `Based on your current spending of ₹${totalExpenses.toLocaleString('en-IN')}, you're saving ${savingsRate.toFixed(1)}% of your income. I recommend the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.`;
    return "I'm here to help with your financial questions! Ask me about budgeting, saving strategies, investment advice, or expense management. What specific aspect of your finances would you like to discuss?";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !state.user) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        message: generateAIResponse(inputMessage),
        sender: 'ai' as const,
        timestamp: new Date(),
      };

      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiResponse });
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    {
      icon: IndianRupee,
      text: "How can I save more money?",
      question: "How can I save more money based on my current spending patterns?"
    },
    {
      icon: TrendingUp,
      text: "Investment advice",
      question: "What investment options would you recommend for my risk profile?"
    },
    {
      icon: Target,
      text: "Budget planning",
      question: "How should I plan my budget for next month?"
    }
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Financial Advisor</h1>
            <p className="text-emerald-100">Get personalized financial guidance</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-6">
          {state.chatHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Welcome to Your AI Financial Advisor!</h3>
              <p className="text-gray-600 mb-6">Ask me anything about budgeting, saving, investing, or managing your finances.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {quickQuestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(item.question)}
                    className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 border border-emerald-100 hover:border-emerald-300"
                  >
                    <item.icon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">{item.text}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {state.chatHistory.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 p-6 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about your finances..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}