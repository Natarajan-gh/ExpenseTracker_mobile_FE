import { useState } from "react";
import {  ImageBackground, View, Image, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";


const LoginScreen = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const handleLogin = async () => {
        console.log(email, password)
        if (email && password) {
            setLoading(true);
            const response = await login(email, password);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            if (response) {
                navigation.navigate('Home')
            } else {
                console.log(email, password, response)
            }
        }
    }
    return (
        <KeyboardAvoidingView  style={{backgroundColor: COLORS.background,flex:1}} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.primaryLight} />
            <View style={{alignItems: "center",flex:1, justifyContent: "center"}}>
                {/* <Image source={require('../assets/Wallet.png')} style={{ width: 200, height: 200 }} /> */}
                <Image source={require('../assets/Logo.png')} style={{ width: 120, height: 120 }} />
                <Text style={{color: COLORS.textPrimary, fontSize: 25, fontWeight: 'bold', paddingVertical: 10}}>Welcome Back</Text>
                <Text style={{color: COLORS.textSecondary, fontSize: 16, paddingHorizontal: 20, textAlign: 'center',paddingBottom: 10}}>Login to continue tracking your income & expenses.</Text>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={COLORS.inputPlaceholder}
                    onChangeText={(text) => setEmail(text)}
                    style={{ borderWidth: 1, borderRadius: 5, borderColor: COLORS.inputBorder, padding: 15, marginVertical: 5, width: '80%', marginBottom:20 }}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor={COLORS.inputPlaceholder}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    style={{ borderWidth: 1, borderRadius: 5, borderColor: COLORS.inputBorder, padding: 15, marginVertical: 5, width: '80%',marginBottom:20}}
                />
                <TouchableOpacity
                    style={{ backgroundColor: COLORS.primary, padding: 10,marginVertical:10, borderRadius: 5,width: '80%', alignItems: 'center', marginBottom: 10 }}
                    disabled={email === null || password === null || loading}
                    onPress={handleLogin}
                >
                    {
                        !loading ? (
                            <Text style={{ color: COLORS.textWhite }}>Login</Text>
                        ):(
                            <ActivityIndicator size="small" color={COLORS.textWhite} />
                        )
                    }
                </TouchableOpacity> 
             </View>
        </KeyboardAvoidingView>
    )
}
export default LoginScreen;