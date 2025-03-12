import { StyleSheet, View } from "react-native";
import { Avatar, Button, Icon, Text } from "react-native-paper";

const ImageInput = ({ src, handleChange }: any) => {
    return (
        <View style={styles.container}>
            {src && <Avatar.Image size={24} source={src} />}
            {!src && 
                <View >
                    <Text>tomar foto</Text>
                    <Icon source='account' size={23}/>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: 50,
        alignItems: 'center',
        backgroundColor: 'lightgray'
    }
})

export default ImageInput;