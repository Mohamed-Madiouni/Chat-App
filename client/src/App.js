import React from "react"
import {HashRouter as Router,Route} from "react-router-dom"
import Join from "./component/Join"
import Chat from "./component/Chat"
function App() {
  return (
   <Router>
     <Route exact path ="/" component={Join}/>
     <Route path ="/chat" component={Chat}/>
   </Router>
  );
}

export default App;
