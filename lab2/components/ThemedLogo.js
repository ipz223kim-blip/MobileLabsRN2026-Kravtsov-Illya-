import { useContext } from "react";
import { Image } from "react-native";
import { ThemeContext } from "../theme/theme";

export default function ThemedLogo() {
    const { theme } = useContext(ThemeContext);

    return (
        <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 36, height: 36, tintColor: theme.text }}
        />
    );
}
