import { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { navigationType } from "../types/navigationType";


const RegisterScreen = () => {
    const { register } = useAuth();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const navigation = useNavigation<NativeStackNavigationProp<navigationType>>();


    const handleLogin = async () => {
        setLoading(true);
        if (name && email && password) {
            const response = await register(name, email, password);
            if (response.success) {
                navigation.navigate('Login')
            } else {
                setError(response?.message || 'Something went wrong!')
                console.log(email, password, response)
            }
        }
        setLoading(false);
    }
    return (
        <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.primaryLight} />
            <View style={styles.container}>
                <Image source={require('../assets/Logo.png')} style={{ width: 120, height: 120 }} />
                <Text style={styles.heading}>Welcome Back</Text>
                <Text style={styles.subHeading}>Login to continue tracking your income & expenses.</Text>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor={COLORS.inputPlaceholder}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={COLORS.inputPlaceholder}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor={COLORS.inputPlaceholder}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={[styles.save_btn, { backgroundColor: (!email || !password || loading) ? COLORS?.textSecondary : COLORS?.primary }]}
                    disabled={!email || !password || loading}
                    onPress={handleLogin}
                >
                    {
                        !loading ? (
                            <Text style={{ color: COLORS.textWhite }}>Register</Text>
                        ) : (
                            <ActivityIndicator size="small" color={COLORS.textWhite} />
                        )
                    }
                </TouchableOpacity>
                {
                    error ?
                        <Text style={styles?.errorStyle}>{error}</Text> : null
                }
                <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation?.goBack()}>
                    <Text style={styles.miscel}>Already have account?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLORS.background,
        flex: 1
    },
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.inputBorder,
        padding: 15,
        marginVertical: 5,
        width: '80%',
        marginBottom: 20
    },
    save_btn: {
        backgroundColor: COLORS.primary,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginBottom: 10
    },
    heading: {
        color: COLORS.textPrimary,
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    subHeading: {
        color: COLORS.textSecondary,
        fontSize: 16,
        paddingHorizontal: 20,
        textAlign: 'center',
        paddingBottom: 10
    },
    errorStyle: {
        color: COLORS?.error,
        fontSize: FONTS?.small,
        padding: 5,
    },
    miscel: {
        fontSize: FONTS?.small,
        color: COLORS?.textPrimary
    }
})