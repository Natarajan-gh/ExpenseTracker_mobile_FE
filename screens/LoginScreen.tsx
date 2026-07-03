import { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants";
import { useAuth } from "../context/AuthContext";


const LoginScreen = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const navigation = useNavigation()
    const handleLogin = async () => {
        console.log(email, password)
        if (email && password) {
            const response = await login(email, password);
            if (response) {
                navigation.navigate('Home')
            } else {
                console.log(email, password, response)
            }
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                style={{ borderWidth: 1, borderRadius: 5, borderColor: COLORS.primary, padding: 5, marginVertical: 5 }}
            />
            <TextInput
                placeholder="password"
                onChangeText={(text) => setPassword(text)}
                style={{ borderWidth: 1, borderRadius: 5, borderColor: COLORS.primary, padding: 5, marginVertical: 5 }}
            />
            <TouchableOpacity
                style={{ backgroundColor: COLORS.primary, padding: 5, borderRadius: 5 }}
                onPress={handleLogin}
            >
                <Text style={{ color: COLORS.secondary }}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}
export default LoginScreen;