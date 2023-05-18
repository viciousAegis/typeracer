import './App.css';
import HeaderBar from './components/HeaderBar';
import ContentSection from './ContentSection';
import { texts } from './data/text';

function App() {
  // choose a random text from the texts array
  const randomIndex = Math.floor(Math.random() * texts.length);
  const randomText = texts[randomIndex];

  return (
    <div className='App'>
      <HeaderBar />
      <ContentSection
        text={randomText}
      />
    </div>
  );
}

export default App;
