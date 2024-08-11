import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    header: {
      fontSize: 24,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    button: {
      backgroundColor: 'green',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginVertical: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    previewImage: {
      width: 200,
      height: 200,
      borderRadius: 5,
      
      borderColor: '#6200ea',
      borderWidth: 2,
    },
    previewText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        color: '#555',
      },
    card: {
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginVertical: 5,
      marginHorizontal: 5,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 5,
    },
    deleteButton: {
      backgroundColor: '#d32f2f',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    deleteButtonText: {
      color: 'white',
      marginLeft: 5,
      fontWeight: 'bold',
    },
    listContainer: {
      paddingBottom: 20,
    },
  });

  export default styles;