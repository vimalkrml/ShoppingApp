import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ProductModal from './ProductModel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addToCart } from '../reducers/cartSlice';
import Cart from './Cart';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();


    const openModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setModalVisible(false);
    };

    const handleAddToCart = () => {
        dispatch(addToCart(selectedProduct));
        closeModal();
    };

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    const renderStars = (rating) => {
        return (
            <View style={styles.ratingContainer}>
                {Array.from({ length: 5 }, (_, index) => {
                    const iconName =
                        index < Math.floor(rating)
                            ? 'star'
                            : index < rating
                                ? 'star-half'
                                : 'star-o';
                    return <Icon key={index} name={iconName} size={16} color="orange" style={{ marginRight: 3 }} />;
                })}
            </View>
        );
    };


    return (
        <View >
            <Text style={styles.banner}>Shopping</Text>
            <FlatList
                style={styles.container}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(item)}>
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                                <View style={styles.ratingAndCountContainer}>
                                    {renderStars(item.rating.rate)}
                                    <Text style={styles.ratingCount}>{item.rating.count}</Text>
                                </View>
                                <View style={styles.priceAndCountContainer}>
                                    <Text style={styles.productPrice}>Rs. {item.price}</Text>
                                    <Cart itemId={item.id} />
                                </View>
                                <Text style={styles.productCategory}>Category: {item.category}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {selectedProduct && (
                <ProductModal
                    visible={modalVisible}
                    product={selectedProduct}
                    onClose={closeModal}
                    onAddToCart={handleAddToCart}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        textAlign: 'center',
        paddingVertical: 20,
        backgroundColor: '#36C2CE',
        marginBottom: 10,
        fontWeight: '600',
        textDecorationLine: 'underline'
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 5,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#555',
        marginTop: 5,

    },
    productCategory: {
        fontSize: 12,
        color: '#888',
        marginTop: 3,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    ratingAndCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingCount: {
        color: 'gray',
        marginLeft: 5,
        marginTop: 4
    },
    priceAndCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default ProductList;