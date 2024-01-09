function ProjectForm(){
    return (
        <form>
            <input type="text" placeholder="Insira o nome do projeto"/>
            <input type="number" placeholder="Insira o orçamento total"/>
            <select name="categoryId">
                <option disabled>Selecione a categoria</option>
            </select>
            <div>
                <input type="submit" value="Criar projeto"/>
            </div>
        </form>
    )
}
export default ProjectForm