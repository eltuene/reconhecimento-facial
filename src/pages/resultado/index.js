import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Container,
  Title,
  DaySection,
  DayTitle,
  StudentList,
  StudentItem,
  Spinner,
  ErrorMessage,
} from "./styles";

const AlunosPresentes = () => {
  const [alunosPorDia, setAlunosPorDia] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFetched = useRef(false);

  const fetchAlunosPresentes = async () => {
    try {
      const response = await axios.get("http://localhost:3005/alunos-presentes-todos-dias");
      const alunos = response.data;

      const alunosAgrupadosPorDia = alunos.reduce((acc, aluno) => {
        const { data, nome, matricula } = aluno;
        if (!acc[data]) {
          acc[data] = [];
        }
        acc[data].push({ nome, matricula });
        return acc;
      }, {});

      setAlunosPorDia(alunosAgrupadosPorDia);
      setLoading(false);
    } catch (err) {
      setError("Erro ao buscar os dados de presença.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      fetchAlunosPresentes();
      isFetched.current = true;
    }
  }, []);

  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Presenças por Dia</Title>
      {Object.keys(alunosPorDia).map((dia) => (
        <DaySection key={dia}>
          <DayTitle>Dia: {dia}</DayTitle>
          <StudentList>
            {alunosPorDia[dia].map((aluno, index) => (
              <StudentItem key={index}>
                {aluno.nome} - Matrícula: {aluno.matricula}
              </StudentItem>
            ))}
          </StudentList>
        </DaySection>
      ))}
    </Container>
  );
};

export default AlunosPresentes;
