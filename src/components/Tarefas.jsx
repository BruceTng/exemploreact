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
    localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
  },[tarefas]);
    
  // função adicionar tarefa
  const adicionarTarefas =(e)=>{
    e.preventDefault();
    if (!campo.trim()) return;

    const novaTarefa = {
      id:Date.now(),
      text:campo,

    }

    setTarefas([...tarefas,novaTarefa]);
    setCampo();

  };

  const removerTarefa=(id)=>{
    const apagarTarefa=tarefas.filter((tarefa)=>tarefa.id !== id);
    setTarefas(apagarTarefa);
  };

    return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-400 rounded-2xl shadow-2xl border-2 border-gray-600">
        <h2 className="text-2xl font-bold mb-6 text-center">Minha Lista de Tarefas</h2>

        <form onSubmit={adicionarTarefas} className="flex gap-2 mb-6">
          <input
            type="text"
            value={campo}
            onChange={(e) => setCampo(e.target.value)}
             placeholder="Digite uma nova tarefa..."
            className="flex-1 px-4 border-gray-500 border rounded-lg focus:outline-none"
           />
            <button type="submit" className="bg-gray-600 hover:bg-green-900 font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer">
             Adicionar
           </button>
        </form>

         <ul className="space-y-3">
           {tarefas.map((tarefa) => (
            <li key={tarefa.id} className="flex items-center justify-between p-3 bg-gray-300 border border-gray-600 rounded-lg shadow-xl hover:bg-gray-200 transition-colors">
               <span className="text-shadow-black mr-2">{tarefa.text}</span>
               {/* arrow function (função seta) que encapsula a execução de outra função. 
          Ela garante que removerTarefa só seja executada quando o evento acontecer (como um clique de botão), 
          e não assim que a página carregar.*/}

               <button onClick={() => removerTarefa(tarefa.id)}
                 className="bg-gray-500 font-medium hover:bg-red-800 px-3 py-1 rounded-2xl transition-colors cursor-pointer">
                Excluir
               </button>
             </li>
           ))}
         </ul>

        {tarefas.length === 0 && <p className="mensagem">Nenhuma tarefa salva.</p>}
      </div>

    </>
  )
}

export default Tarefas
