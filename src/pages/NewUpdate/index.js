import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function NewUpdate(){

  const[name, setName] = useState('');
  const[value, setValue] = useState('');
  const navigate = useNavigate();

  // service_id, definido na rota NewUpdate
  const{service_id} = useParams();

  // recebe e manipula eventos do form
  async function saveOrUpdate(e){

    e.preventDefault();

    const data = {name, value};

    if (service_id === '0') {
      try {
        await api.post('api/v1/services', data, {});
        navigate('/');
      } catch (error) {
        alert('erro ao salvar');        
      }      
    } else {
      try {
        await api.patch(`api/v1/services/${service_id}`, data, {});
        navigate('/');
      } catch (error) {
        alert('erro ao atualizar');      
      }      
    }
  }

  // carrega registro especifico na api e seta states
  async function carregaService(){
    try {
      const response = await api.get(`api/v1/services/${service_id}`,{});
      setName(response.data.name);
      setValue(response.data.value);
    } catch (error) {
      alert('erro ao buscar registro');
      navigate('/');      
    }
  }

  // chama loadService e preenche form
  useEffect(() => {
    if (service_id === '0') {
      return;      
    } else {
      carregaService();      
    }
  }, [service_id]);

  return(
    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Services Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-dark" 
        style={{marginBottom: '5px'}} to="/">Home</Link>

        <form data-testid="myform" onSubmit={saveOrUpdate}>

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input data-testid="input1" id="name" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Nome" value={name}
            onChange={e => setName(e.target.value)}></input>
          </div>

          <div className="form-group">
            <label htmlFor="value">Valor</label>
            <input data-testid="input2" id="value" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Valor" value={value}
            onChange={e => setValue(e.target.value)}></input>
          </div>

          <button data-testid="btnenviar" type="submit" className="btn btn-primary">Enviar</button>

        </form>

      </div>
    </div>
  );

}