import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import Button from '../components/Button';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const Card = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-top: 4px solid ${(p) => p.$color || '#3498db'};

  h3 {
    margin: 0 0 8px;
    font-size: 13px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
  }
`;

export default function Metrics() {
  const [metrics, setMetrics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/meals/metrics').then((res) => setMetrics(res.data));
  }, []);

  if (!metrics) {
    return <p style={{ textAlign: 'center', marginTop: 40 }}>Carregando...</p>;
  }

  return (
    <Container>
      <Button onClick={() => navigate('/dashboard')}>← Voltar</Button>
      <Grid>
        <Card $color="#3498db">
          <h3>Total de refeições</h3>
          <p>{metrics.totalMeals}</p>
        </Card>
        <Card $color="#2ecc71">
          <h3>Dentro da dieta</h3>
          <p>{metrics.onDietMeals}</p>
        </Card>
        <Card $color="#e74c3c">
          <h3>Fora da dieta</h3>
          <p>{metrics.offDietMeals}</p>
        </Card>
        <Card $color="#9b59b6">
          <h3>Melhor sequência</h3>
          <p>{metrics.bestOnDietStreak}</p>
        </Card>
      </Grid>
    </Container>
  );
}