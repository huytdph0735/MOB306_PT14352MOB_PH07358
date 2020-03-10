import React, { useState } from 'react';
import { Text, View, Modal, Button, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';


import ListStpry from './story';
export default function Main() {
   
    const [showModal, setShowModal] = useState(true);

    
    const [addName, setAddName] = useState('');
    const [addAge, setAddAge] = useState('');

   
    function validateFrom() {
        if (addName == '') {
            alert('Bạn chưa nhập tên');
        } else if (addAge == '') {
            alert('Vui lòng nhập tuổi');
        }
        else if (isNaN(addAge)) {
            alert("Vui lòng nhập số");
        }
        else if (addAge < 18) {
            alert('Tuổi phải lớn 18');
        } else {
            // addInfo();
            setShowModal(false);
        }
    }

    return (
        <View >
            <View>
                <ListStpry Username={addName} />
            </View>
            <View>
                <Modal
                    visible={showModal}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: "http://image.phimmoi.net/film/6113/poster.medium.jpg" }}>

                            
                        <Text style={style.textTile} >Mời Nhập Thông Tin</Text>
                        

                        <TextInput
                            placeholder="Nhập Tên"
                            style={style.textinputCss}
                            value={addName} onChangeText={(value) => setAddName(value)} />
                        


                        <TextInput
                            style={style.textinputCss}
                            placeholder='Nhập Tuổi'
                            value={addAge} onChangeText={(value) => setAddAge(value)} />

                        <TouchableOpacity onPress={() => validateFrom()} style={{
                            backgroundColor: '#99CCCC',
                            width: 250,
                            borderRadius: 15,
                            borderColor: '#99CCCC',
                            borderWidth: 1,
                            marginTop:20,
                            marginLeft:75


                        }} >
                            <Text style={{ textAlign: 'center', paddingVertical: 15, color: '#FFFFFF', fontSize: 15 }}>Đăng nhập</Text>
                     
                     
                        </TouchableOpacity>
                      
                    </ImageBackground>
                </Modal>
            </View>
        </View>

    );
}

const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#d5d5d5",
        color: '#2c2c2c',


    },
    textTile: {
        textAlign: 'center',
        paddingTop: 100,
        color: "#cc0000",
        fontSize: 45,
        fontWeight: 'bold',
    },
    textName: {
        borderTopWidth: 1,
        width: 80,
        textAlign: 'center', borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        color: '#5F5F60',
        fontWeight: 'bold',
        fontSize: 20,
        borderColor: '#FFFFFF',
        marginTop: 50,
        backgroundColor: '#CBFAFE'

    },
    modal: {


    },
    buttoncss: {
        backgroundColor: "#4caf50",

        color: 'white',
        padding: 16,
        margin: 32,
        textAlign: 'center',
        display: 'flex',
        fontSize: 16,


    },
    textinputCss: {
        margin: 18,
        color: "#99CCCC",
        marginTop: 30,
        height: 60,
        fontSize: 25,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#ffff",
        backgroundColor:'white',
        paddingHorizontal: 20
    }


})