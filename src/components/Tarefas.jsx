import {useState, useEffect} from 'react'


const Tarefas = () => {
  
  // HOOK - useState - manipula o estado da variavel e guarda os dados
  const [tarefas, setTarefas]=useState(()=>{
    const salvarTarefas = localStorage.getItem("item-tarefa");
    return salvarTarefas ? JSON.parse(salvarTarefas): [];
  });
  // useState para manipular os dados que passarem nos campos
  const [campo, setCampo]=useState("");

  // HOOK - useEffect - realiza um efeito colateral, no exemplo vai
  // carregar automaticamente as tarefas cadastradas.

  useEffect(()=>{
    localStorage.setItem("item-tarefas", JSON.stringify(tarefas));
  },[]);
    
    return (
    <>
      
    </>
  )
}

export default Tarefas
