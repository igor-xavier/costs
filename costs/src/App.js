import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Project from './components/pages/Project';
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
        <Route path ="/projects" element = {<Projects/>}/>
        <Route path ="/company" element = {<Company/>}/>
        <Route path ="/contact" element = {<Contact/>}/>
        <Route path ="/newProject" element = {<NewProject/>}/>
        <Route path ="/Project/:id" element = {<Project/>}/>

      </Routes>
      </Container>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
