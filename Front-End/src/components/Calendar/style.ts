import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';

const Button = styled.button`
  background: white;
  width: 24px;
  height: 24px;
  top: 15px;
  border: none;
  display: inline-block;
`;

// 일정 눌렀을때 나오는 모달 안에서 상세정보 보기 했을때 누르는 수정 버튼
const StyledButton = styled.button`
  background: gray;
  text-align: right;
`

const Title = styled.div`
  text-align: 'center';
`

const Table = styled.table`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TdBorder {
  isDisplay: boolean;
}

const StyledTd = styled.td<TdBorder>`
  border: ${((props: any) => props.isDisplay ? `1px solid gray;` : `none`)};
  width: 200px;
  height: 100px;
  vertical-align: top;
`;

const StyledTdDay = styled.span`
  display: block;
  padding: 5px;
  background-color: rgba(0, 255, 0, 0.1);

  &:hover {
    cursor: pointer;
  }
`;

const TdStart = styled.div`
  background-color: #ff6813;
  width: 14px;
  height: 14px;
`;

const StyledScheduleUi = styled.ul`
  padding: 0;
  padding-inline-start: 22px;
`;

const StyledScheduleLi = styled.li`  
  margin: 0 auto;
  padding: 0;
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.7);
`;

const StyledClearIcon = styled(ClearIcon)`
  color: red;
  float: right;
  padding: 3px 3px;

  &:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`;

const StyledLiTitle = styled.div`
  display: inline-block;

  &:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`;

const StartLabel = styled.div`
  color: #ffffff;
  font-size: 10px;
	font-family: 나눔고딕,NanumGothic,돋움,Dotum;
  background-color: #FF6813;
  margin: 2px 3px 0px 0px;
  width: 14px;
  height: 14px;
`;

export { Button, Table, StyledTd, Title, StyledTdDay, TdStart, StyledScheduleLi, StyledScheduleUi, StyledButton, StyledClearIcon, StyledLiTitle, StartLabel };
