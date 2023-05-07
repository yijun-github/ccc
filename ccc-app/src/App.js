import './App.css';
import StackedBarLangSent from './components/StackedBarLangSent.js';
import BarAveLangSent from './components/BarAveLangSent.js';
import BarLang from './components/BarLang';
import PieLangPos from './components/PieLangPos';
import Scenario1Map from './components/Scenario1Map';

function App() {
  return (
    <>
    <div className='div--state-sent-map'>
      <Scenario1Map />
    </div>
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
