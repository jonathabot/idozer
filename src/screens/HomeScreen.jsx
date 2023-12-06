import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";

const HomeScreen = () => {
  const [items, setItems] = useState({});

  useEffect(() => {
    // run once

    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();

      // console.log(data);

      const mappedData = data.map((post, index) => {
        const date = addDays(new Date(), index);

        return {
          ...post,
          date: format(date, "yyyy-MM-dd"),
        };
      });

      const reduced = mappedData.reduce((acc, currentItem) => {
        const { date, ...coolItem } = currentItem;

        acc[date] = [coolItem];

        return acc;
      }, {});

      setItems(reduced);
    };

    getData();
  }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.name}</Text>
        <Text>{item.cookies ? `🍪` : `😋`}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda items={items} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default HomeScreen;
