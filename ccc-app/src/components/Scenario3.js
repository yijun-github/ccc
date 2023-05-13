import React from "react";
import Scenario1Map from "./Scenario1Map";
import StackedBarLangSent from "./StackedBarLangSent";
import BarAveLangSent from "./BarAveLangSent";
import BarLang from "./BarLang";
import PieLangPos from "./PieLangPos";

function Scenario3() {
  return (
    <>
    <h1>Late Nights</h1>
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

export default Scenario3;
