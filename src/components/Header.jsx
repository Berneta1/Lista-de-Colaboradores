const Header = ({reset, referencia, buscar})=> {
    return (
        <header>
            <h3>Buscador de Colaboradores</h3>
            <input 
            ref={referencia}
            type="text" 
            placeholder="Buscador colaborador"
            onChange={()=> reset()}
            onKeyDown ={(e)=> buscar(e)}/>
        </header>
    )
}

export default Header