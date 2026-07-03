import { Button, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native"

const HomeScreen = () => {
    const { logout } = useAuth();
    const navigation = useNavigation()
    const handleLogout = async () => {
        const response = await logout();
        navigation.navigate('Login')
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login successful</Text>
            <TouchableOpacity
                style={{ borderWidth: 1, borderRadius: 5, borderColor: COLORS?.primary, backgroundColor: COLORS?.secondary, padding: 5 }}
                onPress={handleLogout}
            >
                <Text style={{ color: COLORS?.primary }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;