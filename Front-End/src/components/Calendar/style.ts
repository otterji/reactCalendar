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
  width: 100%;
`;

interface TdBorder {
    isDisplay: boolean;
}

const StyledTd = styled.td<TdBorder>`
  border: ${((props: any) => props.isDisplay ? `1px dotted #f2f2f2;` : `none`)};
  height: 100px;
  width: 14.4%;
  min-width:140px;
  vertical-align: top;
`;

const StyledTdDay = styled.span`
  display: block;
  padding: 2px;
  background-color: #eff5f5;
  text-align: center;
  font-size: 12px;
  height: 15px;
  &:hover {
    cursor: pointer;
  }
  width:100%;
`;

const TdStart = styled.div`
  background-color: #ff6813;
  width: 14px;
  height: 14px;
  border-radius: 3px;
`;

const StyledScheduleUi = styled.div`
  padding: 0;
  margin-top : 10px;
  margin-bottom : 10px;
`;

const StyledScheduleLi = styled.div`  
  padding: 0;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7);
  width: 100%;
`;

const StyledClearIcon = styled(ClearIcon)`
  color: red;
  float: right;
  padding: 3px 3px;
  vertical-align: top;

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
  width: 95px;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  vertical-align: top;
  padding-left: 7px;
`;

const StartLabel = styled.div`
  display: inline-block;
  color: #ffffff;
  font-size: 10px;
  font-family: 나눔고딕,NanumGothic,돋움,Dotum;
  background-color: #009689;
  border-radius: 3px;
  width: 14px;
  height: 14px;
  text-align: center;
  vertical-align: top;
  margin-top : 4px;
`;

const EndLabel = styled.div`
  display: inline-block;
  color: #ffffff;
  font-size: 10px;
  font-family: 나눔고딕,NanumGothic,돋움,Dotum;
  background-color: #00332d;
  border-radius: 3px;
  width: 14px;
  height: 14px;
  text-align: center;
  vertical-align: top;
  margin-top : 4px;
`;

const DangLabel = styled.div`
  display: inline-block;
  color: #ffffff;
  font-size: 10px;
  font-family: 나눔고딕,NanumGothic,돋움,Dotum;
  background-color:  #BDBDBD;
  border-radius: 3px;
  width: 14px;
  height: 14px;
  text-align: center;
  vertical-align: top;
  margin-top : 4px;
`;

export {
    Button,
    Table,
    StyledTd,
    Title,
    StyledTdDay,
    TdStart,
    StyledScheduleLi,
    StyledScheduleUi,
    StyledButton,
    StyledClearIcon,
    StyledLiTitle,
    StartLabel,
    EndLabel,
    DangLabel,
};
