import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
function Projects (){

    const location = useLocation()
    let message = ''
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
        <p>Projetos...</p>
            </Container>

        </div>
    )
}
export default Projects