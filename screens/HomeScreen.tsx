import { Button, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { navigationType } from "../types/navigationType";

const HomeScreen = () => {
    const { logout, user } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<navigationType>>()
    const handleLogout = async () => {
        const response = await logout();
        navigation.navigate('Login')
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hi {user?.name}!</Text>
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