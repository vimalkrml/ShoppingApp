import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../reducers/cartSlice';

const Cart = ({ itemId }) => {
    const cartItem = useSelector((state) => state.cart[itemId]);
    const dispatch = useDispatch();

    if (!cartItem) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => dispatch(decrementQuantity(itemId))}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cartItem.quantity}</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => dispatch(incrementQuantity(itemId))}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEEDEB',
        borderRadius: 8,
        zIndex: 2,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    buttonStyle: {
        paddingHorizontal: 10,
        backgroundColor: 'none',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        marginBottom: 2
    },
});

export default Cart;
