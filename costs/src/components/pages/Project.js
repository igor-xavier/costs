import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../servicos/ServiceForm'
import {parse, v4 as uuidv4} from 'uuid'
function Project(){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    const [message, setMessage] = useState(true)
    const [type, setType] = useState()

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(resp => resp.json()).then((data)=>{
        setProject(data)
    }).catch(err => console.log)
    },1000)
 }, [id])

function createService(project){
    setMessage('')
    //lastserv
    const lastService= project.services[project.services.length - 1]
    lastService.id = uuidv4()
    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
    //maximum value validation
    if(newCost > parseFloat(project.budget)){
        setMessage('Orçamento ultrapassado')
        setType('error')
        project.services.pop()
        return false
    }
    //add service cost to project total
    project.cost = newCost
    //update project
    fetch(`http://localhost:5000/projects/${project.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    }).then((resp)=>resp.json())
    .then((data)=>{
        //show service
    })
}

function toggleProjectForm(){
    setShowProjectForm(!showProjectForm)
 }
 function toggleServiceForm(){
    setShowServiceForm(!showServiceForm)
 }
function editPost(project){
    setMessage('')
    //budgetvalidation
    if(project.budget < project.cost){
        setMessage('O orçamento não pode ser menor do que o custo do projeto!')
        setType('error')
        return false
    }
    fetch(`http://localhost:5000/projects/${project.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(project),
    }).then(resp=>resp.json())
    .then((data)=>{
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado!')
        setType('success')
    })
    .catch()
}
    return (
        <>{project.name ?
           (<div className={styles.projectDetails}>
                <Container customClass="column">
                    {message && <Message type={type} message={message}/>}
                    <div className={styles.detailsContainer}>
                        <h1>Projeto:{project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto':'Fechar'}</button>
                        {!showProjectForm? (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>Categoria: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento: </span> {project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span> {project.cost}
                                </p>
                            </div>
                        ):(<div className={styles.projectInfo}>
                            <ProjectForm handleSubmit={editPost} btnText='Concluir' projectData={project}/>
                        </div>)}
                    </div>
                    <div className={styles.serviceFormContainer}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço':'Fechar'}</button>
                            <div className={styles.projectInfo}>
                                {showServiceForm && <ServiceForm 
                                handleSubmit={createService}
                                btnText={'Adicionar Serviço'}
                                projectData={project}
                                />}
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                            <p>Itens de serviços</p>
                    </Container>

                </Container>
            </div>)
              : <Loading/>}</>
    )
}
export default Project