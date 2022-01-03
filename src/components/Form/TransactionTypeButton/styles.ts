import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../../global/styles/theme";
import { RectButton } from "react-native-gesture-handler";

interface IProps {
  type: "up" | "down";
}

interface IContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled.View<IContainerProps>`
  width: 48%;

  border: ${({ theme, isActive }) =>
    `${isActive ? "0" : "1.5px"} solid ${theme.colors.text}`};

  border-radius: 5px;

  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${theme.colors.attention_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${theme.colors.success_light};
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Icon = styled(Feather)<IProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;
