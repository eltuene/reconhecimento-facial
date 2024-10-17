import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

export const DaySection = styled.div`
  margin-bottom: 30px;
`;

export const DayTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

export const StudentList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export const StudentItem = styled.li`
  font-size: 18px;
  color: #555;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: 18px;
`;
