import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
    screenOptions={{
      headerShown: false, // ברירת מחדל – אין כותרת
    }}
  >
    <Stack.Screen
      name="login"
      options={{
        headerShown: false, // נשאר מוסתר
      }}
    />
    <Stack.Screen
      name="register"
      options={{
        headerShown: false, // רק כאן כן תוצג כותרת
        title: 'Create Account',
      }}
    />
  </Stack>
  );
}
