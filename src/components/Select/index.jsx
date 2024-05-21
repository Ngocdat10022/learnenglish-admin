import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styled from "styled-components";
import { IconDown } from "@/accsets/icons";

export default function Selects({
  lable,
  name,
  value,
  register,
  messageError,
  placeholder,
  defaultValue,
  children,
}) {
  const [valueDefault, setValueDefault] = useState();

  const handleSetVale = (e) => {
    setValueDefault(e.target.value);
  };

  return (
    <WrapperField>
      <LableField>{lable}</LableField>
      <FormControllContainer>
        <FormControlCustom
          sx={{
            width: "100%",
          }}
        >
          <SelectCustom
            {...register(name)}
            MenuProps={{
              PaperProps: {
                style: {
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              },
              MenuListProps: {
                style: {
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={handleSetVale}
            name={name}
            IconComponent={IconDown}
            defaultValue={defaultValue ?? valueDefault}
            placeholder={placeholder}
          >
            {children}
          </SelectCustom>
        </FormControlCustom>
      </FormControllContainer>
      {messageError && (
        <LabelError>
          Your balance is insufficient. Please deposit more funds
        </LabelError>
      )}
    </WrapperField>
  );
}

const WrapperField = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;
const FormControllContainer = styled.div`
  width: 100%;
`;

const FormControlCustom = styled(FormControl)`
  & .MuiOutlinedInput-root {
    background: transparent;
    width: 100%;
    height: 44px;
    border: 2px solid #57617b !important;
    color: #57617b;
    padding: 0 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    fieldset {
    }
    &:hover fieldset {
      border-color: #57617b;
      border: 0px solid #57617b !important;
    }
    &.Mui-focused fieldset {
      border-color: #57617b;
      border: 0px solid #57617b !important;
    }
  }
`;

const LableField = styled.span`
  font-size: 16px;
  color: #053576;
`;

const SelectCustom = styled(Select)`
  &.MuiSelect-select {
    width: 100%;
    padding-left: 12px;
    color: #053576;
    &:focus {
      background-color: transparent;
    }
  }
  &.MuiSvgIcon-root {
    color: #053576;
  }
  .MuiPaper-root,
  .MuiMenu-list,
  .MuiList-root {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const LabelError = styled.span`
  font-size: 14px;
  color: #f1811a;
  margin-top: 10px;
  margin-bottom: 30px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
`;
