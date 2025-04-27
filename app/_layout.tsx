import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from './hooks/useAuth';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { authenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();

      if (authenticated) {
        router.replace('/home'); // redireciona pra home se estiver logado
      } else {
        router.replace('/'); // senão, volta pra login
      }
    }
  }, [loaded, authenticated, isLoading]);

  if (!loaded || isLoading) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}
