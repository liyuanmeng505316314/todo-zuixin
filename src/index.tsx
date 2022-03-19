import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import App from './App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';




const render=()=>{ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
}

render()

store.subscribe(()=>{
  render()
})

registerServiceWorker();

// import * as React from 'react'
// class Component extends React.Component{
//    public render(){
//        return(
//            <div className="null"></div>
//        )
//    }

// }

// export default Component

