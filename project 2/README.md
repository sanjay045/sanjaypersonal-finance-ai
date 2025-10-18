# 🏦 AI-Powered Personal Finance Management System

A comprehensive, intelligent financial management application designed specifically for Indian users, featuring AI-powered advice, expense tracking, budget planning, and investment guidance.

![Finance AI Dashboard](https://via.placeholder.com/800x400/10B981/FFFFFF?text=FinanceAI+Dashboard)

## ✨ Features

### 🤖 AI Financial Advisor
- Personalized financial advice based on spending patterns
- Investment recommendations for Indian markets (PPF, SIP, Nifty 50)
- Smart budget optimization suggestions
- Risk profile-based guidance

### 💰 Expense Management
- Real-time expense tracking with categorization
- Recurring expense detection
- Visual spending analytics with interactive charts
- Export functionality for reports

### 📊 Budget Planning
- Automated budget recommendations using 50/30/20 rule
- Category-wise budget tracking
- Overspending alerts and warnings
- Progress visualization

### 📈 Investment Guidance
- Risk-based investment recommendations
- Indian market-focused advice (Mutual Funds, ETFs, Bonds)
- Goal-based financial planning
- Portfolio diversification suggestions

### 🔄 Data Persistence
- Google Sheets integration for cloud storage
- Real-time data synchronization
- Cross-device accessibility
- Automatic backup

## 🚀 Live Demo

Visit the live application: [Your Netlify/GitHub Pages URL]

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Google Sheets API
- **Build Tool**: Vite
- **Deployment**: Netlify/GitHub Pages

## 📱 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/600x400/10B981/FFFFFF?text=Dashboard+View)

### AI Advisor
![AI Advisor](https://via.placeholder.com/600x400/10B981/FFFFFF?text=AI+Advisor+Chat)

### Expense Tracking
![Expenses](https://via.placeholder.com/600x400/10B981/FFFFFF?text=Expense+Tracking)

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Cloud Console account (for Sheets API)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-finance-manager.git
   cd ai-finance-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Add your Google Sheets configuration:
   ```env
   VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
   VITE_GOOGLE_SHEETS_ID=your_spreadsheet_id_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Google Sheets Setup

1. **Create Google Sheets Document**
   - Create a new Google Sheets document
   - Add 4 sheets: `Users`, `Expenses`, `Budgets`, `Investments`

2. **Get API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Enable Google Sheets API
   - Create credentials (API Key)

3. **Configure Permissions**
   - Share your Google Sheet with "Anyone with the link can view"
   - Copy the Spreadsheet ID from the URL

## 🚀 Deployment

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag `dist` folder to [netlify.com](https://netlify.com)
   - Or connect your GitHub repository for automatic deployments

3. **Environment Variables**
   Add in Netlify dashboard:
   - `VITE_GOOGLE_SHEETS_API_KEY`
   - `VITE_GOOGLE_SHEETS_ID`

### GitHub Pages Deployment

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as source

2. **Automatic Deployment**
   - Push to main branch triggers automatic deployment
   - Site available at `https://yourusername.github.io/ai-finance-manager`

## 🎨 Design System

### Color Palette
- **Primary**: Emerald Green (#10B981)
- **Secondary**: Teal (#14B8A6)
- **Accent**: Cyan (#06B6D4)
- **Success**: Green (#22C55E)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Inter, system fonts
- **Body**: System fonts with 150% line height
- **Code**: Monospace fonts

## 📊 Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard components
│   ├── Expenses/       # Expense management
│   ├── Budget/         # Budget planning
│   ├── AIAdvisor/      # AI chat interface
│   ├── Reports/        # Analytics and reports
│   ├── Settings/       # User settings
│   └── Layout/         # Layout components
├── context/            # React Context providers
├── services/           # API services
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── config/             # Configuration files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern fintech applications
- **Icons**: Lucide React icon library
- **Charts**: Recharts library
- **Styling**: Tailwind CSS framework

## 📞 Support

For support, email support@financeai.com or create an issue in this repository.

## 🔮 Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced AI features with machine learning
- [ ] Integration with Indian banks and financial institutions
- [ ] Cryptocurrency tracking
- [ ] Tax calculation and filing assistance
- [ ] Multi-language support (Hindi, Tamil, etc.)

---

**Made with ❤️ for Indian users by [Your Name]**