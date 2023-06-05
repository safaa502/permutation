import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const UserProfile = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const email = route.params?.email; // Récupérer l'e-mail de l'utilisateur connecté depuis les paramètres de route

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
        const data = await response.json();

        const user = data.find(prof => prof.email === email);

        if (user) {
          setUserData(user);
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur.", error);
      }
    };

    fetchUserData();
  }, [email]);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Nom: {userData.nom}</Text>
      <Text>Prénom: {userData.prenom}</Text>
      <Text>Téléphone: {userData.tel}</Text>
      <Text>Grade: {userData.grade}</Text>
      <Text>Spécialité: {userData.specialite}</Text>
      <Text>Ville Faculté Actuelle: {userData.villeFaculteActuelle}</Text>
      <Text>Ville Désirée: {userData.villeDesiree}</Text>
    </View>
  );
};

export default UserProfile;
