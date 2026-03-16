import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 85vh;
  background-color: #f8f9fa;
`;

export const ContentCard = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 800px;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #202124;
  margin-bottom: 30px;
  border-bottom: 2px solid #f1f3f4;
  padding-bottom: 15px;
`;

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    background-color: #f8f9fa;
    color: #5f6368;
    font-weight: 600;
    padding: 15px;
    border-bottom: 2px solid #dadce0;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid #f1f3f4;
    color: #202124;
    vertical-align: middle;
  }

  tr:hover {
    background-color: #f4f8fe;
  }
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  /* 상태가 악성이면 빨간색, 안전이면 초록색 */
  background-color: ${props => props.$isMalicious ? '#fce8e6' : '#e6f4ea'};
  color: ${props => props.$isMalicious ? '#d93025' : '#1e8e3e'};
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 50px 0;
  color: #80868b;
  font-size: 1.1rem;
`;