import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Footer = styled.p`
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
`;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/users/register', { name, email, password });
      alert('Cadastro realizado! Faça login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao cadastrar');
    }
  }

  return (
    <Container>
      <Title>Criar conta</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button $primary type="submit">Cadastrar</Button>
      </Form>
      <Footer>
        Já tem conta? <Link to="/login">Entrar</Link>
      </Footer>
    </Container>
  );
}