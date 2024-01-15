import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"
import Loading from "../layout/Loading"
function Projects (){
    let message = ''
    const [projects, setProjects] = useState([])
    const location = useLocation()
    const [removeLoading, setRemoveLoading] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/projects',{
            method:'GET',
            headers:{
                'Content-type':'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data=>{
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        }).catch(err=> console.log(err))
    }, [])
    
    if(location.state){
        message = location.state.message
    }
    return(
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton to="newProject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message}/>} 
            <Container customClass="start">
                {projects.length > 0 &&
                 projects.map((project) => 
                 <ProjectCard 
                 name={project.name}
                 id={project.id}
                 budget={project.budget}
                 category={project.category.name}
                 key={project.id}
                 />)
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>

        </div>
    )
}
export default Projects