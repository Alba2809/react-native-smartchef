import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: 'modal' }} />
  )
}
