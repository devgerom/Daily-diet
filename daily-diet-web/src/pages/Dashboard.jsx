import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import Button from '../components/Button';
import MealCard from '../components/MealCard';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const Empty = styled.p`
  text-align: center;
  color: #888;
  margin-top: 40px;
`;

export default function Dashboard() {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/meals')
      .then((res) => setMeals(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  async function handleDelete(id) {
    if (!confirm('Apagar esta refeição?')) return;
    try {
      await api.delete(`/meals/${id}`);
      setMeals((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert('Erro ao apagar refeição');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <Container>
      <Header>
        <h2>Minhas Refeições</h2>
        <Actions>
          <Button onClick={() => navigate('/metrics')}>Métricas</Button>
          <Button $primary onClick={() => navigate('/meals/new')}>
            Nova Refeição
          </Button>
          <Button onClick={handleLogout}>Sair</Button>
        </Actions>
      </Header>

      <ul>
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} onDelete={handleDelete} />
        ))}
      </ul>

      {meals.length === 0 && <Empty>Nenhuma refeição registrada ainda.</Empty>}
    </Container>
  );
}