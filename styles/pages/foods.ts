import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableFoodsHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const TableFoodsTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

export const TableFoods = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 26px;
  background: ${(props) => props.theme.blueColors[700]};

  thead {
    th {
      cursor: pointer;
      height: 35px;
      padding: 5px;
    }

    th:first-child {
      text-align: left;
      padding-left: 10px;
      max-width: 100px;
    }
    border-bottom: 1px solid ${(props) => props.theme.blueColors[200]};
  }

  tbody {
    tr {
      td {
        padding: 5px;
        text-align: center;
      }
    }

    td:first-child {
      text-align: left;
      padding-left: 10px;
    }

    tr:hover {
      background-color: ${(props) => props.theme.blueColors[400]};
    }
  }

  tr:nth-of-type(even) {
    background: ${(props) => props.theme.blueColors[800]};
  }
`;
