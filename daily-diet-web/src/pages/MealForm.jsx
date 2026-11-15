import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  cursor: pointer;
`;

export default function MealForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [isOnDiet, setIsOnDiet] = useState(true);

  useEffect(() => {
    if (isEditing) {
      api.get(`/meals/${id}`).then((res) => {
        const m = res.data;
        setName(m.name);
        setDescription(m.description);
        setDatetime(new Date(m.datetime).toISOString().slice(0, 16));
        setIsOnDiet(m.isOnDiet);
      });
    }
  }, [id, isEditing]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { name, description, datetime, isOnDiet };

    try {
      if (isEditing) {
        await api.put(`/meals/${id}`, payload);
      } else {
        await api.post('/meals', payload);
      }
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao salvar refeição');
    }
  }

  return (
    <Container>
      <h2>{isEditing ? 'Editar Refeição' : 'Nova Refeição'}</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          required
        />
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={isOnDiet}
            onChange={(e) => setIsOnDiet(e.target.checked)}
          />
          Está dentro da dieta
        </CheckboxLabel>
        <Button $primary type="submit">
          {isEditing ? 'Salvar' : 'Registrar'}
        </Button>
        <Button type="button" onClick={() => navigate('/dashboard')}>
          Cancelar
        </Button>
      </Form>
    </Container>
  );
}