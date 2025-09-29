// CustomToast.tsx - Componente personalizado
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

// Tipos para los parámetros del toast
interface ToastProps {
  text1?: string;
  text2?: string;
  props?: any;
}

// Configuración personalizada para react-native-toast-message
export const toastConfig = {
  info: ({ text1, text2, props, ...rest }: ToastProps) => (
    <View style={[styles.toastContainer, styles.infoToast]}>
      <View style={styles.iconContainer}>
        <Ionicons name="information-circle" size={24} color="#3498db" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => Toast.hide()}
      >
        <Text style={styles.closeButtonText}>Entendido</Text>
      </TouchableOpacity>
    </View>
  ),
  
  success: ({ text1, text2, props, ...rest }: ToastProps) => (
    <View style={[styles.toastContainer, styles.successToast]}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => Toast.hide()}
      >
        <Text style={styles.closeButtonText}>Entendido</Text>
      </TouchableOpacity>
    </View>
  ),

  error: ({ text1, text2, props, ...rest }: ToastProps) => (
    <View style={[styles.toastContainer, styles.errorToast]}>
      <View style={styles.iconContainer}>
        <Ionicons name="close-circle" size={24} color="#e74c3c" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => Toast.hide()}
      >
        <Text style={styles.closeButtonText}>Entendido</Text>
      </TouchableOpacity>
    </View>
  ),

  warning: ({ text1, text2, props, ...rest }: ToastProps) => (
    <View style={[styles.toastContainer, styles.warningToast]}>
      <View style={styles.iconContainer}>
        <Ionicons name="warning" size={24} color="#f39c12" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => Toast.hide()}
      >
        <Text style={styles.closeButtonText}>Entendido</Text>
      </TouchableOpacity>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoToast: {
    borderLeftColor: '#3498db',
  },
  successToast: {
    borderLeftColor: '#27ae60',
  },
  errorToast: {
    borderLeftColor: '#e74c3c',
  },
  warningToast: {
    borderLeftColor: '#f39c12',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

// Funciones helper para usar en toda la app
export const showCustomToast = {
  info: (title: string, message?: string) => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      autoHide: false, // No se cierra automáticamente
      position: 'top',
      topOffset: 350,
    });
  },

  success: (title: string, message?: string) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      autoHide: false,
      position: 'top',
      topOffset: 60,
    });
  },

  error: (title: string, message?: string) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      autoHide: false,
      position: 'top',
      topOffset: 60,
    });
  },

  warning: (title: string, message?: string) => {
    Toast.show({
      type: 'warning',
      text1: title,
      text2: message,
      autoHide: false,
      position: 'top',
      topOffset: 60,
    });
  },
};