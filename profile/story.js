import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image, Button, Modal, ImageBackground, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';



export default function Story({ Username }) {
    const APIStory = 'https://5e64622ea49c2100161069a0.mockapi.io/story';

    const [storys, setStory] = useState([]);
    const [listStory, setListStory] = useState(true);
    const [showLoad, setShowLoad] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // ---------------------- Khai Bao State ADD----------------------------

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [totail_chapters, setTotail_chapters] = useState('');
    const [is_Full, setIs_Full] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);

    // -----------------------END ADD--------------------------------------

    //-----------------------------CALL API--------------------------------
    const fetchStory = () => {
        return fetch(APIStory,
            {

            }).then((res) => res.json())
            .then((resJson) => setStory(resJson))
            .catch((error) => console.log(error))
    };

    useEffect(
        () => {
            fetchStory()
        },
        [listStory]
    )
    console.log(storys);
    // ---------------------------END CALL---------------------------------

    // ----------------------------DELETE API------------------------------
    const deleteStory = (id) => {
        const newStory = storys.filter(item => item.id != id);
        setStory(newStory);
    }
    const handleDelete = (id) => {
        setShowLoad(true);
        deleteStory(id);

        fetch(
            `${APIStory}/${id}`,
            { method: 'DELETE' }
        ).then(() => {
            setShowLoad(false);
        })
            .catch((error) => console.log(error));
    }
    // ----------------------------END DETELE------------------------------
    // ----------------------------ADD AND UPDATE------------------------------
    const setModalData = (data) => {
        setImage(data.image);
        setName(data.name);
        setCategory(data.category);
        setTotail_chapters(data.totail_chapters);
        setIs_Full(data.is_Full);
        setIsUpdate(data.id);
    };

    const handleAddStory = (resJson) => {
        const newStorys = [...storys];
        return newStorys.push(resJson);
    };
    const handleUpdateStory = (resJson) => {
        const newStorys = [...storys];

        const updateStoryIndex = newStorys.findIndex(item => item.id = resJson.id);

        newStorys[updateStoryIndex];
        return newStorys;
    };

    const handleSubmit = () => {
        setShowLoad(true);
        setShowModal(false);

        const storys = {
            image: image,
            name: name,
            category: category,
            totail_chapters: totail_chapters,
            is_Full: is_Full

        };

        const api = isUpdate ? `${APIStory}/${isUpdate}` : APIStory;
        fetch(
            api,
            {
                method: isUpdate ? 'PUT' : 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(storys)
            }
        ).then(
            (res) => res.json()
        )
            .then(
                (resJson) => {
                    let newStorys = [];
                    if (isUpdate) {
                        newStorys = handleUpdateStory(resJson);
                    } else {
                        newStorys = handleAddStory(resJson);
                    }
                    setStory(newStorys);
                    fetchStory();
                    setShowLoad(false);
                }
            )
            .catch((error) => console.log(error));

        setModalData({
            image: '',
            name: '',
            category: '',
            totail_chapters: '',
            is_Full: ''
        });
    }
    const showEditModal = (id) => {
        const story = storys.find((item) => item.id == id);

        setModalData(story);
        console.log(story);
        setShowModal(true);
    }
    // ----------------------------END ADD AND UPDATE--------------------------
    // ----------------------------DETAIL------------------------------------------
    const showDetailModail = (id) => {
        const story = storys.find((item) => item.id == id);

        setModalData(story);
        console.log(story);
        setShowDetail(true);
    }
    // ---------------------------End-------------------------------------------------
    return (
        <View style={style.list}>
            
            <View>
                <View style={style.viewUsername}>
                    <Text style={style.textUsername}>{Username}</Text>
                </View>
                <View>
                <Button title="ADD" onPress={() => setShowModal(true)} />
                </View>
                <View>
                    {showLoad ?
                        <Text>LOADDING.....</Text>
                        : null}
                </View>
            </View>

            <View >
                <ScrollView style={{ height: 600 }}>
                    <FlatList
                        data={storys}
                        renderItem={({ item }) => (
                            <View style={style.line}>
                                
                                <View style={style.row}>
                                    <View>
                                        <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{ uri: item.image }} />
                                    </View>
                                    <View>
                                        <View style={style.viewList}>
                                            <Text>{`Ten Truyen:`}</Text>
                                            <Text>{` ${item.name}`}</Text>
                                        </View>
                                        <View style={style.viewList}>
                                            <Text>{`The Loai:`}</Text>
                                            <Text>{` ${item.category}`}</Text>
                                        </View>
                                        <View style={style.viewList}>
                                            <Text>{`So Chuong:`}</Text>
                                            <Text>{` ${item.totail_chapters}`}</Text>
                                        </View>
                                        <View style={style.viewList}>
                                        <Text>{item.is_Full ? "Còn Truyện" : "Hết Truyện"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View >
                                    <View>

                            <Button color='orange' title="Edit" onPress={() => showEditModal(item.id)} />
                            <Text></Text>
                            <Button title="Delete" onPress={() => handleDelete(item.id)} /> 
                            <Text></Text>
                            <Button color='purple' borderRadius='50' title="Detail" onPress={() => showDetailModail(item.id)} />
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, storys) => item.id}
                    />
                </ScrollView>
            </View>

            <View>
                {/* MODAL ADD AND UPDATE */}
                <Modal visible={showModal}>
                    <ImageBackground
                     style={{ width: '100%', height: '100%' }}
                    
                    >
                        <View>
                            <View>
                                <Text style={style.textLine}>{`image URL`}</Text>
                                <TextInput style={style.textinput} value={image} onChangeText={(value) => setImage(value)} />
                            </View>
                            <View>
                                <Text style={style.textLine}>{`Name`}</Text>
                                <TextInput style={style.textinput} value={name} onChangeText={(value) => setName(value)} />
                            </View>
                            <View>
                                <Text style={style.textLine}>{`The Loai`}</Text>
                                <TextInput style={style.textinput} value={category} onChangeText={(value) => setCategory(value)} />
                            </View>
                            <View>
                                <Text style={style.textLine}>{`So Chuong`}</Text>
                                <TextInput style={style.textinput} value={totail_chapters} onChangeText={(value) => setTotail_chapters(value)} />
                            </View>
                            <View>
                                <Text style={style.textLine}>{`TinhTrang`}</Text>
                                <Switch style={style.textinput} value={is_Full} onValueChange={() => setIs_Full(!is_Full)} />
                            </View>
                        </View>
                        <View>
                            <Button
                                title='Submit' onPress={() => handleSubmit()}
                            />
                            <Button
                                title='Cancle' onPress={() => { setShowModal(false) }}
                            />
                        </View>
                    </ImageBackground>
                </Modal>

                {/* END */}
            </View>
            <View>
                <Modal visible={showDetail}>
                <ImageBackground style={style.bg} source={{ uri: 'https://indainam.com/wp-content/uploads/2017/10/mau-background-don-gian-768x480.jpg' }}>
                    <View style={{
                                   height: '40%',
                                   borderRadius: 20,
                                   margin: 16,
                                   marginTop: 60,
                                   alignItems: 'center',
                                   backgroundColor: '#e4e4e4',
                                }}>
                    
                        <Text  >{`Image URL`}</Text>
                        <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{ uri: image }} />
                    
                        <Text  >{`Tên Truyện`}</Text>
                        <Text>{`: ${name}`} </Text>
                   
                        <Text >{`Thể Loại`}</Text>
                        <Text>{`: ${category}`} </Text>
                   
                        <Text >{`So chuong`}</Text>
                        <Text>{`: ${totail_chapters}`}</Text>
                    
                        <Text>{is_Full ? "Còn Truyện" : "Hết Truyện"}</Text>
                    
                    <Button
                        title='Cancle' onPress={() => { setShowDetail(false) }}
                    /></View></ImageBackground>
                </Modal>
            </View>
        </View>
       

    );
}
const style = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 10,
        marginHorizontal: 90,
        borderColor: '#424242',
        borderRadius: 20,
        backgroundColor: '#D3D3D3'
    },
    textuser: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#424242',
        fontStyle: 'normal',
        paddingVertical: 2,
        color: '#888985'
    },

    profileContainer: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 16,
        width: '100%',
        height: 150,
        padding: 24,
    },
    image: {},
    image: {
        width: 200,
        height: 200,
        borderRadius: 200
    },
    bg: {
        width: '100%',
        height: '100%',
        
    },
    list: {
        maxHeight: 800,
    },
    viewUsername: {
       
        marginTop: 25,
        marginBottom: 10,
       
      
    },
    textUsername: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        textDecorationLine: 'underline',
        color: '#424242',
        fontStyle: 'italic',
        paddingVertical: 2,
        color: '#888985'
    },
    btn: {
        backgroundColor: '#808183',
        width: 180,
        borderRadius: 15,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginTop: 20,
        alignItems: 'center'
    },
    viewList: {
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        padding: 15,
        width: 320,
        
    },
    row2: {
        alignItems: 'center',
    },
    btnEdit: {
        marginRight: 10,
        width: 54,
        alignItems: 'center',
        borderColor: '#36abb5',
        backgroundColor: '#36abb5',
        color: 'white',
        borderRadius: 30,
        borderWidth: 1,
    },
    line: {
       
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 15,
        borderColor: '#FFFFFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#B2B2B2',
        borderRadius: 20
    },
    textLine: {
        
        width: 80,
        textAlign: 'center',
      
        
       
    },
    textinput: {

        color: "red",
        height: 50,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "blue",
        paddingHorizontal: 15
    }

});