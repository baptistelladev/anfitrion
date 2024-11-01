package br.com.anfitrionapp;

import android.os.Bundle; // Adicione esta importação
import com.getcapacitor.BridgeActivity;
import com.google.firebase.FirebaseApp; // Adicione esta importação

public class MainActivity extends BridgeActivity {
   @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Inicializa o Firebase
        FirebaseApp.initializeApp(this);
    }
}
