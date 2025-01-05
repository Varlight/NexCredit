# NeXscore: Enhanced Credit Risk Assessment System

NeXscore is a next-generation credit risk assessment platform that combines traditional credit scoring methods with alternative data analysis to provide more accurate and inclusive credit risk predictions.

## 🚀 Features

### Core Functionality
- **Bank Statement Analysis**
  - PDF statement processing
  - Transaction pattern recognition
  - UPI payment analysis
  - Merchant categorization

### Dual-Core Credit Assessment
- **Traditional Metrics (CIBIL-style)**
  - Payment History (30%)
  - Credit Exposure (25%)
  - Credit Duration (25%)
  - Other Factors (20%)

- **Alternative Data Analysis**
  - Income stability tracking
  - Spending pattern analysis
  - Transaction consistency scoring
  - Location stability metrics

## 🛠️ Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- PDF parsing utilities

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/nexscore.git
   ```

2. Install dependencies
   ```bash
   cd nexscore
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── app/           # Next.js app directory
├── components/    # React components
│   ├── ui/       # UI components
│   └── charts/   # Visualization components
├── lib/          # Utilities and helpers
│   ├── utils/    # Utility functions
│   └── types/    # TypeScript types
└── services/     # API and services
    ├── api/      # API endpoints
    └── scoring/  # Scoring logic
```

## 🔧 Configuration

Create a \`.env.local\` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📝 Usage

### Bank Statement Upload
1. Navigate to the upload section
2. Drop or select your PDF bank statement
3. Wait for processing completion

### Credit Assessment
1. View traditional credit metrics
2. Check alternative data analysis
3. See combined risk assessment

### Dashboard Features
- Interactive visualizations
- Real-time updates
- Detailed factor breakdown
- Risk assessment explanations

## 🚧 Current Status
- [x] Basic project setup
- [x] File upload system
- [x] Transaction parsing
- [x] Basic scoring implementation
- [ ] Advanced ML model integration
- [ ] Complete social media api integrations (x,linkedin,facebook,instagram)

## 📈 Future Enhancements

### 1. Enhanced ML Model
- Improved prediction accuracy
- More sophisticated feature engineering
- Additional data source support (social media)

### 2. Advanced Features
- Real-time monitoring
- Automated updates
- Extended reporting

### 3. UI/UX Improvements
- Enhanced visualizations
- Mobile optimization
- Performance upgrades



## ScreenShot
![Screenshot (574)](https://github.com/user-attachments/assets/12407b0b-684f-4345-8c86-e4c1d79b14ef)


## 📄 License
GPL



