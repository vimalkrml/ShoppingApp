import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProductModal = ({ visible, product, onClose, onAddToCart }) => {
    if (!product) return null;

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={styles.innerContainer}>
                        <Text>Description:</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity style={styles.cartButton} onPress={onAddToCart}>
                            <FontAwesome name="shopping-cart" size={20} color="white" />
                            <Text style={styles.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 260,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 20
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        gap: 10,
    },
    closeButton: {
        backgroundColor: '#EEEDEB',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    productImage: {
        width: 100,
        height: 70,
        borderRadius: 5,
        margin: 'auto',
    },
    description: {
        width: 140
    }
});

export default ProductModal;
