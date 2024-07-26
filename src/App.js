import './App.css';
import Head from './App/Head.js';
import Characters from './App/Tabs/Characters.js';
import Character from './App/Tabs/Character.js';
import api from 'api.js';

function App() {
  let ePage = '404 - Page not found.';

  let tabs = [
    {
      id: 'home',
      // component: Home,
      nav: true,
      name: 'Home',
    },
    {
      id: 'characters',
      component: Characters,
      nav: true,
      name: 'Characters',
    },
    {
      id: 'character',
      component: Character,
      props: () => {
        return {
          character: api.router.get('character'),
        };
      },
      nav: true,
      name: 'Character',
    },
    {
      id: 'seasons',
      nav: false,
      // component: Home,
      name: 'Seasons',
    },
  ];

  let curTab = tabs.find((t) => t.id === api.router.get('tab'));

  if (curTab && curTab.component) {
    let Component = curTab.component;
    let props = curTab.props ? curTab.props() : {};
    ePage = <Component {...props} />;
  }

  return (
    <div className="App">
      <Head {...{ tabs }} />
      {ePage}
    </div>
  );
}

export default App;
