import React from 'react';
import { Text, View, Button } from 'react-native';

export default function OnboardingScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Onboarding Screen</Text>
      <Button>Goto Login</Button>
    </View>
  );
}
