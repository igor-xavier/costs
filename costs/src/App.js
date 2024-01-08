import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
function App() {
  return (
    <div className="App">
      <Router>
        <ul>
         <Navbar/>

        </ul>
        <Container customClass="minHeight">
      <Routes>
        <Route exact path ="/" element = {<Home/>}/>
        <Route exact path ="/projects" element = {<Projects/>}/>
        <Route exact path ="/company" element = {<Company/>}/>
        <Route exact path ="/contact" element = {<Contact/>}/>
        <Route exact path ="/newProject" element = {<NewProject/>}/>
      </Routes>
      </Container>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
