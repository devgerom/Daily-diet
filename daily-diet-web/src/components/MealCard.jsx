import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Card = styled.li`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid ${(p) => (p.$onDiet ? '#2ecc71' : '#e74c3c')};
  flex-wrap: wrap;
  gap: 12px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 16px;
  }

  span {
    font-size: 13px;
    color: #888;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export default function MealCard({ meal, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card $onDiet={meal.isOnDiet}>
      <Info>
        <strong>{meal.name}</strong>
        <span>{new Date(meal.datetime).toLocaleString('pt-BR')}</span>
      </Info>
      <Actions>
        <Button onClick={() => navigate(`/meals/${meal.id}/edit`)}>Editar</Button>
        <Button onClick={() => onDelete(meal.id)}>Apagar</Button>
      </Actions>
    </Card>
  );
}