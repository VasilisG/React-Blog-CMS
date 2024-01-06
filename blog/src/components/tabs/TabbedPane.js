import { React, useRef, useState, useEffect } from 'react';
import TabHeader from './TabHeader';
import TabItem from './TabItem';
import useSearchContext from '../../hooks/use-search-context';

const TabbedPane = ({headers, data}) => {

  const [activeHeader, setActiveHeader] = useState(headers[0].value);
  //const [visible, setVisible] = useState(false);

  const { tabsVisible, setTabsVisible } = useSearchContext();

  const tabbedPaneRef = useRef(null);

  useEffect(() => {
    function hideMenu(event) {
        if(
          tabbedPaneRef.current 
            && !tabbedPaneRef.current.contains(event.target)
        ) {
          setTabsVisible(false);
        } 
    }
    document.body.addEventListener('click', hideMenu);
    return () => {
        document.body.removeEventListener('click', hideMenu);
    }
}, []);

  const renderTabHeaders = () => {
    return (
      <div className="tab-headers">
        {headers.map(
          header => {
            return (
              <TabHeader 
                key={header.value}
                value={header.value} 
                title={header.label} 
                data={data[header.value]} 
                active={header.value === activeHeader}
                callback={setActiveHeader}
              />
            )
          } 
        )}
      </div>
    );
  }

  const renderTabItems = () => {
    return (
      <div 
        className="tab-items"
      >
        {headers.map(
          header => {
            return (
              <TabItem 
                key={header.value}
                entity={header.value} 
                data={data[header.value]}
                field={header.field} 
                active={header.value === activeHeader}
              />
            )
          }
        )}
      </div>
    );
  }

  return (
    <div 
      className={`tab-container ${tabsVisible ? 'tab-container-visible' : ''}`}
      ref={tabbedPaneRef}
    >
      {renderTabHeaders()}
      {renderTabItems()}
    </div>
  )
}

export default TabbedPane;