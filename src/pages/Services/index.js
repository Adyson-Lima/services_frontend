import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function Services(){

  const[my_services, setServices] = useState([]);
  const navigate = useNavigate();

  // read, busca todos os registros na api
  useEffect(() => {
    api.get('api/v1/services',{})
    .then(response => {setServices(response.data)})
  }, []);

  // update, navega para tela NewUpdate
  async function updateService(id){
    try {
      navigate(`/newupdate/${id}`);
    } catch (error) {
      alert('Erro ao acessar pagina');      
    }
  }

  // delete, exclui um registro na api
  async function deleteService(id){
    try {
      await api.delete(`api/v1/services/${id}`,{});
      setServices(my_services.filter(service => service.id !== id));
    } catch (error) {
      alert('erro ao excluir');      
    }
  }

  return(
    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Services Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-success" 
        style={{marginBottom: '10px'}} to="/newupdate/0">Novo</Link>

        <table data-testid="mytable" className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nome</th>
              <th scope="col">Valor</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {my_services.map(service => (
              <tr key={service.id}>
                <th scope="row">{service.id}</th>
                  <td>{service.name}</td>
                  <td>{service.value}</td>
                  <td>

                    <button data-testid="mybtn1" type="button"
                    className="btn btn-outline-info" style={{margin: '2px'}}
                    onClick={() => updateService(service.id)}>Editar</button>

                    <button data-testid="mybtn2" type="button"
                    className="btn btn-outline-danger" style={{margin: '2px'}}
                    onClick={() => deleteService(service.id)}>Excluir</button>

                  </td>
              </tr>
            ))}
            
          </tbody>
        </table>

      </div>
    </div>
  );

}