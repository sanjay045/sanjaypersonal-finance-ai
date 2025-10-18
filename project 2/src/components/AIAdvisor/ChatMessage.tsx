import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-emerald-600 text-white' 
          : 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-emerald-600 text-white' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="text-sm leading-relaxed">{message.message}</p>
        <p className={`text-xs mt-2 ${
          isUser ? 'text-emerald-100' : 'text-gray-500'
        }`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}