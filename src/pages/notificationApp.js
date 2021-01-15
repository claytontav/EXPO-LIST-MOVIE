import React from 'react';
import { View, Button } from 'react-native';

// PASSO 1 - IMPORTAR A BIBLIOTECA
import * as Notifications from 'expo-notifications';

export default function notificationApp() {  

  //PASSO 2 - ATIVAR AS NOTIFICAÇÔES DO CABEÇALHO DA APLICAÇÂO
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  //PASSO 3 - CONFIGURAR A MENSAGEM 
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification(); //PASSO 4 - CHAMARA A FUNÇÂO QUE VAI DISPARAR A NOTIFICAÇÂO
        }}
      />
    </View>
  );
}
