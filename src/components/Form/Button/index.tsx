import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface IButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, ...rest }: IButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
