import './App.css';
import StackedBarLangSent from './components/StackedBarLangSent.js';
import BarAveLangSent from './components/BarAveLangSent.js';
import BarLang from './components/BarLang';
import PieLangPos from './components/PieLangPos';

function App() {
  return (
    <>
    <div className='div--stacked-bar'>
      <StackedBarLangSent />
    </div>
    <div className='div--bar'>
      <BarAveLangSent />
    </div>
    <div className='div--bar'>
      <BarLang />
    </div>
    <div className='div--pie'>
      <PieLangPos />
    </div>
    </>
  );
}

export default App;
