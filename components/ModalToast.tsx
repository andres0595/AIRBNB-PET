import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface ModalToastProps {
  visible: boolean;
  type: 'info' | 'success' | 'error' | 'warning';
  title: string;
  message?: string;
  onClose: () => void;
}

const ModalToast: React.FC<ModalToastProps> = ({
  visible,
  type,
  title,
  message,
  onClose
}) => {
  const getIconName = () => {
    switch (type) {
      case 'info': return 'information-circle';
      case 'success': return 'checkmark-circle';
      case 'error': return 'close-circle';
      case 'warning': return 'warning';
      default: return 'information-circle';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'info': return '#3498db';
      case 'success': return '#27ae60';
      case 'error': return '#e74c3c';
      case 'warning': return '#f39c12';
      default: return '#3498db';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'info': return '#3498db';
      case 'success': return '#27ae60';
      case 'error': return '#e74c3c';
      case 'warning': return '#f39c12';
      default: return '#3498db';
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
    >
      {/* Overlay que bloquea la interacción */}
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.overlayTouchable} 
          activeOpacity={1}
          onPress={() => {}} // No hace nada, bloquea el toque
        />
        
        {/* Card del toast */}
        <View style={[styles.toastCard, { borderTopColor: getBorderColor() }]}>
          {/* Header con icono */}
          <View style={styles.headerContainer}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={getIconName()} 
                size={40} 
                color={getIconColor()} 
              />
            </View>
          </View>

          {/* Contenido */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.message}>{message}</Text>}
          </View>

          {/* Botón de cerrar */}
          <TouchableOpacity 
            style={[styles.closeButton, { backgroundColor: getBorderColor() }]} 
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Hook personalizado para manejar el toast modal
export const useModalToast = () => {
  const [toastState, setToastState] = useState({
    visible: false,
    type: 'info' as 'info' | 'success' | 'error' | 'warning',
    title: '',
    message: ''
  });

  const showToast = (
    type: 'info' | 'success' | 'error' | 'warning',
    title: string,
    message?: string
  ) => {
    setToastState({
      visible: true,
      type,
      title,
      message: message || ''
    });
  };

  const hideToast = () => {
    setToastState(prev => ({ ...prev, visible: false }));
  };

  const ToastComponent = () => (
    <ModalToast
      visible={toastState.visible}
      type={toastState.type}
      title={toastState.title}
      message={toastState.message}
      onClose={hideToast}
    />
  );

  return {
    showToast: {
      info: (title: string, message?: string) => showToast('info', title, message),
      success: (title: string, message?: string) => showToast('success', title, message),
      error: (title: string, message?: string) => showToast('error', title, message),
      warning: (title: string, message?: string) => showToast('warning', title, message),
    },
    hideToast,
    ToastComponent
  };
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo gris tenue
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  toastCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 350,
    borderTopWidth: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 26,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  closeButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ModalToast;